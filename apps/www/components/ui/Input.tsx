import * as React from "react";

import { cn } from "@/utils/class-names";

const inputSizeClassName = {
  sm: "box-border h-3 px-2 py-0",
  default: "box-border h-4 px-2 py-0",
  lg: "box-border h-5 px-2 py-0",
} as const;

type InputSize = keyof typeof inputSizeClassName;

function Input({
  className,
  size = "default",
  ...props
}: Omit<React.ComponentProps<"input">, "size"> & {
  size?: InputSize;
}) {
  return (
    <input
      data-slot="input"
      data-size={size}
      className={cn(inputSizeClassName[size], className)}
      {...props}
    />
  );
}

export { Input };
export type { InputSize };

