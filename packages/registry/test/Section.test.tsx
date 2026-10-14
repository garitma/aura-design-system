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
    const sectionElement = container.querySelector("section");
    expect(sectionElement).toHaveClass("custom-wrapper-class");
    expect(sectionElement).toHaveClass("pad");
  });

  it("applies subClassName to the inner container", () => {
    render(<Section subClassName="custom-inner-class">Content</Section>);
    const containerDiv = screen.getByText("Content").closest("div");
    expect(containerDiv).toHaveClass("custom-inner-class");
  });
});

