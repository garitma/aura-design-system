import { render, screen } from "@testing-library/react";
import { Section } from "../registry/default/components/ui/Section";
import { describe, it, expect } from "vitest";
import * as React from "react";

describe("Section", () => {
  it("renders children correctly", () => {
    render(
      <Section>
        <h1>Section Title</h1>
        <p>Section content</p>
      </Section>
    );
    expect(screen.getByText("Section Title")).toBeInTheDocument();
    expect(screen.getByText("Section content")).toBeInTheDocument();
  });

  it("applies container classes correctly", () => {
    const { rerender } = render(<Section container="smash">Content</Section>);
    // We need to find the inner container. Based on the implementation,
    // Section renders Wrapper -> WrapperContainer.
    // WrapperContainer has data-slot="wrapper-container".

    // Since we don't have an easy way to select by data-slot in standard testing-library without custom setup,
    // we can look for the text "Content" and check its parent's class or similar.
    // Or better, we can use a test-id if we could add it, but we shouldn't modify source just for tests if possible.
    // Let's try to find by text and check the container div.

    // Actually, looking at Section.tsx:
    // <WrapperContainer container={container} className={subClassName}>
    // WrapperContainer renders a div with `container` class.

    let containerDiv = screen.getByText("Content").closest("div");
    expect(containerDiv).toHaveClass("smash");

    rerender(<Section container="smesh">Content</Section>);
    containerDiv = screen.getByText("Content").closest("div");
    expect(containerDiv).toHaveClass("smesh");

    rerender(<Section container="smish">Content</Section>);
    containerDiv = screen.getByText("Content").closest("div");
    expect(containerDiv).toHaveClass("smish");

    rerender(<Section container="smosh">Content</Section>);
    containerDiv = screen.getByText("Content").closest("div");
    expect(containerDiv).toHaveClass("smosh");

    rerender(<Section container="smush">Content</Section>);
    containerDiv = screen.getByText("Content").closest("div");
    expect(containerDiv).toHaveClass("smush");
  });

  it("applies custom className to the wrapper", () => {
    const { container } = render(
      <Section className="custom-wrapper-class">Content</Section>
    );
    // The wrapper is the outer section element
    const sectionElement = container.querySelector("section");
    expect(sectionElement).toHaveClass("custom-wrapper-class");
    expect(sectionElement).toHaveClass("pad"); // Default class
  });

  it("applies subClassName to the inner container", () => {
    render(<Section subClassName="custom-inner-class">Content</Section>);
    const containerDiv = screen.getByText("Content").closest("div");
    expect(containerDiv).toHaveClass("custom-inner-class");
  });
});
