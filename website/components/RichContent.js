import { RichText } from "prismic-reactjs";

const RichContent = ({ doc, ...props }) => {
  return (
    <div className="ulinea" {...props}>
      {RichText.render(doc?.primary?.rich_text || [])}
    </div>
  );
};

export default RichContent;
