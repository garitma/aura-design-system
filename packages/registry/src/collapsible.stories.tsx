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

type TechnologiesCollapsibleProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function TechnologiesCollapsible({
  open,
  onOpenChange,
}: TechnologiesCollapsibleProps) {
  return (
    <Collapsible className="w-full" open={open} onOpenChange={onOpenChange}>
      <div className="flex w-full items-center justify-between gap-1">
        <span className="small font-semibold text-gray-12">
          Technologies ({TECHNOLOGIES.length})
        </span>
        <CollapsibleTrigger asChild>
          <Button variant="menu" size="sm">
            {open ? "Hide All" : "Show All"}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <ul className="small space-y-0.5 pt-1 font-normal text-gray-11">
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

function TechnologiesCollapsibleWithState({
  defaultOpen = false,
}: {
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return <TechnologiesCollapsible open={isOpen} onOpenChange={setIsOpen} />;
}

export const Default = () => <TechnologiesCollapsibleWithState />;

export const Open = () => (
  <TechnologiesCollapsibleWithState defaultOpen />
);

export const Controlled = () => {
  const [isOpen, setIsOpen] = useState(false);
  return <TechnologiesCollapsible open={isOpen} onOpenChange={setIsOpen} />;
};
