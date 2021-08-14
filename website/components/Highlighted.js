import { RichText } from "prismic-reactjs";

const Highlighted = ({ doc, ...props }) => {
  return (
    <div className="mod  aura warning warning-text" {...props}>
      <b>{RichText.asText(doc?.primary?.highlight_title || [])}</b>
      {RichText.render(doc?.primary?.highlight_text || [])}
    </div>
  );
};

export default Highlighted;
