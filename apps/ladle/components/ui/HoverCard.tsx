"use client";

import * as React from "react";
import { HoverCard as HoverCardRadix } from "radix-ui";

function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardRadix.Root>) {
  return <HoverCardRadix.Root data-slot="hover-card" {...props} />;
}

function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof HoverCardRadix.Trigger>) {
  return <HoverCardRadix.Trigger data-slot="hover-card-trigger" {...props} />;
}

function HoverCardContent({
  ...props
}: React.ComponentProps<typeof HoverCardRadix.Content>) {
  return (
    <HoverCardRadix.Portal data-slot="hover-card-portal">
      <HoverCardRadix.Content data-slot="hover-card-content" {...props} />
    </HoverCardRadix.Portal>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
