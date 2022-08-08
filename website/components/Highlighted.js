import * as prismicH from "@prismicio/helpers";
import { PrismicRichText } from "@prismicio/react";

const Highlighted = ({ doc, ...props }) => {
  return (
    <div className="mod  aura warning warning-text" {...props}>
      <div><b>{prismicH.asText(doc?.primary?.highlight_title || [])}</b></div>
      <PrismicRichText field={doc?.primary?.highlight_text} />
    </div>
  );
};

export default Highlighted;
