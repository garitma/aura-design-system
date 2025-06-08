import { NavigationMenu } from "radix-ui";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Content, isFilled } from "@prismicio/client";

import Button from "@/components/ui/Button";
import { PrismicNextLink } from "@prismicio/next";

type MenuProps = {
  menu: Content.NavigationDocument;
};

export default function Menu({ menu }: MenuProps) {
  return (
    <NavigationMenu.Root className="relative z-10 w-full justify-end flex">
      {isFilled.group(menu.data.tabs) && (
        <NavigationMenu.List className="center m-0 flex p-1 gap-1">
          {menu.data.tabs.map((tab, index) => {
            const hasChilds =
              isFilled.repeatable(tab.sub_tab_item) &&
              tab.sub_tab_item.some((item) => isFilled.keyText(item.text));

            if (!hasChilds) {
              return (
                <NavigationMenu.Item key={`tab-${index}`}>
                  <PrismicNextLink field={tab.tab_item} className="button-menu">
                    {tab.tab_item.text}
                  </PrismicNextLink>
                </NavigationMenu.Item>
              );
            }

            return (
              <NavigationMenu.Item key={`tab-${index}`}>
                <NavigationMenu.Trigger>
                  <li>
                    <span className="button-menu">
                      {tab.tab_item.text} <ChevronDownIcon className="icon" />
                    </span>
                  </li>
                </NavigationMenu.Trigger>

                <NavigationMenu.Content>
                  <ul className="absolute top-4 bg-gray-1 w-[200px] shadow-md p-0.5 rounded-md">
                    {tab.sub_tab_item.map((subTab) => {
                      return (
                        <li key={subTab.key}>
                          <PrismicNextLink
                            field={subTab}
                            className="hover:bg-gray-3 flex items-center h-2.5 px-0.5 button-menu !justify-start w-full"
                          >
                            {subTab.text}
                          </PrismicNextLink>
                        </li>
                      );
                    })}
                  </ul>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            );
          })}
        </NavigationMenu.List>
      )}
    </NavigationMenu.Root>
  );
}
