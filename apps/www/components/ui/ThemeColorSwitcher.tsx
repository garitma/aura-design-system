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

  // Color state with defaults
  const [accentColor, setAccentColor] = useState("#083d77");
  const [grayColor, setGrayColor] = useState("#8b8973");
  const [backgroundColor, setBackgroundColor] = useState("#fcfaea");

  const STORAGE_KEY = "aura-theme-colors";

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.accent) {
          setAccentColor(parsed.accent);
          setAccentInput(parsed.accent);
        }
        if (parsed.gray) {
          setGrayColor(parsed.gray);
          setGrayInput(parsed.gray);
        }
        if (parsed.background) {
          setBackgroundColor(parsed.background);
          setBackgroundInput(parsed.background);
        }
      } catch (e) {
        console.error("Failed to parse theme colors", e);
      }
    }
  }, []);

  // Save to local storage when colors change
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        accent: accentColor,
        gray: grayColor,
        background: backgroundColor,
      })
    );
  }, [accentColor, grayColor, backgroundColor]);

  // Input state to allow flexible typing
  const [accentInput, setAccentInput] = useState(accentColor);
  const [grayInput, setGrayInput] = useState(grayColor);
  const [backgroundInput, setBackgroundInput] = useState(backgroundColor);

  const isValidHex = (hex: string) => {
    return /^#?([0-9A-F]{3}){1,2}$/i.test(hex);
  };

  const handleColorChange = (
    value: string,
    setInput: (val: string) => void,
    setColor: (val: string) => void
  ) => {
    setInput(value);

    // Check if it's a valid hex (with or without #)
    if (isValidHex(value)) {
      const normalized = value.startsWith("#") ? value : `#${value}`;
      setColor(normalized);
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

    const colors = generateRadixColors({
      appearance,
      accent: accentColor,
      gray: grayColor,
      background: backgroundColor,
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
  }, [appearance, accentColor, grayColor, backgroundColor]);

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
                  onChange={(e) =>
                    handleColorChange(
                      e.target.value,
                      setAccentInput,
                      setAccentColor
                    )
                  }
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
                  value={accentColor}
                  onChange={(e) => {
                    const newColor = e.target.value;
                    setAccentColor(newColor);
                    setAccentInput(newColor);
                  }}
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
                  onChange={(e) =>
                    handleColorChange(
                      e.target.value,
                      setGrayInput,
                      setGrayColor
                    )
                  }
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
                  value={grayColor}
                  onChange={(e) => {
                    const newColor = e.target.value;
                    setGrayColor(newColor);
                    setGrayInput(newColor);
                  }}
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
                    handleColorChange(
                      e.target.value,
                      setBackgroundInput,
                      setBackgroundColor
                    )
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
                  value={backgroundColor}
                  onChange={(e) => {
                    const newColor = e.target.value;
                    setBackgroundColor(newColor);
                    setBackgroundInput(newColor);
                  }}
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
