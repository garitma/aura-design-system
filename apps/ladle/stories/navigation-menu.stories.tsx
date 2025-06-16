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
