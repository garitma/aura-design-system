"use client";

import * as React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/class-names";
import { Button } from "@/components/ui/Button";

const bannerVariants = cva("border-b", {
  variants: {
    tone: {
      default: "border-accent-7 bg-accent-3 text-gray-12",
      info: "border-info-contrast bg-info text-info-contrast",
      success: "border-success-contrast bg-success text-success-contrast",
      warning: "border-warning-contrast bg-warning text-warning-contrast",
      danger: "border-danger-contrast bg-danger text-danger-contrast",
    },
  },
  defaultVariants: {
    tone: "default",
  },
});

interface BannerProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof bannerVariants> {
  action?: React.ReactNode;
  onDismiss?: () => void;
  messageClassName?: string;
  asChild?: boolean;
  dismissState?: "default" | "hover" | "focus";
}

function Banner({
  className,
  children,
  action,
  onDismiss,
  tone,
  messageClassName,
  asChild = false,
  dismissState = "default",
  ...props
}: BannerProps) {
  const Message = asChild ? Slot : "p";

  return (
    <div
      {...props}
      data-slot="banner"
      data-tone={tone ?? "default"}
      className={cn("@container w-full", bannerVariants({ tone }), className)}
    >
      <div
        data-slot="banner-layout"
        className="flex flex-col items-stretch gap-0.5 p-1 sm:flex-row sm:items-center sm:gap-1 sm:px-1.5 @max-sm:!flex-col @max-sm:!items-stretch @max-sm:!gap-0.5 @max-sm:!p-1"
      >
        <div
          data-slot="banner-row"
          className="flex w-full min-w-0 items-start gap-1 sm:contents @max-sm:!flex @max-sm:!w-full @max-sm:!items-start @max-sm:!gap-1"
        >
          <Message
            data-slot="banner-message"
            className={cn("m-0 min-w-0 flex-1 p", messageClassName)}
          >
            {children}
          </Message>
          {onDismiss ? (
            <Button
              type="button"
              size="icon"
              variant="link"
              data-slot="banner-dismiss"
              aria-label="Dismiss banner"
              className={cn(
                "shrink-0 text-inherit no-underline hover:bg-accent-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-8 sm:order-last",
                dismissState === "hover" && "bg-accent-4",
                dismissState === "focus" && "ring-2 ring-accent-8",
              )}
              onClick={onDismiss}
            >
              <Cross2Icon className="icon" aria-hidden />
            </Button>
          ) : null}
        </div>
        {action ? (
          <div data-slot="banner-action" className="w-fit shrink-0">
            {action}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export { Banner };
export type { BannerProps };
