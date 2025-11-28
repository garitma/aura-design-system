import { useState } from "react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
} from "../registry/default/components/ui/ContextMenu";

export const Default = () => (
  <ContextMenu>
    <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed border-gray-6 text-sm">
      Right click here
    </ContextMenuTrigger>
    <ContextMenuContent className="w-18">
      <ContextMenuItem>
        Back
        <ContextMenuShortcut>⌘[</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem disabled>
        Forward
        <ContextMenuShortcut>⌘]</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>
        Reload
        <ContextMenuShortcut>⌘R</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem>
        Save As...
        <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>Print...</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
);

export const WithSubmenu = () => (
  <ContextMenu>
    <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed border-gray-6 text-sm">
      Right click here
    </ContextMenuTrigger>
    <ContextMenuContent className="w-18">
      <ContextMenuItem>Back</ContextMenuItem>
      <ContextMenuItem>Forward</ContextMenuItem>
      <ContextMenuItem>Reload</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuSub>
        <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
        <ContextMenuSubContent className="w-18">
          <ContextMenuItem>
            Save Page As...
            <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>Create Shortcut...</ContextMenuItem>
          <ContextMenuItem>Name Window...</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Developer Tools</ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
      <ContextMenuSeparator />
      <ContextMenuItem>
        Inspect
        <ContextMenuShortcut>⌥⌘I</ContextMenuShortcut>
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
);

export const WithCheckboxes = () => {
  const [showBookmarksBar, setShowBookmarksBar] = useState(true);
  const [showFullUrls, setShowFullUrls] = useState(false);

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed border-gray-6 text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-18">
        <ContextMenuCheckboxItem
          checked={showBookmarksBar}
          onCheckedChange={setShowBookmarksBar}
        >
          Show Bookmarks Bar
          <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem
          checked={showFullUrls}
          onCheckedChange={setShowFullUrls}
        >
          Show Full URLs
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export const WithRadioGroup = () => {
  const [person, setPerson] = useState("pedro");

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed border-gray-6 text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-18">
        <ContextMenuRadioGroup value={person} onValueChange={setPerson}>
          <ContextMenuLabel>People</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuRadioItem value="pedro">
            Pedro Duarte
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export const ComplexMenu = () => {
  const [showBookmarksBar, setShowBookmarksBar] = useState(true);
  const [showFullUrls, setShowFullUrls] = useState(false);
  const [person, setPerson] = useState("pedro");

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed border-gray-6 text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-20">
        <ContextMenuItem>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem
          checked={showBookmarksBar}
          onCheckedChange={setShowBookmarksBar}
        >
          Show Bookmarks Bar
          <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem
          checked={showFullUrls}
          onCheckedChange={setShowFullUrls}
        >
          Show Full URLs
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value={person} onValueChange={setPerson}>
          <ContextMenuLabel>People</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuRadioItem value="pedro">
            Pedro Duarte
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
};
