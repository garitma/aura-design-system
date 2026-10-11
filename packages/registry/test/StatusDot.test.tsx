import { render, screen } from "@testing-library/react";
import { StatusDot } from "../registry/default/components/ui/StatusDot";
import { describe, it, expect } from "vitest";

describe("StatusDot", () => {
  it("renders a queued dot by default", () => {
    const { container } = render(<StatusDot />);
    const root = container.querySelector('[data-slot="status-dot"]');
    const indicator = container.querySelector(
      '[data-slot="status-dot-indicator"]',
    );
    expect(root).toHaveAttribute("data-state", "queued");
    expect(root).toHaveAttribute("role", "status");
    expect(root).toHaveAttribute("aria-label", "Queued");
    expect(indicator).toHaveClass("bg-status-dot-queued", "size-[10px]");
    expect(screen.queryByText("Queued")).not.toBeInTheDocument();
  });

  it("renders the state label when label is true", () => {
    render(<StatusDot state="ready" label />);
    expect(screen.getByText("Ready")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Ready");
  });

  it("renders a custom label string", () => {
    render(<StatusDot state="building" label="Deploying" />);
    expect(screen.getByText("Deploying")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveAttribute(
      "aria-label",
      "Building",
    );
  });

  it("applies the ring token when ring is set", () => {
    const { container } = render(<StatusDot state="error" ring />);
    const indicator = container.querySelector(
      '[data-slot="status-dot-indicator"]',
    );
    expect(indicator).toHaveClass(
      "bg-status-dot-error",
      "ring-2",
      "ring-status-dot-ring",
    );
  });
});
