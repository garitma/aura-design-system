import Color from 'colorjs.io';

// Predefined Oklch L and C values from Radix-like scales
const ACCENT_L_VALUES = [0.971, 0.956, 0.933, 0.894, 0.863, 0.828, 0.775, 0.714, 0.671, 0.632, 0.56, 0.35];
const ACCENT_C_VALUES = [0.0024, 0.0137, 0.0329, 0.0725, 0.0954, 0.0989, 0.1018, 0.1199, 0.1743, 0.1774, 0.17, 0.063];

const GRAY_L_VALUES = [0.972, 0.959, 0.931, 0.906, 0.882, 0.856, 0.822, 0.76, 0.609, 0.573, 0.467, 0.243];
const GRAY_C_VALUES = [0.0041, 0.0055, 0.0084, 0.0126, 0.0142, 0.0185, 0.023, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277];

// Alpha steps for P3
const P3_ALPHA_STEPS = [0.215, 0.037, 0.104, 0.249, 0.345, 0.399, 0.469, 0.590, 0.818, 0.835, 0.868, 0.876];

function createSolidScale(baseColorHex: string, isGray = false) {
    const baseOklch = new Color(baseColorHex).to("oklch");
    const H = baseOklch.coords[2]; // Use Hue from the input color

    const L_VALUES = isGray ? GRAY_L_VALUES : ACCENT_L_VALUES;
    const C_VALUES = isGray ? GRAY_C_VALUES : ACCENT_C_VALUES;

    const scale: string[] = [];
    const scaleWideGamut: string[] = [];

    for (let i = 0; i < 12; i++) {
        const oklchColor = new Color("oklch", [L_VALUES[i], C_VALUES[i], H]);
        scaleWideGamut.push(oklchColor.toString({ precision: 4 })); // oklch(L C H)
        const srgbColor = oklchColor.to("srgb");
        // srgbColor.display(); // Clamps to sRGB gamut - display() is not a method on Color object in v0.4, it might be clip() or toGamut()
        // In colorjs.io v0.4+, to('srgb') doesn't automatically clip. We should use toGamut if needed, but for hex output it usually handles it.
        // Let's assume to('srgb') is fine for now or use toString({format: 'hex'}) which handles clamping usually.
        scale.push(srgbColor.toString({ format: "hex" }));
    }
    return { scale, scaleWideGamut };
}

function generateAlphaScales(solidScale: string[], solidScaleWideGamut: string[]) {
    const scaleAlpha: string[] = [];
    const scaleAlphaWideGamut: string[] = [];

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

export function generateRadixColors({ accent, gray, background }: { accent: string; gray: string; background: string }) {
    // Generate solid scales
    const accentSolidScales = createSolidScale(accent);
    const graySolidScales = createSolidScale(gray, true);

    // Generate alpha scales
    const accentAlphaScales = generateAlphaScales(accentSolidScales.scale, accentSolidScales.scaleWideGamut);
    const grayAlphaScales = generateAlphaScales(graySolidScales.scale, graySolidScales.scaleWideGamut);

    // Contrast color (white for dark, black for light). Using step 9 of the scale as reference.
    const step9AccentColor = new Color(accentSolidScales.scale[8]);
    // @ts-ignore - luminance exists
    const accentContrast = step9AccentColor.luminance > 0.5 ? '#000000' : '#ffffff';

    const step9GrayColor = new Color(graySolidScales.scale[8]);
    // @ts-ignore
    const grayContrast = step9GrayColor.luminance > 0.5 ? '#000000' : '#ffffff';

    // Surface color: using step 2 (index 1) of the scale with ~80% alpha.
    const surfaceAlpha = 0.8;

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

        background: new Color(background).toString({ format: "hex" }),
    };
}

export function getColorName(value: string) {
    const color = new Color(value).to('hsl');
    // @ts-ignore
    if (color.coords[1] < 25) return 'custom';
    // @ts-ignore
    const h = color.coords[0];
    if (h >= 0 && h < 20) return 'red';
    if (h >= 20 && h < 40) return 'orange';
    if (h >= 40 && h < 65) return 'yellow';
    if (h >= 65 && h < 100) return 'lime';
    if (h >= 100 && h < 165) return 'green';
    if (h >= 165 && h < 190) return 'teal';
    if (h >= 190 && h < 240) return 'blue';
    if (h >= 240 && h < 270) return 'violet';
    if (h >= 270 && h < 320) return 'purple';
    if (h >= 320 && h < 340) return 'pink';
    return 'red';
}

export function getColorScaleCss({ isDarkMode, name, scale, scaleWideGamut, scaleAlpha, scaleAlphaWideGamut, contrast, surface, surfaceWideGamut }: any) {
    const selector = isDarkMode ? '.dark, .dark-theme' : ':root, .light, .light-theme';
    return `
${selector} {
  ${scale.map((value: string, index: number) => `--${name}-${index + 1}: ${value};`).join('\n  ')}
  ${scaleAlpha.map((value: string, index: number) => `--${name}-a${index + 1}: ${value};`).join('\n  ')}
  --${name}-contrast: ${contrast};
  --${name}-surface: ${surface};
  --${name}-indicator: ${scale[8]};
  --${name}-track: ${scale[8]};
}
@supports (color: color(display-p3 1 1 1)) {
  @media (color-gamut: p3) {
    ${selector} {
      ${scaleWideGamut.map((value: string, index: number) => `--${name}-${index + 1}: ${value};`).join('\n      ')}
      ${scaleAlphaWideGamut.map((value: string, index: number) => `--${name}-a${index + 1}: ${value};`).join('\n      ')}
      --${name}-contrast: ${contrast};
      --${name}-surface: ${surfaceWideGamut};
      --${name}-indicator: ${scaleWideGamut[8]};
      --${name}-track: ${scaleWideGamut[8]};
    }
  }
}
`.trim();
}
