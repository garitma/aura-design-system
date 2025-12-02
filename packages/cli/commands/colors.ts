import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import { Command } from 'commander';
import { existsSync } from 'fs';
import { generateRadixColors } from '../utils/color-utils.js';

export function generateGlobalsCss(lightColors: any, darkColors: any) {
  return `@import "tailwindcss";

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
  --accent-1: ${lightColors.accentScale[0]};
  --accent-2: ${lightColors.accentScale[1]};
  --accent-3: ${lightColors.accentScale[2]};
  --accent-4: ${lightColors.accentScale[3]};
  --accent-5: ${lightColors.accentScale[4]};
  --accent-6: ${lightColors.accentScale[5]};
  --accent-7: ${lightColors.accentScale[6]};
  --accent-8: ${lightColors.accentScale[7]};
  --accent-9: ${lightColors.accentScale[8]};
  --accent-10: ${lightColors.accentScale[9]};
  --accent-11: ${lightColors.accentScale[10]};
  --accent-12: ${lightColors.accentScale[11]};

  --accent-a1: ${lightColors.accentScaleAlpha[0]};
  --accent-a2: ${lightColors.accentScaleAlpha[1]};
  --accent-a3: ${lightColors.accentScaleAlpha[2]};
  --accent-a4: ${lightColors.accentScaleAlpha[3]};
  --accent-a5: ${lightColors.accentScaleAlpha[4]};
  --accent-a6: ${lightColors.accentScaleAlpha[5]};
  --accent-a7: ${lightColors.accentScaleAlpha[6]};
  --accent-a8: ${lightColors.accentScaleAlpha[7]};
  --accent-a9: ${lightColors.accentScaleAlpha[8]};
  --accent-a10: ${lightColors.accentScaleAlpha[9]};
  --accent-a11: ${lightColors.accentScaleAlpha[10]};
  --accent-a12: ${lightColors.accentScaleAlpha[11]};

  --accent-contrast: ${lightColors.accentContrast};
  --accent-surface: ${lightColors.accentSurface};
  --accent-indicator: ${lightColors.accentScale[8]};
  --accent-track: ${lightColors.accentScale[8]};

  /* Gray color scale */
  --gray-1: ${lightColors.grayScale[0]};
  --gray-2: ${lightColors.grayScale[1]};
  --gray-3: ${lightColors.grayScale[2]};
  --gray-4: ${lightColors.grayScale[3]};
  --gray-5: ${lightColors.grayScale[4]};
  --gray-6: ${lightColors.grayScale[5]};
  --gray-7: ${lightColors.grayScale[6]};
  --gray-8: ${lightColors.grayScale[7]};
  --gray-9: ${lightColors.grayScale[8]};
  --gray-10: ${lightColors.grayScale[9]};
  --gray-11: ${lightColors.grayScale[10]};
  --gray-12: ${lightColors.grayScale[11]};

  --gray-a1: ${lightColors.grayScaleAlpha[0]};
  --gray-a2: ${lightColors.grayScaleAlpha[1]};
  --gray-a3: ${lightColors.grayScaleAlpha[2]};
  --gray-a4: ${lightColors.grayScaleAlpha[3]};
  --gray-a5: ${lightColors.grayScaleAlpha[4]};
  --gray-a6: ${lightColors.grayScaleAlpha[5]};
  --gray-a7: ${lightColors.grayScaleAlpha[6]};
  --gray-a8: ${lightColors.grayScaleAlpha[7]};
  --gray-a9: ${lightColors.grayScaleAlpha[8]};
  --gray-a10: ${lightColors.grayScaleAlpha[9]};
  --gray-a11: ${lightColors.grayScaleAlpha[10]};
  --gray-a12: ${lightColors.grayScaleAlpha[11]};

  --gray-contrast: ${lightColors.grayContrast || '#ffffff'};
  --gray-surface: ${lightColors.graySurface};
  --gray-indicator: ${lightColors.grayScale[8]};
  --gray-track: ${lightColors.grayScale[8]};

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
    --accent-1: ${darkColors.accentScale[0]};
    --accent-2: ${darkColors.accentScale[1]};
    --accent-3: ${darkColors.accentScale[2]};
    --accent-4: ${darkColors.accentScale[3]};
    --accent-5: ${darkColors.accentScale[4]};
    --accent-6: ${darkColors.accentScale[5]};
    --accent-7: ${darkColors.accentScale[6]};
    --accent-8: ${darkColors.accentScale[7]};
    --accent-9: ${darkColors.accentScale[8]};
    --accent-10: ${darkColors.accentScale[9]};
    --accent-11: ${darkColors.accentScale[10]};
    --accent-12: ${darkColors.accentScale[11]};

    --accent-a1: ${darkColors.accentScaleAlpha[0]};
    --accent-a2: ${darkColors.accentScaleAlpha[1]};
    --accent-a3: ${darkColors.accentScaleAlpha[2]};
    --accent-a4: ${darkColors.accentScaleAlpha[3]};
    --accent-a5: ${darkColors.accentScaleAlpha[4]};
    --accent-a6: ${darkColors.accentScaleAlpha[5]};
    --accent-a7: ${darkColors.accentScaleAlpha[6]};
    --accent-a8: ${darkColors.accentScaleAlpha[7]};
    --accent-a9: ${darkColors.accentScaleAlpha[8]};
    --accent-a10: ${darkColors.accentScaleAlpha[9]};
    --accent-a11: ${darkColors.accentScaleAlpha[10]};
    --accent-a12: ${darkColors.accentScaleAlpha[11]};

    --accent-contrast: ${darkColors.accentContrast};
    --accent-surface: ${darkColors.accentSurface};
    --accent-indicator: ${darkColors.accentScale[8]};
    --accent-track: ${darkColors.accentScale[8]};

    /* Gray color scale */
    --gray-1: ${darkColors.grayScale[0]};
    --gray-2: ${darkColors.grayScale[1]};
    --gray-3: ${darkColors.grayScale[2]};
    --gray-4: ${darkColors.grayScale[3]};
    --gray-5: ${darkColors.grayScale[4]};
    --gray-6: ${darkColors.grayScale[5]};
    --gray-7: ${darkColors.grayScale[6]};
    --gray-8: ${darkColors.grayScale[7]};
    --gray-9: ${darkColors.grayScale[8]};
    --gray-10: ${darkColors.grayScale[9]};
    --gray-11: ${darkColors.grayScale[10]};
    --gray-12: ${darkColors.grayScale[11]};

    --gray-a1: ${darkColors.grayScaleAlpha[0]};
    --gray-a2: ${darkColors.grayScaleAlpha[1]};
    --gray-a3: ${darkColors.grayScaleAlpha[2]};
    --gray-a4: ${darkColors.grayScaleAlpha[3]};
    --gray-a5: ${darkColors.grayScaleAlpha[4]};
    --gray-a6: ${darkColors.grayScaleAlpha[5]};
    --gray-a7: ${darkColors.grayScaleAlpha[6]};
    --gray-a8: ${darkColors.grayScaleAlpha[7]};
    --gray-a9: ${darkColors.grayScaleAlpha[8]};
    --gray-a10: ${darkColors.grayScaleAlpha[9]};
    --gray-a11: ${darkColors.grayScaleAlpha[10]};
    --gray-a12: ${darkColors.grayScaleAlpha[11]};

    --gray-contrast: ${darkColors.grayContrast || '#ffffff'};
    --gray-surface: ${darkColors.graySurface};
    --gray-indicator: ${darkColors.grayScale[8]};
    --gray-track: ${darkColors.grayScale[8]};
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
}

function findGlobalsCssPath(projectDir: string): string {
  const possiblePaths = [
    path.join(projectDir, "app/globals.css"),
    path.join(projectDir, "src/app/globals.css"),
    path.join(projectDir, "styles/globals.css"),
    path.join(projectDir, "src/styles/globals.css"),
  ];

  const existingPath = possiblePaths.find((p) => existsSync(p));
  return existingPath || path.join(projectDir, "app/globals.css");
}

export function registerColorsCommand(program: Command) {
  program
    .command('colors')
    .description('Generate Aura custom colors and overwrite globals.css')
    .option('--accent <hex>', 'Accent color (hex)')
    .option('--gray <hex>', 'Gray color (hex)')
    .option('--background <hex>', 'Background color (hex)')
    .action(async (options) => {
      let { accent, gray, background } = options;
      
      if (!accent || !gray || !background) {
        const answers = await inquirer.prompt([
          {
            type: 'input',
            name: 'accent',
            message: 'Accent color (hex):',
            validate: (input) => /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(input) || 'Enter a valid hex color',
            when: () => !accent,
          },
          {
            type: 'input',
            name: 'gray',
            message: 'Gray color (hex):',
            validate: (input) => /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(input) || 'Enter a valid hex color',
            when: () => !gray,
          },
          {
            type: 'input',
            name: 'background',
            message: 'Background color (hex):',
            validate: (input) => /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(input) || 'Enter a valid hex color',
            when: () => !background,
          },
        ]);
        accent = accent || answers.accent;
        gray = gray || answers.gray;
        background = background || answers.background;
      }

      // Generate color scales for light mode
      const lightColors = generateRadixColors({ 
        appearance: 'light', 
        accent, 
        gray, 
        background 
      });

      // Generate color scales for dark mode
      const darkColors = generateRadixColors({ 
        appearance: 'dark', 
        accent, 
        gray, 
        background 
      });

      // Generate the full globals.css content
      const globalsCss = generateGlobalsCss(lightColors, darkColors);

      // Find and write to globals.css
      const projectDir = process.cwd();
      const globalsPath = findGlobalsCssPath(projectDir);

      fs.writeFileSync(globalsPath, globalsCss.trim() + "\n", 'utf-8');
      
      console.log(`\n✓ globals.css has been updated with your custom Aura Design System colors`);
      console.log(`  Accent: ${accent}`);
      console.log(`  Gray: ${gray}`);
      console.log(`  Background: ${background}`);
      console.log(`\n  File: ${globalsPath}`);
    });
}
