"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(className)}
      {...props}
    />
  );
}

function SwitchThumb({
    className,
    ...props
  }: React.ComponentProps<typeof SwitchPrimitive.Thumb>) {
    return (
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(className)}
        {...props}
      />
    );
  }

export { Switch, SwitchThumb };
