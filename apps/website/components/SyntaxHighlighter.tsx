"use client";
import React, { useRef, useState } from "react";
import { ScrollArea } from "radix-ui";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CodeIcon, CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { asText } from "@prismicio/client";

import Button from "@/components/ui/Button";

function CodeBlockSyntaxHighlighter({ code, language }) {
  const codeRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

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
        <ScrollArea.Viewport className="size-full rounded-1 border border-black-3 rounded-t-none overflow-hidden">
          <SyntaxHighlighter
            language={language}
            style={coy}
            lineProps={{ className: "code-line" }}
          >
            {code}
          </SyntaxHighlighter>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="horizontal" className="flex touch-none select-none bg-black-a2 h-0.5 rounder-1">
          <ScrollArea.Thumb className="bg-black-4 rounded-full" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar orientation="vertical" className="flex touch-none select-none bg-black-a2 h-0.5 rounder-1">
          <ScrollArea.Thumb className="bg-black-4 rounded-full" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>
    </div>
  );
}

export default CodeBlockSyntaxHighlighter;
