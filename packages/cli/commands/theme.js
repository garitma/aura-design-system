import fs from 'fs';
import path from 'path';
import { Command } from 'commander';

function parseCssVars(css) {
  // Extracts --var: value; pairs from CSS and returns an object
  const vars = {};
  const varRegex = /--([\w-]+):\s*([^;]+);/g;
  let match;
  while ((match = varRegex.exec(css))) {
    vars[match[1]] = match[2].trim();
  }
  return vars;
}

function renameAccentVars(vars, fileName) {
  // If the file is accent.css, rename all keys to use 'accent' as prefix
  // If not, keep the prefix from the file name (e.g., orange.css -> orange-1)
  if (fileName === 'accent.css') {
    const newVars = {};
    for (const key in vars) {
      // Replace the prefix before the first dash with 'accent'
      const newKey = key.replace(/^([^-]+)/, 'accent');
      newVars[newKey] = vars[key];
    }
    return newVars;
  }
  return vars;
}

export function registerThemeCommand(program) {
  const themesCommand = program
    .command('themes')
    .description('Theme utilities for Aura Design System');

  themesCommand
    .command('generate')
    .description('Generate a theme.json from accent.css, gray.css, and background.css')
    .option('--output <file>', 'Output file name', 'theme.json')
    .option('--accent <file>', 'Accent CSS file name', 'accent.css')
    .option('--gray <file>', 'Gray CSS file name', 'gray.css')
    .option('--background <file>', 'Background CSS file name', 'background.css')
    .action(async (options) => {
      const cwd = process.cwd();
      const accentFile = options.accent || 'accent.css';
      const grayFile = options.gray || 'gray.css';
      const backgroundFile = options.background || 'background.css';
      const accentPath = path.join(cwd, accentFile);
      const grayPath = path.join(cwd, grayFile);
      const backgroundPath = path.join(cwd, backgroundFile);
      if (!fs.existsSync(accentPath) || !fs.existsSync(grayPath) || !fs.existsSync(backgroundPath)) {
        console.error(`${accentFile}, ${grayFile}, or ${backgroundFile} not found in current directory.`);
        process.exit(1);
      }
      const accentCss = fs.readFileSync(accentPath, 'utf-8');
      const grayCss = fs.readFileSync(grayPath, 'utf-8');
      const backgroundCss = fs.readFileSync(backgroundPath, 'utf-8');
      let accentVars = parseCssVars(accentCss);
      accentVars = renameAccentVars(accentVars, path.basename(accentFile));
      const grayVars = parseCssVars(grayCss);
      const backgroundVars = parseCssVars(backgroundCss);
      // Merge all vars
      const cssVars = { ...accentVars, ...grayVars, ...backgroundVars };
      // Compose theme JSON
      const theme = {
        "$schema": "https://auradesignsystem.com/schema/registry-item.json",
        "name": "custom-theme",
        "type": "registry:theme",
        "cssVars": {
          "light": cssVars
        }
      };
      fs.writeFileSync(path.join(cwd, options.output), JSON.stringify(theme, null, 2), 'utf-8');
      console.log(`Theme JSON generated as ${options.output}`);
    });
}
