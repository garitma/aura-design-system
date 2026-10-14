import { Command } from "commander";
import { execa } from "execa";
import { readFileSync, existsSync, readdirSync, statSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { generateGlobalsCss } from "./colors.js";
import { generateRadixColors } from "../utils/color-utils.js";
import { applyBlueprintToProject } from "./blueprint.js";

export async function applyAuraToProject(appDir: string): Promise<void> {
  const packageJsonPath = join(appDir, "package.json");

  if (existsSync(packageJsonPath)) {
    try {
      const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
      if (packageJson.name) {
        console.log(`Project: ${packageJson.name}`);
      }
    } catch {
      console.warn("Could not read project name from package.json");
    }
  } else {
    console.warn(`package.json not found at ${packageJsonPath}`);
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const registryTemplatePath = join(
    __dirname,
    "../../../registry/registry/default/theming/components.json",
  );

  let componentsJsonContent: string;
  if (existsSync(registryTemplatePath)) {
    componentsJsonContent = readFileSync(registryTemplatePath, "utf-8");
  } else {
    componentsJsonContent = JSON.stringify(
      {
        $schema: "https://ui.shadcn.com/schema.json",
        style: "default",
        rsc: true,
        tsx: true,
        tailwind: {
          config: "",
          css: "app/globals.css",
          baseColor: "neutral",
          cssVariables: true,
          prefix: "",
        },
        iconLibrary: "radix-icons",
        aliases: {
          components: "@/components",
          utils: "@/utils/class-names",
          ui: "@/components/ui",
          lib: "@/utils",
          hooks: "@/hooks",
        },
        registries: {
          "@aura": "https://auradesignsystem.com/r/{name}.json",
          "@aura-dev": "http://localhost:4000/r/{name}.json",
        },
      },
      null,
      2,
    );
  }

  const componentsJsonPath = join(appDir, "components.json");
  writeFileSync(
    componentsJsonPath,
    componentsJsonContent.trim() + "\n",
    "utf-8",
  );
  console.log(
    `\n✓ components.json has been updated with Aura Design System configuration`,
  );

  const lightColors = generateRadixColors({
    appearance: "light",
    accent: "#4015ca",
    gray: "#7254cb",
    background: "#FFFFFF",
  });

  const darkColors = generateRadixColors({
    appearance: "dark",
    accent: "#4015ca",
    gray: "#7254cb",
    background: "#100b21",
  });

  const globalsCSS = generateGlobalsCss(lightColors, darkColors);

  const possibleGlobalsPaths = [
    join(appDir, "app/globals.css"),
    join(appDir, "src/app/globals.css"),
    join(appDir, "styles/globals.css"),
    join(appDir, "src/styles/globals.css"),
  ];

  let globalsPath = possibleGlobalsPaths.find((p) => existsSync(p));

  if (!globalsPath) {
    globalsPath = join(appDir, "app/globals.css");
  }

  writeFileSync(globalsPath, globalsCSS.trim() + "\n", "utf-8");
  console.log(
    `\n✓ globals.css has been updated with Aura Design System styles`,
  );

  console.log("\nAdding class-names utility, Aura rules, and Aura skills...");
  await execa(
    "pnpm",
    [
      "dlx",
      "shadcn@latest",
      "add",
      "@aura/class-names",
      "@aura/page-get-starter",
      "@aura/css-main",
      "@aura/rules",
      "@aura/skills",
    ],
    {
      stdio: "inherit",
      cwd: appDir,
    },
  );
  console.log(
    `\n✓ class-names utility, DESIGN.md, Aura rules, and Aura skills have been added`,
  );

  console.log(
    "\nScaffolding Aura blueprint (wiki identity, image generation, reconciled skills, preflight, Sonar, gdp-ts)...",
  );
  await applyBlueprintToProject(appDir);
}

async function initializeAura() {
  console.log("Initializing Aura Design System...");
  console.log("Running shadcn init...\n");

  try {
    const projectDir = process.cwd();

    const beforeDirs = readdirSync(projectDir)
      .filter((item) => {
        const itemPath = join(projectDir, item);
        return statSync(itemPath).isDirectory();
      })
      .sort();

    await execa(
      "pnpm",
      [
        "dlx",
        "create-next-app@latest",
      ],
      {
        stdio: "inherit",
        cwd: projectDir,
      }
    );

    const afterDirs = readdirSync(projectDir)
      .filter((item) => {
        const itemPath = join(projectDir, item);
        return statSync(itemPath).isDirectory();
      })
      .sort();

    const newDirs = afterDirs.filter((dir) => !beforeDirs.includes(dir));
    
    let appDir = projectDir;
    if (newDirs.length > 0) {
      appDir = join(projectDir, newDirs[0]);
      console.log(`\n✓ Detected new app folder: ${newDirs[0]}`);
      console.log(`✓ Changing to directory: ${appDir}`);
      process.chdir(appDir);
    } else {
      const packageJsonPath = join(projectDir, "package.json");
      if (existsSync(packageJsonPath)) {
        console.log(`\n✓ shadcn init completed in current directory`);
      } else {
        console.warn(
          "\n⚠ No new directory detected. Continuing in current directory.",
        );
      }
    }

    await applyAuraToProject(appDir);
  } catch (error) {
    console.error("Error initializing Aura:", error);
    process.exit(1);
  }
}

export function registerInitCommand(program: Command) {
  program
    .command("init")
    .description(
      "Initialize Aura Design System with Next.js, Aura context, blueprint wiki, identity-aware image generation, and gdp-ts proofs",
    )
    .action(async () => {
      await initializeAura();
    });
}
