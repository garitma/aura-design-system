import { Command } from "commander";
import { execa } from "execa";
import { readFileSync, existsSync, readdirSync, statSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

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
        "shadcn@latest",
        "init",
        "--base-color",
        "neutral",
        "--no-base-style",
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
          lib: "@/lib",
          hooks: "@/hooks",
        },
        registries: {
          "@aura": "https://auradesignsystem.com/r/{name}.json",
          "@aura/dev": "http://localhost:4000/r/{name}.json",
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
    const globalsCSS = `@import "tailwindcss";

@theme inline {
  --spacing: 13px;
  --font-sans: Inter, sans-serif;
  --info: #e8ebfe;
  --info-contrast: #0927ec;
  --success: #e8fef7;
  --success-contrast: #045d3c;
  --danger: #feefe8;
  --danger-contrast: #8e3106;
  --warning: #fefbe8;
  --warning-contrast: #5d5104;
  --radius-sm: calc(var(--spacing) * 0.5);
  --radius-md: calc(var(--spacing) * 1);
  --radius-lg: calc(var(--spacing) * 1.5);
  --radius-xl: calc(var(--spacing) * 2);
  --aura-loader: var(--aura-loader);
  --color-warning-contrast: var(--warning-contrast);
  --color-warning: var(--warning);
  --color-danger-contrast: var(--danger-contrast);
  --color-danger: var(--danger);
  --color-success-contrast: var(--success-contrast);
  --color-success: var(--success);
  --color-info-contrast: var(--info-contrast);
  --color-info: var(--info);
  --secundary-foreground: var(--secundary-foreground);
  --secundary: var(--secundary);
  --primary-foreground: var(--primary-foreground);
  --primary: var(--primary);
  --color-gray-track: var(--gray-track);
  --color-gray-indicator: var(--gray-indicator);
  --color-gray-surface: var(--gray-surface);
  --color-gray-contrast: var(--gray-contrast);
  --color-gray-a12: var(--gray-a12);
  --color-gray-a11: var(--gray-a11);
  --color-gray-a10: var(--gray-a10);
  --color-gray-a9: var(--gray-a9);
  --color-gray-a8: var(--gray-a8);
  --color-gray-a7: var(--gray-a7);
  --color-gray-a6: var(--gray-a6);
  --color-gray-a5: var(--gray-a5);
  --color-gray-a4: var(--gray-a4);
  --color-gray-a3: var(--gray-a3);
  --color-gray-a2: var(--gray-a2);
  --color-gray-a1: var(--gray-a1);
  --color-gray-12: var(--gray-12);
  --color-gray-11: var(--gray-11);
  --color-gray-10: var(--gray-10);
  --color-gray-9: var(--gray-9);
  --color-gray-8: var(--gray-8);
  --color-gray-7: var(--gray-7);
  --color-gray-6: var(--gray-6);
  --color-gray-5: var(--gray-5);
  --color-gray-4: var(--gray-4);
  --color-gray-3: var(--gray-3);
  --color-gray-2: var(--gray-2);
  --color-gray-1: var(--gray-1);
  --color-accent-track: var(--accent-track);
  --color-accent-indicator: var(--accent-indicator);
  --color-accent-surface: var(--accent-surface);
  --color-accent-contrast: var(--accent-contrast);
  --color-accent-a12: var(--accent-a12);
  --color-accent-a11: var(--accent-a11);
  --color-accent-a10: var(--accent-a10);
  --color-accent-a9: var(--accent-a9);
  --color-accent-a8: var(--accent-a8);
  --color-accent-a7: var(--accent-a7);
  --color-accent-a6: var(--accent-a6);
  --color-accent-a5: var(--accent-a5);
  --color-accent-a4: var(--accent-a4);
  --color-accent-a3: var(--accent-a3);
  --color-accent-a2: var(--accent-a2);
  --color-accent-a1: var(--accent-a1);
  --color-accent-12: var(--accent-12);
  --color-accent-11: var(--accent-11);
  --color-accent-10: var(--accent-10);
  --color-accent-9: var(--accent-9);
  --color-accent-8: var(--accent-8);
  --color-accent-7: var(--accent-7);
  --color-accent-6: var(--accent-6);
  --color-accent-5: var(--accent-5);
  --color-accent-4: var(--accent-4);
  --color-accent-3: var(--accent-3);
  --color-accent-2: var(--accent-2);
  --color-accent-1: var(--accent-1);
}

:root {
  /* Accent color scale */
  --accent-1: #fefcff;
  --accent-2: #fdf7ff;
  --accent-3: #faedff;
  --accent-4: #f6e2ff;
  --accent-5: #f0d4ff;
  --accent-6: #e8c2fe;
  --accent-7: #daabf8;
  --accent-8: #c88cec;
  --accent-9: #964CE1;
  --accent-10: #8a43d4;
  --accent-11: #7c36c4;
  --accent-12: #3a1a5e;

  --accent-a1: #aa00ff03;
  --accent-a2: #aa00ff08;
  --accent-a3: #a600ff12;
  --accent-a4: #9b00ff1d;
  --accent-a5: #9200ff2b;
  --accent-a6: #8c00f83d;
  --accent-a7: #8200eb54;
  --accent-a8: #7a00df73;
  --accent-a9: #6d00cfb3;
  --accent-a10: #6300c0bc;
  --accent-a11: #5900b0c9;
  --accent-a12: #290058e5;

  --accent-contrast: #fff;
  --accent-surface: #f6e2ff80;
  --accent-indicator: #964CE1;
  --accent-track: #964CE1;

  /* Gray color scale */
  --gray-1: #fcfcfd;
  --gray-2: #f7f8fb;
  --gray-3: #eceef5;
  --gray-4: #e2e5ef;
  --gray-5: #d7dbe8;
  --gray-6: #ccd1e0;
  --gray-7: #bec4d6;
  --gray-8: #a6adc6;
  --gray-9: #6b7394;
  --gray-10: #616988;
  --gray-11: #4f5672;
  --gray-12: #1a1d2e;

  --gray-a1: #00005503;
  --gray-a2: #00256608;
  --gray-a3: #00256a13;
  --gray-a4: #0022621d;
  --gray-a5: #00205f28;
  --gray-a6: #001f5833;
  --gray-a7: #001c5441;
  --gray-a8: #001a5259;
  --gray-a9: #00154994;
  --gray-a10: #0013449e;
  --gray-a11: #000f36b0;
  --gray-a12: #00071ee5;

  --gray-contrast: #ffffff;
  --gray-surface: #ffffffcc;
  --gray-indicator: #6b7394;
  --gray-track: #6b7394;

  --primary: var(--accent-9);
  --primary-foreground: var(--accent-contrast);
  --secundary: var(--accent-8);
  --secundary-foreground: var(--accent-contrast);

  /* Aura Design System - Root Tokens */
  --aura: 13px;
  --aura-font-stack: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  --aura-font-quotes: serif;

  /* Aura Background & Text - Mapped to gray scale */
  --aura-bg: var(--gray-1);
  --aura-text-primary: var(--accent-12);
  --aura-text-primary-inverse: var(--gray-contrast);

  --aura-accents-primary: var(--accent-9);
  --aura-accents-secondary: var(--accent-9);

  /* Aura Component Tokens - Mapped to 12-step system */
  --aura-input-radius: 6.5px;
  --aura-button-radius: 6.5px;
  --aura-input-bg: var(--accent-2);
  --aura-input-placeholder-color: var(--gray-11);
  --aura-radius: 0.5rem;
  --aura-opacity: 0.5;
  --aura-outline: var(--accent-9) solid 2px;
  --aura-button-hover: var(--accent-11);
  --aura-link: var(--gray-12);
  --aura-link-hover: var(--accent-2);
  --aura-selector: var(--accent-surface);
  --aura-loader: var(--primary);
  --aura-skeleton-start: var(--gray-8);
  --aura-skeleton-end: var(--gray-5);
  --radius: 0.5rem;
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Accent color scale */
    --accent-1: #17121c;
    --accent-2: #1c1524;
    --accent-3: #2e1d3d;
    --accent-4: #3b2351;
    --accent-5: #462b5e;
    --accent-6: #52356b;
    --accent-7: #634381;
    --accent-8: #7d55a2;
    --accent-9: #bf91ec;
    --accent-10: #b486e0;
    --accent-11: #cea0fc;
    --accent-12: #e9dbf9;

    --accent-a1: #f613000c;
    --accent-a2: #fc3f0011;
    --accent-a3: #fd60ab24;
    --accent-a4: #fc69ed32;
    --accent-a5: #fb79fc3e;
    --accent-a6: #f486ff4d;
    --accent-a7: #e28afe68;
    --accent-a8: #d589fe90;
    --accent-a9: #d09dfee9;
    --accent-a10: #d099ffda;
    --accent-a11: #d0a2fefc;
    --accent-a12: #f0e1fff8;

    --accent-contrast: #fff;
    --accent-surface: #2c181e80;
    --accent-indicator: #bf91ec;
    --accent-track: #bf91ec;

    /* Gray color scale */
    --gray-1: #0c122a;
    --gray-2: #131931;
    --gray-3: #182043;
    --gray-4: #1b2554;
    --gray-5: #1f2b62;
    --gray-6: #243275;
    --gray-7: #2e3f8b;
    --gray-8: #455aa9;
    --gray-9: #5268b8;
    --gray-10: #5f75c7;
    --gray-11: #94afff;
    --gray-12: #e5eeff;

    --gray-a1: #0d130106;
    --gray-a2: #ecf2eb08;
    --gray-a3: #768eff1d;
    --gray-a4: #5973fc32;
    --gray-a5: #5572fd43;
    --gray-a6: #506dfd5a;
    --gray-a7: #5675ff74;
    --gray-a8: #6c8bff98;
    --gray-a9: #7593ffaa;
    --gray-a10: #7d98ffbc;
    --gray-a11: #94afff;
    --gray-a12: #e5eeff;

    --gray-contrast: #ffffff;
    --gray-surface: rgba(0, 0, 0, 0.05);
    --gray-indicator: #5268b8;
    --gray-track: #5268b8;
  }
}

@layer base {
  html {
    font-size: 17px;
  }
  main {
    background-color: var(--gray-1);
  }
}

@layer components {
}
`;

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

    // Add class-names utility from the registry
    console.log("\nAdding class-names utility...");
    await execa(
      "pnpm",
      ["dlx", "shadcn@latest", "add", "@aura/class-names"],
      {
        stdio: "inherit",
        cwd: appDir,
      }
    );
    console.log(`\n✓ class-names utility has been added`);
    
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
