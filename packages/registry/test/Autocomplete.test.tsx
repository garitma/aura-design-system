import { render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteItem,
  AutocompletePopup,
  AutocompleteSeparator,
  AutocompleteStatus,
} from "../registry/default/components/ui/Autocomplete";
import { describe, expect, it } from "vitest";
import * as React from "react";

const items = [
  { label: "Apple", value: "apple" },
  { label: "Apricot", value: "apricot" },
];

const source = readFileSync(
  path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "../registry/default/components/ui/Autocomplete.tsx",
  ),
  "utf8",
);

describe("Autocomplete", () => {
  it("paints popup chrome once, on the inner surface", () => {
    render(
      <Autocomplete items={items} open onOpenChange={() => {}}>
        <AutocompleteInput aria-label="Search items" />
        <AutocompletePopup className="shadow-lg">
          <AutocompleteItem value={items[0]}>Apple</AutocompleteItem>
        </AutocompletePopup>
      </Autocomplete>,
    );

    const positioner = document.querySelector(
      "[data-slot='autocomplete-positioner']",
    );
    expect(positioner).toBeTruthy();
    expect(positioner).toHaveClass("z-50", "select-none");
    expect(positioner).not.toHaveClass("bg-gray-1", "border", "shadow-md");

    const surface = positioner?.firstElementChild;
    expect(surface?.tagName).toBe("SPAN");
    expect(surface).toHaveClass(
      "bg-gray-1",
      "border",
      "border-gray-a6",
      "rounded-sm",
      "shadow-lg",
    );
    expect(surface).not.toHaveClass("shadow-md");
  });

  it("lets className override item, separator, label, empty, and status", () => {
    render(
      <Autocomplete items={items} open onOpenChange={() => {}}>
        <AutocompleteInput aria-label="Search items" />
        <AutocompletePopup>
          <AutocompleteGroup>
            <AutocompleteGroupLabel className="text-accent-11">
              Fruit
            </AutocompleteGroupLabel>
          </AutocompleteGroup>
          <AutocompleteItem className="p-2" value={items[0]}>
            Apple
          </AutocompleteItem>
          <AutocompleteSeparator className="m-2" />
          <AutocompleteStatus className="text-accent-11">
            Loading
          </AutocompleteStatus>
        </AutocompletePopup>
      </Autocomplete>,
    );

    expect(screen.getByText("Apple")).toHaveClass("p-2");
    expect(screen.getByText("Apple")).not.toHaveClass("p-0.5");
    expect(screen.getByText("Apple")).toHaveClass("data-disabled:opacity-50");
    expect(screen.getByText("Apple")).not.toHaveClass("data-disabled:opacity-64");

    const separator = document.querySelector(
      "[data-slot='autocomplete-separator']",
    );
    expect(separator).toHaveClass("m-2", "h-px", "bg-gray-a6");
    expect(separator).not.toHaveClass("m-0.5", "m-0.6");

    expect(screen.getByText("Fruit")).toHaveClass("text-accent-11");
    expect(screen.getByText("Fruit")).not.toHaveClass("text-gray-12");
    expect(screen.getByText("Loading")).toHaveClass("text-accent-11");
    expect(screen.getByText("Loading")).not.toHaveClass("text-gray-12");
  });

  it("lets className override the empty state", () => {
    render(
      <Autocomplete items={items} open onOpenChange={() => {}} value="zzzz">
        <AutocompleteInput aria-label="Search items" />
        <AutocompletePopup>
          <AutocompleteEmpty className="text-accent-11">
            No items found.
          </AutocompleteEmpty>
        </AutocompletePopup>
      </Autocomplete>,
    );

    expect(screen.getByText("No items found.")).toHaveClass("text-accent-11");
    expect(screen.getByText("No items found.")).not.toHaveClass("text-gray-12");
  });

  it("dims a disabled item to 50%", () => {
    render(
      <Autocomplete items={items} open onOpenChange={() => {}}>
        <AutocompleteInput aria-label="Search items" />
        <AutocompletePopup>
          <AutocompleteItem disabled value={items[1]}>
            Apricot
          </AutocompleteItem>
        </AutocompletePopup>
      </Autocomplete>,
    );

    const item = screen.getByText("Apricot");
    expect(item).toHaveClass("data-disabled:opacity-50");
    expect(item).not.toHaveClass("data-disabled:opacity-64");
  });

  it("shares trigger and clear classes and tokenizes addon padding", () => {
    render(
      <Autocomplete defaultValue="Apple" items={items}>
        <AutocompleteInput
          aria-label="Search items"
          showClear
          showTrigger
          startAddon={<span data-testid="addon">@</span>}
        />
      </Autocomplete>,
    );

    const addon = screen.getByTestId("addon").parentElement;
    expect(addon).toHaveClass(
      "ps-(--autocomplete-addon-padding)",
      "has-[+[data-size=sm]]:ps-(--autocomplete-addon-padding-sm)",
    );
    expect(addon?.parentElement).toHaveStyle({
      "--autocomplete-addon-padding": "calc(var(--spacing) * 3 - 1px)",
      "--autocomplete-input-padding": "calc(var(--spacing) * 8.5 - 1px)",
    });

    const trigger = document.querySelector("[data-slot='autocomplete-trigger']");
    const clear = document.querySelector("[data-slot='autocomplete-clear']");
    expect(trigger).toHaveClass("size-2.5", "end-0.5", "transition-colors");
    expect(clear).toHaveClass("size-2.5", "end-0.5", "transition-colors");
    expect(source.match(/pointer-coarse:after:min-h-11/g)).toHaveLength(1);
  });

  it("keeps the standalone clear button on the shared classes", () => {
    render(
      <Autocomplete items={items} defaultValue="Apple">
        <AutocompleteInput aria-label="Search items" />
        <AutocompleteClear />
      </Autocomplete>,
    );

    expect(
      document.querySelector("[data-slot='autocomplete-clear']"),
    ).toHaveClass("size-2.5", "end-0.5");
  });

  it("does not ship the off-scale spacing or doubled chrome in source", () => {
    expect(source).not.toContain("m-0.6");
    expect(source).not.toContain("opacity-64");
    expect(source).not.toContain("ps-[calc(--spacing");
    expect(source.match(/shadow-md/g)).toHaveLength(1);
  });
});
