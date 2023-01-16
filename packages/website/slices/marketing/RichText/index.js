import React from "react";
import { PrismicRichText } from "@prismicio/react";

const RichText = ({ slice }) => {
  return (
    <div>
      <PrismicRichText field={slice.primary.rich_text} />
    </div>
  );
};

export default RichText;
