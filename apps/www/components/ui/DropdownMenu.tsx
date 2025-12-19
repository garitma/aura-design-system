"use client";
/**
 * @description Displays a menu of actions or options triggered by a button.
 */
import * as React from "react";
import { DropdownMenu as DropdownMenuRadix } from "radix-ui";
import {
  CheckIcon,
  ChevronRightIcon,
  CircleIcon,
  DotFilledIcon,
} from "@radix-ui/react-icons";

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
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuRadix.Trigger>) {
  return (
    <DropdownMenuRadix.Trigger
      data-slot="dropdown-menu-trigger"
      className={cn(className)}
      {...props}
    />
  );
}

function DropdownMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuRadix.Content>) {
  return (
    <DropdownMenuRadix.Portal>
      <DropdownMenuRadix.Content
        data-slot="dropdown-menu-content"
        collisionPadding={8}
        className={cn(
          className,
          "bg-gray-1 border border-gray-a6 rounded-sm relative shadow-md"
        )}
        {...props}
      />
    </DropdownMenuRadix.Portal>
  );
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuRadix.Group>) {
  return <DropdownMenuRadix.Group data-slot="dropdown-menu-group" {...props} />;
}

function DropdownMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuRadix.Item>) {
  return (
    <DropdownMenuRadix.Item
      data-slot="dropdown-menu-item"
      className={cn(
        className,
        "p-0.5 px-2 hover:bg-accent-3 flex relative cursor-pointer justify-between"
      )}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({
  children,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuRadix.CheckboxItem>) {
  return (
    <DropdownMenuRadix.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        className,
        "p-0.5 px-2 hover:bg-accent-3 flex relative cursor-pointer"
      )}
      {...props}
    >
      <span className="absolute left-0.5 top-0 bottom-0 items-center flex justify-center">
        <DropdownMenuRadix.ItemIndicator>
          <CheckIcon className="text-accent-9" />
        </DropdownMenuRadix.ItemIndicator>
      </span>
      {children}
    </DropdownMenuRadix.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuRadix.RadioGroup>) {
  return (
    <DropdownMenuRadix.RadioGroup
      data-slot="dropdown-menu-radio-group"
      className={cn(className)}
      {...props}
    />
  );
}

function DropdownMenuRadioItem({
  children,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuRadix.RadioItem>) {
  return (
    <DropdownMenuRadix.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        className,
        "p-0.5 px-2 hover:bg-accent-3 flex relative cursor-pointer"
      )}
      {...props}
    >
      <span className="absolute left-0.5 top-0 bottom-0 items-center flex justify-center">
        <DropdownMenuRadix.ItemIndicator>
          <DotFilledIcon className="fill-current text-accent-9" />
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
      className={cn(className, "p-0.5 px-2 text-gray-12")}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuRadix.Separator>) {
  return (
    <DropdownMenuRadix.Separator
      data-slot="dropdown-menu-separator"
      className={cn(className, "m-0.6 h-px bg-gray-a6")}
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
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuRadix.SubTrigger>) {
  return (
    <DropdownMenuRadix.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
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
    </DropdownMenuRadix.SubTrigger>
  );
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuRadix.SubContent>) {
  return (
    <DropdownMenuRadix.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        className,
        "bg-gray-1 border border-gray-a6 rounded-sm relative shadow-md"
      )}
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
