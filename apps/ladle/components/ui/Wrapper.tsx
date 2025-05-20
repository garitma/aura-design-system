import * as React from "react";
import type { AuraContainer } from "@aura-design/system/types/global";

import { cn } from "@/lib/utils";

function Wrapper({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <section className={cn("pad", className)} data-slot="wrapper" {...props} />
  );
}

function WrapperContainer({
  container = "smush",
  ...props
}: React.ComponentProps<"div"> & {
  container?: AuraContainer;
}) {
  return (
    <div data-slot="wrapper-container" className={cn(container)} {...props} />
  );
}

export { Wrapper, WrapperContainer };
