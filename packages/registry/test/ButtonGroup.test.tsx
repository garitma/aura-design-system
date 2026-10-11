import { readFileSync } from "node:fs";
import path from "node:path";
import { render, screen } from "@testing-library/react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { describe, it, expect, vi } from "vitest";
import { Button } from "../registry/default/components/ui/Button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "../registry/default/components/ui/ButtonGroup";

describe("ButtonGroup", () => {
  it("warns when an icon-only button has no accessible name", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <ButtonGroup>
        <Button>
          <DotsHorizontalIcon className="icon" />
        </Button>
      </ButtonGroup>,
    );
    expect(warn).toHaveBeenCalledWith(
      "Button: an icon-only button in a ButtonGroup needs an aria-label.",
    );
    warn.mockRestore();
  });

  it("passes default size down as md and icon-md", () => {
    render(
      <ButtonGroup aria-label="Snooze">
        <Button variant="pill">Snooze</Button>
        <Button variant="pill" aria-label="More options">
          <DotsHorizontalIcon className="icon" />
        </Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole("button", { name: "Snooze" })).toHaveClass("h-4");
    expect(screen.getByRole("button", { name: "More options" })).toHaveClass(
      "w-4",
      "h-4",
      "p-0",
    );
  });

  it("passes sm down as sm and icon-sm", () => {
    render(
      <ButtonGroup size="sm" aria-label="Snooze">
        <Button variant="pill">Snooze</Button>
        <Button variant="pill" aria-label="More options">
          <DotsHorizontalIcon className="icon" />
        </Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole("button", { name: "Snooze" })).toHaveClass("h-3");
    expect(screen.getByRole("button", { name: "More options" })).toHaveClass(
      "w-3",
      "h-3",
      "p-0",
    );
    expect(screen.getByRole("group", { name: "Snooze" })).toHaveAttribute(
      "data-size",
      "sm",
    );
  });

  it("keeps an explicit button size", () => {
    render(
      <ButtonGroup size="sm">
        <Button size="lg">Large</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole("button", { name: "Large" })).toHaveClass("h-5");
  });

  it("sizes ButtonGroupText to the group", () => {
    render(
      <>
        <ButtonGroup>
          <ButtonGroupText>Amount</ButtonGroupText>
        </ButtonGroup>
        <ButtonGroup size="sm">
          <ButtonGroupText>Small</ButtonGroupText>
        </ButtonGroup>
      </>,
    );
    const amount = screen.getByText("Amount");
    const small = screen.getByText("Small");
    expect(amount).toHaveClass("h-4", "bg-gray-2", "rounded-sm");
    expect(amount).not.toHaveClass("bg-muted", "shadow-xs", "text-sm");
    expect(small).toHaveClass("h-3");
  });

  it("paints the separator with gray-6", () => {
    const { container } = render(<ButtonGroupSeparator />);
    const separator = container.querySelector(
      "[data-slot='button-group-separator']",
    );
    expect(separator).toHaveClass("bg-gray-6");
    expect(separator).not.toHaveClass("bg-input");
  });

  it("squares joined corners and divides fill buttons in accent-10", () => {
    const css = [
      path.join(process.cwd(), "styles/main.css"),
      path.join(process.cwd(), "registry/default/styles/main.css"),
    ]
      .map((file) => readFileSync(file, "utf8"))
      .join("\n");
    expect(css).toContain(
      '[data-slot="button-group"][data-orientation="horizontal"] > .button:not(:first-child)',
    );
    expect(css).toContain("border-top-left-radius: 0");
    expect(css).toContain("border-inline-end-color: var(--accent-10)");
    expect(css).toContain("border-block-end-color: var(--accent-10)");
  });
});
