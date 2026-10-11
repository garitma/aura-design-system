import { render, screen } from "@testing-library/react";
import { Input } from "../registry/default/components/ui/Input";
import { describe, expect, it } from "vitest";
import * as React from "react";

describe("Input", () => {
  it("matches Button sm, md, and lg heights", () => {
    const { rerender } = render(<Input aria-label="Small" size="sm" />);
    expect(screen.getByRole("textbox")).toHaveClass("h-3", "py-0", "px-2", "box-border");

    rerender(<Input aria-label="Default" />);
    expect(screen.getByRole("textbox")).toHaveClass("h-4", "py-0");
    expect(screen.getByRole("textbox")).not.toHaveClass("h-3");

    rerender(<Input aria-label="Large" size="lg" />);
    expect(screen.getByRole("textbox")).toHaveClass("h-5", "py-0");
    expect(screen.getByRole("textbox")).not.toHaveClass("h-4");
  });

  it("lets className override the size height", () => {
    render(<Input aria-label="Custom" size="sm" className="h-6" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("h-6");
    expect(input).not.toHaveClass("h-3");
    expect(input).not.toHaveAttribute("size");
  });
});
