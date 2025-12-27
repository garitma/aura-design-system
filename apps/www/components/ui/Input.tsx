/**
 * @description Displays a form input field or a component that looks like an input field.
 */
import * as React from "react";

import { cn } from "@/utils/class-names";

function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input data-slot="input" className={cn(className)} {...props} />;
}

export { Input };
