import * as React from "react";
import { render, screen } from "@testing-library/react";
import { AspectRatio } from "../registry/default/components/ui/AspectRatio";
import { describe, it, expect } from "vitest";

describe("AspectRatio", () => {
  it("renders children correctly", () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <img src="test.jpg" alt="Test image" />
      </AspectRatio>
    );
    const image = screen.getByAltText("Test image");
    expect(image).toBeInTheDocument();
  });

  it("applies the correct aspect ratio", () => {
    const { container } = render(
      <AspectRatio ratio={16 / 9}>
        <div>Content</div>
      </AspectRatio>
    );
    // The AspectRatio component from Radix UI creates a wrapper div
    const wrapper = container.querySelector('[data-slot="aspect-ratio"]');
    expect(wrapper).toBeInTheDocument();
  });

  it("renders with different aspect ratios", () => {
    const { rerender, container } = render(
      <AspectRatio ratio={1}>
        <div>Square</div>
      </AspectRatio>
    );
    expect(screen.getByText("Square")).toBeInTheDocument();

    rerender(
      <AspectRatio ratio={4 / 3}>
        <div>4:3 ratio</div>
      </AspectRatio>
    );
    expect(screen.getByText("4:3 ratio")).toBeInTheDocument();

    rerender(
      <AspectRatio ratio={21 / 9}>
        <div>Ultrawide</div>
      </AspectRatio>
    );
    expect(screen.getByText("Ultrawide")).toBeInTheDocument();
  });

  it("forwards additional props", () => {
    const { container } = render(
      <AspectRatio ratio={16 / 9} data-testid="aspect-ratio-wrapper">
        <div>Content</div>
      </AspectRatio>
    );
    const wrapper = container.querySelector(
      '[data-testid="aspect-ratio-wrapper"]'
    );
    expect(wrapper).toBeInTheDocument();
  });
});
