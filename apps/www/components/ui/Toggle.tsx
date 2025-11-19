"use client";

import * as React from "react";
import { Toggle as TogglePrimitive } from "radix-ui";

import { cn } from "@/utils/class-names";

function Toogle({
  className,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root>) {
  return (
    <TogglePrimitive.Root data-slot="toggle" className={cn(className)} {...props} />
  );
}

export { Toogle };
