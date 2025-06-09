"use client";

import * as React from "react";
import { ContextMenu as ContextMenuRadix } from "radix-ui";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "@radix-ui/react-icons";

import { cn } from "@/utils/class-names";

function ContextMenu({
  ...props
}: React.ComponentProps<typeof ContextMenuRadix.Root>) {
  return <ContextMenuRadix.Root data-slot="context-menu" {...props} />;
}

function ContextMenuTrigger({
  ...props
}: React.ComponentProps<typeof ContextMenuRadix.Trigger>) {
  return (
    <ContextMenuRadix.Trigger data-slot="context-menu-trigger" {...props} />
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
  ...props
}: React.ComponentProps<typeof ContextMenuRadix.RadioGroup>) {
  return (
    <ContextMenuRadix.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  );
}

function ContextMenuSubTrigger({
  inset,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuRadix.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <ContextMenuRadix.SubTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      {...props}
    >
      {children}
      <ChevronRightIcon />
    </ContextMenuRadix.SubTrigger>
  );
}

function ContextMenuSubContent({
  ...props
}: React.ComponentProps<typeof ContextMenuRadix.SubContent>) {
  return (
    <ContextMenuRadix.SubContent
      data-slot="context-menu-sub-content"
      {...props}
    />
  );
}

function ContextMenuContent({
  ...props
}: React.ComponentProps<typeof ContextMenuRadix.Content>) {
  return (
    <ContextMenuRadix.Portal>
      <ContextMenuRadix.Content data-slot="context-menu-content" {...props} />
    </ContextMenuRadix.Portal>
  );
}

function ContextMenuItem({
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof ContextMenuRadix.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <ContextMenuRadix.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      {...props}
    />
  );
}

function ContextMenuCheckboxItem({
  children,
  checked,
  ...props
}: React.ComponentProps<typeof ContextMenuRadix.CheckboxItem>) {
  return (
    <ContextMenuRadix.CheckboxItem
      data-slot="context-menu-checkbox-item"
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
  ...props
}: React.ComponentProps<typeof ContextMenuRadix.RadioItem>) {
  return (
    <ContextMenuRadix.RadioItem data-slot="context-menu-radio-item" {...props}>
      <span>
        <ContextMenuRadix.ItemIndicator>
          <CircleIcon />
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
  ...props
}: React.ComponentProps<typeof ContextMenuRadix.Separator>) {
  return (
    <ContextMenuRadix.Separator data-slot="context-menu-separator" {...props} />
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
