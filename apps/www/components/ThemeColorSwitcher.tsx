"use client";

import { useEffect, useState } from "react";
import { MixerHorizontalIcon, DownloadIcon } from "@radix-ui/react-icons";

import {
  normalizeHex,
  useAuraThemeColors,
  type ThemeColors,
} from "@/hooks/use-aura-theme-colors";
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
  const {
    appearance,
    currentColors,
    setTheme,
    setColor,
    resetDefaults,
    downloadCSS,
  } = useAuraThemeColors();

  const [accentInput, setAccentInput] = useState(currentColors.accent);
  const [grayInput, setGrayInput] = useState(currentColors.gray);
  const [backgroundInput, setBackgroundInput] = useState(
    currentColors.background
  );

  useEffect(() => {
    setAccentInput(currentColors.accent);
    setGrayInput(currentColors.gray);
    setBackgroundInput(currentColors.background);
  }, [appearance, currentColors]);

  const handleColorChange = (value: string, field: keyof ThemeColors) => {
    if (field === "accent") setAccentInput(value);
    if (field === "gray") setGrayInput(value);
    if (field === "background") setBackgroundInput(value);
    setColor(field, value);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          aria-label="Customize colors"
          type="button"
          size="icon"
          variant="pill"
        >
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
                className="flex-1 px-1 py-0.5 border border-gray-6 bg-gray-1 text-gray-12"
              />
              <Input
                type="color"
                value={normalizeHex(currentColors.accent)}
                onChange={(e) => handleColorChange(e.target.value, "accent")}
                className="w-2.5 h-2.5 border-2 border-gray-6 cursor-pointer shrink-0 p-0 absolute right-0.5 top-1/2 -translate-y-1/2"
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
                className="flex-1 px-1 py-0.5 border border-gray-6 bg-gray-1 text-gray-12"
              />
              <Input
                type="color"
                value={normalizeHex(currentColors.gray)}
                onChange={(e) => handleColorChange(e.target.value, "gray")}
                className="w-2.5 h-2.5 border-2 border-gray-6 cursor-pointer shrink-0 p-0 absolute right-0.5 top-1/2 -translate-y-1/2"
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
                className="flex-1 px-1 py-0.5 border border-gray-6 bg-gray-1 text-gray-12"
              />
              <Input
                type="color"
                value={normalizeHex(currentColors.background)}
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
              <DownloadIcon className="icon" />
              Download CSS
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
