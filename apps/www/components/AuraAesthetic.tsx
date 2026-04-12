"use client";

import Link from "next/link";
import {
  Suspense,
  useRef,
  useState,
  useEffect,
  useMemo,
  type CSSProperties,
  type ReactNode,
} from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/Button";
import { Registry, type RegistryName } from "@/components/registry";
import { generateRadixColors } from "@/utils/custom-color-functions";

import { cn } from "@/utils/class-names";

/**
 * Distinct accent/gray/background pairs per column (light + dark).
 * Cycled by column index so the marquee shows multiple Aura palettes.
 */
const THEME_PRESETS = [
  {
    id: "violet",
    light: { accent: "#964CE1", gray: "#16204e", background: "#fcfcfc" },
    dark: { accent: "#bf91ec", gray: "#8b9cce", background: "#0c122b" },
  },
  {
    id: "blue",
    light: { accent: "#3D63DD", gray: "#1c2024", background: "#fcfcfc" },
    dark: { accent: "#6B9FFF", gray: "#a1a7ae", background: "#0d1117" },
  },
  {
    id: "teal",
    light: { accent: "#0d9488", gray: "#1a3d3a", background: "#f7fdfc" },
    dark: { accent: "#2dd4bf", gray: "#6ee7d8", background: "#0c1a18" },
  },
  {
    id: "amber",
    light: { accent: "#d97706", gray: "#422006", background: "#fffbf5" },
    dark: { accent: "#fbbf24", gray: "#fcd34d", background: "#1c1408" },
  },
  {
    id: "rose",
    light: { accent: "#e11d48", gray: "#4c0519", background: "#fff5f7" },
    dark: { accent: "#fb7185", gray: "#fda4af", background: "#1f0a10" },
  },
  {
    id: "green",
    light: { accent: "#16a34a", gray: "#14532d", background: "#f7fef9" },
    dark: { accent: "#4ade80", gray: "#86efac", background: "#0d1f12" },
  },
  {
    id: "indigo",
    light: { accent: "#4f46e5", gray: "#1e1b4b", background: "#fafaff" },
    dark: { accent: "#a5b4fc", gray: "#c7d2fe", background: "#111027" },
  },
  {
    id: "slate",
    light: { accent: "#475569", gray: "#0f172a", background: "#f8fafc" },
    dark: { accent: "#94a3b8", gray: "#cbd5e1", background: "#0f172a" },
  },
] as const;

const AESTHETIC_COLUMNS = [
  ["card-demo-with-actions", "calendar-demo"],
  ["tabs-demo", "toggle-demo", "switch-demo"],
  ["combobox-demo", "progress-demo-simulated", "avatar-demo-avatar-group"],
  ["checkbox-demo-group", "accordion-demo", "separator-demo"],
  ["kbd-demo", "empty-demo"],
  ["hover-card-demo", "radio-group-demo-horizontal"],
  ["button-demo-sizes"],
  ["sortable-demo-card-list"],
] as const satisfies readonly (readonly RegistryName[])[];

/**
 * 1.5× prior `w-23`: `23 × 1.5 = 34.5` spacing units (~448px at 13px base).
 */
const COLUMN_WIDTH_CLASS = "w-34.5 shrink-0";

function buildThemeScopeStyle(
  appearance: "light" | "dark",
  preset: (typeof THEME_PRESETS)[number]
): CSSProperties {
  const src = appearance === "light" ? preset.light : preset.dark;
  const colors = generateRadixColors({
    appearance,
    accent: src.accent,
    gray: src.gray,
    background: src.background,
  });

  const s: Record<string, string> = {};
  colors.accentScale.forEach((val, i) => {
    s[`--accent-${i + 1}`] = val;
  });
  colors.accentScaleAlpha.forEach((val, i) => {
    s[`--accent-a${i + 1}`] = val;
  });
  colors.grayScale.forEach((val, i) => {
    s[`--gray-${i + 1}`] = val;
  });
  colors.grayScaleAlpha.forEach((val, i) => {
    s[`--gray-a${i + 1}`] = val;
  });
  s["--accent-contrast"] = colors.accentContrast;
  s["--accent-surface"] = colors.accentSurface;
  s["--gray-surface"] = colors.graySurface;
  s["--accent-indicator"] = colors.accentScale[8];
  s["--accent-track"] = colors.accentScale[8];
  s["--gray-indicator"] = colors.grayScale[8];
  s["--gray-track"] = colors.grayScale[8];
  s["--primary"] = "var(--accent-9)";
  s["--primary-foreground"] = "var(--accent-contrast)";
  s["--secundary"] = "var(--accent-8)";
  s["--secundary-foreground"] = "var(--accent-contrast)";

  return s as CSSProperties;
}

function RegistryDemo({ name }: { name: RegistryName }) {
  const Component = Registry[name]?.component;
  if (!Component) {
    return (
      <p className="text-xs text-gray-11">
        Missing demo: <code className="font-mono">{name}</code>
      </p>
    );
  }
  return (
    <Suspense
      fallback={
        <div className="flex min-h-6 w-full items-center justify-center text-gray-11">
          <ReloadIcon className="icon animate-spin" aria-hidden />
        </div>
      }
    >
      <Component />
    </Suspense>
  );
}

function DemoTile({ name }: { name: RegistryName }) {
  return (
    <div className="flex w-full min-w-0 flex-col">
      <div className="flex w-full min-w-0 flex-col rounded-lg border border-gray-6 bg-gray-1 p-3 shadow-sm">
        <RegistryDemo name={name} />
      </div>
    </div>
  );
}

function ThemedColumn({
  themeIndex,
  children,
}: {
  themeIndex: number;
  children: ReactNode;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const appearance: "light" | "dark" =
    mounted && resolvedTheme === "dark" ? "dark" : "light";

  const preset = THEME_PRESETS[themeIndex % THEME_PRESETS.length];

  const scopeStyle = useMemo(
    () => buildThemeScopeStyle(appearance, preset),
    [appearance, preset]
  );

  return (
    <div
      className={cn(
        "flex flex-col gap-2 min-h-0 text-gray-12",
        COLUMN_WIDTH_CLASS
      )}
      style={{
        ...scopeStyle,
        colorScheme: appearance === "dark" ? "dark" : "light",
      }}
    >
      {children}
    </div>
  );
}

function AestheticDemoStrip({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 flex-row flex-nowrap items-start gap-2 mr-2"
      {...(ariaHidden ? { "aria-hidden": true as const } : {})}
    >
      {AESTHETIC_COLUMNS.map((column, colIndex) => (
        <ThemedColumn key={colIndex} themeIndex={colIndex}>
          {column.map((name) => (
            <DemoTile key={name} name={name} />
          ))}
        </ThemedColumn>
      ))}
    </div>
  );
}

export default function AuraAesthetic() {
  const [isVisible, setIsVisible] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    const node = marqueeRef.current;
    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []);

  return (
    <section className="border-t border-gray-6 bg-gray-2 overflow-hidden mb-2">
      <div className="relative">
        <div className="text-center smash mb-2 pad">
          <h2 className="font-bold">
            {" "}
            Start with Great Taste, Finish with{" "}
            <span className="text-gray-11">Your Own Flavor</span>.
          </h2>
          <p className="text-gray-11">
            We've compiled the high-quality basic ingredients for your product;
            by adding just a few of taste, your final signature touch. We believe
            you can achieve something truly great.
          </p>
        </div>
        <div
          ref={marqueeRef}
          className={cn(
            "flex justify-center  w-full mask-linear-fade",
            "overflow-hidden"
          )}
        >
          <div className={cn("flex w-max", "animate-marquee items-start")}>
            <AestheticDemoStrip />
            <AestheticDemoStrip ariaHidden />
          </div>
        </div>

        <div
          className={cn(
            "fixed bottom-9 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out",
            isVisible
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none"
          )}
        >
          <Button asChild size="lg" className="shadow-2xl">
            <Link href="/docs">
              Get Started 
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
