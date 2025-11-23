import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import { Command } from 'commander';
import Color from 'colorjs.io';
import { generateRadixColors } from '../utils/color-utils.js';

function getColorName(value) {
  const color = new Color(value).to('hsl');
  if (color.coords[1] < 25) return 'custom';
  if (color.coords[0] >= 0 && color.coords[0] < 20) return 'red';
  if (color.coords[0] >= 20 && color.coords[0] < 40) return 'orange';
  if (color.coords[0] >= 40 && color.coords[0] < 65) return 'yellow';
  if (color.coords[0] >= 65 && color.coords[0] < 100) return 'lime';
  if (color.coords[0] >= 100 && color.coords[0] < 165) return 'green';
  if (color.coords[0] >= 165 && color.coords[0] < 190) return 'teal';
  if (color.coords[0] >= 190 && color.coords[0] < 240) return 'blue';
  if (color.coords[0] >= 240 && color.coords[0] < 270) return 'violet';
  if (color.coords[0] >= 270 && color.coords[0] < 320) return 'purple';
  if (color.coords[0] >= 320 && color.coords[0] < 340) return 'pink';
  return 'red';
}

function getColorScaleCss({ isDarkMode, name, scale, scaleWideGamut, scaleAlpha, scaleAlphaWideGamut, contrast, surface, surfaceWideGamut }) {
  const selector = isDarkMode ? '.dark, .dark-theme' : ':root, .light, .light-theme';
  return `
${selector} {
  ${scale.map((value, index) => `--${name}-${index + 1}: ${value};`).join('\n  ')}
  ${scaleAlpha.map((value, index) => `--${name}-a${index + 1}: ${value};`).join('\n  ')}
  --${name}-contrast: ${contrast};
  --${name}-surface: ${surface};
  --${name}-indicator: ${scale[8]};
  --${name}-track: ${scale[8]};
}
@supports (color: color(display-p3 1 1 1)) {
  @media (color-gamut: p3) {
    ${selector} {
      ${scaleWideGamut.map((value, index) => `--${name}-${index + 1}: ${value};`).join('\n      ')}
      ${scaleAlphaWideGamut.map((value, index) => `--${name}-a${index + 1}: ${value};`).join('\n      ')}
      --${name}-contrast: ${contrast};
      --${name}-surface: ${surfaceWideGamut};
      --${name}-indicator: ${scaleWideGamut[8]};
      --${name}-track: ${scaleWideGamut[8]};
    }
  }
}
`.trim();
}

function getBackgroundColorCss({ isDarkMode, background }) {
  if (isDarkMode) {
    return `
.dark, .dark-theme, :is(.dark, .dark-theme) :where(.radix-themes:not(.light, .light-theme)) {
  --color-background: ${background};
}`.trim();
  }
  return `
:root, .light, .light-theme, .radix-themes {
  --color-background: ${background};
}`.trim();
}

export function registerColorsCommand(program: Command) {
  program
    .command('colors')
    .description('Generate Aura custom color CSS files')
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
      // Generate color scales
      const colors = generateRadixColors({ appearance: 'light', accent, gray, background });
      // Write accent.css
      const accentCss = getColorScaleCss({
        isDarkMode: false,
        name: getColorName(accent),
        scale: colors.accentScale,
        scaleWideGamut: colors.accentScaleWideGamut,
        scaleAlpha: colors.accentScaleAlpha,
        scaleAlphaWideGamut: colors.accentScaleAlphaWideGamut,
        contrast: colors.accentContrast,
        surface: colors.accentSurface,
        surfaceWideGamut: colors.accentSurfaceWideGamut,
      });
      fs.writeFileSync(path.join(process.cwd(), 'accent.css'), accentCss, 'utf-8');
      // Write gray.css
      const grayCss = getColorScaleCss({
        isDarkMode: false,
        name: 'gray',
        scale: colors.grayScale,
        scaleWideGamut: colors.grayScaleWideGamut,
        scaleAlpha: colors.grayScaleAlpha,
        scaleAlphaWideGamut: colors.grayScaleAlphaWideGamut,
        contrast: colors.accentContrast, // Use accent contrast for gray as well
        surface: colors.graySurface,
        surfaceWideGamut: colors.graySurfaceWideGamut,
      });
      fs.writeFileSync(path.join(process.cwd(), 'gray.css'), grayCss, 'utf-8');
      // Write background.css
      const backgroundCss = getBackgroundColorCss({
        isDarkMode: false,
        background: colors.background,
      });
      fs.writeFileSync(path.join(process.cwd(), 'background.css'), backgroundCss, 'utf-8');
      console.log('Generated accent.css, gray.css, and background.css in the current folder.');
    });
}