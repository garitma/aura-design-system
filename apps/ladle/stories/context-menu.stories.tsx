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
            <ContextMenuRadioItem value="safari" onSelect={() => console.log("Safari selected")}>
              Safari
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="firefox" onSelect={() => console.log("Firefox selected")}>
              Firefox
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="chrome" onSelect={() => console.log("Chrome selected")}>
              Chrome
            </ContextMenuRadioItem>
          </ContextMenuRadioGroup>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
            <ContextMenuPortal>
              <ContextMenuSubContent>
                <ContextMenuItem onSelect={() => console.log("Save Page As... selected")}>
                  Save Page As...
                </ContextMenuItem>
                <ContextMenuItem onSelect={() => console.log("Create Shortcut... selected")}>
                  Create Shortcut...
                </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuPortal>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuLabel>Developer</ContextMenuLabel>
          <ContextMenuItem disabled onSelect={() => console.log("Inspect selected")}>
            Inspect
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenuPortal>
    </ContextMenu>
  );
};
