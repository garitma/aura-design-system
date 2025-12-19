"use client";
/**
 * @description A control that allows the user to toggle between on and off states.
 */
import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

import { cn } from "@/utils/class-names";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "relative h-1.5 w-2.5 cursor-pointer rounded-full outline-none bg-accent-4 data-[state=checked]:bg-accent-10 border border-gray-a6 hover:bg-accent-5",
        className
      )}
      {...props}
    >
      <SwitchThumb />
    </SwitchPrimitive.Root>
  );
}

function SwitchThumb({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Thumb>) {
  return (
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      className={cn(
        "block size-1 translate-x-[3.5px] rounded-full bg-gray-1 shadow-md transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[15.5px]",
        className
      )}
      {...props}
    />
  );
}

export { Switch, SwitchThumb };
