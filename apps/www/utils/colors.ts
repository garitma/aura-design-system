import * as RadixColors from "@radix-ui/colors";
import Color from "colorjs.io";
import BezierEasing from "bezier-easing";

type ArrayOf12<T> = [T, T, T, T, T, T, T, T, T, T, T, T];
const arrayOf12 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;

const grayScaleNames = ['gray', 'mauve', 'slate', 'sage', 'olive', 'sand'] as const;

const scaleNames = [...grayScaleNames, 'tomato', 'red', 'ruby', 'crimson', 'pink',
  'plum', 'purple', 'violet', 'iris', 'indigo', 'blue', 'cyan', 'teal', 'jade', 'green',
  'grass', 'brown', 'orange', 'sky', 'mint', 'lime', 'yellow', 'amber'] as const;

const lightColors = Object.fromEntries(
  scaleNames.map((scaleName) => [
    scaleName,
    Object.values(RadixColors[`${scaleName}P3`]).map((str) =>
      new Color(str).to("oklch"),
    ),
  ]),
) as Record<(typeof scaleNames)[number], ArrayOf12<Color>>;

const darkColors = Object.fromEntries(
  scaleNames.map((scaleName) => [
    scaleName,
    Object.values(RadixColors[`${scaleName}DarkP3`]).map((str) =>
      new Color(str).to("oklch"),
    ),
  ]),
) as Record<(typeof scaleNames)[number], ArrayOf12<Color>>;

const lightGrayColors = Object.fromEntries(
  grayScaleNames.map((scaleName) => [
    scaleName,
    Object.values(RadixColors[`${scaleName}P3`]).map((str) =>
      new Color(str).to("oklch"),
    ),
  ]),
) as Record<(typeof grayScaleNames)[number], ArrayOf12<Color>>;

const darkGrayColors = Object.fromEntries(
  grayScaleNames.map((scaleName) => [
    scaleName,
    Object.values(RadixColors[`${scaleName}DarkP3`]).map((str) =>
      new Color(str).to("oklch"),
    ),
  ]),
) as Record<(typeof grayScaleNames)[number], ArrayOf12<Color>>;

const darkModeEasing = [1, 0, 1, 0] as [number, number, number, number];
const lightModeEasing = [0, 2, 0, 2] as [number, number, number, number];

/**
 * MAIN FUNCTION: Generates a complete Radix-style color system from 3 input colors
 * 
 * @param appearance - "light" or "dark" mode
 * @param accent - Hex color for accent (e.g., "#3D63DD")
 * @param gray - Hex color for gray scale (e.g., "#8B8D98")
 * @param background - Hex color for background (e.g., "#FFFFFF" or "#111111")
 * @returns Object with 12-step scales in multiple formats (hex, wide gamut, alpha)
 */
export const generateRadixColors = ({
  appearance,
  ...args
}: {
  appearance: "light" | "dark";
  accent: string;
  gray: string;
  background: string;
}) => {
  const allScales = appearance === "light" ? lightColors : darkColors;
  const grayScales = appearance === "light" ? lightGrayColors : darkGrayColors;
  const backgroundColor = new Color(args.background).to("oklch");

  // Generate gray scale
  const grayBaseColor = new Color(args.gray).to("oklch");
  const grayScaleColors = getScaleFromColor(
    grayBaseColor,
    grayScales,
    backgroundColor,
  );

  // Generate accent scale
  const accentBaseColor = new Color(args.accent).to("oklch");

  let accentScaleColors = getScaleFromColor(
    accentBaseColor,
    allScales,
    backgroundColor,
  );

  // Enforce srgb for the background color
  const backgroundHex = backgroundColor.to("srgb").toString({ format: "hex" });

  // Handle pure white or black accent colors
  const accentBaseHex = accentBaseColor.to("srgb").toString({ format: "hex" });
  if (accentBaseHex === "#000" || accentBaseHex === "#fff") {
    accentScaleColors = grayScaleColors.map((color) =>
      color.clone(),
    ) as ArrayOf12<Color>;
  }

  // Get step 9 (primary button color) and contrast color
  const [accent9Color, accentContrastColor] = getStep9Colors(
    accentScaleColors,
    accentBaseColor,
  );

  accentScaleColors[8] = accent9Color;
  accentScaleColors[9] = getButtonHoverColor(accent9Color, [accentScaleColors]);

  // Limit saturation of the text colors (steps 11 & 12)
  accentScaleColors[10].coords[1] = Math.min(
    Math.max(accentScaleColors[8].coords[1], accentScaleColors[7].coords[1]),
    accentScaleColors[10].coords[1],
  );
  accentScaleColors[11].coords[1] = Math.min(
    Math.max(accentScaleColors[8].coords[1], accentScaleColors[7].coords[1]),
    accentScaleColors[11].coords[1],
  );

  // Convert to various formats
  const accentScaleHex = accentScaleColors.map((color) =>
    color.to("srgb").toString({ format: "hex" }),
  ) as ArrayOf12<string>;

  const accentScaleWideGamut = accentScaleColors.map(
    toOklchString,
  ) as ArrayOf12<string>;

  const accentScaleAlphaHex = accentScaleHex.map((color) =>
    getAlphaColorSrgb(color, backgroundHex),
  ) as ArrayOf12<string>;

  const accentScaleAlphaWideGamutString = accentScaleHex.map((color) =>
    getAlphaColorP3(color, backgroundHex),
  ) as ArrayOf12<string>;

  const accentContrastColorHex = accentContrastColor
    .to("srgb")
    .toString({ format: "hex" });

  const grayScaleHex = grayScaleColors.map((color) =>
    color.to("srgb").toString({ format: "hex" }),
  ) as ArrayOf12<string>;

  const grayScaleWideGamut = grayScaleColors.map(
    toOklchString,
  ) as ArrayOf12<string>;

  const grayScaleAlphaHex = grayScaleHex.map((color) =>
    getAlphaColorSrgb(color, backgroundHex),
  ) as ArrayOf12<string>;

  const grayScaleAlphaWideGamutString = grayScaleHex.map((color) =>
    getAlphaColorP3(color, backgroundHex),
  ) as ArrayOf12<string>;

  const accentSurfaceHex =
    appearance === "light"
      ? getAlphaColorSrgb(accentScaleHex[1], backgroundHex, 0.8)
      : getAlphaColorSrgb(accentScaleHex[1], backgroundHex, 0.5);

  const accentSurfaceWideGamutString =
    appearance === "light"
      ? getAlphaColorP3(accentScaleWideGamut[1], backgroundHex, 0.8)
      : getAlphaColorP3(accentScaleWideGamut[1], backgroundHex, 0.5);

  return {
    accentScale: accentScaleHex,
    accentScaleAlpha: accentScaleAlphaHex,
    accentScaleWideGamut: accentScaleWideGamut,
    accentScaleAlphaWideGamut: accentScaleAlphaWideGamutString,
    accentContrast: accentContrastColorHex,

    grayScale: grayScaleHex,
    grayScaleAlpha: grayScaleAlphaHex,
    grayScaleWideGamut: grayScaleWideGamut,
    grayScaleAlphaWideGamut: grayScaleAlphaWideGamutString,

    graySurface: appearance === "light" ? "#ffffffcc" : "rgba(0, 0, 0, 0.05)",
    graySurfaceWideGamut:
      appearance === "light"
        ? "color(display-p3 1 1 1 / 80%)"
        : "color(display-p3 0 0 0 / 5%)",

    accentSurface: accentSurfaceHex,
    accentSurfaceWideGamut: accentSurfaceWideGamutString,

    background: backgroundHex,
  };
};

/**
 * Determines step 9 color (primary action color) and its contrast color
 * Uses perceptual color difference (deltaEOK) to decide if we should use
 * the user's exact color or the scale's default step 9
 */
function getStep9Colors(
  scale: ArrayOf12<Color>,
  accentBaseColor: Color,
): [Color, Color] {
  const referenceBackgroundColor = scale[0];
  const distance = accentBaseColor.deltaEOK(referenceBackgroundColor) * 100;

  // If accent is too close to background (white-on-white or black-on-black)
  if (distance < 25) {
    return [scale[8], getTextColor(scale[8])];
  }

  return [accentBaseColor, getTextColor(accentBaseColor)];
}

/**
 * Creates a subtle hover state color for step 10
 * Slightly adjusts lightness and chroma based on the source color
 */
function getButtonHoverColor(source: Color, scales: ArrayOf12<Color>[]) {
  const [L, C, H] = source.coords;
  const newL = L > 0.4 ? L - 0.03 / (L + 0.1) : L + 0.03 / (L + 0.1);
  const newC = L > 0.4 && !isNaN(H) ? C * 0.93 + 0 : C;
  const buttonHoverColor = new Color("oklch", [newL, newC, H]);

  // Find closest in-scale color to donate the chroma and hue
  // Especially useful when the source color is pure white or black
  let closestColor = buttonHoverColor;
  let minDistance = Infinity;

  scales.forEach((scale) => {
    for (const color of scale) {
      const distance = buttonHoverColor.deltaEOK(color);
      if (distance < minDistance) {
        minDistance = distance;
        closestColor = color;
      }
    }
  });

  buttonHoverColor.coords[1] = closestColor.coords[1];
  buttonHoverColor.coords[2] = closestColor.coords[2];
  return buttonHoverColor;
}

/**
 * CORE ALGORITHM: Finds the best matching Radix scale and adapts it to your color
 * 
 * Uses geometric trigonometry to:
 * 1. Find the two closest Radix color scales
 * 2. Determine if mixing them would get closer to your target
 * 3. Adjust hue, chroma, and lightness to match your input
 * 4. Apply background-aware lightness curves
 */
function getScaleFromColor(
  source: Color,
  scales: Record<string, ArrayOf12<Color>>,
  backgroundColor: Color,
) {
  let allColors: { scale: string; color: Color; distance: number }[] = [];

  // Find distances to all colors in all scales
  Object.entries(scales).forEach(([name, scale]) => {
    for (const color of scale) {
      const distance = source.deltaEOK(color);
      allColors.push({ scale: name, distance, color });
    }
  });

  allColors.sort((a, b) => a.distance - b.distance);

  // Remove duplicate scales (keep only closest occurrence)
  let closestColors = allColors.filter(
    (color, i, arr) =>
      i === arr.findIndex((value) => value.scale === color.scale),
  );

  // Remove redundant gray scales from comparison
  const grayScaleNamesStr = grayScaleNames as readonly string[];
  const allAreGrays = closestColors.every((color) =>
    grayScaleNamesStr.includes(color.scale),
  );
  if (!allAreGrays && grayScaleNamesStr.includes(closestColors[0].scale)) {
    while (grayScaleNamesStr.includes(closestColors[1].scale)) {
      closestColors.splice(1, 1);
    }
  }

  let colorA = closestColors[0];
  let colorB = closestColors[1];

  // TRIGONOMETRY SECTION:
  // Determine if mixing the two closest scales would get us closer to the source
  // 
  // Triangle sides (named after opposite angles):
  const a = colorB.distance;
  const b = colorA.distance;
  const c = colorA.color.deltaEOK(colorB.color);

  // Law of cosines to get angles
  const cosA = (b ** 2 + c ** 2 - a ** 2) / (2 * b * c);
  const radA = Math.acos(cosA);
  const sinA = Math.sin(radA);

  const cosB = (a ** 2 + c ** 2 - b ** 2) / (2 * a * c);
  const radB = Math.acos(cosB);
  const sinB = Math.sin(radB);

  // Tangents determine the mixing ratio
  const tanC1 = cosA / sinA;
  const tanC2 = cosB / sinB;

  // If ratio is 0 or negative, triangle is obtuse - don't mix
  const ratio = Math.max(0, tanC1 / tanC2) * 0.5;

  // Mix the two closest scales
  const scaleA = scales[colorA.scale];
  const scaleB = scales[colorB.scale];
  const scale = arrayOf12.map((i) =>
    new Color(Color.mix(scaleA[i], scaleB[i], ratio)).to("oklch"),
  ) as ArrayOf12<Color>;

  // Find the closest color in our mixed scale
  const baseColor = scale
    .slice()
    .sort((a, b) => source.deltaEOK(a) - source.deltaEOK(b))[0];

  // Calculate chroma ratio
  const ratioC = source.coords[1] / baseColor.coords[1];

  // ADJUST HUE AND CHROMA to match source color
  scale.forEach((color) => {
    color.coords[1] = Math.min(
      source.coords[1] * 1.5,
      color.coords[1] * ratioC,
    );
    color.coords[2] = source.coords[2]; // Use exact hue from source
  });

  // LIGHT MODE: Adjust lightness curve
  if (scale[0].coords[0] > 0.5) {
    const lightnessScale = scale.map(({ coords }) => coords[0]);
    const backgroundL = Math.max(0, Math.min(1, backgroundColor.coords[0]));
    const newLightnessScale = transposeProgressionStart(
      backgroundL,
      [1, ...lightnessScale], // Add white as step 0
      lightModeEasing,
    );

    newLightnessScale.shift(); // Remove the white step we added

    newLightnessScale.forEach((lightness, i) => {
      scale[i].coords[0] = lightness;
    });

    return scale;
  }

  // DARK MODE: Dynamic lightness curve adjustment
  let ease: typeof darkModeEasing = [...darkModeEasing];
  const referenceBackgroundColorL = scale[0].coords[0];
  const backgroundColorL = Math.max(0, Math.min(1, backgroundColor.coords[0]));

  // If background is lighter than expected, blend toward linear easing
  const ratioL = backgroundColorL / referenceBackgroundColorL;

  if (ratioL > 1) {
    const maxRatio = 1.5;

    for (let i = 0; i < ease.length; i++) {
      const metaRatio = (ratioL - 1) * (maxRatio / (maxRatio - 1));
      ease[i] = ratioL > maxRatio ? 0 : Math.max(0, ease[i] * (1 - metaRatio));
    }
  }

  const lightnessScale = scale.map(({ coords }) => coords[0]);
  const backgroundL = backgroundColor.coords[0];
  const newLightnessScale = transposeProgressionStart(
    backgroundL,
    lightnessScale,
    ease,
  );

  newLightnessScale.forEach((lightness, i) => {
    scale[i].coords[0] = lightness;
  });

  return scale;
}

/**
 * Determines if text on the given background should be white or dark
 * Uses APCA contrast algorithm for accessibility
 */
function getTextColor(background: Color) {
  const white = new Color("oklch", [1, 0, 0]);

  if (Math.abs(white.contrastAPCA(background)) < 40) {
    const [L, C, H] = background.coords;
    return new Color("oklch", [0.25, Math.max(0.08 * C, 0.04), H]);
  }

  return white;
}

/**
 * Converts a solid color to a semi-transparent version that blends perfectly
 * over the specified background color
 * 
 * Formula: target = background * (1 - alpha) + foreground * alpha
 * Solves for: foreground and alpha given target and background
 */
function getAlphaColor(
  targetRgb: number[],
  backgroundRgb: number[],
  rgbPrecision: number,
  alphaPrecision: number,
  targetAlpha?: number,
) {
  const [tr, tg, tb] = targetRgb.map((c) => Math.round(c * rgbPrecision));
  const [br, bg, bb] = backgroundRgb.map((c) => Math.round(c * rgbPrecision));

  if (
    tr === undefined ||
    tg === undefined ||
    tb === undefined ||
    br === undefined ||
    bg === undefined ||
    bb === undefined
  ) {
    throw Error("Color is undefined");
  }

  // Determine if we're lightening or darkening the background
  let desiredRgb = 0;
  if (tr > br || tg > bg || tb > bb) {
    desiredRgb = rgbPrecision;
  }

  const alphaR = (tr - br) / (desiredRgb - br);
  const alphaG = (tg - bg) / (desiredRgb - bg);
  const alphaB = (tb - bb) / (desiredRgb - bb);

  const isPureGray = [alphaR, alphaG, alphaB].every(
    (alpha) => alpha === alphaR,
  );

  // Simplified math for pure grays
  if (!targetAlpha && isPureGray) {
    const V = desiredRgb / rgbPrecision;
    return [V, V, V, alphaR] as const;
  }

  const clampRgb = (n: number) =>
    isNaN(n) ? 0 : Math.min(rgbPrecision, Math.max(0, n));
  const clampA = (n: number) =>
    isNaN(n) ? 0 : Math.min(alphaPrecision, Math.max(0, n));
  const maxAlpha = targetAlpha ?? Math.max(alphaR, alphaG, alphaB);

  const A = clampA(Math.ceil(maxAlpha * alphaPrecision)) / alphaPrecision;
  let R = clampRgb(((br * (1 - A) - tr) / A) * -1);
  let G = clampRgb(((bg * (1 - A) - tg) / A) * -1);
  let B = clampRgb(((bb * (1 - A) - tb) / A) * -1);

  R = Math.ceil(R);
  G = Math.ceil(G);
  B = Math.ceil(B);

  const blendedR = blendAlpha(R, A, br);
  const blendedG = blendAlpha(G, A, bg);
  const blendedB = blendAlpha(B, A, bb);

  // Correct for rounding errors in light mode
  if (desiredRgb === 0) {
    if (tr <= br && tr !== blendedR) {
      R = tr > blendedR ? R + 1 : R - 1;
    }
    if (tg <= bg && tg !== blendedG) {
      G = tg > blendedG ? G + 1 : G - 1;
    }
    if (tb <= bb && tb !== blendedB) {
      B = tb > blendedB ? B + 1 : B - 1;
    }
  }

  // Correct for rounding errors in dark mode
  if (desiredRgb === rgbPrecision) {
    if (tr >= br && tr !== blendedR) {
      R = tr > blendedR ? R + 1 : R - 1;
    }
    if (tg >= bg && tg !== blendedG) {
      G = tg > blendedG ? G + 1 : G - 1;
    }
    if (tb >= bb && tb !== blendedB) {
      B = tb > blendedB ? B + 1 : B - 1;
    }
  }

  // Convert back to 0-1 values
  R = R / rgbPrecision;
  G = G / rgbPrecision;
  B = B / rgbPrecision;

  return [R, G, B, A] as const;
}

/**
 * Mimics how browsers actually blend transparent colors
 * Note: Browsers round each channel independently before blending!
 */
function blendAlpha(
  foreground: number,
  alpha: number,
  background: number,
  round = true,
) {
  if (round) {
    return (
      Math.round(background * (1 - alpha)) + Math.round(foreground * alpha)
    );
  }
  return background * (1 - alpha) + foreground * alpha;
}

/**
 * Convert solid color to sRGB alpha color
 */
function getAlphaColorSrgb(
  targetColor: string,
  backgroundColor: string,
  targetAlpha?: number,
) {
  const [r, g, b, a] = getAlphaColor(
    new Color(targetColor).to("srgb").coords,
    new Color(backgroundColor).to("srgb").coords,
    255,
    255,
    targetAlpha,
  );

  return formatHex(new Color("srgb", [r, g, b], a).toString({ format: "hex" }));
}

/**
 * Convert solid color to P3 wide gamut alpha color
 */
function getAlphaColorP3(
  targetColor: string,
  backgroundColor: string,
  targetAlpha?: number,
) {
  const [r, g, b, a] = getAlphaColor(
    new Color(targetColor).to("p3").coords,
    new Color(backgroundColor).to("p3").coords,
    255, // Browsers use 0-255 internally even for P3
    1000,
    targetAlpha,
  );

  return (
    new Color("p3", [r, g, b], a)
      .toString({ precision: 4 })
      .replace("color(p3 ", "color(display-p3 ")
  );
}

/**
 * Format short hex codes to long form (#fff → #ffffff)
 */
function formatHex(str: string) {
  if (!str.startsWith("#")) {
    return str;
  }

  if (str.length === 4) {
    const hash = str.charAt(0);
    const r = str.charAt(1);
    const g = str.charAt(2);
    const b = str.charAt(3);
    return hash + r + r + g + g + b + b;
  }

  if (str.length === 5) {
    const hash = str.charAt(0);
    const r = str.charAt(1);
    const g = str.charAt(2);
    const b = str.charAt(3);
    const a = str.charAt(4);
    return hash + r + r + g + g + b + b + a + a;
  }

  return str;
}

/**
 * Adjusts a lightness progression to start at a new value
 * Uses Bezier easing for smooth transitions
 * 
 * @param to - Target starting lightness (usually background color)
 * @param arr - Array of lightness values to adjust
 * @param curve - Bezier curve control points [x1, y1, x2, y2]
 */
export function transposeProgressionStart(
  to: number,
  arr: number[],
  curve: [number, number, number, number],
) {
  return arr.map((n, i, arr) => {
    const lastIndex = arr.length - 1;
    const diff = arr[0] - to;
    const fn = BezierEasing(...curve);
    return n - diff * fn(1 - i / lastIndex);
  });
}

/**
 * Convert Color object to OKLCH string with percentage lightness
 * e.g., "oklch(65.2% 0.15 250.4)"
 */
function toOklchString(color: Color) {
  const L = +(color.coords[0] * 100).toFixed(1);
  return color
    .to("oklch")
    .toString({ precision: 4 })
    .replace(/(\S+)(.+)/, `oklch(${L}%$2`);
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
