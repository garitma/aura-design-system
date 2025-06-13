"use client";

import { cn } from "@/lib/utils";
import { Collapsible as CollapsibleRadix } from "radix-ui";

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsibleRadix.Root>) {
  return <CollapsibleRadix.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsibleRadix.CollapsibleTrigger>) {
  return (
    <CollapsibleRadix.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  );
}

function CollapsibleContent({
  className,
  ...props
}: React.ComponentProps<typeof CollapsibleRadix.CollapsibleContent>) {
  return (
    <CollapsibleRadix.CollapsibleContent
      className={cn(
        className,
        "overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
      )}
      data-slot="collapsible-content"
      {...props}
    />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
