import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Button from "@aura-design/system/button";

import CommandLine from "../components/CommandLine";

export const Radix = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button aria-label="Customise options">
          <HamburgerMenuIcon />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] rounded-md p-1 bg-white shadow"
          sideOffset={5}
        >
          <DropdownMenu.Item className="hover:bg-accents-2 flex items-center h-2 px-0.5">
            New Tab <div className="ml-auto pl-2.5">⌘+T</div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="hover:bg-accents-2 flex items-center h-2 px-0.5 ">
            New Window <div className="ml-auto pl-2.5">⌘+N</div>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="hover:bg-accents-2 flex items-center h-2 px-0.5 "
            disabled
          >
            New Private Window <div className="ml-auto pl-2.5">⇧+⌘+N</div>
          </DropdownMenu.Item>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="hover:bg-accents-2 flex items-center h-2 px-0.5">
              More Tools
              <div className="ml-auto pl-2.5">
                <ChevronRightIcon />
              </div>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                className="min-w-[220px] rounded-md p-1 shadow bg-white"
                sideOffset={2}
                alignOffset={-5}
              >
                <DropdownMenu.Item className="hover:bg-accents-2 flex items-center h-2 px-0.5 ">
                  Save Page As… <div className="ml-auto pl-2.5">⌘+S</div>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="hover:bg-accents-2 leading-none flex items-center h-2 px-0.5 ">
                  Create Shortcut…
                </DropdownMenu.Item>
                <DropdownMenu.Item className="hover:bg-accents-2 leading-none flex items-center h-2 px-0.5 ">
                  Name Window…
                </DropdownMenu.Item>

                <DropdownMenu.Item className="hover:bg-accents-2 leading-none flex items-center h-2 px-0.5 ">
                  Developer Tools
                </DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>
          <DropdownMenu.Arrow className="fill-white drop-shadow" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

Radix.decorators = [
  (Component) => (
    <>
      <CommandLine code="pnpm i @radix-ui/react-dropdown-menu" />
      <Component />
    </>
  ),
];
