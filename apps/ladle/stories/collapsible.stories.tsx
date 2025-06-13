import type { Story } from "@ladle/react";
import { useState } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui/Collapsible";

export const Default: Story = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <CollapsibleTrigger asChild>
        <button>
          <span className="sr-only">Toggle</span>
        </button>
      </CollapsibleTrigger>

      <div>@radix-ui/primitives</div>
      <CollapsibleContent className="space-y-2 overflow-hidden text-sm data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        <div>@radix-ui/colors</div>
        <div>@stitches/react</div>
      </CollapsibleContent>
    </Collapsible>
  );
};
