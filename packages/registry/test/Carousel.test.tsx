import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../registry/default/components/ui/Carousel";

beforeAll(() => {
  if (!("ResizeObserver" in globalThis)) {
    class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    vi.stubGlobal("ResizeObserver", ResizeObserver);
  }

  if (!("IntersectionObserver" in globalThis)) {
    class IntersectionObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    }
    vi.stubGlobal("IntersectionObserver", IntersectionObserver);
  }

  if (typeof window.matchMedia !== "function") {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }),
    });
  }
});

function HorizontalCarousel() {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem>One</CarouselItem>
        <CarouselItem>Two</CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

describe("Carousel", () => {
  it("spaces slides by one unit", () => {
    render(<HorizontalCarousel />);

    const track = document.querySelector("[data-slot=carousel-content] > div");
    const slide = screen.getAllByRole("group")[0];

    expect(track).toHaveClass("-ml-1");
    expect(track).not.toHaveClass("-ml-4");
    expect(slide).toHaveClass("pl-1");
    expect(slide).not.toHaveClass("pl-4");
  });

  it("spaces vertical slides by one unit", () => {
    render(
      <Carousel orientation="vertical">
        <CarouselContent>
          <CarouselItem>One</CarouselItem>
        </CarouselContent>
      </Carousel>
    );

    const track = document.querySelector("[data-slot=carousel-content] > div");
    const slide = screen.getByRole("group");

    expect(track).toHaveClass("-mt-1");
    expect(track).not.toHaveClass("-mt-4");
    expect(slide).toHaveClass("pt-1");
    expect(slide).not.toHaveClass("pt-4");
  });

  it("keeps horizontal arrows beside the content from sm and in flow below it", () => {
    render(<HorizontalCarousel />);

    const region = screen.getByRole("region");
    const previous = screen.getByRole("button", { name: "Previous slide" });
    const next = screen.getByRole("button", { name: "Next slide" });
    const viewport = document.querySelector("[data-slot=carousel-content]");

    expect(region).toHaveClass("max-sm:flex", "max-sm:flex-wrap", "max-sm:justify-center", "max-sm:gap-1");
    expect(viewport).toHaveClass("max-sm:basis-full", "max-sm:order-1");
    expect(previous).toHaveClass(
      "max-sm:static",
      "max-sm:order-2",
      "sm:absolute",
      "sm:-left-12"
    );
    expect(previous).not.toHaveClass("-left-12", "absolute");
    expect(next).toHaveClass("max-sm:static", "sm:-right-12");
    expect(next).not.toHaveClass("-right-12");
  });

  it("scrolls a horizontal carousel with ArrowLeft and ArrowRight", () => {
    let api: CarouselApi | undefined;
    render(
      <Carousel
        setApi={(next) => {
          api = next;
        }}
      >
        <CarouselContent>
          <CarouselItem>One</CarouselItem>
          <CarouselItem>Two</CarouselItem>
        </CarouselContent>
      </Carousel>
    );

    const scrollPrev = vi.spyOn(api!, "scrollPrev");
    const scrollNext = vi.spyOn(api!, "scrollNext");
    const region = screen.getByRole("region");

    fireEvent.keyDown(region, { key: "ArrowLeft" });
    fireEvent.keyDown(region, { key: "ArrowRight" });
    fireEvent.keyDown(region, { key: "ArrowDown" });

    expect(scrollPrev).toHaveBeenCalledTimes(1);
    expect(scrollNext).toHaveBeenCalledTimes(1);
  });

  it("scrolls a vertical carousel with ArrowUp and ArrowDown", () => {
    let api: CarouselApi | undefined;
    render(
      <Carousel
        orientation="vertical"
        setApi={(next) => {
          api = next;
        }}
      >
        <CarouselContent>
          <CarouselItem>One</CarouselItem>
          <CarouselItem>Two</CarouselItem>
        </CarouselContent>
      </Carousel>
    );

    const scrollPrev = vi.spyOn(api!, "scrollPrev");
    const scrollNext = vi.spyOn(api!, "scrollNext");
    const region = screen.getByRole("region");

    fireEvent.keyDown(region, { key: "ArrowUp" });
    fireEvent.keyDown(region, { key: "ArrowDown" });
    fireEvent.keyDown(region, { key: "ArrowRight" });

    expect(scrollPrev).toHaveBeenCalledTimes(1);
    expect(scrollNext).toHaveBeenCalledTimes(1);
  });

  it("removes the reInit listener on cleanup", () => {
    let api: CarouselApi | undefined;
    const { unmount } = render(
      <Carousel
        setApi={(next) => {
          api = next;
        }}
      >
        <CarouselContent>
          <CarouselItem>One</CarouselItem>
        </CarouselContent>
      </Carousel>
    );

    const off = vi.spyOn(api!, "off");
    unmount();

    expect(off).toHaveBeenCalledWith("select", expect.any(Function));
    expect(off).toHaveBeenCalledWith("reInit", expect.any(Function));
  });
});
