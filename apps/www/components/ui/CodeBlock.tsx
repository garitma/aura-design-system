"use client";

import * as React from "react";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/class-names";
import { Button } from "@/components/ui/Button";

const codeBlockVariants = cva(
  "group/code-block relative flex w-full min-w-0 flex-col overflow-hidden rounded-md border text-sm text-gray-12",
  {
    variants: {
      variant: {
        default: "border-gray-6 bg-gray-2",
        danger: "border-danger bg-danger text-danger-contrast",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const codeBlockLineVariants = cva("min-w-0", {
  variants: {
    variant: {
      default: "",
      added: "bg-accent-3",
      removed: "bg-gray-4",
      highlighted: "bg-accent-4",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type CodeBlockLineVariant = NonNullable<
  VariantProps<typeof codeBlockLineVariants>["variant"]
>;

function CodeBlock({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof codeBlockVariants> & {
    size?: "default" | "sm";
  }) {
  return (
    <div
      data-slot="code-block"
      data-variant={variant}
      data-size={size}
      className={cn(codeBlockVariants({ variant }), className)}
      {...props}
    />
  );
}

function CodeBlockHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="code-block-header"
      className={cn(
        "flex min-w-0 items-center gap-0.5 px-1 py-0.5 text-gray-11 group-data-[size=sm]/code-block:px-0.5",
        className
      )}
      {...props}
    />
  );
}

function CodeBlockTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="code-block-title"
      className={cn(
        "min-w-0 flex-1 truncate text-sm font-medium text-gray-12 group-data-[size=sm]/code-block:text-xs group-data-[variant=danger]/code-block:text-danger-contrast",
        className
      )}
      {...props}
    />
  );
}

function CodeBlockActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="code-block-actions"
      className={cn("ms-auto flex shrink-0 items-center gap-0.5", className)}
      {...props}
    />
  );
}

function CodeBlockCopyButton({
  value,
  variant = "pill",
  size = "icon",
  className,
  onClick,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "children"> & {
  value: string;
}) {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      {...props}
      data-slot="code-block-copy-button"
      data-copied={copied || undefined}
      aria-label={copied ? "Copied" : "Copy"}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        const writeText = navigator.clipboard?.writeText;
        if (!writeText) return;
        void writeText
          .call(navigator.clipboard, value)
          .then(() => setCopied(true))
          .catch(() => setCopied(false));
      }}
    >
      {copied ? <CheckIcon className="icon" /> : <CopyIcon className="icon" />}
    </Button>
  );
}

function CodeBlockContent({
  className,
  children,
  style,
  wrap = false,
  lineNumbers = false,
  startLine = 1,
  ...props
}: React.ComponentProps<"pre"> & {
  wrap?: boolean;
  lineNumbers?: boolean;
  startLine?: number;
}) {
  const lineStart = Number.isFinite(startLine) ? startLine : 1;
  const numberedLines =
    lineNumbers && typeof children === "string"
      ? children.replace(/\n$/, "").split("\n")
      : null;

  return (
    <pre
      data-slot="code-block-content"
      data-wrap={wrap || undefined}
      data-numbered={lineNumbers || undefined}
      dir="ltr"
      tabIndex={0}
      style={{ counterReset: `line ${lineStart - 1}`, ...style }}
      className={cn(
        "min-h-0 min-w-0 overflow-auto px-1 py-1 text-start font-mono text-sm leading-relaxed outline-none",
        "group-has-data-[slot=code-block-header]/code-block:pt-0.5",
        "group-has-data-[slot=code-block-footer]/code-block:pb-0.5",
        "group-data-[size=sm]/code-block:px-0.5 group-data-[size=sm]/code-block:py-0.5 group-data-[size=sm]/code-block:text-xs",
        "focus-visible:[outline:var(--aura-outline)]",
        className
      )}
      {...props}
    >
      <code data-slot="code-block-code">
        {numberedLines
          ? numberedLines.map((line, index) => (
              <CodeBlockLine key={index}>{line}</CodeBlockLine>
            ))
          : children}
      </code>
    </pre>
  );
}

function isBlankLine(children: React.ReactNode) {
  return (
    children === undefined ||
    children === null ||
    children === "" ||
    (Array.isArray(children) && children.length === 0)
  );
}

function CodeBlockLine({
  className,
  variant = "default",
  children,
  ...props
}: React.ComponentProps<"span"> & {
  variant?: CodeBlockLineVariant;
}) {
  return (
    <span
      data-slot="code-block-line"
      data-variant={variant}
      className={cn(codeBlockLineVariants({ variant }), className)}
      {...props}
    >
      <span data-slot="code-block-line-text">
        {isBlankLine(children) ? "\n" : children}
      </span>
    </span>
  );
}

function CodeBlockFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="code-block-footer"
      className={cn(
        "flex min-w-0 items-center gap-0.5 px-1 py-0.5 text-gray-11 group-data-[size=sm]/code-block:px-0.5",
        className
      )}
      {...props}
    />
  );
}

export {
  CodeBlock,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockContent,
  CodeBlockLine,
  CodeBlockFooter,
  codeBlockVariants,
  codeBlockLineVariants,
};
export type { CodeBlockLineVariant };
