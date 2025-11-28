import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../registry/default/components/ui/Collapsible";
import { describe, it, expect, vi } from "vitest";
import * as React from "react";

describe("Collapsible", () => {
  it("renders correctly with default props", () => {
    const { container } = render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    const collapsible = container.querySelector('[data-slot="collapsible"]');
    expect(collapsible).toBeInTheDocument();
  });

  it("renders CollapsibleTrigger as a button", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    const trigger = screen.getByRole("button", { name: "Toggle" });
    expect(trigger).toBeInTheDocument();
  });

  it("renders CollapsibleContent", () => {
    const { container } = render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content text</CollapsibleContent>
      </Collapsible>
    );
    const content = container.querySelector(
      '[data-slot="collapsible-content"]'
    );
    expect(content).toBeInTheDocument();
  });

  it("applies animation classes to CollapsibleContent", () => {
    const { container } = render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    const content = container.querySelector(
      '[data-slot="collapsible-content"]'
    );
    expect(content).toHaveClass(
      "overflow-hidden",
      "data-[state=closed]:animate-collapsible-up",
      "data-[state=open]:animate-collapsible-down"
    );
  });

  it("applies custom className to CollapsibleContent", () => {
    const { container } = render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent className="custom-content-class">
          Content
        </CollapsibleContent>
      </Collapsible>
    );
    const content = container.querySelector(
      '[data-slot="collapsible-content"]'
    );
    expect(content).toHaveClass("custom-content-class");
    expect(content).toHaveClass("overflow-hidden");
  });

  it("starts closed by default", () => {
    const { container } = render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    const content = container.querySelector(
      '[data-slot="collapsible-content"]'
    );
    expect(content).toHaveAttribute("data-state", "closed");
  });

  it("starts open when defaultOpen is true", () => {
    const { container } = render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    const content = container.querySelector(
      '[data-slot="collapsible-content"]'
    );
    expect(content).toHaveAttribute("data-state", "open");
  });

  it("toggles open/closed state when trigger is clicked", () => {
    const { container } = render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    const trigger = screen.getByRole("button", { name: "Toggle" });
    const content = container.querySelector(
      '[data-slot="collapsible-content"]'
    );

    // Initially closed
    expect(content).toHaveAttribute("data-state", "closed");

    // Click to open
    fireEvent.click(trigger);
    expect(content).toHaveAttribute("data-state", "open");

    // Click to close
    fireEvent.click(trigger);
    expect(content).toHaveAttribute("data-state", "closed");
  });

  it("handles controlled open state", () => {
    const { container, rerender } = render(
      <Collapsible open={false}>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    const content = container.querySelector(
      '[data-slot="collapsible-content"]'
    );
    expect(content).toHaveAttribute("data-state", "closed");

    rerender(
      <Collapsible open={true}>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    expect(content).toHaveAttribute("data-state", "open");
  });

  it("calls onOpenChange when trigger is clicked", () => {
    const handleOpenChange = vi.fn();
    render(
      <Collapsible onOpenChange={handleOpenChange}>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    const trigger = screen.getByRole("button", { name: "Toggle" });

    fireEvent.click(trigger);
    expect(handleOpenChange).toHaveBeenCalledTimes(1);
    expect(handleOpenChange).toHaveBeenCalledWith(true);

    fireEvent.click(trigger);
    expect(handleOpenChange).toHaveBeenCalledTimes(2);
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it("handles disabled state", () => {
    render(
      <Collapsible disabled>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    const trigger = screen.getByRole("button", { name: "Toggle" });
    expect(trigger).toBeDisabled();
  });

  it("does not toggle when disabled", () => {
    const handleOpenChange = vi.fn();
    const { container } = render(
      <Collapsible disabled onOpenChange={handleOpenChange}>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    const trigger = screen.getByRole("button", { name: "Toggle" });
    const content = container.querySelector(
      '[data-slot="collapsible-content"]'
    );

    fireEvent.click(trigger);
    expect(handleOpenChange).not.toHaveBeenCalled();
    expect(content).toHaveAttribute("data-state", "closed");
  });

  it("forwards additional props to Collapsible", () => {
    const { container } = render(
      <Collapsible data-testid="custom-collapsible">
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    const collapsible = screen.getByTestId("custom-collapsible");
    expect(collapsible).toBeInTheDocument();
  });

  it("forwards additional props to CollapsibleTrigger", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger data-testid="custom-trigger">
          Toggle
        </CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    const trigger = screen.getByTestId("custom-trigger");
    expect(trigger).toBeInTheDocument();
  });

  it("forwards additional props to CollapsibleContent", () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent data-testid="custom-content">
          Content
        </CollapsibleContent>
      </Collapsible>
    );
    const content = screen.getByTestId("custom-content");
    expect(content).toBeInTheDocument();
  });

  it("preserves all data-slot attributes", () => {
    const { container } = render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );

    expect(
      container.querySelector('[data-slot="collapsible"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="collapsible-trigger"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="collapsible-content"]')
    ).toBeInTheDocument();
  });

  it("renders with asChild prop on trigger", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger asChild>
          <button type="button">Custom Button</button>
        </CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    const trigger = screen.getByRole("button", { name: "Custom Button" });
    expect(trigger).toBeInTheDocument();
  });

  it("handles multiple collapsibles independently", () => {
    const { container } = render(
      <div>
        <Collapsible>
          <CollapsibleTrigger>Toggle 1</CollapsibleTrigger>
          <CollapsibleContent>Content 1</CollapsibleContent>
        </Collapsible>
        <Collapsible>
          <CollapsibleTrigger>Toggle 2</CollapsibleTrigger>
          <CollapsibleContent>Content 2</CollapsibleContent>
        </Collapsible>
        <Collapsible>
          <CollapsibleTrigger>Toggle 3</CollapsibleTrigger>
          <CollapsibleContent>Content 3</CollapsibleContent>
        </Collapsible>
      </div>
    );

    const collapsibles = container.querySelectorAll(
      '[data-slot="collapsible"]'
    );
    expect(collapsibles).toHaveLength(3);

    const trigger1 = screen.getByRole("button", { name: "Toggle 1" });
    fireEvent.click(trigger1);

    const contents = container.querySelectorAll(
      '[data-slot="collapsible-content"]'
    );
    expect(contents[0]).toHaveAttribute("data-state", "open");
    expect(contents[1]).toHaveAttribute("data-state", "closed");
    expect(contents[2]).toHaveAttribute("data-state", "closed");
  });

  it("works with controlled state management", () => {
    const TestComponent = () => {
      const [isOpen, setIsOpen] = React.useState(false);
      return (
        <div>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger>Toggle</CollapsibleTrigger>
            <CollapsibleContent>Content</CollapsibleContent>
          </Collapsible>
          <span>{isOpen ? "Open" : "Closed"}</span>
        </div>
      );
    };

    render(<TestComponent />);
    const trigger = screen.getByRole("button", { name: "Toggle" });

    expect(screen.getByText("Closed")).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.getByText("Open")).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.getByText("Closed")).toBeInTheDocument();
  });

  it("renders nested collapsibles", () => {
    const { container } = render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Parent Toggle</CollapsibleTrigger>
        <CollapsibleContent>
          <Collapsible>
            <CollapsibleTrigger>Child Toggle</CollapsibleTrigger>
            <CollapsibleContent>Nested Content</CollapsibleContent>
          </Collapsible>
        </CollapsibleContent>
      </Collapsible>
    );

    const collapsibles = container.querySelectorAll(
      '[data-slot="collapsible"]'
    );
    expect(collapsibles).toHaveLength(2);

    const parentTrigger = screen.getByRole("button", { name: "Parent Toggle" });
    const childTrigger = screen.getByRole("button", { name: "Child Toggle" });

    expect(parentTrigger).toBeInTheDocument();
    expect(childTrigger).toBeInTheDocument();
  });

  it("supports keyboard interaction", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    const trigger = screen.getByRole("button", { name: "Toggle" });

    trigger.focus();
    expect(trigger).toHaveFocus();
  });

  it("renders complex content", () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>
          <div>
            <h3>Title</h3>
            <p>Paragraph</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </div>
        </CollapsibleContent>
      </Collapsible>
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Paragraph")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });
});
