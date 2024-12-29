import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Section from "@aura-design/system/section";
import Grid from "@aura-design/system/grid";
import { InView } from "@/lib/motion-primitives/components/InView";

/**
 * Props for `ImageTextBlock`.
 */
export type ImageTextBlockProps =
  SliceComponentProps<Content.ImageTextBlockSlice>;

/**
 * Component for "ImageTextBlock" Slices.
 */
const ImageTextBlock = ({ slice }: ImageTextBlockProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <InView>
        <Grid col="two">
          <div className="valign p-1">
            {isFilled.richText(slice.primary.title) && (
              <PrismicRichText field={slice.primary.title} />
            )}
            {isFilled.richText(slice.primary.description) && (
              <PrismicRichText field={slice.primary.description} />
            )}
          </div>
          <div className="text-center">
            {isFilled.image(slice.primary.image) && (
              <PrismicNextImage field={slice.primary.image} />
            )}
          </div>
        </Grid>
      </InView>
    </Section>
  );
};

export default ImageTextBlock;
