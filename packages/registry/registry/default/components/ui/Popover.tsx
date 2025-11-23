"use client";

import * as React from "react";
import { Popover as PopoverRadix } from "radix-ui";

import { cn } from "@/utils/class-names";

function Popover({ ...props }: React.ComponentProps<typeof PopoverRadix.Root>) {
  return <PopoverRadix.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverRadix.Trigger>) {
  return <PopoverRadix.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
  className,

  ...props
}: React.ComponentProps<typeof PopoverRadix.Content>) {
  return (
    <PopoverRadix.Portal>
      <PopoverRadix.Content data-slot="popover-content" {...props} />
    </PopoverRadix.Portal>
  );
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverRadix.Anchor>) {
  return <PopoverRadix.Anchor data-slot="popover-anchor" {...props} />;
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
