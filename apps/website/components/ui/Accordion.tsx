import { ReactNode } from "react";
import { Accordion as AccordionRadix } from "radix-ui";
import { ChevronDownIcon } from "@radix-ui/react-icons";

type AccordionItem = {
  title: ReactNode;
  content: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
};

const Accordion = ({ items, ...props }: AccordionProps) => {
  return (
    <AccordionRadix.Root collapsible type="single" {...props}>
      {items.map((item, index) => (
        <AccordionRadix.Item
          className="overflow-hidden"
          value={`item-${index}`}
        >
          <AccordionRadix.Trigger className="group flex justify-between flex-1 cursor-pointer items-center gap-1 p-1 w-full h6 hover:bg-black3 border border-b-1 border-black-3 border-x-0 border-t-0 px-2">
            {item.title}
            <ChevronDownIcon
              aria-hidden
              className="group-data-[state=open]:rotate-180 transition duration-300"
            />
          </AccordionRadix.Trigger>
          <AccordionRadix.Content className="px-2 py-1 bg-black-2">
            {item.content}
          </AccordionRadix.Content>
        </AccordionRadix.Item>
      ))}
    </AccordionRadix.Root>
  );
};

export default Accordion;
