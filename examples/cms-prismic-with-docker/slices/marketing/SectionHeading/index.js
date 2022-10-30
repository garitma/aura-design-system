import React from "react";
import { PrismicRichText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import Section from "aura-design/section";

const HeroSectionSplit = ({ slice }) => (
  <Section color={slice.primary.color} subClassName={slice.primary.align}>
    {slice.primary.title && <PrismicRichText field={slice.primary.title} />}
    {slice.primary.description && (
      <PrismicRichText field={slice.primary.description} />
    )}
  </Section>
);

export default HeroSectionSplit;
