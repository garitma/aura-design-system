import { Command } from "commander";
import { execa } from "execa";
import { readFileSync, existsSync, readdirSync, statSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { generateGlobalsCss } from "./colors.js";
import { generateRadixColors } from "../utils/color-utils.js";

async function initializeAura() {
  console.log("Initializing Aura Design System...");
  console.log("Running shadcn init...\n");

  try {
    const projectDir = process.cwd();

    // Get list of directories before shadcn init
    const beforeDirs = readdirSync(projectDir)
      .filter((item) => {
        const itemPath = join(projectDir, item);
        return statSync(itemPath).isDirectory();
      })
      .sort();

    // Run shadcn init interactively - stdio: 'inherit' allows user to interact
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

    // Get list of directories after shadcn init to find the newly created folder
    const afterDirs = readdirSync(projectDir)
      .filter((item) => {
        const itemPath = join(projectDir, item);
        return statSync(itemPath).isDirectory();
      })
      .sort();

    // Find the newly created directory
    const newDirs = afterDirs.filter((dir) => !beforeDirs.includes(dir));
    
    let appDir = projectDir;
    if (newDirs.length > 0) {
      // Use the first newly created directory (most likely the app folder)
      appDir = join(projectDir, newDirs[0]);
      console.log(`\n✓ Detected new app folder: ${newDirs[0]}`);
      console.log(`✓ Changing to directory: ${appDir}`);
      // Change to the app directory
      process.chdir(appDir);
    } else {
      // If no new directory was created, check if package.json exists in current dir
      // This means shadcn init ran in the current directory
      const packageJsonPath = join(projectDir, "package.json");
      if (existsSync(packageJsonPath)) {
        console.log(`\n✓ shadcn init completed in current directory`);
      } else {
        console.warn("\n⚠ No new directory detected. Continuing in current directory.");
      }
    }

    // Read project name from package.json in the app directory
    const packageJsonPath = join(appDir, "package.json");
    let projectName: string | undefined;
    
    if (existsSync(packageJsonPath)) {
      try {
        const packageJson = JSON.parse(
          readFileSync(packageJsonPath, "utf-8")
        );
        projectName = packageJson.name;
       
      } catch (error) {
        console.warn("Could not read project name from package.json");
      }
    } else {
      console.warn(`package.json not found at ${packageJsonPath}`);
    }

    // Get the path to the components.json template in the registry
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const registryTemplatePath = join(
      __dirname,
      "../../../registry/registry/default/theming/components.json"
    );

    // Read the template components.json
    let componentsJsonContent: string;
    if (existsSync(registryTemplatePath)) {
      componentsJsonContent = readFileSync(registryTemplatePath, "utf-8");
    } else {
      // Fallback: use the template content directly
      componentsJsonContent = JSON.stringify({
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
      }, null, 2);
    }

    // Overwrite components.json in the app directory
    const componentsJsonPath = join(appDir, "components.json");
    writeFileSync(
      componentsJsonPath,
      componentsJsonContent.trim() + "\n",
      "utf-8"
    );
    console.log(`\n✓ components.json has been updated with Aura Design System configuration`);

    // Generate and write globals.css with Aura Design System defaults
    const lightColors = generateRadixColors({
      appearance: "light",
      accent: "#964CE1",
      gray: "#6b7394",
      background: "#FFFFFF",
    });

    const darkColors = generateRadixColors({
      appearance: "dark",
      accent: "#964CE1",
      gray: "#6b7394",
      background: "#0c122a",
    });

    const globalsCSS = generateGlobalsCss(lightColors, darkColors);

    // Find and write globals.css
    const possibleGlobalsPaths = [
      join(appDir, "app/globals.css"),
      join(appDir, "src/app/globals.css"),
      join(appDir, "styles/globals.css"),
      join(appDir, "src/styles/globals.css"),
    ];

    let globalsPath = possibleGlobalsPaths.find((p) => existsSync(p));
    
    if (!globalsPath) {
      // Default to app/globals.css if none exists
      globalsPath = join(appDir, "app/globals.css");
    }

    writeFileSync(globalsPath, globalsCSS.trim() + "\n", "utf-8");
    console.log(`\n✓ globals.css has been updated with Aura Design System styles`);

    // Add class-names utility and Aura rules from the registry
    console.log("\nAdding class-names utility and Aura rules...");
    await execa(
      "pnpm",
      [
        "dlx",
        "shadcn@latest",
        "add",
        "@aura/class-names",
        "@aura/page-get-starter",
        "@aura/css-main",
        "@aura/design-md",
        "@aura/rules",
      ],
      {
        stdio: "inherit",
        cwd: appDir,
      }
    );
    console.log(`\n✓ class-names utility, DESIGN.md, and Aura rules have been added`);
    
  } catch (error) {
    console.error("Error initializing Aura:", error);
    process.exit(1);
  }
}

export function registerInitCommand(program: Command) {
  program
    .command("init")
    .description("Initialize Aura Design System")
    .action(async () => {
      await initializeAura();
    });
}
