import React from "react";
import { PrismicRichText } from "@prismicio/react";
import Icon from "aura-design/icon";
import Highlight from "react-highlight";
import useClipboard from "react-use-clipboard";
import * as prismicH from "@prismicio/helpers";

const CodeBox = ({ slice }) => {
  const [isCopied, setCopied] = useClipboard(
    prismicH.asText(slice?.primary?.code_snippet || []),
    {
      successDuration: 1300,
    }
  );
  return (
    <div className="anchor">
      <div className="aura" />
      <Highlight
        className={`aura iAWriterMonoS ${slice?.primary?.languaje?.toLowerCase()}`}
      >
        {prismicH.asText(slice?.primary?.code_snippet || [])}
      </Highlight>
      <div className="pin left right top aura hljs-header righttxt">
        <span className="wall-pad pin left">
          <span className="halo warning warning-text wall-pad ">
            {slice?.primary?.languaje}
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
