"use client";
// Required for client-side functionality
import React, { useRef, useState } from "react";
import { ScrollArea, Collapsible } from "radix-ui";
import { CodeIcon, CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/cjs/styles/prism";

import Button from "@/components/ui/Button";

// Props type definition for the component
type CodeBlockSyntaxHighlighterProps = {
  code: string;
  language: string | null;
  collapsible?: boolean; // Optional prop to control if code block is collapsible
};

function CodeBlockSyntaxHighlighter({
  code,
  language,
  collapsible = false, // Default to non-collapsible
}: CodeBlockSyntaxHighlighterProps) {
  // Ref for accessing the code container element
  const codeRef = useRef(null);
  // State for copy button feedback
  const [copied, setCopied] = useState(false);
  // State for collapsible code block, default to open
  const [isOpen, setIsOpen] = useState(false);

  // Common viewport styling classes
  const classNameViewport: string[] = [
    "size-full",
    "rounded-1",
    "border",
    "border-black-3",
    "rounded-t-none",
    "overflow-hidden",
  ];

  // Additional classes for collapsed state trigger
  const classNameTrigger: string[] = [
    ...classNameViewport,
    "max-h-20",
    "relative",
  ];

  // Function to handle code copying
  const copyCode = async () => {
    if (!code || !codeRef.current) return;

    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 900); // Reset after 1.5 seconds
    } catch (error) {
      console.error("Failed to copy:", error);
      // Optionally show an error message to the user
    }
  };

  // If not collapsible, render simple view
  if (!collapsible) {
    return (
      <div className="code-wrapper">
        <div
          className="border border-black-3 p-1 border-b-0 bg-black-2 flex rounded-t-1 justify-between"
          ref={codeRef}
        >
          <div className="flex items-center gap-1 text-black-9">
            <CodeIcon className="icon" />
            {language}
          </div>
          <div>
            <Button mode="menu" className="h-auto w-auto" onClick={copyCode}>
              {copied ? (
                <CheckIcon className="icon" />
              ) : (
                <CopyIcon className="icon" />
              )}
            </Button>
          </div>
        </div>
        <ScrollArea.Root className="w-full">
          <ScrollArea.Viewport className={classNameViewport.join(" ")}>
            <SyntaxHighlighter language={language} style={coy}>
              {code}
            </SyntaxHighlighter>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            orientation="horizontal"
            className="flex touch-none select-none bg-black-a2 h-0.5 rounder-1"
          >
            <ScrollArea.Thumb className="bg-black-4 rounded-full" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Scrollbar
            orientation="vertical"
            className="flex touch-none select-none bg-black-a2 h-0.5 rounder-1"
          >
            <ScrollArea.Thumb className="bg-black-4 rounded-full" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </ScrollArea.Root>
      </div>
    );
  }

  return (
    <div className="code-wrapper">
      {/* Header section with language indicator and copy button */}
      <div
        className="border border-black-3 p-1 border-b-0 bg-black-1 flex rounded-t-1 justify-between"
        ref={codeRef}
      >
        <div className="flex items-center gap-1 text-black-9">
          <CodeIcon className="icon" />
          {language}
        </div>
        <div>
          <Button mode="menu" className="h-auto w-auto" onClick={copyCode}>
            {copied ? (
              <CheckIcon className="icon" />
            ) : (
              <CopyIcon className="icon" />
            )}
          </Button>
        </div>
      </div>
      {/* Collapsible code block container */}
      <Collapsible.Root
        open={isOpen}
        onOpenChange={setIsOpen}
        className="relative"
      >
        {/* Collapsed view */}
        {!isOpen && (
          <div className={classNameTrigger.join(" ")}>
            <SyntaxHighlighter language={language} style={coy}>
              {code}
            </SyntaxHighlighter>
            <div className="absolute left-0 right-0 top-0 bottom-0 pb-0.5 flex items-end justify-center bg-gradient-to-t from-black-1 to-black-a-1">
              <Collapsible.Trigger asChild>
                <Button className="p-1 h-3">
                  Expand code
                </Button>
              </Collapsible.Trigger>
            </div>
          </div>
        )}

        {/* Expanded view with scrollable content */}
        <Collapsible.Content>
          <ScrollArea.Root className="w-full">
            <ScrollArea.Viewport className={classNameViewport.join(" ")}>
              <SyntaxHighlighter language={language} style={coy}>
                {code}
              </SyntaxHighlighter>
            </ScrollArea.Viewport>
            {/* Horizontal scrollbar */}
            <ScrollArea.Scrollbar
              orientation="horizontal"
              className="flex touch-none select-none bg-black-a2 h-0.5 rounder-1"
            >
              <ScrollArea.Thumb className="bg-black-4 rounded-full" />
            </ScrollArea.Scrollbar>
            {/* Vertical scrollbar */}
            <ScrollArea.Scrollbar
              orientation="vertical"
              className="flex touch-none select-none bg-black-a2 h-0.5 rounder-1"
            >
              <ScrollArea.Thumb className="bg-black-4 rounded-full" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner />
          </ScrollArea.Root>
          {/* Collapse button container */}
          <div className="absolute left-0 right-0 top-0 bottom-0.5 flex items-end justify-center">
            <Collapsible.Trigger asChild>
              <Button className="p-1 h-3">
                Collapse code
              </Button>
            </Collapsible.Trigger>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  );
}

export default CodeBlockSyntaxHighlighter;
