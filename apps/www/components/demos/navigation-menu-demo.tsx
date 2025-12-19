import React from "react";
import type { Story } from "@ladle/react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
} from "@/components/ui/NavigationMenu";

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Home</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-[400px]">
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-0.5 w-[500px] grid-cols-2">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink>Docs</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>List</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 w-[400px]">
              <li>
                <NavigationMenuLink>
                  <div>
                    <div className="font-medium">Components</div>
                    <div>Browse all components in the library.</div>
                  </div>
                </NavigationMenuLink>
                <NavigationMenuLink>
                  <div>
                    <div className="font-medium">Documentation</div>
                    <div>Learn how to use the library.</div>
                  </div>
                </NavigationMenuLink>
                <NavigationMenuLink>
                  <div>
                    <div>Blog</div>
                    <div>Read our latest blog posts.</div>
                  </div>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="block">
          <NavigationMenuTrigger>Simple</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1">
              <li>
                <NavigationMenuLink>Components</NavigationMenuLink>
                <NavigationMenuLink>Documentation</NavigationMenuLink>
                <NavigationMenuLink>Blocks</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="block">
          <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1">
              <li>
                <NavigationMenuLink>Backlog</NavigationMenuLink>
                <NavigationMenuLink>To Do</NavigationMenuLink>
                <NavigationMenuLink>Done</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}