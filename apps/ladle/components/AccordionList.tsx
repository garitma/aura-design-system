import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";

type AccordionListProps = {
  items: {
    title: React.ReactNode;
    content: React.ReactNode;
    itemProps?: React.ComponentProps<typeof AccordionItem>;
  }[];
} & React.ComponentProps<typeof Accordion>;

const AccordionList = ({ items, ...props }: AccordionListProps) => {
  return (
    <Accordion {...props}>
      {items.map((item, index) => (
        <AccordionItem
          className="overflow-hidden"
          value={`item-${index}`}
          key={`item-${index}`}
        >
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AccordionList;
