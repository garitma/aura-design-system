import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";

/**
 * Props for `ChipsBlock`.
 */
export type ChipsBlockProps = SliceComponentProps<Content.ChipsBlockSlice>;

/**
 * Component for "ChipsBlock" Slices.
 */
const ChipsBlock: FC<ChipsBlockProps> = ({ slice }) => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      container="smash"
    >
      <div className="flex flex-wrap gap-1">
        {slice.primary.chips.map((item) => (
          <div key={item.key}>
            <PrismicNextLink field={item}>
              <Button mode="pill" as="span" className="rounded-full" size="small">
                {item.text}

                <ExternalLinkIcon className="icon ml-0.5"/>
              </Button>
            </PrismicNextLink>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default ChipsBlock;
