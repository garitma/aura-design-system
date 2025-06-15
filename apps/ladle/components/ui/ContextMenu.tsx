"use client";

import * as React from "react";
import { ContextMenu as ContextMenuRadix } from "radix-ui";
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/utils/class-names";

function ContextMenu({
  ...props
}: React.ComponentProps<typeof ContextMenuRadix.Root>) {
  return <ContextMenuRadix.Root data-slot="context-menu" {...props} />;
}

function ContextMenuTrigger({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuRadix.Trigger>) {
  return (
    <ContextMenuRadix.Trigger
      data-slot="context-menu-trigger"
      className={cn(className)}
      {...props}
    />
  );
}

function ContextMenuGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuRadix.Group>) {
  return <ContextMenuRadix.Group data-slot="context-menu-group" {...props} />;
}

function ContextMenuPortal({
  ...props
}: React.ComponentProps<typeof ContextMenuRadix.Portal>) {
  return <ContextMenuRadix.Portal data-slot="context-menu-portal" {...props} />;
}

function ContextMenuSub({
  ...props
}: React.ComponentProps<typeof ContextMenuRadix.Sub>) {
  return <ContextMenuRadix.Sub data-slot="context-menu-sub" {...props} />;
}

function ContextMenuRadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuRadix.RadioGroup>) {
  return (
    <ContextMenuRadix.RadioGroup
      data-slot="context-menu-radio-group"
      lassName={cn(className, "p-0.5 hover:bg-accent-3 flex")}
      {...props}
    />
  );
}

function ContextMenuSubTrigger({
  children,
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuRadix.SubTrigger>) {
  return (
    <ContextMenuRadix.SubTrigger
      data-slot="context-menu-sub-trigger"
      className={cn(className, "p-0.5 hover:bg-accent-3 flex")}
      {...props}
    >
      {children}
      <ChevronRightIcon />
    </ContextMenuRadix.SubTrigger>
  );
}

function ContextMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuRadix.SubContent>) {
  return (
    <ContextMenuRadix.SubContent
      data-slot="context-menu-sub-content"
      className={cn(className, "bg-accent-1 border border-gray-a6 rounded-sm")}
      {...props}
    />
  );
}

function ContextMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuRadix.Content>) {
  return (
    <ContextMenuRadix.Portal>
      <ContextMenuRadix.Content
        data-slot="context-menu-content"
        className={cn(
          className,
          "bg-accent-1 border border-gray-a6 rounded-sm"
        )}
        {...props}
      />
    </ContextMenuRadix.Portal>
  );
}

function ContextMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuRadix.Item> & {}) {
  return (
    <ContextMenuRadix.Item
      data-slot="context-menu-item"
      className={cn(className, "p-0.5 hover:bg-accent-3 flex")}
      {...props}
    />
  );
}

function ContextMenuCheckboxItem({
  children,
  checked,
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuRadix.CheckboxItem>) {
  return (
    <ContextMenuRadix.CheckboxItem
      data-slot="context-menu-checkbox-item"
      className={cn(className, "p-0.5 hover:bg-accent-3 flex")}
      checked={checked}
      {...props}
    >
      <span>
        <ContextMenuRadix.ItemIndicator>
          <CheckIcon />
        </ContextMenuRadix.ItemIndicator>
      </span>
      {children}
    </ContextMenuRadix.CheckboxItem>
  );
}

function ContextMenuRadioItem({
  children,
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuRadix.RadioItem>) {
  return (
    <ContextMenuRadix.RadioItem
      data-slot="context-menu-radio-item"
      className={cn(className, "p-0.5 hover:bg-accent-3 flex items-center")}
      {...props}
    >
      <span>
        <ContextMenuRadix.ItemIndicator>
          <DotFilledIcon />
        </ContextMenuRadix.ItemIndicator>
      </span>
      {children}
    </ContextMenuRadix.RadioItem>
  );
}

function ContextMenuLabel({
  inset,
  ...props
}: React.ComponentProps<typeof ContextMenuRadix.Label> & {
  inset?: boolean;
}) {
  return (
    <ContextMenuRadix.Label
      data-slot="context-menu-label"
      data-inset={inset}
      {...props}
    />
  );
}

function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuRadix.Separator>) {
  return (
    <ContextMenuRadix.Separator
      data-slot="context-menu-separator"
      className={cn(className, "m-0.6 h-px bg-gray-a6")}
      {...props}
    />
  );
}

function ContextMenuShortcut({ ...props }: React.ComponentProps<"span">) {
  return <span data-slot="context-menu-shortcut" {...props} />;
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};
