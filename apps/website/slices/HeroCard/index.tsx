import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

import Section from "@/components/Section";
import Button from "@/components/ui/Button";


import Orbiting from "@/components/Orbiting";

/**
 * Props for `HeroCard`.
 */
export type HeroCardProps = SliceComponentProps<Content.HeroCardSlice>;

/**
 * Component for "HeroCard" Slices.
 */
const HeroCard = ({ slice }: HeroCardProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Orbiting />
      <div>
        <div className="flex flex-col">
          {isFilled.richText(slice.primary.title) && (
            <PrismicRichText field={slice.primary.title} />
          )}
          {isFilled.richText(slice.primary.description) && (
            <PrismicRichText field={slice.primary.description} />
          )}
        </div>

        {isFilled.link(slice.primary.button_link) && (
          <PrismicNextLink field={slice.primary.button_link}>
            <Button className="w-full md:w-auto" as="span">
              {slice.primary.button_link.text}
            </Button>
          </PrismicNextLink>
        )}
      </div>
    </Section>
  );
};

export default HeroCard;
