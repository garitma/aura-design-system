"use client";

import Link from "next/link";
import { AccessibilityIcon, TokensIcon } from "@radix-ui/react-icons";
import { Check, Clipboard } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import Section from "@/components/Section";
import { cn } from "@/utils/class-names";

function CopyableCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="mt-1 flex items-center gap-0.5 text-sm font-mono">
      <code className="flex-1 text-gray-11"><span className="text-accent-11 animate-pulse">◉</span> ~ {command}</code>
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          "flex items-center justify-center size-2 rounded-md",
          "text-gray-11 hover:text-gray-12 hover:bg-gray-3",
          "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-7"
        )}
        aria-label={copied ? "Copied" : "Copy command"}
      >
        {copied ? (
          <Check className="icon text-accent-11" />
        ) : (
          <Clipboard className="icon" />
        )}
      </button>
    </div>
  );
}

export default function HeroSection() {
  return (
    <Section>
      <div className="flex flex-col items-center text-center gap-0.5">
        <div className="space-y-1">
          <h1 className="h1 font-bold tracking-tight text-gray-12">
            Another design system. <br className="hidden md:block" />
            <span className="text-gray-11">With Aura, The Soul is Yours</span>
          </h1>
          <p className="p text-gray-11 max-w-2xl mx-auto text-lg">
            Provide the robust architecture and modern conventions you need for
            flexibility, but we deliberately leave room for your signature
            style. It is engineered to adapt to any scenario, ensuring that
            while the foundation is solid, the final identity is yours.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-1 items-center">
          <Button size="lg" asChild>
            <Link href="/docs">Get Started</Link>
          </Button>
          <Button variant="pill" size="lg" asChild>
            <Link
              href="https://github.com/garitma/aura-design-system"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </Link>
          </Button>
        </div>

        <CopyableCommand command="pnpm dlx @aura-design/cli@latest init" />

        <div className="pt-2.5 flex flex-col md:flex-row items-center gap-1 text-sm text-gray-11">
          <div className="flex items-center gap-1">
            <AccessibilityIcon className="icon" />
            <span>Accessible Primitives (Radix UI)</span>
          </div>
          <div className="w-px h-1 bg-gray-6 hidden md:block" />
          <div className="flex items-center gap-1">
            <TokensIcon className="icon" />
            <span>Utility-First Styling (Tailwind)</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
