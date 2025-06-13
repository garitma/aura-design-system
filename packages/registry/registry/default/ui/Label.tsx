import * as React from "react";
import { Label as LabelRadix } from "radix-ui";

import { cn } from "@/utils/class-names";


function Label({ className, ...props }: React.ComponentProps<typeof LabelRadix.Root>) {
  return <LabelRadix.Root data-slot="label" className={cn(className, "cursor-pointer")} {...props} />;
}


export { Label };
