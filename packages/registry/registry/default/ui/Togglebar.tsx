"use client";

import * as React from "react";
import { Toolbar } from "radix-ui";

import { cn } from "@/lib/utils";

function ToggleBar({
  className,
  ...props
}: React.ComponentProps<typeof Toolbar.Root>) {
  return (
    <Toolbar.Root data-slot="toggle-bar" className={cn(className)} {...props} />
  );
}

function ToggleBarButton({
  className,
  ...props
}: React.ComponentProps<typeof Toolbar.Button>) {
  return (
    <Toolbar.Button
      data-slot="toggle-bar-button"
      className={cn(className)}
      {...props}
    />
  );
}

function ToggleBarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Toolbar.Separator>) {
  return (
    <Toolbar.Separator
      data-slot="toggle-bar-separator"
      className={cn(className)}
      {...props}
    />
  );
}

function ToggleBarLink({
  className,
  ...props
}: React.ComponentProps<typeof Toolbar.Link>) {
  return (
    <Toolbar.Link
      data-slot="toggle-bar-link"
      className={cn(className)}
      {...props}
    />
  );
}

function ToggleBarToggleGroup({
  className,
  ...props
}: React.ComponentProps<typeof Toolbar.ToggleGroup>) {
  return (
    <Toolbar.ToggleGroup
      data-slot="toggle-bar-toggle-group"
      className={cn(className)}
      {...props}
    />
  );
}

function ToggleBarToggleItem({
  className,
  ...props
}: React.ComponentProps<typeof Toolbar.ToggleItem>) {
  return (
    <Toolbar.ToggleItem
      data-slot="toggle-bar-toggle-item"
      className={cn(className)}
      {...props}
    />
  );
}

export {
  ToggleBar,
  ToggleBarButton,
  ToggleBarSeparator,
  ToggleBarLink,
  ToggleBarToggleGroup,
  ToggleBarToggleItem,
};
