import * as React from "react";

import { cn } from "@/utils/class-names";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return <label data-slot="input" className={cn(className)} {...props} />;
}

export { Label };
