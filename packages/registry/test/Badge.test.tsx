import { render, screen } from "@testing-library/react";
import { Badge, badgeVariants } from "../registry/default/components/ui/Badge";
import { describe, it, expect } from "vitest";

describe("Badge", () => {
  it("uses the 13px scale and the xs type style", () => {
    render(<Badge>Badge</Badge>);
    const badge = screen.getByText("Badge");
    expect(badge).toHaveClass("px-1", "py-0.5", "gap-0.5", "xs");
    expect(badge.className).not.toMatch(/text-xs|px-2\.5|ring-ring/);
    expect(badge).toHaveClass("focus-visible:ring-accent-a8");
  });

  it("gives outline an explicit border token", () => {
    render(<Badge variant="outline">Outline</Badge>);
    expect(screen.getByText("Outline")).toHaveClass(
      "border-gray-12",
      "text-gray-12",
    );
  });

  it("aliases destructive to the danger status", () => {
    const destructive = badgeVariants({ variant: "destructive" });
    const danger = badgeVariants({ status: "danger" });
    for (const token of [
      "bg-danger",
      "text-danger-contrast",
      "border-transparent",
    ]) {
      expect(destructive).toContain(token);
      expect(danger).toContain(token);
    }
  });

  it("renders every status", () => {
    const { rerender } = render(<Badge status="success">Success</Badge>);
    expect(screen.getByText("Success")).toHaveClass("bg-success");

    rerender(<Badge status="warning">Warning</Badge>);
    expect(screen.getByText("Warning")).toHaveClass("bg-warning");

    rerender(<Badge status="danger">Danger</Badge>);
    expect(screen.getByText("Danger")).toHaveClass("bg-danger");

    rerender(<Badge status="info">Info</Badge>);
    expect(screen.getByText("Info")).toHaveClass("bg-info");
  });
});
