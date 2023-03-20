import React from "react";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Section from "@aura-design/system/section";
import { Content } from "@prismicio/client";

type SectionHeadingProps = SliceComponentProps<Content.SectionHeadingSlice>;

const SectionHeadingProps = ({ slice }: SectionHeadingProps) => {
  const alignResolver: { [key: string]: string } = {
    "center-text": "centertxt",
    "left-text": "lefttxt",
    "right-text": "righttxt",
  };

  const subClassNameConnect: string[] = [];

  if (slice.primary.align) {
    subClassNameConnect.push(alignResolver[slice.primary.align]);
  }

  return (
    <Section
      color={slice.primary.color || "white"}
      subClassName={subClassNameConnect.join(" ").trim()}
    >
      {slice.primary.title ? (
        <PrismicRichText field={slice.primary.title} />
      ) : null}
      {slice.primary.description ? (
        <PrismicRichText field={slice.primary.description} />
      ) : null}
    </Section>
  );
};

export default SectionHeadingProps;
