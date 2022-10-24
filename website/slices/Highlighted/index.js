import React from "react";
import * as prismicH from "@prismicio/helpers";
import { PrismicRichText } from "@prismicio/react";

const Highlighted = ({ slice }) => (
  <div className="mod aura warning warning-text">
    <div>
      <b>{prismicH.asText(slice?.primary?.title || [])}</b>
    </div>
    <PrismicRichText field={slice?.primary?.description} />
  </div>
);

export default Highlighted;
