import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import Section from "@aura-design/system/section";
import { InView } from "@/lib/motion-primitives/components/InView";

/**
 * Props for `TextBlock`.
 */
export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock = ({ slice }: TextBlockProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      container="smosh"
      className="grid gap-1"
    >
      <InView>
        <PrismicRichText field={slice.primary.content} />
      </InView>
    </Section>
  );
};

export default TextBlock;
