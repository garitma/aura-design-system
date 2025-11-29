"use client";

/**
 * @description A vertically stacked set of interactive headings that each reveal a section of content.
 */

import React from "react";
import { Accordion as AccordionRadix } from "radix-ui";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import { cn } from "@/utils/class-names";

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionRadix.Root>) {
  return <AccordionRadix.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionRadix.Item>) {
  return (
    <AccordionRadix.Item
      data-slot="accordion-item"
      className={cn("overflow-hidden", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionRadix.Trigger>) {
  return (
    <AccordionRadix.Header className="flex">
      <AccordionRadix.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex justify-between flex-1 cursor-pointer items-center gap-1 p-1 w-full h6 border border-b-1 border-gray-6 border-x-0 border-t-0 px-2 disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="group-data-[state=open]:rotate-180 transition duration-300" />
      </AccordionRadix.Trigger>
    </AccordionRadix.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionRadix.Content>) {
  return (
    <AccordionRadix.Content
      data-slot="accordion-content"
      className="bg-gray-2 data-[state=open]:animate-accordion-open data-[state=closed]:animate-accordion-closed"
      {...props}
    >
      <div className={cn("px-2 py-1", className)}>{children}</div>
    </AccordionRadix.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
