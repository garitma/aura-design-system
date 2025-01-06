import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import CommandLine from "../components/CommandLine";

export default {
  title: "Accordion",
};

export const Radix = () => (
  <Accordion.Root type="single" defaultValue="item-1" collapsible>
    <Accordion.Item
      value="item-1"
      className="overflow-hidden focus-within:outline outline-info outline-2 focus-within:z-10"
    >
      <Accordion.Trigger className="group flex flex-1 cursor-default items-center justify-between p-1 leading-none outline-none w-full h6 border border-l-0 border-t-0 border-r-0">
        Is it accessible?{" "}
        <ChevronDownIcon
          className="group-data-[state=open]:rotate-180 transition duration-300"
          aria-hidden
        />
      </Accordion.Trigger>
      <Accordion.Content className="px-2 py-1 bg-snow">
        Yes. It adheres to the WAI-ARIA design pattern.
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
);

Radix.decorators = [
  (Component) => (
    <>
      <CommandLine code="pnpm i @radix-ui/react-accordion" />
      <Component />
    </>
  ),
];
