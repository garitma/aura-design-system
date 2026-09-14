"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MixerHorizontalIcon, DownloadIcon } from "@radix-ui/react-icons";

import { generateRadixColors } from "@/utils/custom-color-functions";
import { cn } from "@/utils/class-names";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/Popover";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";

export function ThemeColorSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const appearance = mounted && resolvedTheme === "dark" ? "dark" : "light";

  type ThemeColors = {
    accent: string;
    gray: string;
    background: string;
  };

  const DEFAULT_THEME_COLORS = {
    light: { accent: "#964CE1", gray: "#16204e", background: "#fcfcfc" },
    dark: { accent: "#964CE1", gray: "#16204e", background: "#0c122b" },
  };

  // Color state with defaults for both modes
  const [themeColors, setThemeColors] = useState<{
    light: ThemeColors;
    dark: ThemeColors;
  }>(DEFAULT_THEME_COLORS);

  const STORAGE_KEY = "aura-theme-colors";

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Basic validation to check if it matches our new schema
        if (parsed.light && parsed.dark) {
          setThemeColors(parsed);
        }
      } catch (e) {
        console.error("Failed to parse theme colors", e);
      }
    }
  }, []);

  // Save to local storage when colors change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(themeColors));
  }, [themeColors]);

  // Current mode colors
  const currentColors = themeColors[appearance];

  // Input state to allow flexible typing (sync with current mode colors)
  const [accentInput, setAccentInput] = useState(currentColors.accent);
  const [grayInput, setGrayInput] = useState(currentColors.gray);
  const [backgroundInput, setBackgroundInput] = useState(
    currentColors.background
  );

  // Update inputs when appearance or underlying colors change
  useEffect(() => {
    setAccentInput(currentColors.accent);
    setGrayInput(currentColors.gray);
    setBackgroundInput(currentColors.background);
  }, [appearance, currentColors]);

  const isValidHex = (hex: string) => {
    return /^#?([0-9A-F]{3}){1,2}$/i.test(hex);
  };

  const handleColorChange = (value: string, field: keyof ThemeColors) => {
    // Update input immediately
    if (field === "accent") setAccentInput(value);
    if (field === "gray") setGrayInput(value);
    if (field === "background") setBackgroundInput(value);

    // Update actual color if valid
    if (isValidHex(value)) {
      const normalized = value.startsWith("#") ? value : `#${value}`;
      setThemeColors((prev) => ({
        ...prev,
        [appearance]: {
          ...prev[appearance],
          [field]: normalized,
        },
      }));
    }
  };

  const resetDefaults = () => {
    setThemeColors(DEFAULT_THEME_COLORS);
    localStorage.removeItem(STORAGE_KEY);
  };

  const generateCSSContent = () => {
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

    const css = `@import "tailwindcss";

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

    return css;
  };

  const downloadCSS = () => {
    const cssContent = generateCSSContent();
    const blob = new Blob([cssContent], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "globals.css";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Inject CSS variables into :root when colors change to override globals
  useEffect(() => {
    const rootElement = document.documentElement; // :root selector

    // We need to generate colors based on the CURRENT appearance and its specific colors
    const colors = generateRadixColors({
      appearance,
      accent: currentColors.accent,
      gray: currentColors.gray,
      background: currentColors.background,
    });

    // Helper to inject scale into :root
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

    // Inject accent and gray scales
    injectScale("accent", colors.accentScale, colors.accentScaleAlpha);
    injectScale("gray", colors.grayScale, colors.grayScaleAlpha);

    // Inject wide gamut versions
    colors.accentScaleWideGamut.forEach((val, i) => {
      rootElement.style.setProperty(`--accent-${i + 1}-wide`, val);
    });
    colors.accentScaleAlphaWideGamut.forEach((val, i) => {
      rootElement.style.setProperty(`--accent-a${i + 1}-wide`, val);
    });
    colors.grayScaleWideGamut.forEach((val, i) => {
      rootElement.style.setProperty(`--gray-${i + 1}-wide`, val);
    });
    colors.grayScaleAlphaWideGamut.forEach((val, i) => {
      rootElement.style.setProperty(`--gray-a${i + 1}-wide`, val);
    });

    // Inject contrast and surface colors
    rootElement.style.setProperty("--accent-contrast", colors.accentContrast);
    rootElement.style.setProperty("--accent-surface", colors.accentSurface);
    rootElement.style.setProperty(
      "--accent-surface-wide",
      colors.accentSurfaceWideGamut
    );
    rootElement.style.setProperty("--gray-surface", colors.graySurface);
    rootElement.style.setProperty(
      "--gray-surface-wide",
      colors.graySurfaceWideGamut
    );

    // Inject indicator and track
    rootElement.style.setProperty("--accent-indicator", colors.accentScale[8]);
    rootElement.style.setProperty("--accent-track", colors.accentScale[8]);
    rootElement.style.setProperty("--gray-indicator", colors.grayScale[8]);
    rootElement.style.setProperty("--gray-track", colors.grayScale[8]);

    // Inject primary and secondary
    rootElement.style.setProperty("--primary", `var(--accent-9)`);
    rootElement.style.setProperty(
      "--primary-foreground",
      `var(--accent-contrast)`
    );
    rootElement.style.setProperty("--secundary", `var(--accent-8)`);
    rootElement.style.setProperty(
      "--secundary-foreground",
      `var(--accent-contrast)`
    );
  }, [appearance, currentColors]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button aria-label="Customize colors" type="button" size="icon" variant="pill">
          <MixerHorizontalIcon className="icon" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[320px] p-1 z-50" align="end">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold text-gray-12">
              Theme Settings
            </Label>
            <div className="flex bg-gray-3 p-0 rounded-sm">
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={cn(
                  "px-0.5 py-0.5 rounded border-none cursor-pointer text-xs font-medium transition-all",
                  appearance === "light"
                    ? "bg-gray-1 text-gray-12 shadow-sm"
                    : "bg-transparent text-gray-11"
                )}
              >
                Light
              </button>
              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={cn(
                  "px-0.5 py-0.5 rounded border-none cursor-pointer text-xs font-medium transition-all",
                  appearance === "dark"
                    ? "bg-gray-1 text-gray-12 shadow-sm"
                    : "bg-transparent text-gray-11"
                )}
              >
                Dark
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-0.5">
            <Label className="text-sm font-medium text-gray-12">
              Accent Color
            </Label>
            <div className="flex gap-0.5 items-center relative">
              <Input
                type="text"
                value={accentInput}
                onChange={(e) => handleColorChange(e.target.value, "accent")}
                placeholder="#3D63DD"
                className="flex-1 px-1 py-0.5  border border-gray-6 bg-gray-1 text-sm text-gray-12"
              />
              <Input
                type="color"
                value={currentColors.accent}
                onChange={(e) => handleColorChange(e.target.value, "accent")}
                className="w-2.5 h-2.5  border-2 border-gray-6 cursor-pointer shrink-0 p-0 absolute right-0.5 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>

          <div className="flex flex-col gap-0.5">
            <Label className="text-sm font-medium text-gray-12">
              Gray Color
            </Label>
            <div className="flex gap-0.5 items-center relative">
              <Input
                type="text"
                value={grayInput}
                onChange={(e) => handleColorChange(e.target.value, "gray")}
                placeholder="#8B8D98"
                className="flex-1 px-1 py-0.5  border border-gray-6 bg-gray-1 text-sm text-gray-12"
              />
              <Input
                type="color"
                value={currentColors.gray}
                onChange={(e) => handleColorChange(e.target.value, "gray")}
                className="w-2.5 h-2.5  border-2 border-gray-6 cursor-pointer shrink-0 p-0 absolute right-0.5 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>

          <div className="flex flex-col gap-0.5">
            <Label className="text-sm font-medium text-gray-12">
              Background Color
            </Label>
            <div className="flex gap-0.5 items-center relative">
              <Input
                type="text"
                value={backgroundInput}
                onChange={(e) =>
                  handleColorChange(e.target.value, "background")
                }
                placeholder="#FAFAFA"
                className="flex-1 px-1 py-0.5  border border-gray-6 bg-gray-1 text-sm text-gray-12"
              />
              <Input
                type="color"
                value={currentColors.background}
                onChange={(e) =>
                  handleColorChange(e.target.value, "background")
                }
                className="w-2.5 h-2.5 border-2 border-gray-6 cursor-pointer shrink-0 p-0 absolute right-0.5 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>

          <div className="flex gap-0.5 mt-1">
            <button
              type="button"
              onClick={resetDefaults}
              className="flex-1 px-1 py-0.5 rounded border border-gray-6 bg-gray-2 text-xs font-medium text-gray-11 hover:bg-gray-3 hover:text-gray-12 transition-colors cursor-pointer"
            >
              Reset Defaults
            </button>
            <button
              type="button"
              onClick={downloadCSS}
              className="flex items-center justify-center gap-0.5 px-1 py-0.5 rounded border border-accent-6 bg-accent-2 text-xs font-medium text-accent-11 hover:bg-accent-3 hover:text-accent-12 transition-colors cursor-pointer"
              title="Download globals.css"
            >
              <DownloadIcon className="w-1 h-1" />
              Download CSS
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
