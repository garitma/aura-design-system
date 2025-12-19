"use client";
/**
 * @description For sighted users to preview content available behind a link.
 */
import * as React from "react";
import { HoverCard as HoverCardRadix } from "radix-ui";

import { cn } from "@/utils/class-names";

function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardRadix.Root>) {
  return <HoverCardRadix.Root data-slot="hover-card" {...props} />;
}

function HoverCardTrigger({
  className,
  ...props
}: React.ComponentProps<typeof HoverCardRadix.Trigger>) {
  return (
    <HoverCardRadix.Trigger
      data-slot="hover-card-trigger"
      className={cn(className)}
      {...props}
    />
  );
}

function HoverCardContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof HoverCardRadix.Content>) {
  return (
    <HoverCardRadix.Portal data-slot="hover-card-portal">
      <HoverCardRadix.Content
        data-slot="hover-card-content"
        collisionPadding={8}
        className={cn(
          className,
          "bg-gray-1 border border-gray-a6 rounded-sm p-1 shadow-md"
        )}
        {...props}
      >
        {children}
      </HoverCardRadix.Content>
    </HoverCardRadix.Portal>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
