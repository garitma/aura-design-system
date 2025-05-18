"use client";

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
  ...props
}: React.ComponentProps<typeof CollapsibleRadix.CollapsibleContent>) {
  return (
    <CollapsibleRadix.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
