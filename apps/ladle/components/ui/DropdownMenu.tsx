"use client";

import * as React from "react";
import { DropdownMenu as DropdownMenuRadix } from "radix-ui";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "@radix-ui/react-icons";

import { cn } from "@/utils/class-names";

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuRadix.Root>) {
  return <DropdownMenuRadix.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuRadix.Portal>) {
  return (
    <DropdownMenuRadix.Portal data-slot="dropdown-menu-portal" {...props} />
  );
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuRadix.Trigger>) {
  return (
    <DropdownMenuRadix.Trigger data-slot="dropdown-menu-trigger" {...props} />
  );
}

function DropdownMenuContent({
  ...props
}: React.ComponentProps<typeof DropdownMenuRadix.Content>) {
  return (
    <DropdownMenuRadix.Portal>
      <DropdownMenuRadix.Content data-slot="dropdown-menu-content" {...props} />
    </DropdownMenuRadix.Portal>
  );
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuRadix.Group>) {
  return <DropdownMenuRadix.Group data-slot="dropdown-menu-group" {...props} />;
}

function DropdownMenuItem({
  ...props
}: React.ComponentProps<typeof DropdownMenuRadix.Item>) {
  return <DropdownMenuRadix.Item data-slot="dropdown-menu-item" {...props} />;
}

function DropdownMenuCheckboxItem({
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuRadix.CheckboxItem>) {
  return (
    <DropdownMenuRadix.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      {...props}
    >
      <span>
        <DropdownMenuRadix.ItemIndicator>
          <CheckIcon />
        </DropdownMenuRadix.ItemIndicator>
      </span>
      {children}
    </DropdownMenuRadix.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuRadix.RadioGroup>) {
  return (
    <DropdownMenuRadix.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

function DropdownMenuRadioItem({
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuRadix.RadioItem>) {
  return (
    <DropdownMenuRadix.RadioItem
      data-slot="dropdown-menu-radio-item"
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuRadix.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuRadix.ItemIndicator>
      </span>
      {children}
    </DropdownMenuRadix.RadioItem>
  );
}

function DropdownMenuLabel({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuRadix.Label>) {
  return (
    <DropdownMenuRadix.Label
      data-slot="dropdown-menu-label"
      className={cn(className)}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  ...props
}: React.ComponentProps<typeof DropdownMenuRadix.Separator>) {
  return (
    <DropdownMenuRadix.Separator
      data-slot="dropdown-menu-separator"
      {...props}
    />
  );
}

function DropdownMenuShortcut({ ...props }: React.ComponentProps<"span">) {
  return <span data-slot="dropdown-menu-shortcut" {...props} />;
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuRadix.Sub>) {
  return <DropdownMenuRadix.Sub data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuRadix.SubTrigger>) {
  return (
    <DropdownMenuRadix.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuRadix.SubTrigger>
  );
}

function DropdownMenuSubContent({
  ...props
}: React.ComponentProps<typeof DropdownMenuRadix.SubContent>) {
  return (
    <DropdownMenuRadix.SubContent
      data-slot="dropdown-menu-sub-content"
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
