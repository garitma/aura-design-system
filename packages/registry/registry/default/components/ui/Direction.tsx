"use client";
import * as React from "react";
import { Direction } from "radix-ui";

function DirectionProvider({
  dir = "ltr",
  children,
  className,
  ...props
}: React.ComponentProps<typeof Direction.Provider> & {
  className?: string;
}) {
  return (
    <Direction.Provider dir={dir} {...props}>
      <div dir={dir} data-slot="direction" className={className}>
        {children}
      </div>
    </Direction.Provider>
  );
}

export { DirectionProvider };

