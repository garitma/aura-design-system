import React from "react";
import { PrismicRichText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import Section from "@aura-design/system/section";
import Grid from "@aura-design/system/grid";
import Button from "@aura-design/system/button";
import { PrismicNextImage } from "@prismicio/next";

import Link from "@/components/Link";

/**
 * @typedef {import("@prismicio/client").Content.BannerSlice} BannerSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BannerSlice>} BannerProps
 * @param { BannerProps }
 */
const Banner = ({ slice }) => (
  <Section container="smash" color="teal-green">
    <Grid col="two" className="reverse">
      <div className="one">
        {slice.primary.title && <h2>{prismicH.asText(slice.primary.title)}</h2>}
        {slice.primary.sub_title && (
          <h3 className="light">{prismicH.asText(slice.primary.sub_title)}</h3>
        )}

        {slice.primary.description && (
          <p>{prismicH.asText(slice.primary.description)}</p>
        )}
        {slice.primary.button_label && (
          <Link field={slice.primary.button_link} passHref>
            <Button>{slice.primary.button_label}</Button>
          </Link>
        )}
      </div>

      {slice.primary.image && (
        <div className="valign mod-media two">
          <PrismicNextImage
            field={slice.primary.image}
            width={250}
            height={250}
          />
        </div>
      )}
    </Grid>
  </Section>
);

export default Banner;
