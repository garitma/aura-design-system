/**
 * @description Displays conversational content in a message bubble with variants, alignment, grouping, and reactions.
 */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/class-names";

function BubbleGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bubble-group"
      className={cn("flex min-w-0 flex-col gap-1", className)}
      {...props}
    />
  );
}

const bubbleVariants = cva(
  "group/bubble relative flex w-fit max-w-[80%] min-w-0 flex-col gap-0.5 group-data-[align=end]/message:self-end data-[align=end]:self-end data-[variant=ghost]:max-w-full",
  {
    variants: {
      variant: {
        default:
          "*:data-[slot=bubble-content]:bg-accent-9 *:data-[slot=bubble-content]:text-accent-contrast [&>[data-slot=bubble-content]:is(button,a):hover]:bg-accent-10",
        secondary:
          "*:data-[slot=bubble-content]:bg-gray-3 *:data-[slot=bubble-content]:text-gray-12 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-gray-4",
        muted:
          "*:data-[slot=bubble-content]:bg-gray-2 *:data-[slot=bubble-content]:text-gray-12 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-gray-3",
        tinted:
          "*:data-[slot=bubble-content]:bg-accent-3 *:data-[slot=bubble-content]:text-gray-12 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-accent-4",
        outline:
          "*:data-[slot=bubble-content]:border-gray-7 *:data-[slot=bubble-content]:bg-gray-1 *:data-[slot=bubble-content]:text-gray-12 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-gray-3",
        ghost:
          "border-none *:data-[slot=bubble-content]:rounded-none *:data-[slot=bubble-content]:bg-transparent *:data-[slot=bubble-content]:p-0 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-gray-3 [&>[data-slot=bubble-content]:is(button,a):hover]:text-gray-12",
        destructive:
          "*:data-[slot=bubble-content]:bg-danger *:data-[slot=bubble-content]:text-danger-contrast [&>[data-slot=bubble-content]:is(button,a):hover]:bg-danger/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Bubble({
  variant = "default",
  align = "start",
  className,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof bubbleVariants> & {
    align?: "start" | "end";
  }) {
  return (
    <div
      data-slot="bubble"
      data-variant={variant}
      data-align={align}
      className={cn(bubbleVariants({ variant }), className)}
      {...props}
    />
  );
}

function BubbleContent({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="bubble-content"
      className={cn(
        "w-fit max-w-full min-w-0 overflow-hidden rounded-xl border border-transparent px-1 py-0.5 text-sm leading-relaxed break-words group-data-[align=end]/bubble:self-end [button]:text-left [button,a]:transition-colors [button,a]:outline-none [button,a]:focus-visible:border-gray-8 [button,a]:focus-visible:ring-2 [button,a]:focus-visible:ring-gray-8/50",
        className
      )}
      {...props}
    />
  );
}

const bubbleReactionsVariants = cva(
  "absolute z-10 flex w-fit shrink-0 items-center justify-center gap-0.5 rounded-full bg-gray-3 px-0.5 py-0.5 text-sm ring-2 ring-gray-1 has-[button]:p-0",
  {
    variants: {
      side: {
        top: "top-0 -translate-y-3/4",
        bottom: "bottom-0 translate-y-3/4",
      },
      align: {
        start: "left-1",
        end: "right-1",
      },
    },
    defaultVariants: {
      side: "bottom",
      align: "end",
    },
  }
);

function BubbleReactions({
  side = "bottom",
  align = "end",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "start" | "end";
  side?: "top" | "bottom";
}) {
  return (
    <div
      data-slot="bubble-reactions"
      data-align={align}
      data-side={side}
      className={cn(bubbleReactionsVariants({ side, align }), className)}
      {...props}
    />
  );
}

export {
  BubbleGroup,
  Bubble,
  BubbleContent,
  BubbleReactions,
  bubbleVariants,
};
