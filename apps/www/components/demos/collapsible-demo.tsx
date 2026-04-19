import { useState } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/Collapsible";
import { Button } from "@/components/ui/Button";

export const CollapsibleDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const items = [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Radix UI",
    "Vite",
    "Vitest",
  ];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center justify-between gap-1">
        <h4 className="text-sm font-semibold">Technologies ({items.length})</h4>
        <CollapsibleTrigger asChild>
          <Button variant="menu" size="sm">
            {isOpen ? "Hide" : "Show"} All
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <ul className="pt-1 space-y-0.5 text-sm text-gray-11">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-0.5">
              <span className="size-0.5 rounded-full bg-accent-9" />
              {item}
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
};