import type * as React from "react";

import { cn } from "@/utils/class-names";

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "pointer-events-none inline-flex h-1.5 min-w-2 select-none items-center justify-center gap-0.5 rounded bg-gray-2 px-0.5 font-medium font-sans text-gray-11 text-xs [&_svg:not([class*='size-'])]:size-1 border border-gray-a6",
        className,
      )}
      data-slot="kbd"
      {...props}
    />
  );
}

function KbdGroup({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn("inline-flex items-center gap-0.5", className)}
      data-slot="kbd-group"
      {...props}
    />
  );
}

export { Kbd, KbdGroup };
