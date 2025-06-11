"use client";

import * as React from "react";
import { Menubar as MenubarRadix } from "radix-ui";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "@radix-ui/react-icons";


function Menubar({ ...props }: React.ComponentProps<typeof MenubarRadix.Root>) {
  return <MenubarRadix.Root data-slot="menubar" {...props} />;
}

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarRadix.Menu>) {
  return <MenubarRadix.Menu data-slot="menubar-menu" {...props} />;
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarRadix.Group>) {
  return <MenubarRadix.Group data-slot="menubar-group" {...props} />;
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarRadix.Portal>) {
  return <MenubarRadix.Portal data-slot="menubar-portal" {...props} />;
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarRadix.RadioGroup>) {
  return <MenubarRadix.RadioGroup data-slot="menubar-radio-group" {...props} />;
}

function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof MenubarRadix.Trigger>) {
  return <MenubarRadix.Trigger data-slot="menubar-trigger" {...props} />;
}

function MenubarContent({
  ...props
}: React.ComponentProps<typeof MenubarRadix.Content>) {
  return (
    <MenubarPortal>
      <MenubarRadix.Content data-slot="menubar-content" {...props} />
    </MenubarPortal>
  );
}

function MenubarItem({
  ...props
}: React.ComponentProps<typeof MenubarRadix.Item>) {
  return <MenubarRadix.Item data-slot="menubar-item" {...props} />;
}

function MenubarCheckboxItem({
  children,
  ...props
}: React.ComponentProps<typeof MenubarRadix.CheckboxItem>) {
  return (
    <MenubarRadix.CheckboxItem data-slot="menubar-checkbox-item" {...props}>
      <span>
        <MenubarRadix.ItemIndicator>
          <CheckIcon className="size-4" />
        </MenubarRadix.ItemIndicator>
      </span>
      {children}
    </MenubarRadix.CheckboxItem>
  );
}

function MenubarRadioItem({
  children,
  ...props
}: React.ComponentProps<typeof MenubarRadix.RadioItem>) {
  return (
    <MenubarRadix.RadioItem data-slot="menubar-radio-item" {...props}>
      <span>
        <MenubarRadix.ItemIndicator>
          <CircleIcon />
        </MenubarRadix.ItemIndicator>
      </span>
      {children}
    </MenubarRadix.RadioItem>
  );
}

function MenubarLabel({
  ...props
}: React.ComponentProps<typeof MenubarRadix.Label>) {
  return <MenubarRadix.Label data-slot="menubar-label" {...props} />;
}

function MenubarSeparator({
  ...props
}: React.ComponentProps<typeof MenubarRadix.Separator>) {
  return <MenubarRadix.Separator data-slot="menubar-separator" {...props} />;
}

function MenubarShortcut({ ...props }: React.ComponentProps<"span">) {
  return <span data-slot="menubar-shortcut" {...props} />;
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarRadix.Sub>) {
  return <MenubarRadix.Sub data-slot="menubar-sub" {...props} />;
}

function MenubarSubTrigger({
  children,
  ...props
}: React.ComponentProps<typeof MenubarRadix.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <MenubarRadix.SubTrigger data-slot="menubar-sub-trigger" {...props}>
      {children}
      <ChevronRightIcon />
    </MenubarRadix.SubTrigger>
  );
}

function MenubarSubContent({
  ...props
}: React.ComponentProps<typeof MenubarRadix.SubContent>) {
  return <MenubarRadix.SubContent data-slot="menubar-sub-content" {...props} />;
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
};
