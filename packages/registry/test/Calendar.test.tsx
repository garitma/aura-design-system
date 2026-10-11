import { render, screen } from "@testing-library/react";
import { Calendar } from "../registry/default/components/ui/Calendar";
import { describe, it, expect } from "vitest";

const APRIL = new Date(2026, 3, 1);

describe("Calendar", () => {
  it("uses icon buttons for navigation and a smaller day type", () => {
    render(<Calendar mode="single" defaultMonth={APRIL} />);

    const previous = screen.getByRole("button", { name: /previous month/i });
    const next = screen.getByRole("button", { name: /next month/i });

    for (const button of [previous, next]) {
      expect(button).toHaveClass("button-menu", "w-3", "h-3", "no-underline");
      expect(button).not.toHaveClass("button-link");
      expect(button.querySelector("svg")).toBeInTheDocument();
    }

    const day = screen.getByRole("button", { name: /April 11/i });
    expect(day).toHaveClass("small");
    expect(day).toHaveAttribute("data-day");
    expect(day.className).not.toContain("[&>span]:text-xs");
    expect(day.className).not.toContain("ring-[3px]");

    const root = day.closest("[data-slot=calendar]");
    expect(root?.className).toContain("--aura-button-radius");
    expect(root?.className).not.toContain("--radius-sm");

    expect(screen.getByText("Su")).toHaveClass("xs-regular");
    expect(screen.getByText("Su")).not.toHaveClass("text-xs");
  });

  it("shows a short month and a dropdown chevron", () => {
    render(
      <Calendar
        mode="single"
        captionLayout="dropdown"
        defaultMonth={APRIL}
        startMonth={new Date(2026, 0, 1)}
        endMonth={new Date(2026, 11, 1)}
      />,
    );

    const monthLabel = screen
      .getAllByText("Apr")
      .find((node) => node.classList.contains("cn-calendar-caption-label"));
    expect(monthLabel).toBeDefined();
    expect(monthLabel?.querySelector("svg")).toHaveClass(
      "calendar-dropdown-chevron",
      "icon",
    );
    expect(
      screen.getByRole("button", { name: /previous month/i }).querySelector("svg"),
    ).not.toHaveClass("calendar-dropdown-chevron");
  });

  it("keeps a range endpoint rounded beside a square middle band", () => {
    render(
      <Calendar
        mode="range"
        defaultMonth={APRIL}
        today={new Date(2026, 3, 8)}
        selected={{ from: new Date(2026, 3, 8), to: new Date(2026, 3, 14) }}
      />,
    );

    const start = screen.getByRole("button", { name: /April 8/i });
    const middle = screen.getByRole("button", { name: /April 9/i });
    const end = screen.getByRole("button", { name: /April 14/i });
    const startCell = start.closest("td");
    const endCell = end.closest("td");

    expect(start).toHaveClass("data-[range-start=true]:rounded-(--cell-radius)");
    expect(start).toHaveClass("data-[range-start=true]:bg-accent-9");
    expect(middle).toHaveClass("data-[range-middle=true]:rounded-none");
    expect(middle).toHaveClass("data-[range-middle=true]:bg-gray-3");
    expect(end).toHaveClass("data-[range-end=true]:rounded-(--cell-radius)");

    expect(startCell?.className).not.toContain("after:");
    expect(endCell?.className).not.toContain("after:");
    expect(startCell?.classList.contains("bg-gray-3")).toBe(false);
    expect(start.classList.contains("bg-gray-3")).toBe(false);
    expect(endCell?.classList.contains("bg-gray-3")).toBe(false);
    expect(middle.closest("td")?.className).toContain("rounded-none");
    expect(middle.closest("td")?.className).toContain("bg-gray-3");
  });

  it("marks an unselected today with gray-3", () => {
    render(
      <Calendar
        mode="single"
        defaultMonth={APRIL}
        today={new Date(2026, 3, 11)}
      />,
    );

    expect(screen.getByRole("button", { name: /April 11/i })).toHaveClass("bg-gray-3");
  });

  it("draws disabled days in gray-11 with a strike and no fade", () => {
    render(
      <Calendar
        mode="single"
        defaultMonth={APRIL}
        disabled={{ before: new Date(2026, 3, 10) }}
      />,
    );

    const day = screen.getByRole("button", { name: /April 9/i });
    expect(day).toBeDisabled();
    expect(day).toHaveClass("text-gray-11", "line-through", "opacity-100");
    expect(day).not.toHaveClass("opacity-50");
    expect(day.closest("td")).not.toHaveClass("opacity-50");
    expect(day.closest("td")).toHaveClass("line-through", "text-gray-11");
  });
});
