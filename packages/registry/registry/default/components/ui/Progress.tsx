"use client";
/**
 * @description Displays an indicator showing the completion progress of a task.
 */
import * as React from "react";
import { Progress as ProgressRadix } from "radix-ui";

import { cn } from "@/utils/class-names";

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressRadix.Root>) {
  return (
    <ProgressRadix.Root
      data-slot="progress"
      className={cn(
        "relative h-0.5 w-full overflow-hidden rounded-full bg-gray-3",
        className
      )}
      {...props}
    >
      <ProgressRadix.Indicator
        data-slot="progress-indicator"
        className="bg-accent-9 h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressRadix.Root>
  );
}

export { Progress };
