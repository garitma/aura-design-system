import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Tabs } from "radix-ui";

import { Accordion } from "radix-ui";
import Section from "@/components/ui/Section";
import SyntaxHighlighter from "@/components/SyntaxHighlighter";
import { ChevronDownIcon } from "@radix-ui/react-icons";

/**
 * Props for `AccordionDemo`.
 */
export type AccordionDemoProps =
  SliceComponentProps<Content.AccordionDemoSlice>;

/**
 * Component for "AccordionDemo" Slices.
 */
const code = `import { Accordion } from "radix-ui";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export const WithRadix = () => (
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
);>
`;


const AccordionDemo = ({ slice }: AccordionDemoProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-0"
    >
      <Tabs.Root className="flex flex-col" defaultValue="tab1">
        <Tabs.List className="border border-black-3 p-1 border-b-0 bg-black-2 flex rounded-t-1 gap-0.5">
          <Tabs.Trigger
            className="bg-black-2 p-0.5 data-[state=active]:bg-black-4 rounded-2"
            value="tab1"
          >
            Preview
          </Tabs.Trigger>
          <Tabs.Trigger
            className="bg-black-2 p-0.5 data-[state=active]:bg-black-4 rounded-2"
            value="tab2"
          >
            Code
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content
          className="border border-black-3 rounded-1 rounded-t-none p-1"
          value="tab1"
        >
          <Accordion.Root type="single" collapsible>
            <Accordion.Item
              value={`menu`}
              key={`menu`}
              className="overflow-hidden"
            >
              <Accordion.Trigger
                className="group flex justify-between flex-1 cursor-default items-center gap-1 p-1 leading-none w-full h6 hover:bg-black3 border border-b-1 border-black-3 border-x-0 border-t-0 px-2
            "
              >
                Is it accessible?
                <ChevronDownIcon
                  className="group-data-[state=open]:rotate-180 transition duration-300"
                  aria-hidden
                />
              </Accordion.Trigger>
              <Accordion.Content className="px-2 py-1 bg-black-2">
                Yes. It adheres to the WAI-ARIA design pattern.
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </Tabs.Content>
        <Tabs.Content
          value="tab2"
          className="border border-black-3 rounded-1 rounded-t-none p-1 code-container"
        >
          <SyntaxHighlighter code={code} language={"jsx"} />
        </Tabs.Content>
      </Tabs.Root>
    </Section>
  );
};

export default AccordionDemo;
