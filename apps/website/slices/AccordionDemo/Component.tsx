import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Accordion } from "radix-ui";

export const importString =
  "import { Accordion } from 'radix-ui';\nimport { ChevronDownIcon } from '@radix-ui/react-icons';";

const Component = () => {
  return (
    <Accordion.Root
      type="single"
      defaultValue="item-1"
      collapsible
      data-display-name="Accordion.Root"
    >
      <Accordion.Item
        value="item-1"
        className="overflow-hidden"
        data-display-name="Accordion.Item"
      >
        <Accordion.Trigger
          className="group flex justify-between flex-1 cursor-pointer items-center gap-1 p-1 px-2 w-full h6 hover:bg-black3 border border-b-1 border-black-3 border-x-0 border-t-0"
          data-display-name="Accordion.Trigger"
        >
          Is it accessible?
          <ChevronDownIcon
            className="group-data-[state=open]:rotate-180 transition duration-300"
            aria-hidden
            data-display-name="ChevronDownIcon"
          />
        </Accordion.Trigger>
        <Accordion.Content
          className="px-2 py-1 bg-black-2"
          data-display-name="Accordion.Content"
        >
          Yes. It adheres to the WAI-ARIA design pattern.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item
        value="item-2"
        className="overflow-hidden"
        data-display-name="Accordion.Item"
      >
        <Accordion.Trigger
          className="group flex justify-between flex-1 cursor-pointer items-center gap-1 p-1 px-2 w-full h6 hover:bg-black3 border border-b-1 border-black-3 border-x-0 border-t-0"
          data-display-name="Accordion.Trigger"
        >
          Is it unstyled?
          <ChevronDownIcon
            className="group-data-[state=open]:rotate-180 transition duration-300"
            aria-hidden
            data-display-name="ChevronDownIcon"
          />
        </Accordion.Trigger>
        <Accordion.Content
          className="px-2 py-1 bg-black-2 "
          data-display-name="Accordion.Content"
        >
          Yes. It's unstyled by default, giving you freedom over the look and
          feel.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item
        value="item-3"
        className="overflow-hidden"
        data-display-name="Accordion.Item"
      >
        <Accordion.Trigger
          className="group flex justify-between flex-1 cursor-pointer items-center gap-1 p-1 px-2 w-full h6 hover:bg-black3 border border-b-1 border-black-3 border-x-0 border-t-0"
          data-display-name="Accordion.Trigger"
        >
          Can it be animated?
          <ChevronDownIcon
            className="group-data-[state=open]:rotate-180 transition duration-300"
            aria-hidden
            data-display-name="ChevronDownIcon"
          />
        </Accordion.Trigger>
        <Accordion.Content
          className="px-2 py-1 bg-black-2"
          data-display-name="Accordion.Content"
        >
          Yes! You can animate the Accordion with CSS or JavaScript.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default Component;
