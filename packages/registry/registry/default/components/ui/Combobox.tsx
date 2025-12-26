"use client";

/**
 * @description A combobox component that allows users to search and select from a list of options.
 */
import * as React from "react";
import { Combobox } from "@base-ui/react/combobox";

import { cn } from "@/utils/class-names";

const ComboboxRoot = Combobox.Root;

function ComboboxInput({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.Input>) {
  return (
    <Combobox.Input
      data-slot="combobox-input"
      className={cn(className)}
      {...props}
    />
  );
}

function ComboboxTrigger({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.Trigger>) {
  return (
    <Combobox.Trigger
      data-slot="combobox-trigger"
      className={cn(className)}
      {...props}
    />
  );
}

function ComboboxIcon({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.Icon>) {
  return (
    <Combobox.Icon
      data-slot="combobox-icon"
      className={cn(className)}
      {...props}
    />
  );
}

function ComboboxClear({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.Clear>) {
  return (
    <Combobox.Clear
      data-slot="combobox-clear"
      className={cn(className)}
      {...props}
    />
  );
}

function ComboboxValue({
  ...props
}: React.ComponentProps<typeof Combobox.Value>) {
  return <Combobox.Value data-slot="combobox-value" {...props} />;
}

function ComboboxChips({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.Chips>) {
  return (
    <Combobox.Chips
      data-slot="combobox-chips"
      className={cn(className)}
      {...props}
    />
  );
}

function ComboboxChip({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.Chip>) {
  return (
    <Combobox.Chip
      data-slot="combobox-chip"
      className={cn(className)}
      {...props}
    />
  );
}

function ComboboxChipRemove({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.ChipRemove>) {
  return (
    <Combobox.ChipRemove
      data-slot="combobox-chip-remove"
      className={cn(className)}
      {...props}
    />
  );
}

function ComboboxPortal({
  ...props
}: React.ComponentProps<typeof Combobox.Portal>) {
  return <Combobox.Portal data-slot="combobox-portal" {...props} />;
}

function ComboboxBackdrop({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.Backdrop>) {
  return (
    <Combobox.Backdrop
      data-slot="combobox-backdrop"
      className={cn(className)}
      {...props}
    />
  );
}

function ComboboxPositioner({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.Positioner>) {
  return (
    <Combobox.Positioner
      data-slot="combobox-positioner"
      collisionPadding={8}
      className={cn("outline-0", className)}
      {...props}
    />
  );
}

function ComboboxPopup({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.Popup>) {
  return (
    <Combobox.Popup
      data-slot="combobox-popup"
      className={cn(
        "bg-gray-1 border border-gray-a6 rounded-sm relative shadow-md w-[var(--anchor-width)] max-h-[23rem] max-w-[var(--available-width)]",
        className
      )}
      {...props}
    />
  );
}

function ComboboxArrow({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.Arrow>) {
  return (
    <Combobox.Arrow
      data-slot="combobox-arrow"
      className={cn(className, "fill-gray-1")}
      {...props}
    />
  );
}

function ComboboxStatus({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.Status>) {
  return (
    <Combobox.Status
      data-slot="combobox-status"
      className={cn(className)}
      {...props}
    />
  );
}

function ComboboxEmpty({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.Empty>) {
  return (
    <Combobox.Empty
      data-slot="combobox-empty"
      className={cn(
        "text-gray-11 py-1 px-2 text-sm text-center empty:hidden",
        className
      )}
      {...props}
    />
  );
}

function ComboboxList({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.List>) {
  return (
    <Combobox.List
      data-slot="combobox-list"
      className={cn(
        "overflow-y-auto overscroll-contain py-0.5 scroll-py-0.5 outline-0 max-h-[min(23rem,var(--available-height))] data-[empty]:p-0",
        className
      )}
      {...props}
    />
  );
}

function ComboboxRow({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.Row>) {
  return (
    <Combobox.Row
      data-slot="combobox-row"
      className={cn(className)}
      {...props}
    />
  );
}

function ComboboxItem({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.Item>) {
  return (
    <Combobox.Item
      data-slot="combobox-item"
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm p-0.5 px-2 text-sm outline-none hover:bg-accent-3 focus:bg-accent-3 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    />
  );
}

function ComboboxItemIndicator({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.ItemIndicator>) {
  return (
    <Combobox.ItemIndicator
      data-slot="combobox-item-indicator"
      className={cn(
        "absolute right-0.5 top-0 bottom-0 flex items-center justify-center",
        className
      )}
      {...props}
    />
  );
}

function ComboboxSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.Separator>) {
  return (
    <Combobox.Separator
      data-slot="combobox-separator"
      className={cn("m-0.6 h-px bg-gray-a6", className)}
      {...props}
    />
  );
}

function ComboboxGroup({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.Group>) {
  return (
    <Combobox.Group
      data-slot="combobox-group"
      className={cn(className)}
      {...props}
    />
  );
}

function ComboboxGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.GroupLabel>) {
  return (
    <Combobox.GroupLabel
      data-slot="combobox-group-label"
      className={cn(
        "p-0.5 px-2 text-xs font-medium text-gray-12",
        className
      )}
      {...props}
    />
  );
}

function ComboboxCollection({
  ...props
}: React.ComponentProps<typeof Combobox.Collection>) {
  return (
    <Combobox.Collection
      data-slot="combobox-collection"
      {...props}
    />
  );
}

export {
  ComboboxRoot as Combobox,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxIcon,
  ComboboxClear,
  ComboboxValue,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxPortal,
  ComboboxBackdrop,
  ComboboxPositioner,
  ComboboxPopup,
  ComboboxArrow,
  ComboboxStatus,
  ComboboxEmpty,
  ComboboxList,
  ComboboxRow,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxSeparator,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxCollection,
};

