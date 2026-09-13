"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

import { generateRadixColors } from "@/utils/custom-color-functions";

export type ThemeColors = {
  accent: string;
  gray: string;
  background: string;
};

export type ThemeColorsByMode = {
  light: ThemeColors;
  dark: ThemeColors;
};

export const DEFAULT_THEME_COLORS: ThemeColorsByMode = {
  light: { accent: "#964CE1", gray: "#16204e", background: "#fcfcfc" },
  dark: { accent: "#964CE1", gray: "#16204e", background: "#0c122b" },
};

const STORAGE_KEY = "aura-theme-colors";
const CHANGE_EVENT = "aura-theme-colors-change";

type Listener = () => void;

let memoryStore: ThemeColorsByMode = DEFAULT_THEME_COLORS;
const listeners = new Set<Listener>();

function emitChange() {
  listeners.forEach((listener) => listener());
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }
}

function readFromStorage(): ThemeColorsByMode {
  if (typeof window === "undefined") return memoryStore;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return memoryStore;
    const parsed = JSON.parse(saved) as ThemeColorsByMode;
    if (parsed?.light && parsed?.dark) {
      memoryStore = parsed;
      return parsed;
    }
  } catch {
    // ignore corrupt storage
  }
  return memoryStore;
}

function writeToStorage(next: ThemeColorsByMode) {
  memoryStore = next;
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  emitChange();
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) listener();
  };
  const onCustom = () => listener();
  if (typeof window !== "undefined") {
    window.addEventListener("storage", onStorage);
    window.addEventListener(CHANGE_EVENT, onCustom);
  }
  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(CHANGE_EVENT, onCustom);
    }
  };
}

function getSnapshot() {
  return readFromStorage();
}

function getServerSnapshot() {
  return DEFAULT_THEME_COLORS;
}

export function isValidHex(hex: string) {
  return /^#?([0-9A-F]{3}){1,2}$/i.test(hex);
}

export function normalizeHex(value: string) {
  return value.startsWith("#") ? value : `#${value}`;
}

export function injectThemeColors(
  appearance: "light" | "dark",
  colors: ThemeColors
) {
  if (typeof document === "undefined") return;

  const rootElement = document.documentElement;
  const generated = generateRadixColors({
    appearance,
    accent: colors.accent,
    gray: colors.gray,
    background: colors.background,
  });

  const injectScale = (
    name: string,
    scale: string[],
    alphaScale: string[]
  ) => {
    scale.forEach((val, i) => {
      rootElement.style.setProperty(`--${name}-${i + 1}`, val);
    });
    alphaScale.forEach((val, i) => {
      rootElement.style.setProperty(`--${name}-a${i + 1}`, val);
    });
  };

  injectScale("accent", generated.accentScale, generated.accentScaleAlpha);
  injectScale("gray", generated.grayScale, generated.grayScaleAlpha);

  generated.accentScaleWideGamut.forEach((val, i) => {
    rootElement.style.setProperty(`--accent-${i + 1}-wide`, val);
  });
  generated.accentScaleAlphaWideGamut.forEach((val, i) => {
    rootElement.style.setProperty(`--accent-a${i + 1}-wide`, val);
  });
  generated.grayScaleWideGamut.forEach((val, i) => {
    rootElement.style.setProperty(`--gray-${i + 1}-wide`, val);
  });
  generated.grayScaleAlphaWideGamut.forEach((val, i) => {
    rootElement.style.setProperty(`--gray-a${i + 1}-wide`, val);
  });

  rootElement.style.setProperty("--accent-contrast", generated.accentContrast);
  rootElement.style.setProperty("--accent-surface", generated.accentSurface);
  rootElement.style.setProperty(
    "--accent-surface-wide",
    generated.accentSurfaceWideGamut
  );
  rootElement.style.setProperty("--gray-surface", generated.graySurface);
  rootElement.style.setProperty(
    "--gray-surface-wide",
    generated.graySurfaceWideGamut
  );
  rootElement.style.setProperty("--accent-indicator", generated.accentScale[8]);
  rootElement.style.setProperty("--accent-track", generated.accentScale[8]);
  rootElement.style.setProperty("--gray-indicator", generated.grayScale[8]);
  rootElement.style.setProperty("--gray-track", generated.grayScale[8]);
  rootElement.style.setProperty("--primary", "var(--accent-9)");
  rootElement.style.setProperty(
    "--primary-foreground",
    "var(--accent-contrast)"
  );
  rootElement.style.setProperty("--secundary", "var(--accent-8)");
  rootElement.style.setProperty(
    "--secundary-foreground",
    "var(--accent-contrast)"
  );

  return generated;
}

export function generateGlobalsCssContent(
  themeColors: ThemeColorsByMode
): string {
  const lightColors = generateRadixColors({
    appearance: "light",
    accent: themeColors.light.accent,
    gray: themeColors.light.gray,
    background: themeColors.light.background,
  });

  const darkColors = generateRadixColors({
    appearance: "dark",
    accent: themeColors.dark.accent,
    gray: themeColors.dark.gray,
    background: themeColors.dark.background,
  });

  const generateScaleVars = (
    name: string,
    scale: string[],
    alphaScale: string[]
  ) => {
    let css = "";
    scale.forEach((val, i) => {
      css += `  --${name}-${i + 1}: ${val};\n`;
    });
    css += "\n";
    alphaScale.forEach((val, i) => {
      css += `  --${name}-a${i + 1}: ${val};\n`;
    });
    return css;
  };

  const generateExtraVars = (
    name: string,
    colors: ReturnType<typeof generateRadixColors>
  ) => {
    const contrast = name === "accent" ? colors.accentContrast : "#ffffff";
    const surface =
      name === "accent" ? colors.accentSurface : colors.graySurface;
    const indicator =
      name === "accent" ? colors.accentScale[8] : colors.grayScale[8];
    const track =
      name === "accent" ? colors.accentScale[8] : colors.grayScale[8];

    return `  --${name}-contrast: ${contrast};
  --${name}-surface: ${surface};
  --${name}-indicator: ${indicator};
  --${name}-track: ${track};\n`;
  };

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
${generateScaleVars("accent", lightColors.accentScale, lightColors.accentScaleAlpha)}
${generateExtraVars("accent", lightColors)}
  /* Gray color scale */
${generateScaleVars("gray", lightColors.grayScale, lightColors.grayScaleAlpha)}
${generateExtraVars("gray", lightColors)}
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
${generateScaleVars("accent", darkColors.accentScale, darkColors.accentScaleAlpha)}
${generateExtraVars("accent", darkColors)}
    /* Gray color scale */
${generateScaleVars("gray", darkColors.grayScale, darkColors.grayScaleAlpha)}
${generateExtraVars("gray", darkColors)}
   
  }
}

@layer base {
  @import "../styles/main.css";

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

export function useAuraThemeColors() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const themeColors = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    setMounted(true);
    readFromStorage();
    emitChange();
  }, []);

  const appearance: "light" | "dark" =
    mounted && resolvedTheme === "dark" ? "dark" : "light";
  const currentColors = themeColors[appearance];

  const setColor = useCallback(
    (field: keyof ThemeColors, value: string) => {
      if (!isValidHex(value)) return;
      const normalized = normalizeHex(value);
      writeToStorage({
        ...themeColors,
        [appearance]: {
          ...themeColors[appearance],
          [field]: normalized,
        },
      });
    },
    [appearance, themeColors]
  );

  const resetDefaults = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
    writeToStorage(DEFAULT_THEME_COLORS);
  }, []);

  const downloadCSS = useCallback(() => {
    const cssContent = generateGlobalsCssContent(themeColors);
    const blob = new Blob([cssContent], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "globals.css";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [themeColors]);

  useEffect(() => {
    if (!mounted) return;
    injectThemeColors(appearance, currentColors);
  }, [appearance, currentColors, mounted]);

  const generated = mounted
    ? generateRadixColors({
        appearance,
        accent: currentColors.accent,
        gray: currentColors.gray,
        background: currentColors.background,
      })
    : null;

  return {
    mounted,
    appearance,
    themeColors,
    currentColors,
    generated,
    setTheme,
    setColor,
    resetDefaults,
    downloadCSS,
  };
}
