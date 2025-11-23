import { render, screen } from "@testing-library/react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../registry/default/components/ui/Avatar";
import { describe, it, expect } from "vitest";

describe("Avatar", () => {
  it("renders correctly with default props", () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    const avatar = container.querySelector('[data-slot="avatar"]');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveClass("inline-flex", "size-3", "rounded-full");
  });

  it("renders fallback when no image is provided", () => {
    render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText("AB")).toBeInTheDocument();
  });

  it("applies custom className to Avatar", () => {
    const { container } = render(
      <Avatar className="custom-avatar-class">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    const avatar = container.querySelector('[data-slot="avatar"]');
    expect(avatar).toHaveClass("custom-avatar-class");
    expect(avatar).toHaveClass("inline-flex", "size-3", "rounded-full");
  });

  it("applies custom className to AvatarFallback", () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback className="custom-fallback-class">JD</AvatarFallback>
      </Avatar>
    );
    const fallback = container.querySelector('[data-slot="avatar-fallback"]');
    expect(fallback).toHaveClass("custom-fallback-class");
    expect(fallback).toHaveClass("flex", "size-full", "bg-gray-3");
  });

  it("renders with different sizes using custom className", () => {
    const { rerender, container } = render(
      <Avatar className="size-8">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
    );
    let avatar = container.querySelector('[data-slot="avatar"]');
    expect(avatar).toHaveClass("size-8");

    rerender(
      <Avatar className="size-12">
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
    );
    avatar = container.querySelector('[data-slot="avatar"]');
    expect(avatar).toHaveClass("size-12");

    rerender(
      <Avatar className="size-16">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    );
    avatar = container.querySelector('[data-slot="avatar"]');
    expect(avatar).toHaveClass("size-16");
  });

  it("renders with different border radius using custom className", () => {
    const { rerender, container } = render(
      <Avatar className="rounded-md">
        <AvatarFallback>SQ</AvatarFallback>
      </Avatar>
    );
    let avatar = container.querySelector('[data-slot="avatar"]');
    expect(avatar).toHaveClass("rounded-md");

    rerender(
      <Avatar className="rounded-none">
        <AvatarFallback>BX</AvatarFallback>
      </Avatar>
    );
    avatar = container.querySelector('[data-slot="avatar"]');
    expect(avatar).toHaveClass("rounded-none");
  });

  it("applies custom styles to fallback", () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback className="bg-accent-9 text-white">AC</AvatarFallback>
      </Avatar>
    );
    const fallback = container.querySelector('[data-slot="avatar-fallback"]');
    expect(fallback).toHaveClass("bg-accent-9", "text-white");
  });

  it("renders multiple avatars independently", () => {
    const { container } = render(
      <div>
        <Avatar>
          <AvatarFallback>U1</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>U2</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>U3</AvatarFallback>
        </Avatar>
      </div>
    );
    const avatars = container.querySelectorAll('[data-slot="avatar"]');
    expect(avatars).toHaveLength(3);
    expect(screen.getByText("U1")).toBeInTheDocument();
    expect(screen.getByText("U2")).toBeInTheDocument();
    expect(screen.getByText("U3")).toBeInTheDocument();
  });

  it("handles fallback rendering", () => {
    const { container } = render(
      <Avatar>
        <AvatarImage src="https://example.com/avatar.jpg" alt="User avatar" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );

    // Radix UI Avatar shows fallback until image loads
    // In test environment, fallback should be visible
    const fallback = container.querySelector('[data-slot="avatar-fallback"]');
    expect(fallback).toBeInTheDocument();
  });

  it("renders with gradient background on fallback", () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback className="bg-gradient-to-br from-accent-9 to-accent-11 text-white">
          GR
        </AvatarFallback>
      </Avatar>
    );
    const fallback = container.querySelector('[data-slot="avatar-fallback"]');
    expect(fallback).toHaveClass(
      "bg-gradient-to-br",
      "from-accent-9",
      "to-accent-11",
      "text-white"
    );
  });

  it("preserves data-slot attributes", () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );

    expect(container.querySelector('[data-slot="avatar"]')).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="avatar-fallback"]')
    ).toBeInTheDocument();
  });

  it("forwards additional props to Avatar root", () => {
    const { container } = render(
      <Avatar data-testid="custom-avatar">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    const avatar = container.querySelector('[data-testid="custom-avatar"]');
    expect(avatar).toBeInTheDocument();
  });

  it("forwards additional props to AvatarFallback", () => {
    render(
      <Avatar>
        <AvatarFallback data-testid="custom-fallback">JD</AvatarFallback>
      </Avatar>
    );
    const fallback = screen.getByTestId("custom-fallback");
    expect(fallback).toBeInTheDocument();
  });
});
