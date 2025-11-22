import { render, screen, fireEvent } from "@testing-library/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../registry/default/components/ui/Accordion";
import { describe, it } from "vitest";

describe("Accordion", () => {
  it("renders correctly and displays initial trigger", () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Trigger 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    // Expect triggers to be in the document
    expect(screen.getByText("Trigger 1")).toBeInTheDocument();
    expect(screen.getByText("Trigger 2")).toBeInTheDocument();

    // Initially, content should not be visible (collapsible)
    expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Content 2")).not.toBeInTheDocument();
  });

  it("expands content when a trigger is clicked for single type accordion", () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Trigger 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger1 = screen.getByText("Trigger 1");
    fireEvent.click(trigger1);

    // After clicking trigger 1, its content should be visible
    expect(screen.getByText("Content 1")).toBeVisible();
    // Other content should still be hidden for single type
    expect(screen.queryByText("Content 2")).not.toBeInTheDocument();
  });

  it("collapses previous content when a new trigger is clicked for single type accordion", () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Trigger 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger1 = screen.getByText("Trigger 1");
    const trigger2 = screen.getByText("Trigger 2");

    fireEvent.click(trigger1);
    expect(screen.getByText("Content 1")).toBeVisible();
    expect(screen.queryByText("Content 2")).not.toBeInTheDocument();

    fireEvent.click(trigger2);
    // After clicking trigger 2, content 1 should be hidden, and content 2 visible
    expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    expect(screen.getByText("Content 2")).toBeVisible();
  });

  it("toggles content visibility when clicking the same trigger multiple times", () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger1 = screen.getByText("Trigger 1");

    fireEvent.click(trigger1);
    expect(screen.getByText("Content 1")).toBeVisible();

    fireEvent.click(trigger1); // Click again
    expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
  });

  it("handles 'multiple' type accordion correctly, allowing multiple items to be open", () => {
    render(
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Trigger 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger1 = screen.getByText("Trigger 1");
    const trigger2 = screen.getByText("Trigger 2");

    fireEvent.click(trigger1);
    expect(screen.getByText("Content 1")).toBeVisible();
    expect(screen.queryByText("Content 2")).not.toBeInTheDocument(); // Initially hidden

    fireEvent.click(trigger2);
    // Both contents should be visible for 'multiple' type
    expect(screen.getByText("Content 1")).toBeVisible();
    expect(screen.getByText("Content 2")).toBeVisible();
  });

  // You might want to add tests for accessibility attributes like aria-expanded,
  // as the Accordion component uses Radix UI Primitives which are designed for accessibility.
  it("sets aria-expanded attribute correctly on trigger", () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger1 = screen.getByRole("button", { name: "Trigger 1" });

    expect(trigger1).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger1);
    expect(trigger1).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(trigger1);
    expect(trigger1).toHaveAttribute("aria-expanded", "false");
  });
});
