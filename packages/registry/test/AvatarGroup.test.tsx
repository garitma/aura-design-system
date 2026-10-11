import { render, screen } from "@testing-library/react";
import {
  Avatar,
  AvatarFallback,
} from "../registry/default/components/ui/Avatar";
import { AvatarGroup } from "../registry/default/components/ui/AvatarGroup";
import { describe, it, expect } from "vitest";

function Person({ label, className }: { label: string; className?: string }) {
  return (
    <Avatar className={className}>
      <AvatarFallback>{label}</AvatarFallback>
    </Avatar>
  );
}

function groupOf(container: HTMLElement) {
  const group = container.querySelector('[data-slot="avatar-group"]');
  expect(group).toBeTruthy();
  return group as HTMLElement;
}

function itemRoots(container: HTMLElement) {
  return groupOf(container).querySelectorAll(":scope > *");
}

describe("AvatarGroup", () => {
  it("passes the native dir attribute through and stacks with direction", () => {
    const { container } = render(
      <AvatarGroup dir="rtl" direction="ltr">
        <Person label="A" />
        <Person label="B" />
      </AvatarGroup>,
    );
    const group = groupOf(container);
    expect(group).toHaveAttribute("dir", "rtl");
    expect(group).toHaveAttribute("data-direction", "ltr");
    expect(group).toHaveClass("-space-x-1");
    expect(group.className).not.toContain("flex-row-reverse");
  });

  it("uses direction for an rtl stack without requiring the native dir attribute", () => {
    const { container } = render(
      <AvatarGroup direction="rtl">
        <Person label="A" />
        <Person label="B" />
      </AvatarGroup>,
    );
    const group = groupOf(container);
    expect(group).not.toHaveAttribute("dir");
    expect(group).toHaveAttribute("data-direction", "rtl");
    expect(group).toHaveClass("flex-row-reverse", "space-x-reverse");
  });

  it("renders the overflow count with the small label class", () => {
    render(
      <AvatarGroup max={2}>
        <Person label="A" />
        <Person label="B" />
        <Person label="C" />
      </AvatarGroup>,
    );
    const overflow = screen.getByText("+2");
    expect(overflow).toHaveClass("small");
    expect(overflow.className).not.toMatch(/\btext-xs\b/);
    expect(overflow.className).not.toMatch(/\bfont-medium\b/);
  });

  it("cuts round avatars with a circular mask", () => {
    const { container } = render(
      <AvatarGroup>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
      </AvatarGroup>,
    );
    const avatars = itemRoots(container);
    expect(avatars[0]?.getAttribute("style") ?? "").not.toContain("radial-gradient");
    expect(avatars[1]?.getAttribute("style") ?? "").toContain("radial-gradient");
  });

  it("cuts square avatars with a straight mask", () => {
    const { container } = render(
      <AvatarGroup>
        <Avatar className="rounded-none">
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <Avatar className="rounded-md">
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
      </AvatarGroup>,
    );
    const avatars = itemRoots(container);
    const first = avatars[0]?.getAttribute("style") ?? "";
    const second = avatars[1]?.getAttribute("style") ?? "";
    expect(first).not.toContain("linear-gradient");
    expect(second).toContain("linear-gradient");
    expect(second).not.toContain("radial-gradient");
    expect(avatars[1]?.className).toContain("rounded-md");
    expect(avatars[1]?.className).not.toContain("rounded-full");
  });

  it("squares the default overflow indicator when shape is square", () => {
    render(
      <AvatarGroup shape="square" max={2}>
        <Person label="A" className="rounded-none" />
        <Person label="B" className="rounded-none" />
        <Person label="C" className="rounded-none" />
      </AvatarGroup>,
    );
    const overflow = screen.getByText("+2");
    expect(overflow).toHaveClass("small", "rounded-none");
    expect(overflow.className).not.toContain("rounded-full");
    expect(overflow.getAttribute("style") ?? "").toContain("linear-gradient");
  });
});
