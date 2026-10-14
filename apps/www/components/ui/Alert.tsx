import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  BookmarkIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/utils/class-names";

const alertVariants = cva("flex items-start gap-1 p-1 rounded-md border", {
  variants: {
    variant: {
      default: "bg-background text-foreground border-gray-6",
      info: "bg-info text-info-contrast border-info-contrast",
      success: "bg-success text-success-contrast border-success-contrast",
      warning: "bg-warning text-warning-contrast border-warning-contrast",
      danger: "bg-danger text-danger-contrast border-danger-contrast",
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
      className={cn("p font-bold", className)}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn("p", className)}
      {...props}
    />
  );
}

function AlertContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-content"
      className={cn("flex min-w-0 flex-1 flex-col gap-0.5", className)}
      {...props}
    />
  );
}

function AlertIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-icon"
      className={cn("shrink-0", className)}
      {...props}
    />
  );
}

const alertStatusIcons = {
  default: BookmarkIcon,
  info: InfoCircledIcon,
  success: CheckCircledIcon,
  warning: ExclamationTriangleIcon,
  danger: CrossCircledIcon,
} as const;

type AlertStatusName = keyof typeof alertStatusIcons;

const AlertStatus = ({
  title,
  description,
  status,
  icon,
}: {
  title: string;
  description: string;
  status: AlertStatusName;
  icon?: React.ElementType;
}) => {
  const Icon = icon || alertStatusIcons[status];

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

