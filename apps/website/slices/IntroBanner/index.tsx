import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Section from "@aura-design/system/section";
import Grid from "@aura-design/system/grid";
import { InView } from "@/lib/motion-primitives/components/InView";
import { PrismicNextImage } from "@prismicio/next";
import { TextEffect } from "@/lib/motion-primitives/components/TextEffect";
import { Fragment } from "react";

/**
 * Props for `IntroBanner`.
 */
export type IntroBannerProps = SliceComponentProps<Content.IntroBannerSlice>;

/**
 * Component for "IntroBanner" Slices.
 */
const IntroBanner = ({ slice }: IntroBannerProps): JSX.Element => {

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      container="smash"
      className="min-h-[50vh] valign adobe-garamond-pro intro-banner h3 mt-3"
    >
      <InView viewOptions={{ margin: "0px 0px -50px 0px" }}>
        <div className="flex flex-wrap items-center justify-center">
          {isFilled.richText(slice.primary.description) &&
            slice.primary.description.map((item, index) => {
              switch (item.type) {
                case "paragraph":
                  return (
                    <Fragment key={index}>
                      {item.text.split(" ").map((char, i) => (
                        <span key={`${index}-${i}`} className="whitespace-pre-wrap mr-0.5">{char}</span>
                      ))}
                    </Fragment>
                  );
                case "image":
                  return (
                    <span className="mx-0.5">
                      <PrismicNextImage key={index} field={item} />
                    </span>
                  );
                default:
                  return null;
              }
            })}
        </div>
      </InView>
    </Section>
  );
};

export default IntroBanner;
