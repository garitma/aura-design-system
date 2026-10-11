import { render, screen } from "@testing-library/react";
import {
  Bubble,
  BubbleContent,
  BubbleReactions,
} from "../registry/default/components/ui/Bubble";
import { describe, it, expect } from "vitest";
import * as React from "react";

function bubbleOf(text: string) {
  const content = screen.getByText(text);
  const bubble = content.closest("[data-slot=bubble]");
  if (!bubble) throw new Error("Bubble root not found");
  return bubble;
}

describe("Bubble", () => {
  it("draws a gray-a4 border on muted content", () => {
    render(
      <Bubble variant="muted">
        <BubbleContent>Quiet</BubbleContent>
      </Bubble>,
    );
    expect(bubbleOf("Quiet")).toHaveClass(
      "*:data-[slot=bubble-content]:border-gray-a4",
    );
  });

  it("removes the border on ghost content", () => {
    render(
      <Bubble variant="ghost">
        <BubbleContent>Unframed</BubbleContent>
      </Bubble>,
    );
    const bubble = bubbleOf("Unframed");
    expect(bubble).toHaveClass("*:data-[slot=bubble-content]:border-none");
    expect(bubble.className.split(/\s+/)).not.toContain("border-none");
  });

  it("darkens destructive hover by one step instead of opacity", () => {
    render(
      <Bubble variant="destructive">
        <BubbleContent>Failed</BubbleContent>
      </Bubble>,
    );
    const bubble = bubbleOf("Failed");
    expect(bubble.className).not.toContain("bg-danger/80");
    expect(bubble).toHaveClass(
      "[&>[data-slot=bubble-content]:is(button,a):hover]:bg-[color-mix(in_oklab,var(--danger),var(--danger-contrast)_6%)]",
    );
  });

  it("reserves margin for reactions and keeps the pill inside the bubble", () => {
    render(
      <Bubble>
        <BubbleContent>Ok</BubbleContent>
        <BubbleReactions aria-label="Reactions: thumbs up">
          <span>👍</span>
        </BubbleReactions>
      </Bubble>,
    );
    expect(bubbleOf("Ok")).toHaveClass(
      "has-[[data-slot=bubble-reactions][data-side=bottom]]:mb-2",
      "has-[[data-slot=bubble-reactions][data-side=top]]:mt-2",
    );
    expect(screen.getByLabelText("Reactions: thumbs up")).toHaveClass(
      "max-w-[calc(100%-var(--spacing))]",
      "overflow-hidden",
    );
  });
});
