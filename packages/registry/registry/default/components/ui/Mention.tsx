"use client";
/**
 * @description Adds accessible, trigger-based mentions to a text input.
 */
import * as React from "react";
import * as MentionPrimitive from "@diceui/mention";

import { cn } from "@/utils/class-names";

function Mention({
  className,
  ...props
}: React.ComponentProps<typeof MentionPrimitive.Root>) {
  return (
    <MentionPrimitive.Root
      data-slot="mention"
      className={cn(
        "**:data-tag:rounded-sm **:data-tag:bg-accent-3 **:data-tag:px-0.5 **:data-tag:text-accent-12",
        className,
      )}
      {...props}
    />
  );
}

function MentionLabel({
  className,
  ...props
}: React.ComponentProps<typeof MentionPrimitive.Label>) {
  return (
    <MentionPrimitive.Label
      data-slot="mention-label"
      className={cn(
        "mb-0.5 block text-sm font-semibold text-gray-12 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

function MentionInput({
  className,
  ...props
}: React.ComponentProps<typeof MentionPrimitive.Input>) {
  return (
    <MentionPrimitive.Input
      data-slot="mention-input"
      className={cn(
        "flex min-h-4 w-full rounded-md border border-gray-7 bg-gray-1 px-1 py-0.5 text-sm text-gray-12 placeholder:text-gray-11 focus-visible:border-gray-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-8 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

function MentionPortal({
  ...props
}: React.ComponentProps<typeof MentionPrimitive.Portal>) {
  return <MentionPrimitive.Portal data-slot="mention-portal" {...props} />;
}

function MentionContent({
  className,
  ...props
}: React.ComponentProps<typeof MentionPrimitive.Content>) {
  return (
    <MentionPrimitive.Content
      data-slot="mention-content"
      className={cn(
        "z-50 min-w-(--dice-anchor-width) origin-(--dice-transform-origin) overflow-hidden rounded-md border border-gray-7 bg-gray-1 p-0.5 text-gray-12 shadow-md data-[state=closed]:animate-mention-hide data-[state=open]:animate-mention-show",
        className,
      )}
      {...props}
    />
  );
}

function MentionItem({
  className,
  ...props
}: React.ComponentProps<typeof MentionPrimitive.Item>) {
  return (
    <MentionPrimitive.Item
      data-slot="mention-item"
      className={cn(
        "relative flex w-full cursor-default select-none items-center gap-0.5 rounded-sm px-1 py-0.5 text-sm outline-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-accent-3 data-highlighted:text-accent-12",
        className,
      )}
      {...props}
    />
  );
}

export {
  Mention,
  MentionContent,
  MentionInput,
  MentionItem,
  MentionLabel,
  MentionPortal,
};
