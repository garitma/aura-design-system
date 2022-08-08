import { PrismicRichText } from "@prismicio/react";

const RichContent = ({ doc, ...props }) => {
  return (
    <div className="ulinea" {...props}>
      <PrismicRichText field={doc?.primary?.rich_text} />
    </div>
  );
};

export default RichContent;
