"use client";
import * as React from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import { cn } from "@/utils/class-names";

function NativeSelect({
  className,
  children,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <div data-slot="native-select" className="relative w-full">
      <select className={cn("w-full pe-4", className)} {...props}>
        {children}
      </select>
      <span className="pointer-events-none absolute inset-y-0 end-1 flex items-center">
        <ChevronDownIcon className="icon" aria-hidden />
      </span>
    </div>
  );
}

function NativeSelectGroup(props: React.ComponentProps<"optgroup">) {
  return <optgroup data-slot="native-select-group" {...props} />;
}

function NativeSelectOption(props: React.ComponentProps<"option">) {
  return <option data-slot="native-select-option" {...props} />;
}

export { NativeSelect, NativeSelectGroup, NativeSelectOption };

