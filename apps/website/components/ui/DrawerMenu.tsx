"use client";
import { Drawer } from "vaul";
import { useState } from "react";
import { Accordion } from "radix-ui";
import { VisuallyHidden } from "radix-ui";
import {
  HamburgerMenuIcon,
  ChevronDownIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";
import Button from "@/components/ui/Button";

import { PrismicNextLink } from "@prismicio/next";
import { Content, isFilled } from "@prismicio/client";

type DrawerMenuProps = {
  menu: Content.NavigationDocument;
};

export default function DrawerMenu({ menu }: DrawerMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root
      direction="top"
      shouldScaleBackground
      open={open}
      onOpenChange={setOpen}
    >
      <Drawer.Trigger asChild className="flex md:hidden">
        <div className="px-0.5">
          <Button mode="link">
            <HamburgerMenuIcon className="icon" />
          </Button>
        </div>
      </Drawer.Trigger>
      <Drawer.Overlay className="fixed inset-0 bg-black/40" />
      <Drawer.Portal>
        <VisuallyHidden.Root>
          <Drawer.Title>Menu</Drawer.Title>
        </VisuallyHidden.Root>
        <Drawer.Content className="bg-black-1 flex flex-col h-[95svh] fixed top-0 left-0 right-0 z-20 overflow-y-auto">
          <div className="overflow-y-auto">
            <div className="p-0.5">
              <ul className="nav-list">
                <li></li>
                <li>
                  <Button mode="link" onClick={() => setOpen(false)}>
                    <Cross1Icon className="icon" />
                  </Button>
                </li>
              </ul>
            </div>
            <div className="px-1">
              {isFilled.group(menu.data.tabs) && (
                <Accordion.Root type="single" collapsible>
                  {menu.data.tabs.map((tab, index) => {
                    const hasChilds =
                      isFilled.repeatable(tab.sub_tab_item) &&
                      tab.sub_tab_item.some((item) =>
                        isFilled.keyText(item.text)
                      );

                    if (!hasChilds)
                      return (
                        <div key={`tab-${index}`}>
                          <PrismicNextLink
                            field={tab.tab_item}
                            className="group flex flex-1 cursor-default items-center justify-between p-1 leading-none w-full h6 hover:bg-black3"
                            onClick={() => setOpen(false)}
                          >
                            {tab.tab_item.text}
                          </PrismicNextLink>
                        </div>
                      );

                    return (
                      <Accordion.Item
                        value={`tab-${index}`}
                        key={`tab-${index}`}
                        className="overflow-hidden"
                      >
                        <Accordion.Trigger className="group flex flex-1 cursor-default items-center justify-between p-1 leading-none w-full h6 hover:bg-black3">
                          {tab.tab_item.text}
                          <ChevronDownIcon
                            className="group-data-[state=open]:rotate-180 transition duration-300"
                            aria-hidden
                          />
                        </Accordion.Trigger>
                        <Accordion.Content className="px-2 py-1">
                          <ul>
                            {tab.sub_tab_item.map((subTab) => {
                              return (
                                <li>
                                  <PrismicNextLink
                                    field={subTab}
                                    className="group flex flex-1 cursor-default items-center justify-between p-1 leading-none w-full h6 hover:bg-black3"
                                    onClick={() => setOpen(false)}
                                  >
                                    {subTab.text}
                                  </PrismicNextLink>
                                </li>
                              );
                            })}
                          </ul>
                        </Accordion.Content>
                      </Accordion.Item>
                    );
                  })}
                </Accordion.Root>
              )}
            </div>
          </div>
          <div className="absolute left-0 right-0 bottom-0">
            <div className="mx-auto w-6 h-0.5 flex-shrink-0 rounded-full bg-black6 mb-2 mt-1"></div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
