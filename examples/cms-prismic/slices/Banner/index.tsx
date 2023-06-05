import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

import Section from "@aura-design/system/section";
import Button from "@aura-design/system/button";

/**
 * Props for `Banner`.
 */
export type BannerProps = SliceComponentProps<Content.BannerSlice>;

/**
 * Component for "Banner" Slices.
 */
const Banner = ({ slice }: BannerProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="centertxt"
      color="blue"
    >
      <div>
        <PrismicRichText field={slice.primary.title} />
      </div>
      <div className="mt-1">
        <PrismicNextImage field={slice.primary.image} />
      </div>
      <div>
        <PrismicNextLink
          field={slice.primary.button_link}
          passHref
          legacyBehavior
        >
          <Button label={slice.primary.button_label} />
        </PrismicNextLink>
      </div>
    </Section>
  );
};

export default Banner;
