"use client";

import { useState, useMemo } from "react";
import Section from "@/components/Section";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";
import {
  Slider,
  SliderPrimitiveTrack,
  SliderPrimitiveRange,
  SliderPrimitiveThumb,
} from "@/components/ui/Slider";
import {
  generateRadixColors,
  getColorScaleCss,
  getColorName,
} from "@/utils/colors";

export default function AuraAesthetic() {
  const [radius, setRadius] = useState(0.5);
  const [mode, setMode] = useState<"light" | "dark">("dark");

  // Custom color inputs with defaults
  const [accentColor, setAccentColor] = useState("#3D63DD");
  const [grayColor, setGrayColor] = useState("#8B8D98");
  const [backgroundColor, setBackgroundColor] = useState("#FAFAFA");

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

  const { cssVariables, exportCss } = useMemo(() => {
    const colors = generateRadixColors({
      accent: accentColor,
      gray: grayColor,
      background: backgroundColor,
    });

    const accentName = getColorName(accentColor);

    // Generate CSS variables for the preview style attribute
    const vars: Record<string, string> = {
      "--radius": `${radius}rem`,
      "--aura-accents-primary": `var(--${accentName}-9)`,
    };

    // Helper to add scale to vars
    const addScale = (name: string, scale: string[], alphaScale: string[]) => {
      scale.forEach((val, i) => {
        vars[`--${name}-${i + 1}`] = val;
      });
      alphaScale.forEach((val, i) => {
        vars[`--${name}-a${i + 1}`] = val;
      });
    };

    addScale(accentName, colors.accentScale, colors.accentScaleAlpha);
    addScale("gray", colors.grayScale, colors.grayScaleAlpha);

    // Add semantic mappings that Aura might use
    // Assuming Aura uses 'gray' and 'accent' (or specific names like 'blue')
    // If the system expects generic '--accent-1', we might need to map that too.
    // Based on rules, it uses semantic names like 'blue-1' etc.
    // But let's also map a generic 'accent' just in case or if we want to force the preview to use *this* accent.
    // The preview uses `bg-gray-2`, `text-gray-12` etc. which are standard.
    // The primary button uses `bg-accent-9`? No, the code had explicit style override.
    // Let's check the previous code... it had:
    // backgroundColor: primaryColor === "blue" ? ...

    // We should try to make the preview use the generated variables.
    // If we map `--accent-9` to our generated color, and the button uses `bg-accent-9`, it works.
    // But the button component might be using `bg-primary` or similar.
    // Let's look at the Button component... it uses `button-fill` variant.
    // `button-fill` usually uses `bg-accent-9`.
    // So we need to ensure `--accent-*` variables are set if the system uses generic accent.
    // OR if the system uses `blue-*`, we need to make sure we are setting `blue-*` if that's what we picked.

    // For the preview to work dynamically with ANY color, we should probably map the *generic* `accent` variables
    // to our generated scale, so `bg-accent-9` works.
    addScale("accent", colors.accentScale, colors.accentScaleAlpha);

    vars["--accent-contrast"] = colors.accentContrast;
    vars["--accent-surface"] = colors.accentSurface;
    vars["--gray-contrast"] = colors.grayContrast;
    vars["--gray-surface"] = colors.graySurface;

    // Generate the export CSS string
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
  /* Aura Design System - Root Tokens */
  --aura: 13px;
  --aura-font-stack: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
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
  --aura-radius: ${radius}rem;
  --aura-opacity: 0.5;
  --aura-outline: var(--accent-9) solid 2px;
  --aura-button-hover: var(--accent-11);
  --aura-link: var(--gray-12);
  --aura-link-hover: var(--accent-2);
  --aura-selector: var(--accent-surface);
  --aura-loader: var(--primary);
  --aura-skeleton-start: var(--gray-8);
  --aura-skeleton-end: var(--gray-5);

  /* Existing color scale */
  --radius: ${radius}rem;
  ${colors.accentScale.map((val, i) => `--accent-${i + 1}: ${val};`).join("\n  ")}

  ${colors.accentScaleAlpha.map((val, i) => `--accent-a${i + 1}: ${val};`).join("\n  ")}

  --accent-contrast: ${colors.accentContrast};
  --accent-surface: ${colors.accentSurface};
  --accent-indicator: ${colors.accentScale[8]};
  --accent-track: ${colors.accentScale[8]};

  ${colors.grayScale.map((val, i) => `--gray-${i + 1}: ${val};`).join("\n  ")}

  ${colors.grayScaleAlpha.map((val, i) => `--gray-a${i + 1}: ${val};`).join("\n  ")}

  --gray-contrast: ${colors.grayContrast};
  --gray-surface: ${colors.graySurface};
  --gray-indicator: ${colors.grayScale[8]};
  --gray-track: ${colors.grayScale[8]};
  --primary: var(--accent-9);
  --primary-foreground: var(--accent-contrast);
  --secundary: var(--accent-8);
  --secundary-foreground: var(--accent-contrast);
}

@layer base {
  @import "@aura-design/system/main.css";

  html {
    font-size: 17px;
  }

}

@layer components {

}`;

    return { cssVariables: vars, exportCss: css };
  }, [accentColor, grayColor, backgroundColor, radius, mode]);

  return (
    <Section className="py-5 md:py-7.5">
      <div className="grid lg:grid-cols-2 gap-3.5 items-center">
        <div className="space-y-0.5">
          <h2 className="h2 font-bold text-gray-12">
            Make It Yours: Your Brand, Our Beautiful Base.
          </h2>
          <p className="p text-gray-11 text-lg">
            Aura isn't just a library; it's a starting point. Tweak the tokens
            to match your brand identity instantly.
          </p>

          <div className="space-y-6 p-2 bg-gray-2 rounded-xl border border-gray-6">
            <div className="space-y-1">
              <Label>Accent Color</Label>
              <div className="flex gap-0.5 items-center">
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
                  className="flex-1"
                />
                <div
                  className="size-3 rounded border-2 border-gray-6 shrink-0"
                  style={{ backgroundColor: accentColor }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Gray Color</Label>
              <div className="flex gap-2 items-center">
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
                  className="flex-1"
                />
                <div
                  className="size-10 rounded border-2 border-gray-6 shrink-0"
                  style={{ backgroundColor: grayColor }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Background Color</Label>
              <div className="flex gap-2 items-center">
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
                  className="flex-1"
                />
                <div
                  className="size-10 rounded border-2 border-gray-6 shrink-0"
                  style={{ backgroundColor: backgroundColor }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>Border Radius</Label>
                <span className="text-sm text-gray-11">{radius}rem</span>
              </div>
              <Slider
                value={[radius]}
                onValueChange={([v]) => setRadius(v)}
                min={0}
                max={1}
                step={0.1}
                className="w-full"
              >
                <SliderPrimitiveTrack>
                  <SliderPrimitiveRange />
                </SliderPrimitiveTrack>
                <SliderPrimitiveThumb />
              </Slider>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-12">
              Export Configuration
            </p>
            <pre className="p-1 rounded-lg bg-gray-12 text-gray-1 overflow-x-auto text-sm font-mono h-19.5">
              {exportCss}
            </pre>
            <p className="text-xs text-gray-11">
              Love your new theme? Simply copy this configuration block and
              paste it into your project's config file. Done!
            </p>
          </div>
        </div>

        <div
          className={`p-2.5 rounded-2xl border border-gray-6 transition-colors duration-300 ${
            mode === "dark" ? "bg-gray-12 text-gray-1" : "bg-white text-gray-12"
          }`}
        >
          {/* We apply the generated variables to this container */}
          <div
            className="max-w-md mx-auto space-y-6"
            style={cssVariables as React.CSSProperties}
          >
            <Card
              className="bg-gray-2 border-gray-6"
              style={{ borderRadius: "var(--radius)" }}
            >
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>
                  Enter your details to get started.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    placeholder="hello@example.com"
                    style={{ borderRadius: "var(--radius)" }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    style={{ borderRadius: "var(--radius)" }}
                  />
                </div>
                <Button
                  className="w-full bg-accent-9 hover:bg-accent-10 text-accent-contrast"
                  style={{
                    borderRadius: "var(--radius)",
                  }}
                >
                  Sign Up
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Section>
  );
}
