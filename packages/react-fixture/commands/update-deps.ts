import { Command } from "commander";
import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";

// Secure Recommended Versions
// Based on security advisories for CVE-2025-5518 and CVE-2025-6647
const SECURE_VERSIONS: Record<string, any> = {
  // Next.js: specific versions per branch
  next: {
    "14.x": "14.2.34",
    "15.0.x": "15.0.6",
    "15.1.x": "15.1.10",
    "15.2.x": "15.2.7",
    "15.3.x": "15.3.7",
    "15.4.x": "15.4.9",
    "15.5.x": "15.5.8",
    "15.x-canary": "15.6.0-canary.59", // For all 15.x canary releases
    "16.0.x": "16.0.9",
    "16.x-canary": "16.1.0-canary.17", // For all 16.x canary releases
    // Fallback for unspecified versions
    "15.x": "15.5.8", // Uses the latest stable version of 15.x
    "16.x": "16.0.9", // Uses the latest stable version of 16.x
  },
  // React Server Components (React, react-dom)
  // Only React 19.x is updated; React 18.x is left unchanged
  react: {
    "19.0.x": "19.0.1",
    "19.1.x": "19.1.2",
    "19.2.x": "19.2.1",
    // Fallback for unspecified 19.x versions
    "19.x": "19.2.1",
  },
  "react-dom": {
    "19.0.x": "19.0.1",
    "19.1.x": "19.1.2",
    "19.2.x": "19.2.1",
    // Fallback for unspecified 19.x versions
    "19.x": "19.2.1",
  },
};

const PACKAGE_JSON_PATH = path.resolve("./package.json");

/**
 * Normalizes and removes versioning prefixes (^, ~)
 * @param {string} version - The version string from package.json
 * @returns {string} The version without semver prefixes
 */
function normalizeVersion(version: string): string | null {
  if (!version) return null;
  return version.replace(/[\^~><=]/g, "").trim();
}

/**
 * Checks if a Next.js version is within the affected range (14.x, 15.x, or 16.x)
 * @param {string} version - The normalized Next.js version
 * @returns {boolean} Whether the version is in the affected range (14.x, 15.x, or 16.x)
 */
function isNextVersionAffected(version: string): boolean {
  if (!version) return false;
  const major = parseInt(version.split(".")[0], 10);

  // Includes Next.js branches 14.x, 15.x, and 16.x
  return major === 14 || major === 15 || major === 16;
}

/**
 * Retrieves the secure Next.js version to update to.
 * Preserves the current minor branch if available.
 * @param {string} currentVersion - The normalized Next.js version
 * @param {string} originalVersionString - The original version string with prefix
 * @returns {string} The new secure version, or null if no update is needed
 */
function getNewNextVersion(currentVersion: string, originalVersionString: string): string | null {
  const parts = currentVersion.split(".");
  const major = parseInt(parts[0], 10);
  const minor = parts[1] ? parseInt(parts[1], 10) : null;
  
  // Check for canary versions
  const isCanary = currentVersion.includes("-canary");
  
  // For canary versions, check major.x-canary first
  if (isCanary) {
    const canaryKey = `${major}.x-canary`;
    if (SECURE_VERSIONS.next[canaryKey]) {
      const semverPrefix = originalVersionString.match(/^[\^~]/) ? originalVersionString[0] : "";
      return semverPrefix + SECURE_VERSIONS.next[canaryKey];
    }
  }
  
  // Try to find exact match for stable versions (major.minor.x)
  if (minor !== null && !isCanary) {
    const versionKey = `${major}.${minor}.x`;
    if (SECURE_VERSIONS.next[versionKey]) {
      const semverPrefix = originalVersionString.match(/^[\^~]/) ? originalVersionString[0] : "";
      return semverPrefix + SECURE_VERSIONS.next[versionKey];
    }
  }
  
  // Fallback to major.x
  const majorKey = `${major}.x`;
  if (SECURE_VERSIONS.next[majorKey]) {
    const semverPrefix = originalVersionString.match(/^[\^~]/) ? originalVersionString[0] : "";
    return semverPrefix + SECURE_VERSIONS.next[majorKey];
  }

  // If the current version is greater than 16 (e.g., 17.x), it may already be patched.
  // However, if using React Server Components, a newer Next.js version that supports
  // the secure React version may be required. This script only updates explicitly listed affected ranges.
  console.warn(
    chalk.yellow(
      `[WARN] Next.js version ${currentVersion} is not in the explicitly listed patched branches (14.x, 15.x, 16.x). Automatic update skipped. Please review manually.`
    )
  );
  return null;
}

/**
 * Checks if a React version is within the affected range (React 19.x only)
 * @param {string} version - The normalized React version
 * @returns {boolean} Whether the version is React 19.x (affected). React 18.x is not modified.
 */
function isReactVersionAffected(version: string): boolean {
  if (!version) return false;
  const major = parseInt(version.split(".")[0], 10);
  
  // Only React 19.x is updated; React 18.x is left unchanged
  return major === 19;
}

/**
 * Retrieves the secure React version to update to.
 * Preserves the current minor branch if available.
 * Only processes React 19.x; React 18.x is not modified.
 * @param {string} currentVersion - The normalized React version
 * @param {string} originalVersionString - The original version string with prefix
 * @param {string} packageName - The package name ("react" or "react-dom")
 * @returns {string} The new secure version, or null if no update is needed
 */
function getNewReactVersion(
  currentVersion: string,
  originalVersionString: string,
  packageName: string
): string | null {
  const parts = currentVersion.split(".");
  const major = parseInt(parts[0], 10);
  const minor = parts[1] ? parseInt(parts[1], 10) : null;
  
  // React 18.x is not modified
  if (major === 18) {
    console.log(
      chalk.gray(
        `'${packageName}' (v${originalVersionString}) is React 18.x. Update skipped (only React 19.x is updated).`
      )
    );
    return null;
  }
  
  // Only React 19.x is processed
  if (major !== 19) {
    console.warn(
      chalk.yellow(
        `[WARN] ${packageName} version ${currentVersion} is not React 19.x. Automatic update skipped. Please review manually.`
      )
    );
    return null;
  }
  
  // Try to find exact match for minor versions (19.minor.x)
  if (minor !== null) {
    const versionKey = `19.${minor}.x`;
    if (SECURE_VERSIONS[packageName] && SECURE_VERSIONS[packageName][versionKey]) {
      const semverPrefix = originalVersionString.match(/^[\^~]/) ? originalVersionString[0] : "^";
      return semverPrefix + SECURE_VERSIONS[packageName][versionKey];
    }
  }
  
  // Fallback to 19.x
  if (SECURE_VERSIONS[packageName] && SECURE_VERSIONS[packageName]["19.x"]) {
    const semverPrefix = originalVersionString.match(/^[\^~]/) ? originalVersionString[0] : "^";
    return semverPrefix + SECURE_VERSIONS[packageName]["19.x"];
  }
  
  return null;
}

export function registerUpdateDepsCommand(program: Command) {
  program
    .command("update-deps")
    .description("Update dependencies to secure versions based on CVE-2025-5518 and CVE-2025-6647")
    .action(() => {
      console.log(chalk.cyan("Initiating security update script..."));

      try {
        if (!fs.existsSync(PACKAGE_JSON_PATH)) {
            console.error(chalk.red("No package.json found in the current directory."));
            return;
        }

        // Read package.json
        const packageJsonContent = fs.readFileSync(PACKAGE_JSON_PATH, "utf8");
        const currentPackage = JSON.parse(packageJsonContent);

        let changesMade = false;

        // Sections to review
        const dependencySections = ["dependencies", "devDependencies"];

        for (const section of dependencySections) {
          if (!currentPackage[section]) continue;

          const deps = currentPackage[section];

          // Update Next.js
          if (deps["next"]) {
            const currentVersionWithPrefix = deps["next"];
            const normalizedVersion = normalizeVersion(currentVersionWithPrefix);

            if (normalizedVersion && isNextVersionAffected(normalizedVersion)) {
              const newVersion = getNewNextVersion(normalizedVersion, currentVersionWithPrefix);
              if (newVersion) {
                console.log(
                  chalk.green(
                    `Updating 'next': ${currentVersionWithPrefix} -> ${newVersion} (CVE-2025-6647 patch)`
                  )
                );
                deps["next"] = newVersion;
                changesMade = true;
              }
            } else {
              console.log(
                chalk.gray(
                  `'next' (v${currentVersionWithPrefix}) is not in the affected range (14.x, 15.x, or 16.x). Update skipped.`
                )
              );
            }
          }

          // Update React and React-DOM
          // Only React 19.x is updated; React 18.x is left unchanged
          const reactPackages = ["react", "react-dom"];
          for (const pkg of reactPackages) {
            if (deps[pkg]) {
              const currentVersionWithPrefix = deps[pkg];
              const normalizedVersion = normalizeVersion(currentVersionWithPrefix);

              if (!normalizedVersion) continue;

              if (isReactVersionAffected(normalizedVersion)) {
                const newVersion = getNewReactVersion(normalizedVersion, currentVersionWithPrefix, pkg);
                if (newVersion) {
                  console.log(
                    chalk.green(
                      `Updating '${pkg}': ${currentVersionWithPrefix} -> ${newVersion} (CVE-2025-5518 patch)`
                    )
                  );
                  deps[pkg] = newVersion;
                  changesMade = true;
                }
              } else {
                // React 18.x or unaffected versions
                if (normalizedVersion.startsWith("18.")) {
                  console.log(
                    chalk.gray(
                      `'${pkg}' (v${currentVersionWithPrefix}) is React 18.x. Update skipped (only React 19.x is updated).`
                    )
                  );
                } else {
                  console.log(
                    chalk.gray(
                      `'${pkg}' (v${currentVersionWithPrefix}) is not in the affected range (React 19.x). Update skipped.`
                    )
                  );
                }
              }
            }
          }
        }

        // Write the modified package.json
        if (changesMade) {
          // Write the file with 2-space indentation for clean formatting
          fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(currentPackage, null, 2) + "\n", "utf8");
          console.log(chalk.bold.green("\npackage.json has been updated with secure versions."));
          console.log(
            "Please run " +
              chalk.bold("npm install") +
              " (or your package manager) to install the new dependencies."
          );
        } else {
          console.log(
            chalk.blue("\nNo affected dependencies found, or all dependencies are already at secure versions.")
          );
        }
      } catch (error: any) {
        console.error(chalk.red("\nError executing the update script:"), error.message);
        if (error.code === "ENOENT") {
          console.error(
            chalk.red("Please ensure this script is executed in the directory containing the package.json file.")
          );
        }
      }
    });
}

