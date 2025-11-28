import { render, screen, fireEvent } from "@testing-library/react";
import { Checkbox } from "../registry/default/components/ui/Checkbox";
import { describe, it, expect, vi } from "vitest";
import * as React from "react";

describe("Checkbox", () => {
  it("renders correctly with default props", () => {
    const { container } = render(<Checkbox />);
    const checkbox = container.querySelector('[data-slot="checkbox"]');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveClass(
      "border",
      "border-gray-a6",
      "flex",
      "size-1.5",
      "items-center",
      "justify-center",
      "rounded",
      "outline-none",
      "hover:bg-accent-2",
      "cursor-pointer"
    );
  });

  it("renders as a button element", () => {
    render(<Checkbox aria-label="Accept terms" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.tagName).toBe("BUTTON");
  });

  it("applies custom className to Checkbox", () => {
    const { container } = render(
      <Checkbox className="custom-checkbox-class" />
    );
    const checkbox = container.querySelector('[data-slot="checkbox"]');
    expect(checkbox).toHaveClass("custom-checkbox-class");
    expect(checkbox).toHaveClass("border", "flex", "size-1.5");
  });

  it("handles checked state", () => {
    const { rerender } = render(<Checkbox checked={false} />);
    let checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("data-state", "unchecked");

    rerender(<Checkbox checked={true} />);
    checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("data-state", "checked");
  });

  it("handles defaultChecked prop", () => {
    render(<Checkbox defaultChecked />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("data-state", "checked");
  });

  it("handles unchecked state by default", () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("data-state", "unchecked");
  });

  it("handles onCheckedChange callback", () => {
    const handleChange = vi.fn();
    render(<Checkbox onCheckedChange={handleChange} />);
    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("toggles checked state on click", () => {
    const handleChange = vi.fn();
    render(<Checkbox onCheckedChange={handleChange} />);
    const checkbox = screen.getByRole("checkbox");

    // First click - check
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(true);

    // Second click - uncheck
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it("handles disabled state", () => {
    render(<Checkbox disabled />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
    expect(checkbox).toHaveAttribute("data-disabled", "");
  });

  it("does not trigger onCheckedChange when disabled", () => {
    const handleChange = vi.fn();
    render(<Checkbox disabled onCheckedChange={handleChange} />);
    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("handles indeterminate state", () => {
    render(<Checkbox checked="indeterminate" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("data-state", "indeterminate");
  });

  it("forwards additional props to Checkbox", () => {
    render(
      <Checkbox data-testid="custom-checkbox" aria-label="Test checkbox" />
    );
    const checkbox = screen.getByTestId("custom-checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("aria-label", "Test checkbox");
  });

  it("renders with id attribute for label association", () => {
    render(
      <div>
        <Checkbox id="terms-checkbox" />
        <label htmlFor="terms-checkbox">Accept terms</label>
      </div>
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("id", "terms-checkbox");
  });

  it("handles required attribute", () => {
    render(<Checkbox required />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("aria-required", "true");
  });

  it("renders CheckboxIndicator when checked", () => {
    const { container } = render(<Checkbox checked={true} />);
    const checkbox = container.querySelector('[data-slot="checkbox"]');

    // CheckboxIndicator should be present in the DOM
    expect(checkbox?.querySelector("svg")).toBeInTheDocument();
  });

  it("preserves data-slot attribute", () => {
    const { container } = render(<Checkbox />);
    expect(
      container.querySelector('[data-slot="checkbox"]')
    ).toBeInTheDocument();
  });

  it("renders multiple checkboxes independently", () => {
    const { container } = render(
      <div>
        <Checkbox aria-label="Checkbox 1" />
        <Checkbox aria-label="Checkbox 2" />
        <Checkbox aria-label="Checkbox 3" />
      </div>
    );
    const checkboxes = container.querySelectorAll('[data-slot="checkbox"]');
    expect(checkboxes).toHaveLength(3);
  });

  it("handles controlled checkbox with state updates", () => {
    const TestComponent = () => {
      const [checked, setChecked] = React.useState(false);
      return (
        <div>
          <Checkbox
            checked={checked}
            onCheckedChange={(value) => setChecked(value as boolean)}
            aria-label="Controlled checkbox"
          />
          <span>{checked ? "Checked" : "Unchecked"}</span>
        </div>
      );
    };

    render(<TestComponent />);
    const checkbox = screen.getByRole("checkbox");

    expect(screen.getByText("Unchecked")).toBeInTheDocument();

    fireEvent.click(checkbox);
    expect(screen.getByText("Checked")).toBeInTheDocument();

    fireEvent.click(checkbox);
    expect(screen.getByText("Unchecked")).toBeInTheDocument();
  });

  it("works with form labels", () => {
    render(
      <div>
        <Checkbox id="terms" />
        <label htmlFor="terms">I agree to the terms</label>
      </div>
    );

    const checkbox = screen.getByRole("checkbox");
    const label = screen.getByText("I agree to the terms");

    expect(checkbox).toHaveAttribute("id", "terms");
    expect(label).toHaveAttribute("for", "terms");
  });

  it("can be focused via keyboard", () => {
    render(<Checkbox aria-label="Keyboard test" />);
    const checkbox = screen.getByRole("checkbox");

    checkbox.focus();
    expect(checkbox).toHaveFocus();
  });
});
