"use client";

import type * as React from "react";

import { CodeBlock } from "@/components/ui/MdxCodeBlock";
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