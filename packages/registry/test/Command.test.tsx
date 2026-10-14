import { render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  Command,
  CommandDialog,
  CommandDialogPopup,
  CommandInput,
} from "../registry/default/components/ui/Command";

const source = readFileSync(
  path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "../registry/default/components/ui/Command.tsx",
  ),
  "utf8",
);

const clearedInputChrome = [
  "default",
  "border-0!",
  "bg-transparent!",
  "shadow-none",
  "outline-hidden!",
  "ring-0",
  "focus:border-0!",
  "focus:bg-transparent!",
  "focus:shadow-none",
  "focus:outline-hidden!",
  "focus:ring-0",
  "focus-visible:border-0!",
  "focus-visible:bg-transparent!",
  "focus-visible:shadow-none",
  "focus-visible:outline-hidden!",
  "focus-visible:ring-0",
] as const;

describe("Command", () => {
  it("removes the search input outline, ring, and border, including focus", () => {
    render(
      <Command items={[]}>
        <CommandInput aria-label="Search commands" />
      </Command>,
    );

    const input = screen.getByRole("combobox", { name: "Search commands" });
    expect(input).toHaveClass(...clearedInputChrome);
    expect(input).toHaveClass("h-5", "pl-5!", "placeholder:text-gray-11");
    expect(input).not.toHaveClass(
      "has-focus-visible:ring-0",
      "border-transparent!",
      "before:hidden",
    );
    expect(input.closest("[data-slot='command-input']")).toHaveClass(
      "px-1.5",
      "py-0.5",
    );
  });

  it("keeps the dialog border as the focus context", () => {
    render(
      <CommandDialog open>
        <CommandDialogPopup>
          <Command items={[]}>
            <CommandInput aria-label="Search commands" />
          </Command>
        </CommandDialogPopup>
      </CommandDialog>,
    );

    const popup = document.querySelector("[data-slot='command-dialog-popup']");
    expect(popup).toHaveClass(
      "border",
      "border-gray-a6",
      "rounded-2xl",
      "bg-gray-1",
      "shadow-lg",
    );
    expect(source).toContain('data-slot="command-dialog-popup"');
    expect(source).not.toContain("has-focus-visible:ring-0");
  });
});
