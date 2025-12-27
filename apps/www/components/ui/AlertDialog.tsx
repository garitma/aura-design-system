"use client";
/**
 * @description A modal dialog that interrupts the user with important content and expects a response.
 */
import * as React from "react";
import { AlertDialog as AlertDialogRadix } from "radix-ui";

import { cn } from "@/utils/class-names";

function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogRadix.Root>) {
  return <AlertDialogRadix.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogRadix.Trigger>) {
  return (
    <AlertDialogRadix.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
}

function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogRadix.Portal>) {
  return <AlertDialogRadix.Portal data-slot="alert-dialog-portal" {...props} />;
}

function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogRadix.Overlay>) {
  return (
    <AlertDialogRadix.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "fixed inset-0 bg-gray-9a backdrop-blur-xs z-50 data-[state=open]:animate-overlay-show",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogRadix.Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogRadix.Content
        data-slot="alert-dialog-content"
        className={cn(
          "smash fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 bg-gray-1 p-2 rounded-md z-50 data-[state=open]:animate-content-show border border-gray-a6",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("", className)}
      {...props}
    />
  );
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex-col-reverse md:flex-row flex justify-end gap-1 md:gap-2",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogRadix.Title>) {
  return (
    <AlertDialogRadix.Title
      data-slot="alert-dialog-title"
      className={cn("m-0", className)}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogRadix.Description>) {
  return (
    <AlertDialogRadix.Description
      data-slot="alert-dialog-description"
      className={cn("", className)}
      {...props}
    />
  );
}

function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogRadix.Action>) {
  return <AlertDialogRadix.Action className={cn("", className)} {...props} />;
}

function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogRadix.Cancel>) {
  return <AlertDialogRadix.Cancel className={cn("", className)} {...props} />;
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
