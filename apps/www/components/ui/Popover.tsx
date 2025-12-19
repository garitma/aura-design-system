"use client";
/**
 * @description Displays rich content in a portal triggered by a button.
 */
import * as React from "react";
import { Popover as PopoverRadix } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";

import { cn } from "@/utils/class-names";

function Popover({ ...props }: React.ComponentProps<typeof PopoverRadix.Root>) {
  return <PopoverRadix.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
  className,
  ...props
}: React.ComponentProps<typeof PopoverRadix.Trigger>) {
  return (
    <PopoverRadix.Trigger
      data-slot="popover-trigger"
      className={cn(className)}
      {...props}
    />
  );
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverRadix.Anchor>) {
  return <PopoverRadix.Anchor data-slot="popover-anchor" {...props} />;
}

function PopoverPortal({
  ...props
}: React.ComponentProps<typeof PopoverRadix.Portal>) {
  return <PopoverRadix.Portal data-slot="popover-portal" {...props} />;
}

function PopoverContent({
  className,
  ...props
}: React.ComponentProps<typeof PopoverRadix.Content>) {
  return (
    <PopoverRadix.Portal>
      <PopoverRadix.Content
        data-slot="popover-content"
        collisionPadding={8}
        className={cn(
          className,
          "bg-gray-1 border border-gray-a6 rounded-sm relative shadow-md"
        )}
        {...props}
      />
    </PopoverRadix.Portal>
  );
}

function PopoverArrow({
  className,
  ...props
}: React.ComponentProps<typeof PopoverRadix.Arrow>) {
  return (
    <PopoverRadix.Arrow
      data-slot="popover-arrow"
      className={cn(className, "fill-gray-1")}
      {...props}
    />
  );
}

function PopoverClose({
  className,
  ...props
}: React.ComponentProps<typeof PopoverRadix.Close>) {
  return (
    <PopoverRadix.Close
      data-slot="popover-close"
      className={cn(
        className,
        "absolute right-0.5 top-0.5 inline-flex items-center justify-center rounded-sm p-0.5 hover:bg-accent-3 cursor-pointer"
      )}
      {...props}
    >
      <Cross2Icon className="size-1" />
      <span className="sr-only">Close</span>
    </PopoverRadix.Close>
  );
}

export {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverPortal,
  PopoverContent,
  PopoverArrow,
  PopoverClose,
};
