"use client";
import * as React from "react";
import { SymbolIcon } from "@radix-ui/react-icons";

import { cn } from "@/utils/class-names";

function Spinner({
  className,
  label,
  ...props
}: React.ComponentProps<"span"> & {
  label?: string;
}) {
  return (
    <span
      data-slot="spinner"
      role={label ? "status" : undefined}
      className={cn("inline-flex", className)}
      {...props}
    >
      <SymbolIcon
        className="icon animate-spin motion-reduce:animate-none"
        aria-hidden
      />
      {label ? <span className="sr-only">{label}</span> : null}
    </span>
  );
}

export { Spinner };
