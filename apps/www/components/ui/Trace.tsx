import * as React from "react";
import { ChevronRightIcon } from "@radix-ui/react-icons";

import { cn } from "@/utils/class-names";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/Collapsible";

type TraceStatus = "running" | "error" | "pending" | "done";

function Trace({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="trace"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  );
}

function TraceLine({
  className,
  status,
  ...props
}: React.ComponentProps<"span"> & {
  status?: TraceStatus;
}) {
  return (
    <span
      data-slot="trace-line"
      data-status={status}
      className={cn(
        "flex w-fit max-w-full min-w-0 items-center gap-0.5 text-left text-sm",
        className
      )}
      {...props}
    />
  );
}

function TraceIcon({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="trace-icon"
      aria-hidden="true"
      className={cn("inline-flex shrink-0 items-center justify-center", className)}
      {...props}
    />
  );
}

function TraceTitle({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="trace-title"
      className={cn("min-w-0 truncate", className)}
      {...props}
    />
  );
}

function TraceDescription({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="trace-description"
      className={cn("shrink-0 tabular-nums", className)}
      {...props}
    />
  );
}

function TraceCollapsible({
  className,
  ...props
}: React.ComponentProps<typeof Collapsible>) {
  return (
    <Collapsible
      {...props}
      data-slot="trace-collapsible"
      className={cn("flex w-full min-w-0 flex-col", className)}
    />
  );
}

function TraceCollapsibleTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CollapsibleTrigger>) {
  return (
    <CollapsibleTrigger
      {...props}
      data-slot="trace-collapsible-trigger"
      className={cn(
        "inline-flex w-fit max-w-full min-w-0 items-center gap-0.5 text-left",
        className
      )}
    >
      {children}
      <span data-slot="trace-chevron" aria-hidden="true" className="shrink-0">
        <ChevronRightIcon className="icon" />
      </span>
    </CollapsibleTrigger>
  );
}

function TraceCollapsibleContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CollapsibleContent>) {
  return (
    <CollapsibleContent {...props}>
      <div
        data-slot="trace-collapsible-content"
        className={cn(
          "mt-0.5 mb-0.5 ms-1 min-w-0 border-s border-gray-6 ps-1 text-sm leading-relaxed",
          className
        )}
      >
        {children}
      </div>
    </CollapsibleContent>
  );
}

export {
  Trace,
  TraceLine,
  TraceIcon,
  TraceTitle,
  TraceDescription,
  TraceCollapsible,
  TraceCollapsibleTrigger,
  TraceCollapsibleContent,
};
export type { TraceStatus };
