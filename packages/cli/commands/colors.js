import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import Color from 'colorjs.io';

// --- BEGIN: Color logic from custom.tsx ---

// Predefined Oklch L and C values from Radix-like scales (e.g., similar to your orange and gray examples)
// These are absolute LCH values; Hue (H) will be adapted from the input color.
const ACCENT_L_VALUES = [0.971, 0.956, 0.933, 0.894, 0.863, 0.828, 0.775, 0.714, 0.671, 0.632, 0.56, 0.35];
const ACCENT_C_VALUES = [0.0024, 0.0137, 0.0329, 0.0725, 0.0954, 0.0989, 0.1018, 0.1199, 0.1743, 0.1774, 0.17, 0.063];

const GRAY_L_VALUES = [0.972, 0.959, 0.931, 0.906, 0.882, 0.856, 0.822, 0.76, 0.609, 0.573, 0.467, 0.243];
const GRAY_C_VALUES = [0.0041, 0.0055, 0.0084, 0.0126, 0.0142, 0.0185, 0.023, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277];

// Alpha steps for P3, inspired by your accent.css example
const P3_ALPHA_STEPS = [0.215, 0.037, 0.104, 0.249, 0.345, 0.399, 0.469, 0.590, 0.818, 0.835, 0.868, 0.876];

function createSolidScale(baseColorHex, isGray = false) {
  const baseOklch = new Color(baseColorHex).to("oklch");
  const H = baseOklch.coords[2]; // Use Hue from the input color

  const L_VALUES = isGray ? GRAY_L_VALUES : ACCENT_L_VALUES;
  const C_VALUES = isGray ? GRAY_C_VALUES : ACCENT_C_VALUES;

  const scale = [];
  const scaleWideGamut = [];

  for (let i = 0; i < 12; i++) {
    const oklchColor = new Color("oklch", [L_VALUES[i], C_VALUES[i], H]);
    scaleWideGamut.push(oklchColor.toString({ precision: 4 })); // oklch(L C H)
    const srgbColor = oklchColor.to("srgb");
    srgbColor.display(); // Clamps to sRGB gamut
    scale.push(srgbColor.toString({ format: "hex" }));
  }
  return { scale, scaleWideGamut };
}

function generateAlphaScales(solidScale, solidScaleWideGamut) {
  const scaleAlpha = [];
  const scaleAlphaWideGamut = [];

  for (let i = 0; i < 12; i++) {
    const baseColorSrgb = new Color(solidScale[i]);
    // solidScaleWideGamut contains oklch strings, convert to P3 for alpha version
    const baseColorP3 = new Color(solidScaleWideGamut[i]).to("p3");

    const alpha = P3_ALPHA_STEPS[i];

    const srgbWithAlpha = baseColorSrgb.clone();
    srgbWithAlpha.alpha = alpha;
    scaleAlpha.push(srgbWithAlpha.toString({ format: "hex" })); // #RRGGBBAA

    const p3WithAlpha = baseColorP3.clone();
    p3WithAlpha.alpha = alpha;
    scaleAlphaWideGamut.push(p3WithAlpha.toString({ format: "p3", precision: 4 })); // color(display-p3 R G B / A)
  }
  return { scaleAlpha, scaleAlphaWideGamut };
}

function generateRadixColors({ appearance, accent, gray, background }) {
  const accentColorObj = new Color(accent);
  const grayColorObj = new Color(gray);
  const backgroundColorObj = new Color(background);

  // Generate solid scales
  const accentSolidScales = createSolidScale(accent);
  const graySolidScales = createSolidScale(gray, true);

  // Generate alpha scales
  const accentAlphaScales = generateAlphaScales(accentSolidScales.scale, accentSolidScales.scaleWideGamut);
  const grayAlphaScales = generateAlphaScales(graySolidScales.scale, graySolidScales.scaleWideGamut);

  // Contrast color (white for dark, black for light). Using step 9 of the scale as reference.
  const step9AccentColor = new Color(accentSolidScales.scale[8]);
  const accentContrast = step9AccentColor.luminance > 0.5 ? '#000000' : '#ffffff';

  const step9GrayColor = new Color(graySolidScales.scale[8]);
  const grayContrast = step9GrayColor.luminance > 0.5 ? '#000000' : '#ffffff';

  // Surface color: using step 2 (index 1) of the scale with ~80% alpha.
  const surfaceAlpha = 0.8; // Example: Radix uses 80% for some surfaces
  
  const accentSurfaceSrgbBase = new Color(accentSolidScales.scale[1]);
  accentSurfaceSrgbBase.alpha = surfaceAlpha;
  const accentSurfaceSrgb = accentSurfaceSrgbBase.toString({ format: "hex" });

  const accentSurfaceP3Base = new Color(accentSolidScales.scaleWideGamut[1]).to("p3");
  accentSurfaceP3Base.alpha = surfaceAlpha;
  const accentSurfaceP3 = accentSurfaceP3Base.toString({ format: "p3", precision: 4 });

  const graySurfaceSrgbBase = new Color(graySolidScales.scale[1]);
  graySurfaceSrgbBase.alpha = surfaceAlpha;
  const graySurfaceSrgb = graySurfaceSrgbBase.toString({ format: "hex" });

  const graySurfaceP3Base = new Color(graySolidScales.scaleWideGamut[1]).to("p3");
  graySurfaceP3Base.alpha = surfaceAlpha;
  const graySurfaceP3 = graySurfaceP3Base.toString({ format: "p3", precision: 4 });

  return {
    accentScale: accentSolidScales.scale,
    accentScaleWideGamut: accentSolidScales.scaleWideGamut,
    accentScaleAlpha: accentAlphaScales.scaleAlpha,
    accentScaleAlphaWideGamut: accentAlphaScales.scaleAlphaWideGamut,
    accentContrast: accentContrast,
    accentSurface: accentSurfaceSrgb,
    accentSurfaceWideGamut: accentSurfaceP3,

    grayScale: graySolidScales.scale,
    grayScaleWideGamut: graySolidScales.scaleWideGamut,
    grayScaleAlpha: grayAlphaScales.scaleAlpha,
    grayScaleAlphaWideGamut: grayAlphaScales.scaleAlphaWideGamut,
    grayContrast: grayContrast,
    graySurface: graySurfaceSrgb,
    graySurfaceWideGamut: graySurfaceP3,

    background: backgroundColorObj.toString({ format: "hex" }),
  };
}

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

export function registerColorsCommand(program) {
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
        contrast: colors.grayContrast,
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
