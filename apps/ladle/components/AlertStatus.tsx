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
  ...props
}: AlertProps) => {
  const classNameConnect: string[] = [];

  const statusConfig = {
    info: {
      icon: InfoCircledIcon,
      bgColor: "bg-info",
      textColor: "text-info-contrast",
      borderColor: "border-info-contrast",
    },
    success: {
      icon: CheckCircledIcon,
      bgColor: "bg-success",
      textColor: "text-success-contrast",
      borderColor: "border-success-contrast",
    },
    warning: {
      icon: ExclamationTriangleIcon,
      bgColor: "bg-warning",
      textColor: "text-warning-contrast",
      borderColor: "border-warning-contrast",
    },
    danger: {
      icon: CrossCircledIcon,
      bgColor: "bg-danger",
      textColor: "text-danger-contrast",
      borderColor: "border-danger-contrast",
    },
    other: {
      icon: QuoteIcon,
      bgColor: "bg-black-1",
      textColor: "text-black-9",
      borderColor: "border-black-9",
    },
  };

  const config = status ? statusConfig[status] : statusConfig.other;
  const { icon: DefaultIcon, bgColor, textColor, borderColor } = config;

  classNameConnect.push(bgColor, textColor, borderColor);

  return (
    <Alert className={classNameConnect.join(" ")} {...props}>
      <AlertIcon>
        <DefaultIcon className="icon" />
      </AlertIcon>
      <AlertContent>
        {title && <AlertTitle>{title}</AlertTitle>}
        {description && <AlertDescription>{description}</AlertDescription>}
      </AlertContent>
    </Alert>
  );
};

export default AlertStatus;
