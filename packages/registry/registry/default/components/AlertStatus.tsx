import React from "react";
import {
  InfoCircledIcon,
  CheckCircledIcon,
  ExclamationTriangleIcon,
  CrossCircledIcon,
  QuoteIcon,
} from "@radix-ui/react-icons";

import {
  Alert,
  AlertContent,
  AlertTitle,
  AlertDescription,
  AlertIcon,
} from "@/components/ui/Alert";

export type AlertProps = {
  status?: "info" | "success" | "warning" | "danger" | "other";
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  showIcon?: boolean;
};

const AlertStatus = ({
  status = "other",
  title,
  description,
  icon,
  showIcon = true,
  ...props
}: AlertProps) => {
  // Map status to Alert variant
  const variantMap: Record<
    "info" | "success" | "warning" | "danger" | "other",
    "info" | "success" | "warning" | "danger" | "default"
  > = {
    info: "info",
    success: "success",
    warning: "warning",
    danger: "danger",
    other: "default",
  };

  // Map status to default icons
  const iconMap = {
    info: InfoCircledIcon,
    success: CheckCircledIcon,
    warning: ExclamationTriangleIcon,
    danger: CrossCircledIcon,
    other: QuoteIcon,
  };

  const variant = variantMap[status];
  const DefaultIcon = iconMap[status];

  return (
    <Alert variant={variant} {...props}>
      {showIcon && (
        <AlertIcon>
          {icon ? icon : <DefaultIcon />}
        </AlertIcon>
      )}
      <AlertContent>
        {title && <AlertTitle>{title}</AlertTitle>}
        {description && <AlertDescription>{description}</AlertDescription>}
      </AlertContent>
    </Alert>
  );
};

export default AlertStatus;