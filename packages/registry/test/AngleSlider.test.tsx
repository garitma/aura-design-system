import type * as React from "react";
import { render, screen } from "@testing-library/react";
import {
  AngleSlider,
  AngleSliderRange,
  AngleSliderThumb,
  AngleSliderTrack,
  AngleSliderValue,
} from "../registry/default/components/ui/AngleSlider";
import { describe, it, expect } from "vitest";

function renderSlider(props: React.ComponentProps<typeof AngleSlider> = {}) {
  return render(
    <AngleSlider defaultValue={[45]} {...props}>
      <AngleSliderTrack>
        <AngleSliderRange />
      </AngleSliderTrack>
      <AngleSliderThumb />
      <AngleSliderValue />
    </AngleSlider>,
  );
}

describe("AngleSlider", () => {
  it("defaults max to 360", () => {
    renderSlider();
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuemax", "360");
  });

  it("keeps an explicit max", () => {
    renderSlider({ max: 100 });
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuemax", "100");
  });

  it("sizes the root from size and padding variables", () => {
    const { container } = renderSlider();
    const root = container.querySelector('[data-slot="angle-slider"]');
    const style = root?.getAttribute("style") ?? "";
    expect(style).toContain("--angle-slider-size: 60px");
    expect(style).toContain(
      "--angle-slider-padding: calc(var(--spacing) * 1.5)",
    );
    expect(style).toContain(
      "width: calc((var(--angle-slider-size) + var(--angle-slider-padding)) * 2)",
    );
    expect(style).toContain(
      "height: calc((var(--angle-slider-size) + var(--angle-slider-padding)) * 2)",
    );
    expect(style).not.toContain("160px");
  });

  it("places the track from the resolved padding", () => {
    const { container } = renderSlider();
    const rail = container.querySelector('[data-slot="angle-slider-track-rail"]');
    expect(rail).toHaveAttribute("cx", "79.5");
    expect(rail).toHaveAttribute("cy", "79.5");
    expect(rail).toHaveAttribute("r", "60");
  });

  it("uses one stroke class on the rail", () => {
    const { container } = renderSlider();
    const rail = container.querySelector('[data-slot="angle-slider-track-rail"]');
    expect(rail).toHaveClass("stroke-gray-6");
    expect(rail).not.toHaveAttribute("stroke");
  });

  it("uses the accent alpha step for the thumb ring", () => {
    renderSlider();
    const thumb = screen.getByRole("slider");
    expect(thumb).toHaveClass("ring-accent-a6");
    expect(thumb.className).not.toContain("ring-accent-8/");
  });

  it("centers the value with the size and padding variables", () => {
    const { container } = renderSlider();
    const value = container.querySelector('[data-slot="angle-slider-value"]');
    const style = value?.getAttribute("style") ?? "";
    expect(style).toContain(
      "left: calc(var(--angle-slider-size) + var(--angle-slider-padding))",
    );
    expect(style).toContain(
      "top: calc(var(--angle-slider-size) + var(--angle-slider-padding))",
    );
  });
});
