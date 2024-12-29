import { Content, isFilled, asText } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import Section from "@aura-design/system/section";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { CodeIcon } from "@radix-ui/react-icons";

import { InView } from "@/lib/motion-primitives/components/InView";
import { TextEffect } from "@/lib/motion-primitives/components/TextEffect";
import Button from "@aura-design/system/button";
import Grid from "@aura-design/system/grid";
import Link from "next/link";

/**
 * Props for `HeroBanner`.
 */
export type HeroBannerProps = SliceComponentProps<Content.HeroBannerSlice>;

/**
 * Component for "HeroBanner" Slices.
 */
const HeroBanner = ({ slice }: HeroBannerProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      container="smosh"
    >
      {isFilled.richText(slice.primary.title) && (
        <PrismicRichText field={slice.primary.title} />
      )}
      {isFilled.richText(slice.primary.description) && (
        <div className="content">
        <PrismicRichText field={slice.primary.description} />
        </div>
      )}
      {isFilled.link(slice.primary.button_link) && (
        <div className="md:flex md:flex-wrap items-center">
          <PrismicNextLink field={slice.primary.button_link}>
            <Button as="span" className="w-full md:w-auto" label={slice.primary.button_link.text} />
          </PrismicNextLink>
          <pre className="border-solid border border-accents-3 md:ml-1 p-1 h-4 rounded text-center"><CodeIcon className="icon"/> pnpm i @aura-design/system</pre>
        </div>
      )}
      {isFilled.image(slice.primary.image) && (
        <div className="text-center">
          <PrismicNextImage field={slice.primary.image} />
        </div>
      )}
    </Section>
  );
};

export default HeroBanner;
