import { render, screen } from "@testing-library/react";
import { Calendar } from "../registry/default/components/ui/Calendar";
import { describe, it, expect } from "vitest";

describe("Calendar", () => {
  it("uses icon buttons for navigation and a smaller day type", () => {
    render(<Calendar mode="single" defaultMonth={new Date(2026, 3, 1)} />);

    const previous = screen.getByRole("button", { name: /previous month/i });
    const next = screen.getByRole("button", { name: /next month/i });

    for (const button of [previous, next]) {
      expect(button).toHaveClass("button-menu", "w-3", "h-3");
      expect(button).not.toHaveClass("button-link");
      expect(button.querySelector("svg")).toBeInTheDocument();
    }

    const day = screen.getByRole("button", { name: /April 11/i });
    expect(day).toHaveClass("small");
    expect(day).toHaveAttribute("data-day");
  });
});
