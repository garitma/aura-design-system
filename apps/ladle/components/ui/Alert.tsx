import * as React from "react";

import { cn } from "@/utils/class-names";

function Alert({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn("flex gap-1 space-y-0.5 p-1 rounded-md border", className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn("font-bold", className)}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div data-slot="alert-description" {...props} />;
}

function AlertContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div data-slot="alert-content" {...props} />;
}

function AlertIcon({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div data-slot="alert-icon" {...props} />;
}

export { Alert, AlertTitle, AlertDescription, AlertIcon, AlertContent };
