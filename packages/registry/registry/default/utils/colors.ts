import Color from 'colorjs.io';

// Alpha steps for P3
const P3_ALPHA_STEPS = [0.215, 0.037, 0.104, 0.249, 0.345, 0.399, 0.469, 0.590, 0.818, 0.835, 0.868, 0.876];

function createSolidScale(baseColorHex: string, isGray = false) {
    const baseOklch = new Color(baseColorHex).to("oklch");
    const baseL = baseOklch.coords[0]; // Lightness from input
    const baseC = baseOklch.coords[1]; // Chroma from input
    const H = baseOklch.coords[2]; // Hue from input

    const scale: string[] = [];
    const scaleWideGamut: string[] = [];

    if (isGray) {
        // Gray scale: step 9 is the base color
        const lightnessSteps = [0.48, 0.42, 0.32, 0.26, 0.20, 0.14, 0.08, 0.04, 0, -0.02, -0.10, -0.33];
        const chromaSteps = [-0.015, -0.013, -0.011, -0.009, -0.007, -0.005, -0.003, -0.001, 0, 0.001, 0.003, 0.006];

        for (let i = 0; i < 12; i++) {
            let L = baseL + lightnessSteps[i];
            let C = Math.max(0, baseC + chromaSteps[i]);
            L = Math.max(0, Math.min(1, L));
            
            const oklchColor = new Color("oklch", [L, C, H]);
            scaleWideGamut.push(oklchColor.toString({ precision: 4 }));
            const srgbColor = oklchColor.to("srgb");
            scale.push(srgbColor.toString({ format: "hex" }));
        }
    } else {
        // Accent scale: step 9 is the base color
        // For lighter colors (1-8), we need much higher lightness and MUCH higher chroma
        const lightnessSteps = [0.67, 0.62, 0.54, 0.46, 0.38, 0.30, 0.22, 0.13, 0, 0.03, 0.08, -0.25];
        const chromaMultipliers = [0.20, 0.35, 0.50, 0.70, 0.90, 1.15, 1.40, 1.70, 1.0, 1.10, 1.25, 0.80];

        for (let i = 0; i < 12; i++) {
            let L = baseL + lightnessSteps[i];
            let C = baseC * chromaMultipliers[i];
            L = Math.max(0, Math.min(1, L));
            C = Math.max(0, C);
            
            const oklchColor = new Color("oklch", [L, C, H]);
            scaleWideGamut.push(oklchColor.toString({ precision: 4 }));
            const srgbColor = oklchColor.to("srgb");
            scale.push(srgbColor.toString({ format: "hex" }));
        }
    }
    
    return { scale, scaleWideGamut };
}

function generateAlphaScales(solidScale: string[], solidScaleWideGamut: string[]) {
    const scaleAlpha: string[] = [];
    const scaleAlphaWideGamut: string[] = [];

    for (let i = 0; i < 12; i++) {
        const baseColorSrgb = new Color(solidScale[i]);
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
