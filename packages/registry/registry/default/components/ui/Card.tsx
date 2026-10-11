/**
 * @description Displays a card with header, content, and footer sections.
 * CardAction is the right-hand slot of CardHeader (top right).
 */
import * as React from "react";

import { cn } from "@/utils/class-names";

type CardProps = React.ComponentProps<"div"> & {
  /**
   * Clickable card. Hover uses a gray-8 border and a soft shadow.
   * The card is in the tab order and shows a focus-visible ring.
   */
  interactive?: boolean;
};

function Card({
  className,
  interactive = false,
  tabIndex,
  onKeyDown,
  onClick,
  ...props
}: CardProps) {
  const clickable = interactive || typeof onClick === "function";

  return (
    <div
      data-slot="card"
      data-interactive={clickable ? "true" : undefined}
      tabIndex={clickable ? (tabIndex ?? 0) : tabIndex}
      onClick={onClick}
      onKeyDown={
        clickable
          ? (event) => {
              onKeyDown?.(event);
              if (event.defaultPrevented) return;
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                event.currentTarget.click();
              }
            }
          : onKeyDown
      }
      className={cn(
        "overflow-hidden border border-gray-6 bg-gray-2 rounded-(--radius-md)",
        clickable &&
          "cursor-pointer transition-colors motion-reduce:transition-none hover:border-gray-8 hover:shadow-[0_2px_8px_var(--gray-a3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-8",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "grid auto-rows-min items-start gap-x-1 gap-y-0.5 p-1 pb-0 has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("small m-0 font-semibold text-gray-12", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("small m-0 text-gray-11", className)}
      {...props}
    />
  );
}

/**
 * Right-hand slot of CardHeader. Place it as a direct child so it sits at the top right, beside the title and description.
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 flex items-center gap-0.5 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("small p-1 pt-0 text-gray-12", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center gap-0.5 border-t border-gray-6 p-1",
        className
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
