import fs from "fs";
import path from "path";
import chalk from "chalk";
import { getRegistryItems } from "../utils/registry-utils.js";
import readline from "readline";

export function registerCssCommand(program) {
  const { css } = getRegistryItems();

  const cssCommand = program
    .command("css")
    .description("CSS utilities for Aura Design System");

  cssCommand
    .command("link")
    .description(
      "Scan the styles folder and ensure each file is imported in @layer base in globals.css (only once per file)"
    )
    .action(() => {
      const projectRoot = process.cwd();
      const stylesDir = path.join(projectRoot, "styles");
      const globalsCssPath = path.join(projectRoot, "./app/globals.css");

      if (!fs.existsSync(stylesDir)) {
        console.error(chalk.red(`Styles directory not found at ${stylesDir}`));
        process.exit(1);
      }
      if (!fs.existsSync(globalsCssPath)) {
        console.error(chalk.red(`globals.css not found at ${globalsCssPath}`));
        process.exit(1);
      }

      // Get all CSS files in styles directory
      const styleFiles = fs
        .readdirSync(stylesDir)
        .filter((file) => file.endsWith(".css"));

      // Read globals.css
      let globalsCssContent = fs.readFileSync(globalsCssPath, "utf-8");

      // Find @layer base block
      const layerBaseRegex = /@layer base\s*\{([\s\S]*?)\n?\}/gm;
      const match = layerBaseRegex.exec(globalsCssContent);
      if (!match) {
        console.error(chalk.red("@layer base block not found in globals.css!"));
        process.exit(1);
      }

      let layerBaseContent = match[1];
      let beforeLayerBase = globalsCssContent.slice(0, match.index);
      let afterLayerBase = globalsCssContent.slice(layerBaseRegex.lastIndex);

      // Find main aura import inside @layer base
      const mainAuraImportRegex =
        /@import\s+['\"]@aura-design\/system\/main.css['\"];\s*/;
      const auraImportMatch = mainAuraImportRegex.exec(layerBaseContent);
      let auraImport = auraImportMatch ? auraImportMatch[0].trim() : null;

      // Remove all style imports from everywhere
      // Adjusted regex to correctly match '../styles/' paths
      const styleImportRegex = /@import\s+['"]\.\.\/styles\/[\w\-]+\.css['\"];\s*/g;
      beforeLayerBase = beforeLayerBase.replace(styleImportRegex, "");
      afterLayerBase = afterLayerBase.replace(styleImportRegex, "");
      layerBaseContent = layerBaseContent.replace(styleImportRegex, "");

      // Prepare new imports
      const newImports = styleFiles.map(
        (file) => `@import '../styles/${file}';`
      );

      // Insert imports after aura import if present, else at the top
      let newLayerBaseContent = layerBaseContent;
      if (auraImport) {
        // Remove aura import from layerBaseContent
        newLayerBaseContent = newLayerBaseContent.replace(
          mainAuraImportRegex,
          ""
        );
        newLayerBaseContent = `${auraImport}\n${newImports.join("\n")}\n${newLayerBaseContent.trim()}`;
      } else {
        newLayerBaseContent = `${newImports.join("\n")}\n${newLayerBaseContent.trim()}`;
      }

      // Rebuild globals.css
      const newGlobalsCssContent = `${beforeLayerBase}@layer base {\n${newLayerBaseContent}\n}${afterLayerBase}`;

      fs.writeFileSync(globalsCssPath, newGlobalsCssContent, "utf-8");
      console.log(
        chalk.blue(
          "globals.css updated: all style imports are now inside @layer base after the main aura import."
        )
      );
    });

  cssCommand
    .command("main")
    .description(
      "Ensure @import '@aura-design/system/main.css'; is at the top of @layer base in globals.css"
    )
    .action(() => {
      const projectRoot = process.cwd();
      const globalsCssPath = path.join(projectRoot, "./app/globals.css");

      if (!fs.existsSync(globalsCssPath)) {
        console.error(chalk.red(`globals.css not found at ${globalsCssPath}`));
        process.exit(1);
      }

      let globalsCssContent = fs.readFileSync(globalsCssPath, "utf-8");
      const layerBaseRegex = /@layer base\s*\{([\s\S]*?)\n?\}/gm;
      const match = layerBaseRegex.exec(globalsCssContent);
      if (!match) {
        console.error(chalk.red("@layer base block not found in globals.css!"));
        process.exit(1);
      }

      let layerBaseContent = match[1];
      let beforeLayerBase = globalsCssContent.slice(0, match.index);
      let afterLayerBase = globalsCssContent.slice(layerBaseRegex.lastIndex);

      // Remove all main aura imports from everywhere
      const mainAuraImportRegex =
        /@import\s+['\"]@aura-design\/system\/main.css['\"];\s*/g;
      beforeLayerBase = beforeLayerBase.replace(mainAuraImportRegex, "");
      afterLayerBase = afterLayerBase.replace(mainAuraImportRegex, "");
      layerBaseContent = layerBaseContent.replace(mainAuraImportRegex, "");

      // Insert main aura import at the top of @layer base
      let newLayerBaseContent = `@import "@aura-design/system/main.css";\n${layerBaseContent.trim()}`;

      // Rebuild globals.css
      const newGlobalsCssContent = `${beforeLayerBase}@layer base {\n${newLayerBaseContent}\n}${afterLayerBase}`;

      fs.writeFileSync(globalsCssPath, newGlobalsCssContent, "utf-8");
      console.log(
        chalk.blue(
          "globals.css updated: @import '@aura-design/system/main.css'; is now at the top of @layer base."
        )
      );
    });

  cssCommand
    .command("list")
    .description("List all utils in the Aura Design System")
    .action(() => {
      css.forEach((util) => {
        console.log(chalk.blue(`- ${util}`));
      });
    });

  cssCommand
    .command("prune")
    .description(
      "Remove all content from app/globals.css except for @import 'tailwindcss'; or add it if not present."
    )
    .action(() => {
      const projectRoot = process.cwd();
      const globalsCssPath = path.join(projectRoot, "./app/globals.css");
      const tailwindImport = '@import "tailwindcss";';

      console.warn(
        chalk.yellow(
          'Warning: This will remove all content from globals.css except for @import "tailwindcss";.'
        )
      );

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question("Are you sure you want to continue? (y/N) ", (answer) => {
        rl.close();
        const normalized = answer.trim().toLowerCase();
        if (normalized !== "y" && normalized !== "yes") {
          console.log(chalk.blue("Aborted. No changes made to globals.css."));
          return;
        }

        if (!fs.existsSync(globalsCssPath)) {
          fs.writeFileSync(globalsCssPath, tailwindImport + "\n", "utf-8");
          console.log(
            chalk.blue('globals.css created with only @import "tailwindcss";')
          );
          return;
        }

        let globalsCssContent = fs.readFileSync(globalsCssPath, "utf-8").trim();
        if (globalsCssContent === tailwindImport) {
          console.log(
            chalk.blue(
              'globals.css already contains only @import "tailwindcss";'
            )
          );
          return;
        }
        fs.writeFileSync(globalsCssPath, tailwindImport + "\n", "utf-8");
        console.log(
          chalk.blue(
            'globals.css updated to contain only @import "tailwindcss";'
          )
        );
      });
    });

  cssCommand
    .command("clean")
    .description(
      "Remove '* { @apply border-border outline-ring/50; }' from app/globals.css if present."
    )
    .action(() => {
      const projectRoot = process.cwd();
      const globalsCssPath = path.join(projectRoot, "./app/globals.css");

      if (!fs.existsSync(globalsCssPath)) {
        console.error(chalk.red(`globals.css not found at ${globalsCssPath}`));
        process.exit(1);
      }

      let globalsCssContent = fs.readFileSync(globalsCssPath, "utf-8");
      // Regex to match the exact block (with optional whitespace)
      const blockRegex =
        /\*\s*\{\s*@apply border-border outline-ring\/50;\s*\}/g;
      let newGlobalsCssContent = globalsCssContent.replace(blockRegex, "");
      // Regex to match the body block with background, color, and font-family
      const bodyFullBlockRegex =
        /body\s*\{\s*background:\s*var\(--background\);\s*color:\s*var\(--foreground\);\s*font-family:\s*Arial,\s*Helvetica,\s*sans-serif;\s*\}/g;
      newGlobalsCssContent = newGlobalsCssContent.replace(
        bodyFullBlockRegex,
        ""
      );
      // Regex to match the import line
      const importRegex = /^\s*@import\s+"tw-animate-css";\s*$/gm;
      newGlobalsCssContent = newGlobalsCssContent.replace(importRegex, "");

      // Remove empty @layer base blocks
      const emptyLayerBaseRegex = /@layer base\s*\{\s*\}/gm;
      newGlobalsCssContent = newGlobalsCssContent.replace(
        emptyLayerBaseRegex,
        ""
      );

      // Remove duplicate @layer base blocks, keep only the first
      const layerBaseRegex = /(@layer base\s*\{[\s\S]*?\n?\})/gm; // Group 0 is the whole block
      const matches = Array.from(newGlobalsCssContent.matchAll(layerBaseRegex));

      if (matches.length > 1) {
        let resultBuilder = [];
        // Add content before the first @layer base
        resultBuilder.push(newGlobalsCssContent.substring(0, matches[0].index));
        // Add the first @layer base block itself
        resultBuilder.push(matches[0][0]);

        let currentPos = matches[0].index + matches[0][0].length;

        for (let i = 1; i < matches.length; i++) {
          // Add content between the end of the last kept/skipped layer and the start of the current one
          resultBuilder.push(
            newGlobalsCssContent.substring(currentPos, matches[i].index)
          );
          // Skip the current duplicate layer (matches[i][0]) by advancing currentPos
          currentPos = matches[i].index + matches[i][0].length;
        }
        // Add any remaining content after the last processed @layer base block
        resultBuilder.push(newGlobalsCssContent.substring(currentPos));
        newGlobalsCssContent = resultBuilder.join("");
      }

      // Regex to match the dark mode root block
      const darkModeRootRegex =
        /@media\s*\(prefers-color-scheme:\s*dark\)\s*\{\s*:root\s*\{[\s\S]*?\}\s*\}/g;
      newGlobalsCssContent = newGlobalsCssContent.replace(
        darkModeRootRegex,
        ""
      );

      if (globalsCssContent !== newGlobalsCssContent) {
        fs.writeFileSync(globalsCssPath, newGlobalsCssContent, "utf-8");
        console.log(
          chalk.blue(
            "Removed '* { @apply border-border outline-ring/50; }' and '@import \"tw-animate-css\";' from globals.css."
          )
        );
      } else {
        console.log(
          chalk.blue(
            "No '* { @apply border-border outline-ring/50; }' block or '@import \"tw-animate-css\";' found in globals.css."
          )
        );
      }
    });
}
