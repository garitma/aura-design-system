import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/utils/class-names";

const alertVariants = cva("flex gap-1 space-y-0.5 p-1 rounded-md border", {
  variants: {
    variant: {
      default: "bg-background text-foreground",
      info: "bg-info text-info-contrast border-info-contrast border border-info-contrast",
      success:
        "bg-success text-success-contrast border-success-contrast border border-success-contrast",
      warning:
        "bg-warning text-warning-contrast border-warning-contrast border border-warning-contrast",
      danger:
        "bg-danger text-danger-contrast border-danger-contrast border border-danger-contrast",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

function Alert({ className, variant, ...props }: AlertProps) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
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

function AlertContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-content" {...props} />;
}

function AlertIcon({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-icon" {...props} />;
}

// Local AlertStatus component definition
const AlertStatus = ({
  title,
  description,
  status,
  icon,
}: {
  title: string;
  description: string;
  status: "info" | "success" | "danger" | "warning";
  icon?: React.ElementType;
}) => {
  const Icon =
    icon ||
    {
      info: InfoCircledIcon,
      success: CheckCircledIcon,
      warning: ExclamationTriangleIcon,
      danger: CrossCircledIcon,
    }[status];

  return (
    <Alert variant={status}>
      <AlertIcon>
        <Icon className="icon" />
      </AlertIcon>
      <AlertContent>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </AlertContent>
    </Alert>
  );
};

export {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  AlertContent,
  AlertStatus,
};
