"use client";
/**
 * @description Displays a menu to the user triggered by right-click or long-press.
 */
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
      className={cn(className)}
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
      className={cn(
        className,
        "p-0.5 px-2 hover:bg-accent-3 flex relative cursor-pointer"
      )}
      {...props}
    >
      {children}
      <div className="absolute right-0.5 top-0 bottom-0 items-center flex justify-center">
        <ChevronRightIcon />
      </div>
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
      className={cn(
        className,
        "bg-gray-1 border border-gray-a6 rounded-sm relative shadow-md"
      )}
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
        collisionPadding={8}
        className={cn(
          className,
          "bg-gray-1 border border-gray-a6 rounded-sm relative shadow-md"
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
      className={cn(
        className,
        "p-0.5 px-2 hover:bg-accent-3 flex relative cursor-pointer justify-between"
      )}
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
      className={cn(
        className,
        "p-0.5 px-2 hover:bg-accent-3 flex relative cursor-pointer"
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-0.5 top-0 bottom-0 items-center flex justify-center">
        <ContextMenuRadix.ItemIndicator>
          <CheckIcon className="text-accent-8" />
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
      className={cn(
        className,
        "p-0.5 px-2 hover:bg-accent-3 flex relative cursor-pointer"
      )}
      {...props}
    >
      <span className="absolute left-0.5 top-0 bottom-0 items-center flex justify-center">
        <ContextMenuRadix.ItemIndicator>
          <DotFilledIcon className="text-accent-8" />
        </ContextMenuRadix.ItemIndicator>
      </span>
      {children}
    </ContextMenuRadix.RadioItem>
  );
}

function ContextMenuLabel({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuRadix.Label>) {
  return (
    <ContextMenuRadix.Label
      data-slot="context-menu-label"
      className={cn(className, "p-0.5 px-2 text-gray-12")}
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
