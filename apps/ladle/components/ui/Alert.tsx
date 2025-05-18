import * as React from "react";

function Alert({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div data-slot="alert" role="alert" {...props} />;
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-title" {...props} />;
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div data-slot="alert-description" {...props} />;
}

export { Alert, AlertTitle, AlertDescription };
