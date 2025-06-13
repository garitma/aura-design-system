import type { Story } from "@ladle/react";
import { useState } from "react";
import { RowSpacingIcon, Cross1Icon } from "@radix-ui/react-icons";

import Button from "@/components/ui/Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/Collapsible";

export const Default: Story = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="max-w-md mx-auto"
    >
      <div className="flex items-center justify-between">
        <span>@peduarte starred 3 repositories</span>
        <CollapsibleTrigger asChild>
          <Button size="small">
            {isOpen ? <Cross1Icon /> : <RowSpacingIcon />}
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="space-y-0.5 mt-1">
        <div className="border border-gray-a6 rounded-md p-1">
          @radix-ui/primitives
        </div>
        <CollapsibleContent className="space-y-0.5">
          <div className="border border-gray-a6 rounded-md p-1">
            @radix-ui/colors
          </div>
          <div className="border border-gray-a6 rounded-md p-1">
            @stitches/react
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};
