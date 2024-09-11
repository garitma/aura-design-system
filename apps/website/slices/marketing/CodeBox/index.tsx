import React, { Fragment } from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import { CopyIcon } from "@aura-design/system/dist/icons";
import Button from "@aura-design/system/button";
import useClipboard from "react-use-clipboard";
import * as prismicH from "@prismicio/helpers";

import auraVC from "@/prism.theme.aura-vc";

const CodeBox = ({ slice }) => {
  const [isCopied, setCopied] = useClipboard(
    prismicH.asText(slice?.primary?.code_snippet || []),
    {
      successDuration: 1300,
    }
  );
  return (
    <div className="anchor code-box mb26">
      <div className="aura" />
      <div className="pin left right top wall-pad accents-3 righttxt">
        <span className="wall-pad pin left vfluid">
          <div className="valign vfluid">
            <span className="halo warning warning-text wall-pad ">
              {slice?.primary?.languaje}
            </span>
          </div>
        </span>
        <Button onClick={setCopied} mode="menu">
          <CopyIcon className="white-text" />{" "}
          <span className="white-text wall-pad">
            {isCopied ? "Copied!" : "Copy"}
          </span>
        </Button>
      </div>
      <Highlight
        {...defaultProps}
        theme={auraVC}
        code={prismicH.asText(slice?.primary?.code_snippet)}
        language={slice?.primary?.languaje?.toLowerCase()}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={[className, "mt13", "pad", "iAWriterMonoS", "flowx"]
              .join(" ")
              .trim()}
            style={style}
          >
            {tokens.map((line, i) => (
              <Fragment key={i}>
                {line
                  .filter((token) => !token.empty)
                  .map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                {"\n"}
              </Fragment>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeBox;
