"use client";

import * as React from "react";
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/class-names";

const toggleGroupVariants = cva(
  "inline-flex items-center justify-center border border-gray-6 rounded-sm bg-gray-2",
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const toggleGroupItemVariants = cva(
  "inline-flex items-center justify-center gap-2 data-[state=on]:bg-gray-4 data-[state=on]:hover:bg-gray-3",
  {
    variants: {
      variant: {
        default:
          "button-pill border border-transparent text-gray-11 bg-gray-2 hover:bg-gray-3 rounded-sm",
      },
      size: {
        default: "w-3 h-3 p-0",
        xs: "h-2.5",
        sm: "h-3",
        md: "h-4",
        lg: "h-5",
        xl: "h-6",
        icon: "w-3 h-3 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function ToggleGroup({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleGroupVariants>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      className={cn(toggleGroupVariants({ variant, className }))}
      {...props}
    />
  );
}

function ToggleGroupItem({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleGroupItemVariants>) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      className={cn(toggleGroupItemVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { ToggleGroup, ToggleGroupItem, toggleGroupVariants, toggleGroupItemVariants };
