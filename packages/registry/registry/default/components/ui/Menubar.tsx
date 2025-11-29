"use client";
/**
 * @description A visually persistent menu common in desktop applications.
 */
import * as React from "react";
import { Menubar as MenubarRadix } from "radix-ui";
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/utils/class-names";

function Menubar({
  className,
  ...props
}: React.ComponentProps<typeof MenubarRadix.Root>) {
  return (
    <MenubarRadix.Root
      data-slot="menubar"
      className={cn("flex", className)}
      {...props}
    />
  );
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
  return (
    <MenubarRadix.Trigger
      data-slot="menubar-trigger"
      className={cn(
        "p-0.5 px-2 hover:bg-accent-3 flex relative cursor-pointer",
        className
      )}
      {...props}
    />
  );
}

function MenubarContent({
  className,
  ...props
}: React.ComponentProps<typeof MenubarRadix.Content>) {
  return (
    <MenubarPortal>
      <MenubarRadix.Content
        data-slot="menubar-content"
        className={cn(
          "bg-gray-1 border border-gray-a6 rounded-sm relative shadow-md",
          className
        )}
        {...props}
      />
    </MenubarPortal>
  );
}

function MenubarItem({
  className,
  ...props
}: React.ComponentProps<typeof MenubarRadix.Item>) {
  return (
    <MenubarRadix.Item
      data-slot="menubar-item"
      className={cn(
        "p-0.5 px-2 hover:bg-accent-3 flex relative cursor-pointer justify-between",
        className
      )}
      {...props}
    />
  );
}

function MenubarCheckboxItem({
  children,
  className,
  ...props
}: React.ComponentProps<typeof MenubarRadix.CheckboxItem>) {
  return (
    <MenubarRadix.CheckboxItem
      data-slot="menubar-checkbox-item"
      className={cn(
        "p-0.5 px-2 hover:bg-accent-3 flex relative cursor-pointer",
        className
      )}
      {...props}
    >
      <span className="absolute left-0.5 top-0 bottom-0 items-center flex justify-center">
        <MenubarRadix.ItemIndicator>
          <CheckIcon className="text-accent-9" />
        </MenubarRadix.ItemIndicator>
      </span>
      {children}
    </MenubarRadix.CheckboxItem>
  );
}

function MenubarRadioItem({
  children,
  className,
  ...props
}: React.ComponentProps<typeof MenubarRadix.RadioItem>) {
  return (
    <MenubarRadix.RadioItem
      data-slot="menubar-radio-item"
      className={cn(
        "p-0.5 px-2 hover:bg-accent-3 flex relative cursor-pointer",
        className
      )}
      {...props}
    >
      <span className="absolute left-0.5 top-0 bottom-0 items-center flex justify-center">
        <MenubarRadix.ItemIndicator>
          <DotFilledIcon className="fill-current text-accent-9" />
        </MenubarRadix.ItemIndicator>
      </span>
      {children}
    </MenubarRadix.RadioItem>
  );
}

function MenubarLabel({
  className,
  ...props
}: React.ComponentProps<typeof MenubarRadix.Label>) {
  return (
    <MenubarRadix.Label
      data-slot="menubar-label"
      className={cn("p-0.5 px-2 text-gray-12", className)}
      {...props}
    />
  );
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof MenubarRadix.Separator>) {
  return (
    <MenubarRadix.Separator
      data-slot="menubar-separator"
      className={cn("m-0.6 h-px bg-gray-a6", className)}
      {...props}
    />
  );
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
  className,
  ...props
}: React.ComponentProps<typeof MenubarRadix.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <MenubarRadix.SubTrigger
      data-slot="menubar-sub-trigger"
      className={cn(
        "p-0.5 px-2 hover:bg-accent-3 flex relative cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
      <div className="absolute right-0.5 top-0 bottom-0 items-center flex justify-center">
        <ChevronRightIcon />
      </div>
    </MenubarRadix.SubTrigger>
  );
}

function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<typeof MenubarRadix.SubContent>) {
  return (
    <MenubarRadix.SubContent
      data-slot="menubar-sub-content"
      className={cn(
        "bg-gray-1 border border-gray-a6 rounded-sm relative shadow-md",
        className
      )}
      {...props}
    />
  );
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
