import React, { useState } from "react";
import type { Story } from "@ladle/react";

import Button from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "@/components/ui/DropdownMenu";
import DropdownMenuList, { DropdownMenuItemType } from "@/components/DropdownMenuList";

export const Default: Story = () => {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [theme, setTheme] = useState("light");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button label="Open Dropdown" />
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => console.log("New File selected")}>
            New File
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => console.log("New Window selected")}>
            New Window
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => console.log("Save selected")}>
              Save
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => console.log("Save As... selected")}
            >
              Save As...
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            Show Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showActivityBar}
            onCheckedChange={setShowActivityBar}
          >
            Show Activity Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showPanel}
            onCheckedChange={setShowPanel}
          >
            Show Panel
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
            <DropdownMenuRadioItem
              value="light"
              onSelect={() => console.log("Light theme selected")}
            >
              Light
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="dark"
              onSelect={() => console.log("Dark theme selected")}
            >
              Dark
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="system"
              onSelect={() => console.log("System theme selected")}
            >
              System
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onSelect={() => console.log("GitHub selected")}
                >
                  GitHub
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => console.log("Email selected")}
                >
                  Email
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Debug</DropdownMenuLabel>
          <DropdownMenuItem
            disabled
            onSelect={() => console.log("Inspect selected")}
          >
            Inspect Element
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export const ListComponent: Story = () => {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [theme, setTheme] = useState("light");

  const dropdownItems: DropdownMenuItemType[] = [
    { type: "item", label: "New File", onSelect: () => console.log("New File selected") },
    { type: "item", label: "New Window", onSelect: () => console.log("New Window selected") },
    { type: "separator" },
    { 
      type: "item", 
      label: "Save", 
      onSelect: () => console.log("Save selected")
    },
    { 
      type: "item", 
      label: "Save As...", 
      onSelect: () => console.log("Save As... selected")
    },
    { type: "separator" },
    {
      type: "checkbox",
      label: "Show Status Bar",
      checked: showStatusBar,
      onCheckedChange: setShowStatusBar,
    },
    {
      type: "checkbox",
      label: "Show Activity Bar",
      checked: showActivityBar,
      onCheckedChange: setShowActivityBar,
    },
    {
      type: "checkbox",
      label: "Show Panel",
      checked: showPanel,
      onCheckedChange: setShowPanel,
    },
    { type: "separator" },
    {
      type: "radio-group",
      value: theme,
      onValueChange: setTheme,
      items: [
        { type: "radio", label: "Light", value: "light", onSelect: () => console.log("Light theme selected") },
        { type: "radio", label: "Dark", value: "dark", onSelect: () => console.log("Dark theme selected") },
        { type: "radio", label: "System", value: "system", onSelect: () => console.log("System theme selected") },
      ],
    },
    { type: "separator" },
    {
      type: "sub",
      trigger: "Share",
      items: [
        { type: "item", label: "GitHub", onSelect: () => console.log("GitHub selected") },
        { type: "item", label: "Email", onSelect: () => console.log("Email selected") },
      ],
    },
    { type: "separator" },
    { type: "label", label: "Debug" },
    { type: "item", label: "Inspect Element", disabled: true, onSelect: () => console.log("Inspect selected") },
  ];

  return (
    <DropdownMenuList trigger={<Button label="Open List Dropdown" />} items={dropdownItems} />
  );
};
