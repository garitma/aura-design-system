import React from "react";
import {
  InfoCircledIcon,
  CheckCircledIcon,
  ExclamationTriangleIcon,
  CrossCircledIcon,
  QuoteIcon,
} from "@radix-ui/react-icons";

type AlertProps = {
  status?: "info" | "success" | "warning" | "danger" | "other";
  label?: React.ReactNode;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  showIcon?: boolean;
};

const Alert = ({
  status = "other",
  label,
  children,
  icon,
  showIcon = true,
  ...props
}: AlertProps) => {
  const classNameConnect: string[] = ["flex gap-1 p-1 rounded-1 border"];

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
    <div className={classNameConnect.join(" ")} {...props}>
      {showIcon && <div>{icon ? icon : <DefaultIcon className="icon" />}</div>}
      <div>
        {label && <div>{label}</div>}
        {children}
      </div>
    </div>
  );
};

export default Alert;
