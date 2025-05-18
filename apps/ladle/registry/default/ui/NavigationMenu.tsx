import * as React from "react";
import { NavigationMenu as NavigationMenuRadix } from "radix-ui";

import { ChevronDownIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuRadix.Root> & {
  viewport?: boolean;
}) {
  return (
    <NavigationMenuRadix.Root data-slot="navigation-menu" {...props}>
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuRadix.Root>
  );
}

function NavigationMenuList({
  ...props
}: React.ComponentProps<typeof NavigationMenuRadix.List>) {
  return (
    <NavigationMenuRadix.List data-slot="navigation-menu-list" {...props} />
  );
}

function NavigationMenuItem({
  ...props
}: React.ComponentProps<typeof NavigationMenuRadix.Item>) {
  return (
    <NavigationMenuRadix.Item data-slot="navigation-menu-item" {...props} />
  );
}

function NavigationMenuTrigger({
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuRadix.Trigger>) {
  return (
    <NavigationMenuRadix.Trigger data-slot="navigation-menu-trigger" {...props}>
      {children} <ChevronDownIcon aria-hidden="true" />
    </NavigationMenuRadix.Trigger>
  );
}

function NavigationMenuContent({
  ...props
}: React.ComponentProps<typeof NavigationMenuRadix.Content>) {
  return (
    <NavigationMenuRadix.Content
      data-slot="navigation-menu-content"
      {...props}
    />
  );
}

function NavigationMenuViewport({
  ...props
}: React.ComponentProps<typeof NavigationMenuRadix.Viewport>) {
  return (
    <div
      className={"absolute top-full left-0 isolate z-50 flex justify-center"}
    >
      <NavigationMenuRadix.Viewport
        data-slot="navigation-menu-viewport"
        {...props}
      />
    </div>
  );
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuRadix.Link>) {
  return (
    <NavigationMenuRadix.Link data-slot="navigation-menu-link" {...props} />
  );
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuRadix.Indicator>) {
  return (
    <NavigationMenuRadix.Indicator
      data-slot="navigation-menu-indicator"
      {...props}
    >
      <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
    </NavigationMenuRadix.Indicator>
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
