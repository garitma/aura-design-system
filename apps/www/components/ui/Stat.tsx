/**
 * @description Displays a statistic with label, value, optional indicator, trend, and description.
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/class-names";
import { Separator } from "@/components/ui/Separator";

function Stat({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat"
      className={cn(
        "grid grid-cols-[1fr_auto] gap-x-1.5 gap-y-0.5 rounded-md border border-gray-6 bg-gray-2 p-1.5 text-gray-12",
        "**:data-[slot=stat-label]:col-span-1 **:data-[slot=stat-value]:col-span-1",
        "**:data-[slot=stat-indicator]:col-start-2 **:data-[slot=stat-indicator]:row-span-2 **:data-[slot=stat-indicator]:row-start-1 **:data-[slot=stat-indicator]:self-start",
        "**:data-[slot=stat-description]:col-span-2 **:data-[slot=stat-separator]:col-span-2 **:data-[slot=stat-trend]:col-span-2",
        className
      )}
      {...props}
    />
  );
}

function StatLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat-label"
      className={cn("text-sm font-medium text-gray-11", className)}
      {...props}
    />
  );
}

const statIndicatorVariants = cva(
  "flex shrink-0 items-center justify-center [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "text-gray-11",
        icon: "size-2.5 rounded-md border",
        badge:
          "h-2 min-w-2 rounded-sm border px-0.5 text-xs font-medium",
        action:
          "size-2.5 cursor-pointer rounded-md transition-colors hover:bg-gray-3",
      },
      color: {
        default: "bg-gray-3 text-gray-11 border-gray-6",
        success:
          "border-success/20 bg-success/10 text-success-contrast",
        info: "border-info/20 bg-info/10 text-info-contrast",
        warning:
          "border-warning/20 bg-warning/10 text-warning-contrast",
        error: "border-danger/20 bg-danger/10 text-danger-contrast",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        color: "default",
        class: "bg-transparent border-transparent",
      },
    ],
    defaultVariants: {
      variant: "default",
      color: "default",
    },
  }
);

interface StatIndicatorProps
  extends Omit<React.ComponentProps<"div">, "color">,
    VariantProps<typeof statIndicatorVariants> {}

function StatIndicator({
  className,
  variant = "default",
  color = "default",
  ...props
}: StatIndicatorProps) {
  return (
    <div
      data-slot="stat-indicator"
      data-variant={variant}
      data-color={color}
      className={cn(statIndicatorVariants({ variant, color }), className)}
      {...props}
    />
  );
}

function StatValue({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat-value"
      className={cn("h4 font-semibold tracking-tight text-gray-12", className)}
      {...props}
    />
  );
}

function StatTrend({
  className,
  trend,
  ...props
}: React.ComponentProps<"div"> & { trend?: "up" | "down" | "neutral" }) {
  return (
    <div
      data-slot="stat-trend"
      data-trend={trend}
      className={cn(
        "inline-flex items-center gap-0.5 text-xs font-medium [&_svg]:pointer-events-none [&_svg]:shrink-0",
        {
          "text-success-contrast": trend === "up",
          "text-danger-contrast": trend === "down",
          "text-gray-11": trend === "neutral" || !trend,
        },
        className
      )}
      {...props}
    />
  );
}

function StatSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="stat-separator"
      className={cn("my-0.5", className)}
      {...props}
    />
  );
}

function StatDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat-description"
      className={cn("text-xs text-gray-11", className)}
      {...props}
    />
  );
}

export {
  Stat,
  StatDescription,
  StatIndicator,
  StatLabel,
  StatSeparator,
  StatTrend,
  StatValue,
  statIndicatorVariants,
};
