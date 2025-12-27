"use client";
/**
 * @description Displays an autocomplete input with a list of options.
 */
import * as React from "react";
import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { Cross1Icon, CaretSortIcon } from "@radix-ui/react-icons";

import { cn } from "@/utils/class-names";
import { Input } from "@/components/ui/Input";
import { ScrollArea } from "@/components/ui/ScrollArea";

function Autocomplete({
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Root>) {
  return <AutocompletePrimitive.Root data-slot="autocomplete" {...props} />;
}

function AutocompleteInput({
  className,
  showTrigger = false,
  showClear = false,
  startAddon,
  size,
  ...props
}: Omit<AutocompletePrimitive.Input.Props, "size"> & {
  showTrigger?: boolean;
  showClear?: boolean;
  startAddon?: React.ReactNode;
  size?: "sm" | "default" | "lg" | number;
  ref?: React.Ref<HTMLInputElement>;
}) {
  const sizeValue = (size ?? "default") as "sm" | "default" | "lg" | number;

  return (
    <div className="relative w-full">
      {startAddon && (
        <div
          aria-hidden="true"
          className="[&_svg]:-mx-0.5 pointer-events-none absolute inset-y-0 start-px z-10 flex items-center ps-[calc(--spacing(3)-1px)] opacity-80 has-[+[data-size=sm]]:ps-[calc(--spacing(2.5)-1px)] [&_svg:not([class*='size-'])]:size-1.5 sm:[&_svg:not([class*='size-'])]:size-1"
          data-slot="autocomplete-start-addon"
        >
          {startAddon}
        </div>
      )}
      <AutocompletePrimitive.Input
        className={cn(
          startAddon &&
            "data-[size=sm]:*:data-[slot=autocomplete-input]:ps-[calc(--spacing(7.5)-1px)] *:data-[slot=autocomplete-input]:ps-[calc(--spacing(8.5)-1px)] sm:data-[size=sm]:*:data-[slot=autocomplete-input]:ps-[calc(--spacing(7)-1px)] sm:*:data-[slot=autocomplete-input]:ps-[calc(--spacing(8)-1px)]",
          sizeValue === "sm"
            ? "has-[+[data-slot=autocomplete-trigger],+[data-slot=autocomplete-clear]]:*:data-[slot=autocomplete-input]:pe-6.5"
            : "has-[+[data-slot=autocomplete-trigger],+[data-slot=autocomplete-clear]]:*:data-[slot=autocomplete-input]:pe-7",
          className,
        )}
        data-slot="autocomplete-input"
        data-size={typeof sizeValue === "string" ? sizeValue : undefined}
        render={<Input />}
        {...props}
      />
      {showTrigger && (
        <AutocompleteTrigger
          className={cn(
            "-translate-y-1/2 absolute top-1/2 inline-flex size-2.5 shrink-0 cursor-pointer items-center justify-center rounded-md border border-transparent opacity-80 outline-none transition-colors pointer-coarse:after:absolute pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:opacity-100 has-[+[data-slot=autocomplete-clear]]:hidden sm:size-2 [&_svg:not([class*='size-'])]:size-1.5 sm:[&_svg:not([class*='size-'])]:size-1 [&_svg]:pointer-events-none [&_svg]:shrink-0",
            sizeValue === "sm" ? "end-0" : "end-0.5",
          )}
        >
          <CaretSortIcon />
        </AutocompleteTrigger>
      )}
      {showClear && (
        <AutocompleteClear
          className={cn(
            "-translate-y-1/2 absolute top-1/2 inline-flex size-2.5 shrink-0 cursor-pointer items-center justify-center rounded-md border border-transparent opacity-80 outline-none transition-colors pointer-coarse:after:absolute pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:opacity-100 has-[+[data-slot=autocomplete-clear]]:hidden sm:size-2 [&_svg:not([class*='size-'])]:size-1.5 sm:[&_svg:not([class*='size-'])]:size-1 [&_svg]:pointer-events-none [&_svg]:shrink-0",
            sizeValue === "sm" ? "end-0" : "end-0.5",
          )}
        >
          <Cross1Icon />
        </AutocompleteClear>
      )}
    </div>
  );
}

function AutocompletePopup({
  className,
  children,
  sideOffset = 4,
  ...props
}: AutocompletePrimitive.Popup.Props & {
  sideOffset?: number;
}) {
  return (
    <AutocompletePrimitive.Portal>
      <AutocompletePrimitive.Positioner
        className="z-50 select-none bg-gray-1 border border-gray-a6 rounded-sm relative shadow-md"
        data-slot="autocomplete-positioner"
        sideOffset={sideOffset}
      >
        <span
          className={cn(
            className,
            "bg-gray-1 border border-gray-a6 rounded-sm relative shadow-md"
          )}
        >
          <AutocompletePrimitive.Popup
            className="flex max-h-[min(var(--available-height),23rem)] w-(--anchor-width) max-w-(--available-width) flex-col"
            data-slot="autocomplete-popup"
            {...props}
          >
            {children}
          </AutocompletePrimitive.Popup>
        </span>
      </AutocompletePrimitive.Positioner>
    </AutocompletePrimitive.Portal>
  );
}

function AutocompleteItem({
  className,
  children,
  ...props
}: AutocompletePrimitive.Item.Props) {
  return (
    <AutocompletePrimitive.Item
      data-slot="autocomplete-item"
      className={cn(
        className,
        "p-0.5 px-2 hover:bg-accent-3 data-[highlighted]:bg-accent-3 flex relative cursor-pointer justify-between data-disabled:pointer-events-none data-disabled:opacity-64"
      )}
      {...props}
    >
      {children}
    </AutocompletePrimitive.Item>
  );
}

function AutocompleteSeparator({
  className,
  ...props
}: AutocompletePrimitive.Separator.Props) {
  return (
    <AutocompletePrimitive.Separator
      data-slot="autocomplete-separator"
      className={cn(className, "m-0.6 h-px bg-gray-a6")}
      {...props}
    />
  );
}

function AutocompleteGroup({
  ...props
}: AutocompletePrimitive.Group.Props) {
  return <AutocompletePrimitive.Group data-slot="autocomplete-group" {...props} />;
}

function AutocompleteGroupLabel({
  className,
  ...props
}: AutocompletePrimitive.GroupLabel.Props) {
  return (
    <AutocompletePrimitive.GroupLabel
      data-slot="autocomplete-group-label"
      className={cn(className, "p-0.5 px-2 text-gray-12 font-medium text-xs")}
      {...props}
    />
  );
}

function AutocompleteEmpty({
  className,
  ...props
}: AutocompletePrimitive.Empty.Props) {
  return (
    <AutocompletePrimitive.Empty
      data-slot="autocomplete-empty"
      className={cn(className, "p-0.5 px-2 text-center text-gray-12 empty:hidden")}
      {...props}
    />
  );
}

function AutocompleteRow({
  className,
  ...props
}: AutocompletePrimitive.Row.Props) {
  return (
    <AutocompletePrimitive.Row
      className={className}
      data-slot="autocomplete-row"
      {...props}
    />
  );
}

function AutocompleteValue({ ...props }: AutocompletePrimitive.Value.Props) {
  return (
    <AutocompletePrimitive.Value data-slot="autocomplete-value" {...props} />
  );
}

function AutocompleteList({
  className,
  ...props
}: AutocompletePrimitive.List.Props) {
  return (
    <ScrollArea>
      <AutocompletePrimitive.List
        data-slot="autocomplete-list"
        className={cn(className)}
        {...props}
      />
    </ScrollArea>
  );
}

function AutocompleteClear({
  className,
  ...props
}: AutocompletePrimitive.Clear.Props) {
  return (
    <AutocompletePrimitive.Clear
      className={cn(
        "-translate-y-1/2 absolute end-0.5 top-1/2 inline-flex size-2.5 shrink-0 cursor-pointer items-center justify-center rounded-md border border-transparent opacity-80 outline-none transition-[color,background-color,box-shadow,opacity] pointer-coarse:after:absolute pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:opacity-100 sm:size-2 [&_svg:not([class*='size-'])]:size-1.5 sm:[&_svg:not([class*='size-'])]:size-1 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      data-slot="autocomplete-clear"
      {...props}
    >
      <Cross1Icon />
    </AutocompletePrimitive.Clear>
  );
}

function AutocompleteStatus({
  className,
  ...props
}: AutocompletePrimitive.Status.Props) {
  return (
    <AutocompletePrimitive.Status
      data-slot="autocomplete-status"
      className={cn(className, "p-0.5 px-2 font-medium text-gray-12 text-xs empty:m-0 empty:p-0")}
      {...props}
    />
  );
}

function AutocompleteCollection({
  ...props
}: AutocompletePrimitive.Collection.Props) {
  return (
    <AutocompletePrimitive.Collection
      data-slot="autocomplete-collection"
      {...props}
    />
  );
}

function AutocompleteTrigger({
  className,
  ...props
}: AutocompletePrimitive.Trigger.Props) {
  return (
    <AutocompletePrimitive.Trigger
      data-slot="autocomplete-trigger"
      className={cn(className)}
      {...props}
    />
  );
}

export {
  Autocomplete,
  AutocompleteInput,
  AutocompleteTrigger,
  AutocompletePopup,
  AutocompleteItem,
  AutocompleteSeparator,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteEmpty,
  AutocompleteValue,
  AutocompleteList,
  AutocompleteClear,
  AutocompleteStatus,
  AutocompleteRow,
  AutocompleteCollection,
};
