/**
 * @description Multi-line text input.
 */
import * as React from "react";

import { cn } from "@/utils/class-names";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      data-slot="textarea"
      ref={ref}
      className={cn(
        "flex min-h-20 w-full rounded-md border border-gray-6 bg-gray-1 px-2 py-1.5 text-gray-12 placeholder:text-gray-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-8 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
