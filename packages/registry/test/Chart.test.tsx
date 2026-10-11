import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ChartContainer } from "../registry/default/components/ui/Chart";

beforeEach(() => {
  class ResizeObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  vi.stubGlobal("ResizeObserver", ResizeObserverStub);
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
});

describe("ChartContainer colors", () => {
  it("keeps a plain hex color", () => {
    const { container } = render(
      <ChartContainer
        config={{ desktop: { label: "Desktop", color: "#4015ca" } }}
        label="Desktop visitors"
      >
        <div />
      </ChartContainer>
    );

    expect(container.querySelector("style")?.textContent).toContain(
      "--color-desktop: #4015ca;"
    );
  });

  it("keeps a css variable color", () => {
    const { container } = render(
      <ChartContainer
        config={{ desktop: { label: "Desktop", color: "var(--chart-1)" } }}
        label="Desktop visitors"
      >
        <div />
      </ChartContainer>
    );

    expect(container.querySelector("style")?.textContent).toContain(
      "--color-desktop: var(--chart-1);"
    );
  });

  it("drops an unsafe color and warns in development", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { container } = render(
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "red; } body { background: url(https://evil.example)",
          },
        }}
        label="Desktop visitors"
      >
        <div />
      </ChartContainer>
    );

    expect(container.querySelector("style")).toBeNull();
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });
});
