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
  const staticMenuData = {
    tabs: [
      {
        tab_item: { text: "Product" },
        sub_tab_item: [
          { text: "Overview", key: "overview" },
          { text: "Features", key: "features" },
          { text: "Pricing", key: "pricing" },
        ],
      },
      {
        tab_item: { text: "Solutions" },
        sub_tab_item: [
          { text: "Enterprise", key: "enterprise" },
          { text: "Small Business", key: "small-business" },
        ],
      },
      {
        tab_item: { text: "Company" },
        sub_tab_item: [],
      },
      {
        tab_item: { text: "Blog" },
        sub_tab_item: [],
      },
    ],
  };

  return (
    <NavigationMenu className="relative z-10 w-full justify-end flex">
      <NavigationMenuList className="center m-0 flex p-1">
        {staticMenuData.tabs.map((tab, index) => {
          const hasChilds = tab.sub_tab_item.length > 0;

          if (!hasChilds) {
            return (
              <NavigationMenuItem key={`tab-${index}`}>
                <NavigationMenuLink href="#">
                  {tab.tab_item.text}
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          }

          return (
            <NavigationMenuItem key={`tab-${index}`}>
              <NavigationMenuTrigger>
                <li>
                  <span>
                    {tab.tab_item.text} <ChevronDownIcon className="icon" />
                  </span>
                </li>
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <ul>
                  {tab.sub_tab_item.map((subTab) => {
                    return (
                      <li key={subTab.key}>
                        <NavigationMenuLink
                          href="#"
                          className="hover:bg-accent-3 flex items-center"
                        >
                          {subTab.text}
                        </NavigationMenuLink>
                      </li>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
