import { Command } from "commander";
import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";

// --- Versiones Seguras Recomendadas ---
// Basadas en la información de tu imagen para la vulnerabilidad CVE-2025-5518 y CVE-2025-6647
const SECURE_VERSIONS: Record<string, any> = {
  // Para Next.js: si estás entre 15 y 16, actualiza a una de estas
  next: {
    "15.x": "15.3.6", // O la versión más alta de su rama (15.0.5, 15.1.9, 15.2.6, 15.3.6)
    "16.x": "16.0.7", // O la versión más alta de su rama
    // Como convención, usaremos la versión de parche más alta recomendada para cada rama mayor/menor.
  },
  // Para React Server Components (React, react-dom)
  react: "19.2.1",
  "react-dom": "19.2.1",
  // Si estás usando React 19.0.x o 19.1.x, actualiza a la última de esas ramas (19.0.1, 19.1.2, 19.2.1)
};

const PACKAGE_JSON_PATH = path.resolve("./package.json");

/**
 * Normaliza y elimina prefijos de versionado (^, ~)
 * @param {string} version - La cadena de versión de package.json.
 * @returns {string} La versión sin prefijos semver.
 */
function normalizeVersion(version: string): string | null {
  if (!version) return null;
  return version.replace(/[\^~><=]/g, "").trim();
}

/**
 * Comprueba si una versión de Next.js está en el rango afectado (entre 15.0.0 y < 16.x)
 * @param {string} version - La versión normalizada de Next.js.
 * @returns {boolean} Si la versión está en el rango 15.x o 16.x (afectado).
 */
function isNextVersionAffected(version: string): boolean {
  if (!version) return false;
  const major = parseInt(version.split(".")[0], 10);

  // El texto dice "cada versión entre Next.js 15 y 16 es afectada"
  // Esto se interpreta como las ramas Next.js 15.x y Next.js 16.x (asumiendo que 17.x es la no afectada).
  return major === 15 || major === 16;
}

/**
 * Obtiene la versión de Next.js segura a la que se debe actualizar.
 * Mantiene la rama menor actual si está disponible.
 * @param {string} currentVersion - La versión normalizada de Next.js.
 * @param {string} originalVersionString - La versión original con prefijo.
 * @returns {string} La nueva versión segura, o null si no se debe actualizar.
 */
function getNewNextVersion(currentVersion: string, originalVersionString: string): string | null {
  const major = parseInt(currentVersion.split(".")[0], 10);
  const majorMinorKey = `${major}.x`;

  if (SECURE_VERSIONS.next[majorMinorKey]) {
    // Mantiene el prefijo semver si existía
    const semverPrefix = originalVersionString.match(/^[\^~]/) ? originalVersionString[0] : "";
    return semverPrefix + SECURE_VERSIONS.next[majorMinorKey];
  }

  // Si la versión actual es mayor a 16 (ej. 17.x), puede que ya esté corregida,
  // pero si está usando React Server Components, quizás necesite la versión de Next.js más nueva
  // que soporte la versión segura de React. En este script, solo actualizamos los rangos afectados explícitos.
  console.warn(
    chalk.yellow(
      `[WARN] La versión de Next.js ${currentVersion} no está en las ramas de corrección de Next.js explícitamente listadas (15.x, 16.x). No se actualiza automáticamente. Revisar manualmente.`
    )
  );
  return null;
}

export function registerUpdateDepsCommand(program: Command) {
  program
    .command("update-deps")
    .description("Update dependencies to secure versions based on CVE-2025-5518 and CVE-2025-6647")
    .action(() => {
      console.log(chalk.cyan("✨ Iniciando script de actualización de seguridad..."));

      try {
        if (!fs.existsSync(PACKAGE_JSON_PATH)) {
            console.error(chalk.red("❌ No package.json found in the current directory."));
            return;
        }

        // 1. Leer el package.json
        const packageJsonContent = fs.readFileSync(PACKAGE_JSON_PATH, "utf8");
        const currentPackage = JSON.parse(packageJsonContent);

        let changesMade = false;

        // --- Secciones a revisar ---
        const dependencySections = ["dependencies", "devDependencies"];

        for (const section of dependencySections) {
          if (!currentPackage[section]) continue;

          const deps = currentPackage[section];

          // 2. Actualizar Next.js
          if (deps["next"]) {
            const currentVersionWithPrefix = deps["next"];
            const normalizedVersion = normalizeVersion(currentVersionWithPrefix);

            if (normalizedVersion && isNextVersionAffected(normalizedVersion)) {
              const newVersion = getNewNextVersion(normalizedVersion, currentVersionWithPrefix);
              if (newVersion) {
                console.log(
                  chalk.green(
                    `✅ Actualizando 'next': ${currentVersionWithPrefix} -> ${newVersion} (Corrección CVE-2025-6647)`
                  )
                );
                deps["next"] = newVersion;
                changesMade = true;
              }
            } else {
              console.log(
                chalk.gray(
                  `➖ 'next' (v${currentVersionWithPrefix}) no está en el rango afectado 15.x o 16.x. No se actualiza.`
                )
              );
            }
          }

          // 3. Actualizar React y React-DOM
          // Se asume que el usuario debe actualizar a la última versión segura si usa Server Components.
          const reactPackages = ["react", "react-dom"];
          for (const pkg of reactPackages) {
            if (deps[pkg]) {
              const currentVersionWithPrefix = deps[pkg];
              const normalizedVersion = normalizeVersion(currentVersionWithPrefix);

              if (!normalizedVersion) continue;

              // Si la versión actual es menor que la versión segura recomendada
              // Nota: localeCompare con numeric: true hace comparación básica, pero para semver real sería mejor semver.lt
              // Aquí mantenemos la lógica original del script
              if (
                normalizedVersion.localeCompare(SECURE_VERSIONS[pkg], undefined, {
                  numeric: true,
                  sensitivity: "base",
                }) === -1
              ) {
                // Mantiene el prefijo semver si existía, de lo contrario usa '^' como buena práctica
                const semverPrefix = currentVersionWithPrefix.match(/^[\^~]/)
                  ? currentVersionWithPrefix[0]
                  : "^";
                const newVersion = semverPrefix + SECURE_VERSIONS[pkg];

                console.log(
                  chalk.green(
                    `✅ Actualizando '${pkg}': ${currentVersionWithPrefix} -> ${newVersion} (Corrección CVE-2025-5518)`
                  )
                );
                deps[pkg] = newVersion;
                changesMade = true;
              } else {
                console.log(
                  chalk.gray(
                    `➖ '${pkg}' (v${currentVersionWithPrefix}) ya es igual o mayor a la versión segura recomendada (${SECURE_VERSIONS[pkg]}). No se necesita actualizar.`
                  )
                );
              }
            }
          }
        }

        // 4. Escribir el package.json modificado
        if (changesMade) {
          // Escribe el archivo con 2 espacios de indentación para que se vea limpio
          fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(currentPackage, null, 2) + "\n", "utf8");
          console.log(chalk.bold.green("\n✅ ¡package.json actualizado con las versiones seguras!"));
          console.log(
            "👉 Ejecuta " +
              chalk.bold("npm install") +
              " (o tu gestor de paquetes) para instalar las nuevas dependencias."
          );
        } else {
          console.log(
            chalk.blue("\n🎉 No se encontraron dependencias afectadas o ya están en versiones seguras.")
          );
        }
      } catch (error: any) {
        console.error(chalk.red("\n❌ Error al ejecutar el script de actualización:", error.message));
        if (error.code === "ENOENT") {
          console.error(
            chalk.red("Asegúrate de ejecutar este script en la carpeta donde se encuentra el archivo package.json.")
          );
        }
      }
    });
}

