import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import { generateComponentCode } from "@/utils/data-view";
import Section from "@/components/ui/Section";
import CodePreviewTabs from "@/components/CodePreviewTabs";
import Components, {importString} from "./Components";

/**
 * Props for `AlertDialogDemo`.
 */
export type AlertDialogDemoProps =
  SliceComponentProps<Content.AlertDialogDemoSlice>;

/**
 * Component for "AlertDialogDemo" Slices.
 */
const AlertDialogDemo: FC<AlertDialogDemoProps> = ({ slice }) => {
  
  const code = generateComponentCode(Components, {
    name: "AlertDialogDemo",
    importString,
  });

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      container="smash"
    >
      <CodePreviewTabs code={code} language={"tsx"}>
        <Components />
      </CodePreviewTabs>
    </Section>
  );
};

export default AlertDialogDemo;
