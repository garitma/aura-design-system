import { JSX } from "react";
import { Content, asText } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import Section from "@/components/ui/Section";
import SyntaxHighlighter from "@/components/SyntaxHighlighter";

/**
 * Props for `CodeBlock`.
 */
export type CodeBlockProps = SliceComponentProps<Content.CodeBlockSlice>;

/**
 * Component for "CodeBlock" Slices.
 */
const CodeBlock = ({ slice }: CodeBlockProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      container="smash"
      className="max-w-[100vw] p-0"
    >
      <SyntaxHighlighter
        code={asText(slice.primary.code)}
        language={slice.primary.language}
        collapsible={slice.primary.is_collapsible}
      />
    </Section>
  );
};

export default CodeBlock;
