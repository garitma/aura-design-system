"use client";

import Link from "next/link";
import {
  Suspense,
  useState,
  useEffect,
  useMemo,
  type CSSProperties,
  type ReactNode,
} from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ExternalLink, Pause, Play } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/Button";
import { Registry, type RegistryName } from "@/components/registry";
import { generateRadixColors } from "@/utils/custom-color-functions";

import { cn } from "@/utils/class-names";


const AESTHETIC_COLUMNS = [
  ["card-demo-with-actions", "calendar-demo"],
  ["tabs-demo", "toggle-demo", "switch-demo"],
  ["combobox-demo", "progress-demo-simulated", "avatar-demo-avatar-group"],
  ["checkbox-demo-group", "accordion-demo"],
  ["kbd-demo", "empty-demo"],
  ["hover-card-demo", "radio-group-demo-horizontal", "separator-demo"],
  ["button-demo-sizes"],
  ["sortable-demo-card-list"],
  ["alert-demo", "skeleton-demo"],
  ["slider-demo", "stepper-demo"],
  ["select-demo", "collapsible-demo", "popover-demo"],
  ["carousel-demo", "tooltip-demo"],
  ["toggle-group-demo", "button-group-demo"],
  [ "scroll-area-demo"],
  ["navigation-menu-demo", "grid-demo"],
  ["card-demo-simple-card", "aspect-ratio-demo"],
  ["dialog-demo", "autocomplete-demo"],
  ["menubar-demo", "dropdown-menu-demo"],
  ["empty-demo-with-actions", "context-menu-demo"],
] as const satisfies readonly (readonly RegistryName[])[];

/**
 * 1.5× prior `w-23`: `23 × 1.5 = 34.5` spacing units (~448px at 13px base).
 */
const COLUMN_WIDTH_CLASS = "w-40 shrink-0";

/** Maps registry demo keys (e.g. `card-demo-with-actions`) to `/docs/components/[slug]`. */
function registryNameToDocsSlug(name: RegistryName): string {
  const i = name.indexOf("-demo");
  if (i === -1) return name;
  return name.slice(0, i);
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
  const slug = registryNameToDocsSlug(name);
  const docsHref = `/docs/components/${slug}`;

  return (
    <div className="flex w-full min-w-0 flex-col group relative">
      <div className="flex w-full min-w-0 flex-col overflow-hidden rounded-lg border border-gray-6 bg-gray-1 shadow-sm p-1 items-end">
        <Link
          href={docsHref}
          className="group-hover:opacity-100 opacity-0 transition-opacity absolute top-1 right-1"
        >
          <Button variant="pill" size="icon">
            <ExternalLink className="icon" aria-hidden />
          </Button>
          <span className="sr-only"> — open documentation</span>
        </Link>
        <div className="flex min-h-0 w-full min-w-0 flex-col p-3">
          <RegistryDemo name={name} />
        </div>
      </div>
    </div>
  );
}

function ThemedColumn({ children }: { children: ReactNode }) {
  
  return (
    <div
      className={cn(
        "flex flex-col gap-2 min-h-0 text-gray-12",
        COLUMN_WIDTH_CLASS,
      )}
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
        <ThemedColumn key={colIndex}>
          {column.map((name) => (
            <DemoTile key={name} name={name} />
          ))}
        </ThemedColumn>
      ))}
    </div>
  );
}

export default function AuraAesthetic() {
  const [marqueePlaying, setMarqueePlaying] = useState(true);

  return (
    <section className="border-t border-gray-6 bg-gray-2 overflow-hidden mb-2">
      <div className="relative">
        <div className="smash mb-2 pad">
          <h2 className="text-center font-bold">
            {" "}
            Start with Great Taste, Finish with{" "}
            <span className="text-gray-11">Your Own Flavor</span>.
          </h2>
          <div>
            <p className="text-gray-11 text-balance md:flex-1 md:min-w-0 md:pt-0.5">
              We've compiled the high-quality basic ingredients for your
              product; by adding just a few of taste, your final signature
              touch. We believe you can achieve something truly great.
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg">
                <Link href="/docs">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
        <div
          className={cn(
            "flex w-full justify-center mask-linear-fade",
            "overflow-hidden",
          )}
        >
          <div
            className={cn(
              "flex w-max items-start",
              marqueePlaying && "animate-marquee",
            )}
          >
            <AestheticDemoStrip />
            <AestheticDemoStrip ariaHidden />
          </div>
        </div>
      </div>
    </section>
  );
}
