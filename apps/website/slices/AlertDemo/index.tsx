import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Section from "@/components/ui/Section";
import CodePreviewTabs from "@/components/common/CodePreviewTabs";
import Component, { importString } from "./Component";
import { generateComponentCode } from "@/utils/data-view";

/**
 * Props for `AlertDemo`.
 */
export type AlertDemoProps = SliceComponentProps<Content.AlertDemoSlice>;

/**
 * Component for "AlertDemo" Slices.
 */
const AlertDemo: FC<AlertDemoProps> = ({ slice }) => {
  
  const code = generateComponentCode(Component, {
    name: "AlertDemo",
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

export default AlertDemo;
