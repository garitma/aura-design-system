import { Command } from "commander";
import fs from "fs";
import path from "path";
import chalk from "chalk";

export function registerCssCommand(program) {
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
      const mainAuraImportRegex = /@import\s+['\"]@aura-design\/system\/main.css['\"];\s*/;
      const auraImportMatch = mainAuraImportRegex.exec(layerBaseContent);
      let auraImport = auraImportMatch ? auraImportMatch[0] : null;

      // Remove all style imports from everywhere
      const styleImportRegex = /@import\s+['\"]\.\/styles\/[\w\-]+\.css['\"];\s*/g;
      beforeLayerBase = beforeLayerBase.replace(styleImportRegex, "");
      afterLayerBase = afterLayerBase.replace(styleImportRegex, "");
      layerBaseContent = layerBaseContent.replace(styleImportRegex, "");

      // Prepare new imports
      const newImports = styleFiles.map(
        (file) => `@import './styles/${file}';`
      );

      // Insert imports after aura import if present, else at the top
      let newLayerBaseContent = layerBaseContent;
      if (auraImport) {
        // Remove aura import from layerBaseContent
        newLayerBaseContent = newLayerBaseContent.replace(mainAuraImportRegex, "");
        newLayerBaseContent = `${auraImport}\n${newImports.join("\n")}\n${newLayerBaseContent.trim()}`;
      } else {
        newLayerBaseContent = `${newImports.join("\n")}\n${newLayerBaseContent.trim()}`;
      }

      // Rebuild globals.css
      const newGlobalsCssContent = `${beforeLayerBase}@layer base {\n${newLayerBaseContent}\n}${afterLayerBase}`;

      fs.writeFileSync(globalsCssPath, newGlobalsCssContent, "utf-8");
      console.log(chalk.blue("globals.css updated: all style imports are now inside @layer base after the main aura import."));
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
      const mainAuraImportRegex = /@import\s+['\"]@aura-design\/system\/main.css['\"];\s*/g;
      beforeLayerBase = beforeLayerBase.replace(mainAuraImportRegex, "");
      afterLayerBase = afterLayerBase.replace(mainAuraImportRegex, "");
      layerBaseContent = layerBaseContent.replace(mainAuraImportRegex, "");

      // Insert main aura import at the top of @layer base
      let newLayerBaseContent = `@import "@aura-design/system/main.css";\n${layerBaseContent.trim()}`;

      // Rebuild globals.css
      const newGlobalsCssContent = `${beforeLayerBase}@layer base {\n${newLayerBaseContent}\n}${afterLayerBase}`;

      fs.writeFileSync(globalsCssPath, newGlobalsCssContent, "utf-8");
      console.log(chalk.blue("globals.css updated: @import '@aura-design/system/main.css'; is now at the top of @layer base."));
    });
}
