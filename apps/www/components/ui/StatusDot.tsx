import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/class-names";

const STATES = {
  queued: { label: "Queued", message: "Queued." },
  building: { label: "Building", message: "In progress." },
  error: { label: "Error", message: "Failed." },
  ready: { label: "Ready", message: "Ready." },
  canceled: { label: "Canceled", message: "Canceled." },
} as const;

type StatusDotState = keyof typeof STATES;

const dot = cva("inline-block size-[10px] shrink-0 rounded-full", {
  variants: {
    state: {
      queued: "bg-status-dot-queued",
      building: "bg-status-dot-building",
      error: "bg-status-dot-error",
      ready: "bg-status-dot-ready",
      canceled: "bg-status-dot-canceled",
    },
    ring: { true: "ring-2 ring-status-dot-ring", false: "" },
  },
  defaultVariants: { state: "queued", ring: false },
});

interface StatusDotProps extends React.ComponentProps<"span"> {
  state?: StatusDotState;
  label?: boolean | string;
  ring?: boolean;
}

function StatusDot({
  state = "queued",
  label,
  ring,
  className,
  ...props
}: StatusDotProps) {
  const s = STATES[state];
  return (
    <span
      data-slot="status-dot"
      data-state={state}
      role="status"
      aria-label={s.label}
      title={s.message}
      className={cn("inline-flex items-center gap-[8px]", className)}
      {...props}
    >
      <span
        data-slot="status-dot-indicator"
        aria-hidden
        className={dot({ state, ring })}
      />
      {label ? (
        <span className="text-sm font-medium text-gray-12">
          {label === true ? s.label : label}
        </span>
      ) : null}
    </span>
  );
}

export { StatusDot, type StatusDotState };

