import { render, screen, fireEvent } from "@testing-library/react";
import { Banner } from "../registry/default/components/ui/Banner";
import { Button } from "../registry/default/components/ui/Button";
import { describe, it, expect, vi } from "vitest";
import * as React from "react";

describe("Banner", () => {
  it("renders a static banner without a live region", () => {
    render(<Banner>A new color scale is ready.</Banner>);
    const banner = document.querySelector("[data-slot=banner]");
    expect(banner).toBeInTheDocument();
    expect(banner).not.toHaveAttribute("role");
    expect(banner).not.toHaveAttribute("aria-live");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.getByText("A new color scale is ready.").tagName).toBe("P");
  });

  it("announces when role or aria-live is set", () => {
    const { rerender } = render(<Banner role="status">Ready</Banner>);
    expect(screen.getByRole("status")).toHaveTextContent("Ready");

    rerender(<Banner aria-live="polite">Ready</Banner>);
    expect(document.querySelector("[data-slot=banner]")).toHaveAttribute(
      "aria-live",
      "polite",
    );
    expect(document.querySelector("[data-slot=banner]")).not.toHaveAttribute(
      "role",
    );
  });

  it("stacks on narrow widths and rows from the sm breakpoint", () => {
    render(<Banner onDismiss={() => undefined}>Ready</Banner>);
    expect(document.querySelector("[data-slot=banner-layout]")).toHaveClass(
      "flex-col",
      "items-stretch",
      "gap-0.5",
      "p-1",
      "sm:flex-row",
      "sm:items-center",
      "sm:gap-1",
      "sm:px-1.5",
    );
    expect(document.querySelector("[data-slot=banner-row]")).toHaveClass(
      "flex",
      "items-start",
      "gap-1",
    );
  });

  it("uses Button icon size on dismiss and keeps accent hover and focus", () => {
    const onDismiss = vi.fn();
    const { rerender } = render(<Banner onDismiss={onDismiss}>Ready</Banner>);
    const dismiss = screen.getByRole("button", { name: "Dismiss banner" });
    expect(dismiss).toHaveClass("w-3", "h-3", "p-0");
    expect(dismiss).toHaveClass(
      "hover:bg-accent-4",
      "focus-visible:ring-2",
      "focus-visible:ring-accent-8",
    );
    expect(dismiss.querySelector(".icon")).toBeInTheDocument();
    fireEvent.click(dismiss);
    expect(onDismiss).toHaveBeenCalledTimes(1);

    rerender(
      <Banner dismissState="hover" onDismiss={() => undefined}>
        Hover
      </Banner>,
    );
    expect(screen.getByRole("button", { name: "Dismiss banner" })).toHaveClass(
      "bg-accent-4",
    );
    rerender(
      <Banner dismissState="focus" onDismiss={() => undefined}>
        Focus
      </Banner>,
    );
    expect(screen.getByRole("button", { name: "Dismiss banner" })).toHaveClass(
      "ring-2",
      "ring-accent-8",
    );
  });

  it("omits the dismiss button when onDismiss is absent", () => {
    render(
      <Banner action={<Button variant="pill" size="sm">Review</Button>}>
        Ready
      </Banner>,
    );
    expect(
      screen.queryByRole("button", { name: "Dismiss banner" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Review" })).toHaveClass(
      "button-pill",
      "h-3",
    );
  });

  it("lines tones up with Alert tokens", () => {
    const { rerender } = render(<Banner tone="info">Info</Banner>);
    const banner = () => document.querySelector("[data-slot=banner]");

    expect(banner()).toHaveClass(
      "bg-info",
      "text-info-contrast",
      "border-info-contrast",
    );

    rerender(<Banner tone="success">Success</Banner>);
    expect(banner()).toHaveClass(
      "bg-success",
      "text-success-contrast",
      "border-success-contrast",
    );

    rerender(<Banner tone="warning">Warning</Banner>);
    expect(banner()).toHaveClass(
      "bg-warning",
      "text-warning-contrast",
      "border-warning-contrast",
    );

    rerender(<Banner tone="danger">Danger</Banner>);
    expect(banner()).toHaveClass(
      "bg-danger",
      "text-danger-contrast",
      "border-danger-contrast",
    );

    rerender(<Banner>Default</Banner>);
    expect(banner()).toHaveClass(
      "bg-accent-3",
      "border-accent-7",
      "text-gray-12",
    );
  });

  it("lets the message hold block content", () => {
    const { rerender } = render(
      <Banner messageClassName="message-slot">Plain</Banner>,
    );
    expect(screen.getByText("Plain")).toHaveClass("message-slot", "flex-1");

    rerender(
      <Banner asChild>
        <div>
          <p>Title</p>
          <p>Body</p>
        </div>
      </Banner>,
    );
    const message = document.querySelector("[data-slot=banner-message]");
    expect(message?.tagName).toBe("DIV");
    expect(message).toHaveClass("flex-1");
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
  });
});
