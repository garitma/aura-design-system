import React from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import * as prismicH from "@prismicio/helpers";
import Section from "@aura-design/system/section";
import Button from "@aura-design/system/button";

import Link from "@/components/Link";


/**
 * @typedef {import("@prismicio/client").Content.HeroBannerSlice} HeroBannerSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HeroBannerSlice>} HeroBannerProps
 * @param { HeroBannerProps }
 */
const HeroBanner = ({ slice }) => (
  <Section container="smash" color="purple" className="centertxt">
    {slice.primary.title && <h1>{prismicH.asText(slice.primary.title)}</h1>}
    {slice.primary.description && (
      <p>{prismicH.asText(slice.primary.description)}</p>
    )}
    {slice.primary.button_label &&  <Link field={slice.primary.button_link} passHref><Button>{slice.primary.button_label}</Button></Link>}
    {slice.primary.image && (
      <div className="mod-media">
        <PrismicNextImage
          field={slice.primary.image}
          width={250}
          height={250}
        />
      </div>
    )}
  </Section>
);

export default HeroBanner;
