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

export const Default: Story = () => {
  return (
    <NavigationMenu className="relative z-10 w-full justify-end flex">
      <NavigationMenuList className="center m-0 flex p-1">
        {/* Product Menu Item */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <li>
              <span>
                Product <ChevronDownIcon className="icon" />
              </span>
            </li>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul>
              <li>
                <NavigationMenuLink href="#">Overview</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">Features</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">Pricing</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Solutions Menu Item */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <li>
              <span>
                Solutions <ChevronDownIcon className="icon" />
              </span>
            </li>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul>
              <li>
                <NavigationMenuLink href="#">Enterprise</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">Small Business</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Company Menu Item (No Submenu) */}
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Company</NavigationMenuLink>
        </NavigationMenuItem>

        {/* Blog Menu Item (No Submenu) */}
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Blog</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink className="h-full">
        <div>
          <div className="font-medium">{title}</div>
          <p className="my-0 text-sm">{children}</p>
        </div>
      </NavigationMenuLink>
    </li>
  );
}

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
