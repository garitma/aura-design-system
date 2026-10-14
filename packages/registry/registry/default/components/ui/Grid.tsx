import * as React from "react";

import { cn } from "@/utils/class-names";

type AuraGrid = "one" | "two" | "three" | "four" | "five" | "six" | "seven" | "eight" | "nine" | "ten" | "eleven" | "twelve";

interface GridProps extends React.ComponentProps<"div"> {
  col: AuraGrid;
  isFixed?: boolean;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ col, isFixed, className, ...props }, ref) => {
    return (
      <div
        data-slot="grid"
        className={cn("aureole", col, isFixed && "fixed", className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Grid.displayName = "Grid";

export { Grid };
export type { GridProps };
export default Grid;