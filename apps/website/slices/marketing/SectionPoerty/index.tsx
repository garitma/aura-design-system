import React from "react";
import { PrismicRichText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import Section from "@aura-design/system/section";
import Grid from "@aura-design/system/grid";
import Button from "@aura-design/system/button";
import { PrismicNextImage } from "@prismicio/next";

import Link from "@/components/Link";

/**
 * @typedef {import("@prismicio/client").Content.SectionPoertySlice} SectionPoertySlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SectionPoertySlice>} SectionPoertyProps
 * @param { SectionPoertyProps }
 */
const SectionPoerty = ({ slice }) => (
  <Section container="smash" color="blue" className="centertxt">
    {slice.primary.title && (
      <h3 className="mb13">{prismicH.asText(slice.primary.title)}</h3>
    )}
    {slice.primary.description && (
      <div className="smosh mb13">
        <PrismicRichText field={slice.primary.description} />
      </div>
    )}

    {slice.primary.image && (
      <div className="mod-media">
        <PrismicNextImage field={slice.primary.image} layout="responsive" />
      </div>
    )}

    <div className="pad">
      {slice.primary.caption && (
        <p className="mb13">{prismicH.asText(slice.primary.caption)}</p>
      )}

      {slice.primary.button_label && (
        <Link field={slice.primary?.button_link} passHref>
          <Button>{slice.primary.button_label}</Button>
        </Link>
      )}
    </div>
  </Section>
);

export default SectionPoerty;
