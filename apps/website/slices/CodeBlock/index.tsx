import { Content, asText } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import Section from "@/components/ui/Section";
import SyntaxHighlighter from "@/components/SyntaxHighlighter"


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
      className="py-0"
    >
      <div className="overflow-x-auto">
        <div className="min-w-0 w-full">
          <SyntaxHighlighter code={asText(slice.primary.code)} language={slice.primary.language} />
        </div>
      </div>
    </Section>
  );
};

export default CodeBlock;
