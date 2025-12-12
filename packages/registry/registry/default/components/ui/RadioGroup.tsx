"use client";

/**
 * @description A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.
 */
import * as React from "react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { DotFilledIcon } from "@radix-ui/react-icons";

import { cn } from "@/utils/class-names";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "border border-gray-a6 flex size-1.5 items-center justify-center rounded-full outline-none hover:bg-accent-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent-7 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <DotFilledIcon className="fill-accent-9 absolute top-1/2 left-1/2 size-0.5 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };