"use client";

import { useState, useEffect } from "react";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";

import { generateRadixColors } from "@/utils/custom-color-functions";
import { cn } from "@/utils/class-names";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/Popover";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export function ThemeColorSwitcher() {
  // Detect appearance (light or dark mode)
  const [appearance, setAppearance] = useState<"light" | "dark">("light");

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

  // Detect system appearance on mount
  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setAppearance(isDark ? "dark" : "light");

    // Listen for changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setAppearance(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

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
        <button
          aria-label="Customize colors"
          type="button"
          className="flex items-center justify-center w-3 h-3 rounded-sm border border-gray-6 bg-gray-1 cursor-pointer transition-colors hover:bg-gray-3"
        >
          <MixerHorizontalIcon className="w-1 h-1 text-gray-11" />
        </button>
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
                onClick={() => setAppearance("light")}
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
                onClick={() => setAppearance("dark")}
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

          <button
            type="button"
            onClick={resetDefaults}
            className="w-full mt-1 px-1 py-0.5 rounded border border-gray-6 bg-gray-2 text-xs font-medium text-gray-11 hover:bg-gray-3 hover:text-gray-12 transition-colors cursor-pointer"
          >
            Reset Defaults
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
