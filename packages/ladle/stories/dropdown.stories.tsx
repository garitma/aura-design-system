import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";

import Button from "../../components/button";
import Separator from "../../components/separator";

export const Default = () => {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  const [urlsChecked, setUrlsChecked] = React.useState(false);
  const [person, setPerson] = React.useState("pedro");

  return (
    <>
      <p>
        <span className="info info-text wall-pad">
          External library{" "}
          <span className="font-bold">
            $ pnpm i @radix-ui/react-dropdown-menu
          </span>
        </span>{" "}
        Displays a menu to the user—such as a set of actions or
        functions—triggered by a button..{" "}
        <a
          href="https://www.radix-ui.com/primitives/docs/components/dropdown-menu"
          className="underline"
          target="_blank"
        >
          All documentaiton
        </a>{" "}
        Made by {""}
        <a
          href="https://www.radix-ui.com/"
          className="underline"
          target="_blank"
        >
          Radix
        </a>
        .
      </p>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button aria-label="Customise options">
            <HamburgerMenuIcon />
          </Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="min-w-[220px]  rounded-md p-1 will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
            sideOffset={5}
          >
            <DropdownMenu.Item className="hover:bg-accents-2 groupleading-none flex items-center h-2 px-0.5 relative pl-2 select-none outline-none   data-[highlighted]:bg-blue data-[highlighted]:text-violet1">
              New Tab <div className="ml-auto pl-2.5">⌘+T</div>
            </DropdownMenu.Item>
            <DropdownMenu.Item className="hover:bg-accents-2 groupleading-none flex items-center h-2 px-0.5 relative pl-2 select-none outline-none   ">
              New Window <div className="ml-auto pl-2.5">⌘+N</div>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className="hover:bg-accents-2 groupleading-none flex items-center h-2 px-0.5 relative pl-2 select-none outline-none   "
              disabled
            >
              New Private Window <div className="ml-auto pl-2.5">⇧+⌘+N</div>
            </DropdownMenu.Item>
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger className="hover:bg-accents-2 groupleading-none flex items-center h-2 px-0.5 relative pl-2 select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11    data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1">
                More Tools
                <div className="ml-auto pl-2.5">
                  <ChevronRightIcon />
                </div>
              </DropdownMenu.SubTrigger>
              <DropdownMenu.Portal>
                <DropdownMenu.SubContent
                  className="min-w-[220px] rounded-md p-1 will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                  sideOffset={2}
                  alignOffset={-5}
                >
                  <DropdownMenu.Item className="hover:bg-accents-2 groupleading-none flex items-center h-2 px-0.5 relative pl-2 select-none outline-none   ">
                    Save Page As… <div className="ml-auto pl-2.5">⌘+S</div>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="hover:bg-accents-2 leading-none flex items-center h-2 px-0.5 relative pl-2 select-none outline-none   ">
                    Create Shortcut…
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="hover:bg-accents-2 leading-none flex items-center h-2 px-0.5 relative pl-2 select-none outline-none   ">
                    Name Window…
                  </DropdownMenu.Item>
                  <Separator />
                  <DropdownMenu.Item className="hover:bg-accents-2 leading-none flex items-center h-2 px-0.5 relative pl-2 select-none outline-none   ">
                    Developer Tools
                  </DropdownMenu.Item>
                </DropdownMenu.SubContent>
              </DropdownMenu.Portal>
            </DropdownMenu.Sub>
            <DropdownMenu.Arrow className="fill-white" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
};
