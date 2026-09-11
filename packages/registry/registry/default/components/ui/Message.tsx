/**
 * @description Displays a message in a conversation, with optional avatar, header, footer, and alignment.
 */
import * as React from "react";

import { cn } from "@/utils/class-names";

function MessageGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-group"
      className={cn("flex min-w-0 flex-col gap-1", className)}
      {...props}
    />
  );
}

function Message({
  className,
  align = "start",
  ...props
}: React.ComponentProps<"div"> & { align?: "start" | "end" }) {
  return (
    <div
      data-slot="message"
      data-align={align}
      className={cn(
        "group/message relative flex w-full min-w-0 gap-0.5 text-sm data-[align=end]:flex-row-reverse",
        className
      )}
      {...props}
    />
  );
}

function MessageAvatar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-avatar"
      className={cn(
        "flex w-fit min-w-3 shrink-0 items-center justify-center self-end overflow-hidden rounded-full bg-gray-3 group-has-data-[slot=message-footer]/message:-translate-y-2",
        className
      )}
      {...props}
    />
  );
}

function MessageContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-content"
      className={cn(
        "flex w-full min-w-0 flex-col gap-1 break-words group-data-[align=end]/message:*:data-slot:self-end",
        className
      )}
      {...props}
    />
  );
}

function MessageHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-header"
      className={cn(
        "flex max-w-full min-w-0 items-center px-1 text-xs font-medium text-gray-11 group-has-data-[variant=ghost]/message:px-0",
        className
      )}
      {...props}
    />
  );
}

function MessageFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-footer"
      className={cn(
        "flex max-w-full min-w-0 items-center px-1 text-xs font-medium text-gray-11 group-has-data-[variant=ghost]/message:px-0 group-data-[align=end]/message:justify-end",
        className
      )}
      {...props}
    />
  );
}

export {
  MessageGroup,
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
};
