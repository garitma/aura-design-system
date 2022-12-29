import { useState, useRef, useCallback, Fragment } from "react";
import sanitizeHtml from "sanitize-html";
import Highlight, { defaultProps } from "prism-react-renderer";
import { useEditable } from "use-editable";

import auraVC from "prism.theme.aura-vc";

const SandboxCode = () => {
  const editorRef = useRef(null);
  const [code, setCode] = useState(`<!--
  Welcome to Aura Design Play, the official Aura Design playground!

  Everything here works just as vanilla html and css.
  
  Feel free to play with this example.
-->

<section class="vfluid  valign blue pad">
    <div class="mod">
      <div class="mod-detail">
        <h3>Card example</h3>
        <p>This is an playground</p>
      </div>
    </div>
</section>`);

  const clean = sanitizeHtml(code, {
    allowedAttributes: {
      "*": ["class"],
      a: ["href", "name", "target"],
      img: ["src"],
      allowedSchemes: ["http", "https"],
    },
  });

  const onEditableChange = useCallback((code) => {
    setCode(code.slice(0, -1));
  }, []);

  useEditable(editorRef, onEditableChange, {
    disabled: false,
    indentation: 2,
  });

  return (
    <>
      <div className="fluid vfluid blue">
        <Highlight {...defaultProps} theme={auraVC} code={code} language="html">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={[className, "vfluid", "m0", "pad"].join(" ").trim()}
              style={style}
              ref={editorRef}
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
      <div
        className="fluid vfluid"
        dangerouslySetInnerHTML={{ __html: clean }}
      />
    </>
  );
};

export default SandboxCode;
