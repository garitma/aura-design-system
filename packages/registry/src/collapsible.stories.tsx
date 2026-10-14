import { useState } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../registry/default/components/ui/Collapsible";
import { Button } from "../registry/default/components/ui/Button";

const TECHNOLOGIES = [
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Radix UI",
  "Vite",
  "Vitest",
] as const;

function TechnologiesCollapsible({
  openByDefault = false,
}: {
  openByDefault?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(openByDefault);

  return (
    <Collapsible
      className="w-full"
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <div className="flex w-full items-center justify-between gap-1">
        <span className="small font-semibold text-gray-12">
          Technologies ({TECHNOLOGIES.length})
        </span>
        <CollapsibleTrigger asChild>
          <Button variant="menu" size="sm">
            {isOpen ? "Hide All" : "Show All"}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="pt-1">
        <ul className="small space-y-0.5 font-normal text-gray-11">
          {TECHNOLOGIES.map((item) => (
            <li key={item} className="flex items-center gap-0.5">
              <span
                aria-hidden="true"
                className="size-0.5 shrink-0 rounded-full bg-accent-9"
              />
              {item}
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}

export const Default = () => <TechnologiesCollapsible />;

export const Open = () => <TechnologiesCollapsible openByDefault />;

export const Controlled = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible className="w-full" open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex w-full items-center justify-between gap-1">
        <span className="small font-semibold text-gray-12">
          Technologies ({TECHNOLOGIES.length})
        </span>
        <CollapsibleTrigger asChild>
          <Button variant="menu" size="sm">
            {isOpen ? "Hide All" : "Show All"}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="pt-1">
        <ul className="small space-y-0.5 font-normal text-gray-11">
          {TECHNOLOGIES.map((item) => (
            <li key={item} className="flex items-center gap-0.5">
              <span
                aria-hidden="true"
                className="size-0.5 shrink-0 rounded-full bg-accent-9"
              />
              {item}
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
};
