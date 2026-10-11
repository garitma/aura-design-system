import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import {
  Select,
  SelectArrow,
  SelectContent,
  SelectGroup,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "../registry/default/components/ui/Select";

function Menu({
  open = false,
  value,
  position,
}: {
  open?: boolean;
  value?: string;
  position?: "item-aligned" | "popper";
}) {
  return (
    <Select open={open} value={value} onValueChange={() => {}}>
      <SelectTrigger aria-label="Fruit">
        <SelectValue placeholder="Select a fruit..." />
        <SelectIcon />
      </SelectTrigger>
      <SelectContent position={position}>
        <SelectViewport>
          <SelectGroup>
            <SelectLabel>Americas</SelectLabel>
            <SelectItem value="apricot">
              <SelectItemText>Apricot</SelectItemText>
              <SelectItemIndicator />
            </SelectItem>
          </SelectGroup>
          <SelectSeparator />
        </SelectViewport>
        <SelectArrow />
      </SelectContent>
    </Select>
  );
}

beforeAll(() => {
  Element.prototype.scrollIntoView = () => {};
  if (typeof globalThis.ResizeObserver === "undefined") {
    globalThis.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }
});

describe("Select", () => {
  it("matches Input sm, default, and lg heights", () => {
    const { rerender } = render(
      <Select>
        <SelectTrigger aria-label="Fruit" size="sm">
          <SelectValue placeholder="Small" />
        </SelectTrigger>
      </Select>,
    );
    const trigger = () => screen.getByRole("combobox", { name: "Fruit" });
    expect(trigger()).toHaveClass("h-3", "py-0", "px-2", "box-border");
    expect(trigger()).toHaveAttribute("data-size", "sm");

    rerender(
      <Select>
        <SelectTrigger aria-label="Fruit">
          <SelectValue placeholder="Default" />
        </SelectTrigger>
      </Select>,
    );
    expect(trigger()).toHaveClass("h-4", "py-0");
    expect(trigger()).not.toHaveClass("h-3");
    expect(trigger()).toHaveAttribute("data-size", "default");

    rerender(
      <Select>
        <SelectTrigger aria-label="Fruit" size="lg">
          <SelectValue placeholder="Large" />
        </SelectTrigger>
      </Select>,
    );
    expect(trigger()).toHaveClass("h-5", "py-0");
    expect(trigger()).not.toHaveClass("h-4");
  });

  it("lets className override the size height", () => {
    render(
      <Select>
        <SelectTrigger aria-label="Custom" size="sm" className="h-6">
          <SelectValue placeholder="Custom" />
        </SelectTrigger>
      </Select>,
    );
    const trigger = screen.getByRole("combobox", { name: "Custom" });
    expect(trigger).toHaveClass("h-6");
    expect(trigger).not.toHaveClass("h-3");
  });

  it("hovers to gray-3 and uses paragraph type when a value is selected", () => {
    render(<Menu value="apricot" />);
    const trigger = screen.getByRole("combobox", { name: "Fruit" });
    expect(trigger).toHaveClass(
      "hover:bg-gray-3",
      "bg-gray-2",
      "p",
      "font-normal",
      "leading-normal",
    );
    expect(trigger).not.toHaveAttribute("data-placeholder");
  });

  it("paints the placeholder gray-11 while the trigger shows data-placeholder", () => {
    render(<Menu />);
    const trigger = screen.getByRole("combobox", { name: "Fruit" });
    expect(trigger).toHaveAttribute("data-placeholder");
    expect(trigger.className).toContain("data-[placeholder]:text-gray-11");
  });

  it("differentiates the label, pads items, and rings keyboard focus", () => {
    render(<Menu open value="apricot" />);

    expect(screen.getByText("Americas")).toHaveClass("small");
    expect(screen.getByText("Americas")).not.toHaveClass("p");

    const separator = document.querySelector("[data-slot='select-separator']");
    expect(separator).toHaveClass("my-0.5", "h-px", "bg-gray-a6");
    expect(separator).not.toHaveClass("m-0.6");

    const item = screen.getByRole("option", { name: "Apricot" });
    expect(item).toHaveClass(
      "px-2",
      "py-0.5",
      "p",
      "focus-visible:ring-2",
      "focus-visible:ring-inset",
      "focus-visible:ring-accent-8",
    );
    expect(item.className).not.toContain("p-0.5");
  });

  it("mounts SelectArrow only when content position is popper", () => {
    const { rerender } = render(<Menu open value="apricot" />);
    expect(document.querySelector("[data-slot='select-arrow']")).toBeNull();

    rerender(<Menu open value="apricot" position="popper" />);
    expect(document.querySelector("[data-slot='select-arrow']")).toBeInTheDocument();
  });
});
