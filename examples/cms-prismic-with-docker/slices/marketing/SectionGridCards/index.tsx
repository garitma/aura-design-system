import React from "react";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { Content } from "@prismicio/client";
import Section from "@aura-design/system/section";
import Grid from "@aura-design/system/grid";

type SectionGridCardsSlice = SliceComponentProps<Content.SectionGridCardsSlice>;

/**
 * @typedef {import("@prismicio/client").Content.SectionGridCardsSlice} SectionGridCardsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SectionGridCardsSlice>} SectionGridCardsProps
 * @param { SectionGridCardsProps }
 */
const SectionGridCards = ({ slice }: SectionGridCardsSlice) => {
  
  return (
    <Section color={slice.primary.color ? slice.primary.color : undefined}>
      <Grid col={slice.primary.columns ? slice.primary.columns : "three"}>
        {slice.items.map(
          (
            item: Content.SectionGridCardsSliceDefaultItem | any,
            index: number
          ) => {
            return (
              <a
                href={item.link.url}
                target="_blank"
                className="mod"
                key={`${slice.id}_${index}`}
              >
                <div className="mod-detail">
                  <h3 className="mod-title mb0">
                    {prismicH.asText(item.title)}{" "}
                    <i className="icon arrowAltRigth" />
                  </h3>
                  <p>{prismicH.asText(item.description)}</p>
                </div>
              </a>
            );
          }
        )}
      </Grid>
    </Section>
  );
};

export default SectionGridCards;
