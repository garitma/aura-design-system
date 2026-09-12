import * as React from "react";
import {
  CopyIcon,
  FontBoldIcon,
  FontItalicIcon,
  Link2Icon,
  StrikethroughIcon,
  UnderlineIcon,
} from "@radix-ui/react-icons";
import {
  SelectionToolbar,
  SelectionToolbarItem,
  SelectionToolbarSeparator,
} from "@/components/ui/SelectionToolbar";

const sampleCopy = `Aura treats typography as a fluid system. Select any of this copy to open a formatting toolbar above the highlight. Escape dismisses the toolbar and clears the selection.`;


export const SelectionToolbarDemo = () => {
  const [copied, setCopied] = React.useState("");

  return (
    <div className="w-full max-w-lg">
      <p className="text-gray-12">
        {sampleCopy}
      </p>
      {copied ? (
        <p className="mt-1 text-sm text-gray-11">Copied: {copied}</p>
      ) : null}
      <SelectionToolbar>
        <SelectionToolbarItem aria-label="Bold">
          <FontBoldIcon className="icon" />
        </SelectionToolbarItem>
        <SelectionToolbarItem aria-label="Italic">
          <FontItalicIcon className="icon" />
        </SelectionToolbarItem>
        <SelectionToolbarItem aria-label="Underline">
          <UnderlineIcon className="icon" />
        </SelectionToolbarItem>
        <SelectionToolbarSeparator />
        <SelectionToolbarItem aria-label="Strikethrough">
          <StrikethroughIcon className="icon" />
        </SelectionToolbarItem>
        <SelectionToolbarItem aria-label="Link">
          <Link2Icon className="icon" />
        </SelectionToolbarItem>
        <SelectionToolbarSeparator />
        <SelectionToolbarItem
          aria-label="Copy"
          onSelect={(text) => {
            void navigator.clipboard.writeText(text);
            setCopied(text);
          }}
        >
          <CopyIcon className="icon" />
        </SelectionToolbarItem>
      </SelectionToolbar>
    </div>
  );
};

export const SelectionToolbarDemoSelectionInfo = () => {
  const [selectedText, setSelectedText] = React.useState("");
  const words = selectedText.trim() ? selectedText.split(/\s+/).length : 0;
  const characters = selectedText.length;

  return (
    <div className="w-full max-w-lg">
      <p className="text-gray-12">
        Highlight a phrase to see word and character counts in the toolbar.
      </p>
      <p className="mt-1 text-sm text-gray-11">
        {selectedText
          ? `${words} words · ${characters} characters`
          : "No selection"}
      </p>
      <SelectionToolbar onSelectionChange={setSelectedText}>
        <span className="px-1 text-xs tabular-nums text-gray-11">
          {words}w · {characters}c
        </span>
        <SelectionToolbarSeparator />
        <SelectionToolbarItem
          aria-label="Copy"
          onSelect={(text) => {
            void navigator.clipboard.writeText(text);
          }}
        >
          <CopyIcon className="icon" />
        </SelectionToolbarItem>
      </SelectionToolbar>
    </div>
  );
};

export const SelectionToolbarDemoScopedContainer = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="flex w-full max-w-lg flex-col gap-1">
      <div
        ref={containerRef}
        className="rounded-md border border-gray-6 bg-gray-2 p-1"
      >
        <p className="text-sm text-gray-12">
          Selection inside this card opens the toolbar. Text outside it does
          not.
        </p>
      </div>
      <p className="text-sm text-gray-11">
        This paragraph is outside the scoped container, so selecting it will not
        show the toolbar.
      </p>
      <SelectionToolbar container={containerRef}>
        <SelectionToolbarItem aria-label="Bold">
          <FontBoldIcon className="icon" />
        </SelectionToolbarItem>
        <SelectionToolbarItem aria-label="Italic">
          <FontItalicIcon className="icon" />
        </SelectionToolbarItem>
        <SelectionToolbarSeparator />
        <SelectionToolbarItem
          aria-label="Copy"
          onSelect={(text) => {
            void navigator.clipboard.writeText(text);
          }}
        >
          <CopyIcon className="icon" />
        </SelectionToolbarItem>
      </SelectionToolbar>
    </div>
  );
};