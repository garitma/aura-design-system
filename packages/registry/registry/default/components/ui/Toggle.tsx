"use client";

import * as React from "react";
import { Toggle as TogglePrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/class-names";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 data-[state=on]:bg-gray-4 data-[state=on]:hover:bg-gray-3",
  {
    variants: {
      variant: {
        default:
          "button-pill border border-gray-6 text-gray-11 bg-gray-2 hover:bg-gray-3",
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

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
