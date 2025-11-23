import * as React from "react";
import { NavigationMenu as NavigationMenuRadix } from "radix-ui";

import { cn } from "@/utils/class-names";

function NavigationMenu({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuRadix.Root>) {
  return (
    <NavigationMenuRadix.Root
      data-slot="navigation-menu"
      className={cn(className)}
      {...props}
    >
      {children}
    </NavigationMenuRadix.Root>
  );
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuRadix.List>) {
  return (
    <NavigationMenuRadix.List
      data-slot="navigation-menu-list"
      className={cn("flex", className)}
      {...props}
    />
  );
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuRadix.Item>) {
  return (
    <NavigationMenuRadix.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  );
}

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuRadix.Trigger>) {
  return (
    <NavigationMenuRadix.Trigger
      data-slot="navigation-menu-trigger"
      {...props}
      className={cn(
        "p-0.5 px-1 hover:bg-accent-3 flex relative cursor-pointer",
        className
      )}
    >
      {children}
    </NavigationMenuRadix.Trigger>
  );
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuRadix.Content>) {
  return (
    <NavigationMenuRadix.Content
      data-slot="navigation-menu-content"
      className={cn(
        "absolute top-full mt-0.5 bg-gray-1 shadow-md rounded-md border border-gray-a6 overflow-hidden",
        className
      )}
      {...props}
    />
  );
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuRadix.Viewport>) {
  return (
    <NavigationMenuRadix.Viewport
      data-slot="navigation-menu-viewport"
      {...props}
      className={cn(className)}
    />
  );
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuRadix.Link>) {
  return (
    <NavigationMenuRadix.Link
      data-slot="navigation-menu-link"
      className={cn(
        "p-0.5 px-1 hover:bg-accent-3 flex relative cursor-pointer items-center",
        className
      )}
      {...props}
    />
  );
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuRadix.Indicator>) {
  return (
    <NavigationMenuRadix.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(className)}
      {...props}
    >
      <div />
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
