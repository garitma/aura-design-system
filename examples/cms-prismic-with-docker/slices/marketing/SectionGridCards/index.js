import React from "react";
import { PrismicRichText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import Section from "@aura-design/system/section";
import Grid from "@aura-design/system/grid";

/**
 * @typedef {import("@prismicio/client").Content.SectionGridCardsSlice} SectionGridCardsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SectionGridCardsSlice>} SectionGridCardsProps
 * @param { SectionGridCardsProps }
 */
const SectionGridCards = ({ slice }) => (
  <Section color={slice.primary.color}>
    <Grid col={slice.primary.columns}>
      {slice.items.map((item, index) => (
        <a
          href={item.link.url}
          target="_blank"
          className="mod"
          key={`${slice.id}_${index}`}
        >
          <div className="mod-detail">
            <h3 className="mod-title mb0">
              {prismicH.asText(item.title)} <i className="icon arrowAltRigth" />
            </h3>
            <p>{prismicH.asText(item.description)}</p>
          </div>
        </a>
      ))}
    </Grid>
  </Section>
);

export default SectionGridCards;
