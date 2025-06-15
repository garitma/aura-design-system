import React, { useState } from "react";
import type { Story } from "@ladle/react";

import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
} from "@/components/ui/ContextMenu";
import ContextMenuList, {
  ContextMenuItemType,
} from "@/components/ContextMenuList";
import Button from "@/components/ui/Button";

export const Default: Story = () => {
  const [browser, setBrowser] = useState("safari");
  const [showBookmarks, setShowBookmarks] = useState(true);
  const [showFullURLs, setShowFullURLs] = useState(false);

  return (
    <ContextMenu>
      <ContextMenuTrigger className="border-2 border-dashed border-gray-a6 p-2">
        Right click here
      </ContextMenuTrigger>

      <ContextMenuPortal>
        <ContextMenuContent>
          <ContextMenuItem onSelect={() => console.log("New Tab selected")}>
            New Tab
          </ContextMenuItem>
          <ContextMenuItem onSelect={() => console.log("New Window selected")}>
            New Window
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuItem onSelect={() => console.log("Share selected")}>
              Share
            </ContextMenuItem>
            <ContextMenuItem onSelect={() => console.log("Print selected")}>
              Print
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem
            checked={showBookmarks}
            onCheckedChange={setShowBookmarks}
          >
            Show Bookmarks
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem
            checked={showFullURLs}
            onCheckedChange={setShowFullURLs}
          >
            Show Full URLs
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup value={browser} onValueChange={setBrowser}>
            <ContextMenuRadioItem
              value="safari"
              onSelect={() => console.log("Safari selected")}
            >
              Safari
            </ContextMenuRadioItem>
            <ContextMenuRadioItem
              value="firefox"
              onSelect={() => console.log("Firefox selected")}
            >
              Firefox
            </ContextMenuRadioItem>
            <ContextMenuRadioItem
              value="chrome"
              onSelect={() => console.log("Chrome selected")}
            >
              Chrome
            </ContextMenuRadioItem>
          </ContextMenuRadioGroup>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
            <ContextMenuPortal>
              <ContextMenuSubContent>
                <ContextMenuItem
                  onSelect={() => console.log("Save Page As... selected")}
                >
                  Save Page As...
                </ContextMenuItem>
                <ContextMenuItem
                  onSelect={() => console.log("Create Shortcut... selected")}
                >
                  Create Shortcut...
                </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuPortal>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuLabel>Developer</ContextMenuLabel>
          <ContextMenuItem
            disabled
            onSelect={() => console.log("Inspect selected")}
          >
            Inspect
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenuPortal>
    </ContextMenu>
  );
};

export const ListComponent: Story = () => {
  const [browser, setBrowser] = useState("safari");
  const [showBookmarks, setShowBookmarks] = useState(true);
  const [showFullURLs, setShowFullURLs] = useState(false);

  const contextMenuItems: ContextMenuItemType[] = [
    {
      type: "item",
      label: "New Tab",
      onSelect: () => console.log("New Tab selected"),
    },
    {
      type: "item",
      label: "New Window",
      onSelect: () => console.log("New Window selected"),
    },
    { type: "separator" },
    {
      type: "item",
      label: "Share",
      onSelect: () => console.log("Share selected"),
    },
    {
      type: "item",
      label: "Print",
      onSelect: () => console.log("Print selected"),
    },
    { type: "separator" },
    {
      type: "checkbox",
      label: "Show Bookmarks",
      checked: showBookmarks,
      onCheckedChange: setShowBookmarks,
    },
    {
      type: "checkbox",
      label: "Show Full URLs",
      checked: showFullURLs,
      onCheckedChange: setShowFullURLs,
    },
    { type: "separator" },
    {
      type: "radio-group",
      value: browser,
      onValueChange: setBrowser,
      items: [
        {
          type: "radio",
          label: "Safari",
          value: "safari",
          onSelect: () => console.log("Safari selected"),
        },
        {
          type: "radio",
          label: "Firefox",
          value: "firefox",
          onSelect: () => console.log("Firefox selected"),
        },
        {
          type: "radio",
          label: "Chrome",
          value: "chrome",
          onSelect: () => console.log("Chrome selected"),
        },
      ],
    },
    { type: "separator" },
    {
      type: "sub",
      trigger: "More Tools",
      items: [
        {
          type: "item",
          label: "Save Page As...",
          onSelect: () => console.log("Save Page As... selected"),
        },
        {
          type: "item",
          label: "Create Shortcut...",
          onSelect: () => console.log("Create Shortcut... selected"),
        },
      ],
    },
    { type: "separator" },
    { type: "label", label: "Developer" },
    {
      type: "item",
      label: "Inspect",
      disabled: true,
      onSelect: () => console.log("Inspect selected"),
    },
  ];

  return (
    <ContextMenuList
      trigger={
        <span className="border-2 border-dashed border-gray-a6 p-2">
          Right click here
        </span>
      }
      items={contextMenuItems}
    />
  );
};
