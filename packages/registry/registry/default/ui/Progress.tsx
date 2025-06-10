"use client";

import * as React from "react";
import { Progress as ProgressRadix } from "radix-ui";

import { cn } from "@/lib/utils";

function Progress({
  value,
  ...props
}: React.ComponentProps<typeof ProgressRadix.Root>) {
  return (
    <ProgressRadix.Root data-slot="progress" {...props}>
      <ProgressRadix.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressRadix.Root>
  );
}

export { Progress };
