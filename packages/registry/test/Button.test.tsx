import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../registry/default/components/ui/Button";
import { describe, it, expect, vi } from "vitest";
import * as React from "react";

describe("Button", () => {
  it("renders correctly with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("button-fill");
    expect(button).toHaveClass("h-4");
    expect(button.className).toContain("focus-visible:[outline:var(--aura-outline)]");
    expect(button.className).toContain("[&_svg]:size-[1em]");
  });

  it("applies variant classes correctly", () => {
    const { rerender } = render(<Button variant="fill">Fill</Button>);
    expect(screen.getByRole("button", { name: "Fill" })).toHaveClass(
      "button-fill"
    );

    rerender(<Button variant="pill">Pill</Button>);
    expect(screen.getByRole("button", { name: "Pill" })).toHaveClass(
      "button-pill"
    );

    rerender(<Button variant="link">Link</Button>);
    expect(screen.getByRole("button", { name: "Link" })).toHaveClass(
      "button-link"
    );

    rerender(<Button variant="menu">Menu</Button>);
    expect(screen.getByRole("button", { name: "Menu" })).toHaveClass(
      "button-menu"
    );
  });

  it("applies size classes correctly", () => {
    const { rerender } = render(<Button size="xs">XS</Button>);
    expect(screen.getByRole("button", { name: "XS" })).toHaveClass("h-2.5");

    rerender(<Button size="sm">SM</Button>);
    expect(screen.getByRole("button", { name: "SM" })).toHaveClass("h-3");

    rerender(<Button size="md">MD</Button>);
    expect(screen.getByRole("button", { name: "MD" })).toHaveClass("h-4");

    rerender(<Button size="lg">LG</Button>);
    expect(screen.getByRole("button", { name: "LG" })).toHaveClass("h-5");

    rerender(<Button size="xl">XL</Button>);
    expect(screen.getByRole("button", { name: "XL" })).toHaveClass("h-6");

    rerender(<Button size="icon" aria-label="Icon" />);
    expect(screen.getByRole("button", { name: "Icon" })).toHaveClass(
      "w-3",
      "h-3",
      "p-0",
    );

    rerender(<Button size="icon-sm" aria-label="Icon small" />);
    expect(screen.getByRole("button", { name: "Icon small" })).toHaveClass(
      "w-3",
      "h-3",
      "p-0",
    );

    rerender(<Button size="icon-md" aria-label="Icon medium" />);
    expect(screen.getByRole("button", { name: "Icon medium" })).toHaveClass(
      "w-4",
      "h-4",
      "p-0",
    );
  });

  it("handles onClick event", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole("button", { name: "Click me" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Click me</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("renders as a child when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );
    const link = screen.getByRole("link", { name: "Link Button" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
    expect(link).toHaveClass("button-fill");
  });

  it("handles isDisabled prop", () => {
    render(<Button isDisabled>Disabled Button</Button>);
    const button = screen.getByRole("button", { name: "Disabled Button" });
    expect(button).toBeDisabled();
    expect(button).not.toHaveClass("opacity-50");
    expect(button).not.toHaveClass("cursor-not-allowed");
    expect(button).not.toHaveAttribute("data-loading");
  });

  it("keeps loading non-interactive without the disabled fade", () => {
    render(<Button isLoading>Loading Button</Button>);
    const button = screen.getByRole("button", { name: "Loading Button" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("data-loading", "true");
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).not.toHaveClass("opacity-50");
    expect(button).not.toHaveClass("cursor-not-allowed");
    const icon = button.querySelector(".animate-spin");
    expect(icon).toBeInTheDocument();
  });

  it("does not render label and children twice", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Button label="Save">Save</Button>);
    expect(screen.getByRole("button", { name: "Save" }).textContent).toBe(
      "Save",
    );
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();

    render(<Button label="Only label" />);
    expect(screen.getByRole("button", { name: "Only label" })).toBeInTheDocument();
  });

  it("keeps deprecated mode and default variant working", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { rerender } = render(<Button mode="pill">Mode</Button>);
    expect(screen.getByRole("button", { name: "Mode" })).toHaveClass(
      "button-pill",
    );

    rerender(<Button variant="default">Legacy</Button>);
    expect(screen.getByRole("button", { name: "Legacy" })).toHaveClass(
      "button-fill",
    );
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });
});

