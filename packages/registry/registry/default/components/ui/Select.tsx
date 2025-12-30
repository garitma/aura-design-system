"use client";
/**
 * @description Displays a list of options for the user to pick from—triggered by a button.
 */
import * as React from "react";
import { Select as SelectRadix } from "radix-ui";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/utils/class-names";

function Select({ ...props }: React.ComponentProps<typeof SelectRadix.Root>) {
  return <SelectRadix.Root data-slot="select" {...props} />;
}

function SelectTrigger({
  className,
  ...props
}: React.ComponentProps<typeof SelectRadix.Trigger>) {
  return (
    <SelectRadix.Trigger
      data-slot="select-trigger"
      className={cn(
        "flex h-4 w-full items-center justify-between rounded-sm border border-gray-a6 bg-gray-2 px-2 text-gray-12 cursor-pointer focus:outline-2 focus:outline-accent-9 focus:outline-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

function SelectValue({
  className,
  ...props
}: React.ComponentProps<typeof SelectRadix.Value>) {
  return (
    <SelectRadix.Value
      data-slot="select-value"
      className={cn(className, "text-gray-12")}
      {...props}
    />
  );
}

function SelectIcon({
  className,
  ...props
}: React.ComponentProps<typeof SelectRadix.Icon>) {
  return (
    <SelectRadix.Icon
      data-slot="select-icon"
      className={cn(className, "text-gray-11")}
      {...props}
    >
      <ChevronDownIcon className="icon" />
    </SelectRadix.Icon>
  );
}

function SelectPortal({
  ...props
}: React.ComponentProps<typeof SelectRadix.Portal>) {
  return <SelectRadix.Portal data-slot="select-portal" {...props} />;
}

function SelectContent({
  className,
  ...props
}: React.ComponentProps<typeof SelectRadix.Content>) {
  return (
    <SelectRadix.Content
      data-slot="select-content"
      collisionPadding={8}
      className={cn(
        className,
        "relative z-50 max-h-96 min-w-10 overflow-hidden rounded-sm border border-gray-a6 bg-gray-1 shadow-md"
      )}
      {...props}
    />
  );
}

function SelectViewport({
  className,
  ...props
}: React.ComponentProps<typeof SelectRadix.Viewport>) {
  return (
    <SelectRadix.Viewport
      data-slot="select-viewport"
      className={cn(className, "p-1")}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectRadix.Item>) {
  return (
    <SelectRadix.Item
      data-slot="select-item"
      className={cn(
        className,
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1 px-2 text-gray-12 outline-none focus:bg-accent-3 focus:text-accent-12 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      )}
      {...props}
    >
      {children}
    </SelectRadix.Item>
  );
}

function SelectItemText({
  className,
  ...props
}: React.ComponentProps<typeof SelectRadix.ItemText>) {
  return (
    <SelectRadix.ItemText
      data-slot="select-item-text"
      className={cn(className)}
      {...props}
    />
  );
}

function SelectItemIndicator({
  className,
  ...props
}: React.ComponentProps<typeof SelectRadix.ItemIndicator>) {
  return (
    <SelectRadix.ItemIndicator
      data-slot="select-item-indicator"
      className={cn(
        className,
        "absolute left-0.5 top-0 bottom-0 flex items-center justify-center"
      )}
      {...props}
    >
      <CheckIcon className="size-1 text-accent-9" />
    </SelectRadix.ItemIndicator>
  );
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectRadix.Group>) {
  return <SelectRadix.Group data-slot="select-group" {...props} />;
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectRadix.Label>) {
  return (
    <SelectRadix.Label
      data-slot="select-label"
      className={cn(className, "py-1 px-2 text-gray-12 font-medium")}
      {...props}
    />
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectRadix.Separator>) {
  return (
    <SelectRadix.Separator
      data-slot="select-separator"
      className={cn(className, "m-0.6 h-px bg-gray-a6")}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectRadix.ScrollUpButton>) {
  return (
    <SelectRadix.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        className,
        "flex cursor-default items-center justify-center py-1"
      )}
      {...props}
    >
      <ChevronUpIcon className="size-1 text-gray-11" />
    </SelectRadix.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectRadix.ScrollDownButton>) {
  return (
    <SelectRadix.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        className,
        "flex cursor-default items-center justify-center py-1"
      )}
      {...props}
    >
      <ChevronDownIcon className="icon text-gray-11" />
    </SelectRadix.ScrollDownButton>
  );
}

function SelectArrow({
  className,
  ...props
}: React.ComponentProps<typeof SelectRadix.Arrow>) {
  return (
    <SelectRadix.Arrow
      data-slot="select-arrow"
      className={cn(className, "fill-gray-1")}
      {...props}
    />
  );
}

export {
  Select,
  SelectPortal,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectContent,
  SelectViewport,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SelectArrow,
};
