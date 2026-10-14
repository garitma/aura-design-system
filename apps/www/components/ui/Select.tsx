"use client";
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

const selectTriggerSizeClassName = {
  sm: "box-border h-3 px-2 py-0",
  default: "box-border h-4 px-2 py-0",
  lg: "box-border h-5 px-2 py-0",
} as const;

type SelectTriggerSize = keyof typeof selectTriggerSizeClassName;

function SelectTrigger({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SelectRadix.Trigger> & {
  size?: SelectTriggerSize;
}) {
  return (
    <SelectRadix.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        selectTriggerSizeClassName[size],
        "p font-normal leading-normal flex w-full items-center justify-between rounded-sm border border-gray-a6 bg-gray-2 text-gray-12 cursor-pointer hover:bg-gray-3 focus:outline-2 focus:outline-accent-9 focus:outline-offset-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-2 data-[placeholder]:text-gray-11",
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
      className={cn(className)}
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

/**
 * Popup list. `SelectArrow` paints only when `position` is `"popper"`.
 * Radix ignores the arrow for the default `"item-aligned"` position.
 */
function SelectContent({
  className,
  ...props
}: React.ComponentProps<typeof SelectRadix.Content>) {
  return (
    <SelectRadix.Portal>
      <SelectRadix.Content
        data-slot="select-content"
        collisionPadding={8}
        className={cn(
          className,
          "relative z-50 max-h-96 min-w-10 origin-(--radix-select-content-transform-origin) overflow-hidden rounded-sm border border-gray-a6 bg-gray-1 shadow-md data-[state=open]:animate-popover-show data-[state=closed]:animate-popover-hide"
        )}
        {...props}
      />
    </SelectRadix.Portal>
  );
}

function SelectViewport({
  className,
  ...props
}: React.ComponentProps<typeof SelectRadix.Viewport>) {
  return (
    <SelectRadix.Viewport
      data-slot="select-viewport"
      className={cn(className, "p-0")}
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
        "p font-normal leading-normal relative flex w-full cursor-pointer select-none items-center py-0.5 px-2 text-gray-12 outline-none hover:bg-accent-3 focus:bg-accent-3 focus:text-accent-12 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-8 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
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
      <CheckIcon className="text-accent-9" />
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
      className={cn(className, "small py-0.5 px-2 text-gray-12")}
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
      className={cn(className, "my-0.5 h-px bg-gray-a6")}
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
        "flex cursor-default items-center justify-center p-0.5"
      )}
      {...props}
    >
      <ChevronUpIcon className="icon text-gray-11" />
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
        "flex cursor-default items-center justify-center p-0.5"
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
export type { SelectTriggerSize };

