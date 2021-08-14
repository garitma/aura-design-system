import Icon from "aura-design/icon";
import Highlight from "react-highlight";
import useClipboard from "react-use-clipboard";
import { RichText } from "prismic-reactjs";

const CodeBox = ({ doc, ...props }) => {
  const [isCopied, setCopied] = useClipboard(
    RichText.asText(doc?.primary?.code_snippet || []),
    {
      successDuration: 1300,
    }
  );

  return (
    <div className="anchor" {...props}>
      <div className="aura" />
      <Highlight
        className={`aura iAWriterMonoS ${doc?.primary?.languaje.toLowerCase()}`}
      >
        {RichText.render(doc?.primary?.code_snippet || [])}
      </Highlight>
      <div className="pin left right top aura hljs-header righttxt">
        <span className="wall-pad pin left">
          <span className="halo warning warning-text wall-pad ">
            {doc?.primary?.languaje}
          </span>
        </span>
        <a onClick={setCopied}>
          <Icon sprite="copy" className="dark before" />{" "}
          <span className="white-text">{isCopied ? "Copied!" : "Copy"}</span>
        </a>
      </div>
    </div>
  );
};

export default CodeBox;
