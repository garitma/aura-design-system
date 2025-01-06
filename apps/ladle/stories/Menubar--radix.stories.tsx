import React from "react";
import * as Menubar from "@radix-ui/react-menubar";
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from "@radix-ui/react-icons";

import CommandLine from "../components/CommandLine";

export default {
  title: "Menubar",
};

const RADIO_ITEMS = ["Andy", "Benoît", "Luis"];
const CHECK_ITEMS = ["Always Show Bookmarks Bar", "Always Show Full URLs"];

export const Radix = () => {
  const [checkedSelection, setCheckedSelection] = React.useState([
    CHECK_ITEMS[1],
  ]);
  const [radioSelection, setRadioSelection] = React.useState(RADIO_ITEMS[2]);

  return (
    <Menubar.Root className="flex rounded-md bg-white p-0.5 shadow">
      <Menubar.Menu>
        <Menubar.Trigger className="flex select-none items-center justify-between gap-0.5 rounded px-2 py-1  font-medium leading-none  outline-none data-[highlighted]:bg-accents-1 data-[state=open]:bg-accents-1">
          File
        </Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content
            className="min-w-[220px] rounded-md bg-white p-0.5 shadow will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
            align="start"
            sideOffset={5}
            alignOffset={-3}
          >
            <Menubar.Item className="group relative flex h-[39px] select-none items-center rounded px-2.5  leading-none  outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-accents-1 data-[highlighted]:bg-accents-1 data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-black/50 data-[highlighted]:data-[state=open]:text-violet1 data-[highlighted]:text-violet1 data-[state=open]:">
              New Tab{" "}
              <div className="ml-auto pl-5 text-black/50 group-data-[disabled]:text-black/50 group-data-[highlighted]:text-black">
                ⌘ T
              </div>
            </Menubar.Item>
            <Menubar.Item className="group relative flex h-[39px] select-none items-center rounded px-2.5  leading-none  outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-accents-1 data-[highlighted]:bg-accents-1 data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-black/50 data-[highlighted]:data-[state=open]:text-violet1 data-[highlighted]:text-violet1 data-[state=open]:">
              New Window{" "}
              <div className="ml-auto pl-5 text-black/50 group-data-[disabled]:text-black/50 group-data-[highlighted]:text-black">
                ⌘ N
              </div>
            </Menubar.Item>
            <Menubar.Item
              className="relative flex h-[39px] select-none items-center rounded px-2.5  leading-none  outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-accents-1 data-[highlighted]:bg-accents-1 data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-black/50 data-[highlighted]:data-[state=open]:text-violet1 data-[highlighted]:text-violet1 data-[state=open]:"
              disabled
            >
              New Incognito Window
            </Menubar.Item>
            <Menubar.Separator className="m-[5px] h-[1px] bg-accents-3" />
            <Menubar.Sub>
              <Menubar.SubTrigger className="group relative flex h-[39px] select-none items-center rounded px-2.5  leading-none  outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-accents-1 data-[highlighted]:bg-accents-1 data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-black/50 data-[highlighted]:data-[state=open]:text-violet1 data-[highlighted]:text-violet1 data-[state=open]:">
                Share
                <div className="ml-auto pl-5 text-black/50 group-data-[disabled]:text-black/50 group-data-[highlighted]:text-black">
                  <ChevronRightIcon />
                </div>
              </Menubar.SubTrigger>
              <Menubar.Portal>
                <Menubar.SubContent
                  className="min-w-[220px] rounded-md bg-white p-0.5 shadow will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
                  alignOffset={-5}
                >
                  <Menubar.Item className="relative flex h-[39px] select-none items-center rounded px-2.5  leading-none  outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-accents-1 data-[highlighted]:bg-accents-1 data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-black/50 data-[highlighted]:text-violet1 data-[state=open]:">
                    Email Link
                  </Menubar.Item>
                  <Menubar.Item className="relative flex h-[39px] select-none items-center rounded px-2.5  leading-none  outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-accents-1 data-[highlighted]:bg-accents-1 data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-black/50 data-[highlighted]:text-violet1 data-[state=open]:">
                    Messages
                  </Menubar.Item>
                  <Menubar.Item className="relative flex h-[39px] select-none items-center rounded px-2.5  leading-none  outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-accents-1 data-[highlighted]:bg-accents-1 data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-black/50 data-[highlighted]:text-violet1 data-[state=open]:">
                    Notes
                  </Menubar.Item>
                </Menubar.SubContent>
              </Menubar.Portal>
            </Menubar.Sub>
            <Menubar.Separator className="m-[5px] h-[1px] bg-accents-3" />
            <Menubar.Item className="group relative flex h-[39px] select-none items-center rounded px-2.5  leading-none  outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accents-1 data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-black/50 data-[highlighted]:text-violet1">
              Print…{" "}
              <div className="ml-auto pl-5 text-black/50 group-data-[disabled]:text-black/50 group-data-[highlighted]:text-black">
                ⌘ P
              </div>
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger className="flex select-none items-center justify-between gap-0.5 rounded px-2 py-1  font-medium leading-none  outline-none data-[highlighted]:bg-accents-1 data-[state=open]:bg-accents-1">
          Edit
        </Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content
            className="min-w-[220px] rounded-md bg-white p-0.5 shadow will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
            align="start"
            sideOffset={5}
            alignOffset={-3}
          >
            <Menubar.Item className="group relative flex h-[39px] select-none items-center rounded px-2.5  leading-none  outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-accents-1 data-[highlighted]:bg-accents-1 data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-black/50 data-[highlighted]:data-[state=open]:text-violet1 data-[highlighted]:text-violet1 data-[state=open]:">
              Undo{" "}
              <div className="ml-auto pl-5 text-black/50 group-data-[disabled]:text-black/50 group-data-[highlighted]:text-black">
                ⌘ Z
              </div>
            </Menubar.Item>
            <Menubar.Item className="group relative flex h-[39px] select-none items-center rounded px-2.5  leading-none  outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-accents-1 data-[highlighted]:bg-accents-1 data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-black/50 data-[highlighted]:data-[state=open]:text-violet1 data-[highlighted]:text-violet1 data-[state=open]:">
              Redo{" "}
              <div className="ml-auto pl-5 text-black/50 group-data-[disabled]:text-black/50 group-data-[highlighted]:text-black">
                ⇧ ⌘ Z
              </div>
            </Menubar.Item>
            <Menubar.Separator className="m-[5px] h-[1px] bg-accents-3" />
            <Menubar.Sub>
              <Menubar.SubTrigger className="group relative flex h-[39px] select-none items-center rounded px-2.5  leading-none  outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-accents-1 data-[highlighted]:bg-accents-1 data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-black/50 data-[highlighted]:data-[state=open]:text-violet1 data-[highlighted]:text-violet1 data-[state=open]:">
                Find
                <div className="ml-auto pl-5 text-black/50 group-data-[disabled]:text-black/50 group-data-[highlighted]:text-black">
                  <ChevronRightIcon />
                </div>
              </Menubar.SubTrigger>

              <Menubar.Portal>
                <Menubar.SubContent
                  className="min-w-[220px] rounded-md bg-white p-0.5 shadow will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
                  alignOffset={-5}
                >
                  <Menubar.Item className="group relative flex h-[39px] select-none items-center rounded px-2.5  leading-none  outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-accents-1 data-[highlighted]:bg-accents-1 data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-black/50 data-[highlighted]:text-violet1 data-[state=open]:">
                    Search the web…
                  </Menubar.Item>
                  <Menubar.Separator className="m-[5px] h-[1px] bg-accents-3" />
                  <Menubar.Item className="relative flex h-[39px] select-none items-center rounded px-2.5  leading-none  outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-accents-1 data-[highlighted]:bg-accents-1 data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-black/50 data-[highlighted]:text-violet1 data-[state=open]:">
                    Find…
                  </Menubar.Item>
                  <Menubar.Item className="relative flex h-[39px] select-none items-center rounded px-2.5  leading-none  outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-accents-1 data-[highlighted]:bg-accents-1 data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-black/50 data-[highlighted]:text-violet1 data-[state=open]:">
                    Find Next
                  </Menubar.Item>
                  <Menubar.Item className="relative flex h-[39px] select-none items-center rounded px-2.5  leading-none  outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-accents-1 data-[highlighted]:bg-accents-1 data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-black/50 data-[highlighted]:text-violet1 data-[state=open]:">
                    Find Previous
                  </Menubar.Item>
                </Menubar.SubContent>
              </Menubar.Portal>
            </Menubar.Sub>
            <Menubar.Separator className="m-[5px] h-[1px] bg-accents-3" />
            <Menubar.Item className="relative flex h-[39px] select-none items-center rounded px-2.5  leading-none  outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-accents-1 data-[highlighted]:bg-accents-1 data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-black/50 data-[highlighted]:data-[state=open]:text-violet1 data-[highlighted]:text-violet1 data-[state=open]:">
              Cut
            </Menubar.Item>
            <Menubar.Item className="relative flex h-[39px] select-none items-center rounded px-2.5  leading-none  outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-accents-1 data-[highlighted]:bg-accents-1 data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-black/50 data-[highlighted]:data-[state=open]:text-violet1 data-[highlighted]:text-violet1 data-[state=open]:">
              Copy
            </Menubar.Item>
            <Menubar.Item className="relative flex h-[39px] select-none items-center rounded px-2.5  leading-none  outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-accents-1 data-[highlighted]:bg-accents-1 data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-black/50 data-[highlighted]:data-[state=open]:text-violet1 data-[highlighted]:text-violet1 data-[state=open]:">
              Paste
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger className="flex select-none items-center justify-between gap-0.5 rounded px-2 py-1  font-medium leading-none  outline-none data-[highlighted]:bg-accents-1 data-[state=open]:bg-accents-1">
          View
        </Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content
            className="min-w-[220px] rounded-md bg-white p-0.5 shadow will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
            align="start"
            sideOffset={5}
            alignOffset={-14}
          >
            {CHECK_ITEMS.map((item) => (
              <Menubar.CheckboxItem
                className="relative flex h-[39px] select-none items-center rounded px-2.5 pl-5  leading-none  outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accents-1 data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-black/50 data-[highlighted]:text-violet1"
                key={item}
                checked={checkedSelection.includes(item)}
                onCheckedChange={() =>
                  setCheckedSelection((current) =>
                    current.includes(item)
                      ? current.filter((el) => el !== item)
                      : current.concat(item)
                  )
                }
              >
                <Menubar.ItemIndicator className="absolute left-0 inline-flex w-5 items-center justify-center">
                  <CheckIcon />
                </Menubar.ItemIndicator>
                {item}
              </Menubar.CheckboxItem>
            ))}
            <Menubar.Separator className="m-[5px] h-[1px] bg-accents-3" />
            <Menubar.Item className="group relative flex h-[39px] select-none items-center rounded pl-5 pr-2.5  leading-none  outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-accents-1 data-[highlighted]:bg-accents-1 data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-black/50 data-[highlighted]:data-[state=open]:text-violet1 data-[highlighted]:text-violet1 data-[state=open]:">
              Reload{" "}
              <div className="ml-auto pl-5 text-black/50 group-data-[disabled]:text-black/50 group-data-[highlighted]:text-black">
                ⌘ R
              </div>
            </Menubar.Item>
            <Menubar.Item
              className="group relative flex h-[39px] select-none items-center rounded pl-5 pr-2.5  leading-none  outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-accents-1 data-[highlighted]:bg-accents-1 data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-black/50 data-[highlighted]:data-[state=open]:text-violet1 data-[highlighted]:text-violet1 data-[state=open]:"
              disabled
            >
              Force Reload{" "}
              <div className="ml-auto pl-5 text-black/50 group-data-[disabled]:text-black/50 group-data-[highlighted]:text-black">
                ⇧ ⌘ R
              </div>
            </Menubar.Item>
            <Menubar.Separator className="m-[5px] h-[1px] bg-accents-3" />
            <Menubar.Item className="relative flex h-[39px] select-none items-center rounded pl-5 pr-2.5  leading-none  outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-accents-1 data-[highlighted]:bg-accents-1 data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-black/50 data-[highlighted]:data-[state=open]:text-violet1 data-[highlighted]:text-violet1 data-[state=open]:">
              Toggle Fullscreen
            </Menubar.Item>
            <Menubar.Separator className="m-[5px] h-[1px] bg-accents-3" />
            <Menubar.Item className="relative flex h-[39px] select-none items-center rounded pl-5 pr-2.5  leading-none  outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-accents-1 data-[highlighted]:bg-accents-1 data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-black/50 data-[highlighted]:data-[state=open]:text-violet1 data-[highlighted]:text-violet1 data-[state=open]:">
              Hide Sidebar
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger className="flex select-none items-center justify-between gap-0.5 rounded px-2 py-1  font-medium leading-none  outline-none data-[highlighted]:bg-accents-1 data-[state=open]:bg-accents-1">
          Profiles
        </Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content
            className="min-w-[220px] rounded-md bg-white p-0.5 shadow will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
            align="start"
            sideOffset={5}
            alignOffset={-14}
          >
            <Menubar.RadioGroup
              value={radioSelection}
              onValueChange={setRadioSelection}
            >
              {RADIO_ITEMS.map((item) => (
                <Menubar.RadioItem
                  className="relative flex h-[39px] select-none items-center rounded pl-5 pr-2.5  leading-none  outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accents-1 data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-black/50 data-[highlighted]:text-violet1"
                  key={item}
                  value={item}
                >
                  <Menubar.ItemIndicator className="absolute left-0 inline-flex w-5 items-center justify-center">
                    <DotFilledIcon />
                  </Menubar.ItemIndicator>
                  {item}
                </Menubar.RadioItem>
              ))}
              <Menubar.Separator className="m-[5px] h-[1px] bg-accents-3" />
              <Menubar.Item className="relative flex h-[39px] select-none items-center rounded pl-5 pr-2.5  leading-none  outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-accents-1 data-[highlighted]:bg-accents-1 data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-black/50 data-[highlighted]:data-[state=open]:text-violet1 data-[highlighted]:text-violet1 data-[state=open]:">
                Edit…
              </Menubar.Item>
              <Menubar.Separator className="m-[5px] h-[1px] bg-accents-3" />
              <Menubar.Item className="relative flex h-[39px] select-none items-center rounded pl-5 pr-2.5  leading-none  outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-accents-1 data-[highlighted]:bg-accents-1 data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-black/50 data-[highlighted]:data-[state=open]:text-violet1 data-[highlighted]:text-violet1 data-[state=open]:">
                Add Profile…
              </Menubar.Item>
            </Menubar.RadioGroup>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
    </Menubar.Root>
  );
};

Radix.decorators = [
  (Component) => (
    <>
      <CommandLine code="pnpm i @radix-ui/react-menubar" />
      <Component />
    </>
  ),
];
