/**
 * @description Displays an inline status, system note, bordered row, or labeled separator in a conversation.
 */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/class-names";

const markerVariants = cva(
  "group/marker relative flex min-h-1.5 w-full items-center gap-0.5 text-left text-sm text-gray-11 [a]:underline [a]:underline-offset-2 [a]:hover:text-gray-12",
  {
    variants: {
      variant: {
        default: "",
        separator:
          "before:mr-0.5 before:h-px before:min-w-0 before:flex-1 before:bg-gray-6 after:ml-0.5 after:h-px after:min-w-0 after:flex-1 after:bg-gray-6",
        border: "border-b border-gray-6 pb-0.5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Marker({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof markerVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="marker"
      data-variant={variant}
      className={cn(markerVariants({ variant }), className)}
      {...props}
    />
  );
}

function MarkerIcon({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="marker-icon"
      aria-hidden="true"
      className={cn("shrink-0 [&_.icon]:block", className)}
      {...props}
    />
  );
}

function MarkerContent({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="marker-content"
      className={cn(
        "min-w-0 break-words group-data-[variant=separator]/marker:flex-none group-data-[variant=separator]/marker:text-center *:[a]:underline *:[a]:underline-offset-2 *:[a]:hover:text-gray-12",
        className
      )}
      {...props}
    />
  );
}

export { Marker, MarkerIcon, MarkerContent, markerVariants };
