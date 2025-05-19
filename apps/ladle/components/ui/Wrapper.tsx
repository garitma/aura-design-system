import * as React from "react";

import { cn } from "@/lib/utils";

export type AuraContainer = "smash" | "smesh" | "smish" | "smosh" | "smush";

function Wrapper({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <section className={cn("pad", className)} data-slot="wrapper" {...props} />
  );
}

function WrapperContainer({
  container = "smush",
  children,
  ...props
}: React.ComponentProps<"div"> & {
  container?: AuraContainer;
}) {
  return (
    <div data-slot="wrapper-container" className={cn(container)} {...props}>
      {children}
    </div>
  );
}

export { Wrapper, WrapperContainer };
