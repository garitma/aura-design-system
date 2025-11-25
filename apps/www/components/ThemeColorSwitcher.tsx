"use client";

import { useState, useEffect } from "react";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/Popover";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { generateRadixColors } from "../utils/custom-color-functions";

export function ThemeColorSwitcher() {
  // Detect appearance (light or dark mode)
  const [appearance, setAppearance] = useState<"light" | "dark">("light");

  type ThemeColors = {
    accent: string;
    gray: string;
    background: string;
  };

  // Color state with defaults for both modes
  const [themeColors, setThemeColors] = useState<{
    light: ThemeColors;
    dark: ThemeColors;
  }>({
    light: { accent: "#bf91ec", gray: "#16204e", background: "#fcfcfc" },
    dark: { accent: "#bf91ec", gray: "#16204e", background: "#0c122b" },
  });

  const STORAGE_KEY = "aura-theme-colors-v2";

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
    } else {
      // Try to migrate from v1 if v2 doesn't exist
      const oldSaved = localStorage.getItem("aura-theme-colors");
      if (oldSaved) {
        try {
          const parsed = JSON.parse(oldSaved);
          // We don't know which mode the old colors were for, but we'll assume they might be useful
          // Or we just stick to defaults. Let's stick to defaults to avoid confusion,
          // or maybe map them to light mode if they look light?
          // For now, let's just ignore migration to keep it clean and use defaults.
        } catch (e) {
          // ignore
        }
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
    <div
      style={{ position: "fixed", top: "16px", right: "16px", zIndex: 9999 }}
    >
      <Popover>
        <PopoverTrigger asChild>
          <button
            aria-label="Customize colors"
            type="button"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              border: "1px solid var(--gray-6)",
              backgroundColor: "var(--gray-1)",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--gray-3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--gray-1)";
            }}
          >
            <MixerHorizontalIcon
              style={{ width: "16px", height: "16px", color: "var(--gray-11)" }}
            />
          </button>
        </PopoverTrigger>
        <PopoverContent
          style={{
            minWidth: "320px",
            padding: "16px",
          }}
          align="end"
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Label
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--gray-12)",
                }}
              >
                Theme Settings
              </Label>
              <div
                style={{
                  display: "flex",
                  backgroundColor: "var(--gray-3)",
                  padding: "2px",
                  borderRadius: "6px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setAppearance("light")}
                  style={{
                    padding: "4px 8px",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor:
                      appearance === "light" ? "var(--gray-1)" : "transparent",
                    color:
                      appearance === "light"
                        ? "var(--gray-12)"
                        : "var(--gray-11)",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: 500,
                    boxShadow:
                      appearance === "light"
                        ? "0 1px 2px rgba(0,0,0,0.1)"
                        : "none",
                  }}
                >
                  Light
                </button>
                <button
                  type="button"
                  onClick={() => setAppearance("dark")}
                  style={{
                    padding: "4px 8px",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor:
                      appearance === "dark" ? "var(--gray-1)" : "transparent",
                    color:
                      appearance === "dark"
                        ? "var(--gray-12)"
                        : "var(--gray-11)",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: 500,
                    boxShadow:
                      appearance === "dark"
                        ? "0 1px 2px rgba(0,0,0,0.1)"
                        : "none",
                  }}
                >
                  Dark
                </button>
              </div>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Label
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "var(--gray-12)",
                }}
              >
                Accent Color
              </Label>
              <div
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                <Input
                  type="text"
                  value={accentInput}
                  onChange={(e) => handleColorChange(e.target.value, "accent")}
                  placeholder="#3D63DD"
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid var(--gray-6)",
                    backgroundColor: "var(--gray-1)",
                    fontSize: "14px",
                    color: "var(--gray-12)",
                  }}
                />
                <input
                  type="color"
                  value={currentColors.accent}
                  onChange={(e) => handleColorChange(e.target.value, "accent")}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "6px",
                    border: "2px solid var(--gray-6)",
                    cursor: "pointer",
                    flexShrink: 0,
                    padding: 0,
                  }}
                />
              </div>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Label
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "var(--gray-12)",
                }}
              >
                Gray Color
              </Label>
              <div
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                <Input
                  type="text"
                  value={grayInput}
                  onChange={(e) => handleColorChange(e.target.value, "gray")}
                  placeholder="#8B8D98"
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid var(--gray-6)",
                    backgroundColor: "var(--gray-1)",
                    fontSize: "14px",
                    color: "var(--gray-12)",
                  }}
                />
                <input
                  type="color"
                  value={currentColors.gray}
                  onChange={(e) => handleColorChange(e.target.value, "gray")}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "6px",
                    border: "2px solid var(--gray-6)",
                    cursor: "pointer",
                    flexShrink: 0,
                    padding: 0,
                  }}
                />
              </div>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Label
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "var(--gray-12)",
                }}
              >
                Background Color
              </Label>
              <div
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                <Input
                  type="text"
                  value={backgroundInput}
                  onChange={(e) =>
                    handleColorChange(e.target.value, "background")
                  }
                  placeholder="#FAFAFA"
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid var(--gray-6)",
                    backgroundColor: "var(--gray-1)",
                    fontSize: "14px",
                    color: "var(--gray-12)",
                  }}
                />
                <input
                  type="color"
                  value={currentColors.background}
                  onChange={(e) =>
                    handleColorChange(e.target.value, "background")
                  }
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "6px",
                    border: "2px solid var(--gray-6)",
                    cursor: "pointer",
                    flexShrink: 0,
                    padding: 0,
                  }}
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
