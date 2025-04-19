import { JSX } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import { generateComponentCode } from "@/utils/data-view";
import Section from "@/components/ui/Section";
import CodePreviewTabs from "@/components/common/CodePreviewTabs";
import Component, { importString } from "./Component";

/**
 * Props for `AccordionDemo`.
 */
export type AccordionDemoProps =
  SliceComponentProps<Content.AccordionDemoSlice>;

/**
 * Component for "AccordionDemo" Slices.
 */

const AccordionDemo = ({ slice }: AccordionDemoProps): JSX.Element => {
  
  const code = generateComponentCode(Component, {
    name: "AccordionDemo",
    importString,
  });

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      container="smash"
    >
      <CodePreviewTabs code={code} language={"tsx"}>
        <Component />
      </CodePreviewTabs>
    </Section>
  );
};

export default AccordionDemo;
