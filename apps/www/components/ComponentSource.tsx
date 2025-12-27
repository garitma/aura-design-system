"use client";

/**
 * @see https://github.com/shadcn-ui/ui/blob/main/apps/www/components/component-source.tsx
 */

import type * as React from "react";

import { CodeBlock } from "@/components/ui/Codeblock";
import { cn } from "@/utils/class-names";

interface ComponentSourceProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
}

export function ComponentSource({
  children,
  className,
  ...props
}: ComponentSourceProps) {
  return (
    <CodeBlock
      className={cn("", className)}
      {...props}
    >
      {children}
    </CodeBlock>
  );
}