"use client";

import * as React from "react";
import { cn } from "@/utils/class-names";

function Toolbar({
  className,
  label = "Toolbar",
  ...props
}: React.ComponentProps<"div"> & { label?: string }) {
  return (
    <div
      role="toolbar"
      aria-label={label}
      data-slot="toolbar"
      className={cn(
        "inline-flex flex-wrap items-center gap-2 rounded-sm border border-gray-6 bg-gray-1 p-0.5",
        className,
      )}
      {...props}
      onKeyDown={(event) => {
        props.onKeyDown?.(event);
        if (event.defaultPrevented) return;
        const items = event.currentTarget.querySelectorAll<HTMLElement>(
          "[data-slot='toolbar-button']:not([disabled])",
        );
        const list = Array.from(items);
        const index = list.indexOf(document.activeElement as HTMLElement);
        if (index < 0) return;
        if (event.key === "ArrowRight") {
          event.preventDefault();
          list[(index + 1) % list.length]?.focus();
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          list[(index - 1 + list.length) % list.length]?.focus();
        }
      }}
    />
  );
}

function ToolbarButton({
  className,
  pressed,
  ...props
}: React.ComponentProps<"button"> & { pressed?: boolean }) {
  return (
    <button
      type="button"
      data-slot="toolbar-button"
      aria-pressed={pressed}
      className={cn(
        "inline-flex size-3 items-center justify-center rounded-sm text-gray-12 hover:bg-gray-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-8 aria-pressed:bg-accent-3",
        className,
      )}
      {...props}
    />
  );
}

function ToolbarSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      data-slot="toolbar-separator"
      className={cn("mx-0.5 h-2 w-px bg-gray-6", className)}
      {...props}
    />
  );
}

export { Toolbar, ToolbarButton, ToolbarSeparator };
