import React, { useRef, useState } from "react";
import { CodeIcon, CheckIcon } from "@radix-ui/react-icons";

type CommandLineProps = {
  code?: string;
};

const CommandLine = ({ code }: CommandLineProps) => {
  const codeRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    if (!code || !codeRef.current) return;

    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset after 1.5 seconds
    } catch (error) {
      console.error("Failed to copy:", error);
      // Optionally show an error message to the user
    }
  };

  return (
    <div className="my-1 relative" onClick={copyCode}>
      <h3>Installation</h3>
      <p>Install the component from your command line.</p>
      <pre
        className="flex justify-start gap-1 items-center border-solid border border-accents-3 p-1 h-4 rounded text-center cursor-pointer hover:bg-accents-1"
        ref={codeRef} // Assign the ref
      >
        {copied ? (
          <CheckIcon className="icon" />
        ) : (
          <CodeIcon className="icon" />
        )}
        {copied ? <>Copied!</> : code}
      </pre>
    </div>
  );
};

export default CommandLine;
