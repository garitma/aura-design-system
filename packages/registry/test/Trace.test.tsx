import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../registry/default/components/ui/Trace";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../registry/default/components/ui/Dialog";

describe("Trace", () => {
  it("renders a row with icon, title, and description", () => {
    render(
      <Trace>
        <TraceLine>
          <TraceIcon>
            <span>icon</span>
          </TraceIcon>
          <TraceTitle>Ran pnpm --version</TraceTitle>
          <TraceDescription>10.2.1</TraceDescription>
        </TraceLine>
      </Trace>
    );

    expect(screen.getByText("Ran pnpm --version")).toBeInTheDocument();
    expect(screen.getByText("10.2.1")).toBeInTheDocument();
    const icon = screen.getByText("icon").parentElement;
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });

  it.each(["running", "error", "pending", "done"] as const)(
    "sets status %s on the row",
    (status) => {
      render(
        <Trace>
          <TraceLine status={status}>
            <TraceTitle>{status}</TraceTitle>
          </TraceLine>
        </Trace>
      );
      expect(screen.getByText(status).closest("[data-slot=trace-line]")).toHaveAttribute(
        "data-status",
        status
      );
    }
  );

  it("expands a row and nests another trace", () => {
    render(
      <Trace>
        <TraceCollapsible>
          <TraceCollapsibleTrigger>
            <TraceLine>
              <TraceTitle>Used 2 sources</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <Trace>
              <TraceLine>
                <TraceTitle>Read pnpm-lock.yaml</TraceTitle>
              </TraceLine>
            </Trace>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      </Trace>
    );

    const trigger = screen.getByRole("button", { name: "Used 2 sources" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Read pnpm-lock.yaml")).toBeInTheDocument();
  });

  it("lets a row be a link", () => {
    render(
      <Trace>
        <a href="https://pnpm.io">
          <TraceLine>
            <TraceTitle>
              pnpm
              <span className="sr-only">, opens in a new tab</span>
            </TraceTitle>
          </TraceLine>
        </a>
      </Trace>
    );

    expect(
      screen.getByRole("link", { name: "pnpm, opens in a new tab" })
    ).toHaveAttribute(
      "href",
      "https://pnpm.io"
    );
  });

  it("opens a dialog from a row", () => {
    render(
      <Trace>
        <Dialog>
          <DialogTrigger>
            <TraceLine>
              <TraceTitle>Searched the web</TraceTitle>
            </TraceLine>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Search results</DialogTitle>
            <DialogDescription>Two sources.</DialogDescription>
          </DialogContent>
        </Dialog>
      </Trace>
    );

    fireEvent.click(screen.getByRole("button", { name: "Searched the web" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Two sources.")).toBeInTheDocument();
  });

  it("stops the running shimmer when reduced motion is preferred", () => {
    const css = readFileSync(
      resolve(__dirname, "../registry/default/styles/trace.css"),
      "utf8"
    );
    expect(css).toMatch(/prefers-reduced-motion:\s*reduce/);
    expect(css).toMatch(/animation:\s*none/);
    expect(css).toMatch(/aura-trace-shimmer/);
  });
});
