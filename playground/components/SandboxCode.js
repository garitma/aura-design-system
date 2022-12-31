import { useState, useRef, useCallback, Fragment, useEffect } from "react";
import Icon from "aura-design/icon";
import sanitizeHtml from "sanitize-html";
import Highlight, { defaultProps } from "prism-react-renderer";
import { useEditable } from "use-editable";
import useClipboard from "react-use-clipboard";

import auraVC from "prism.theme.aura-vc";
import "aura-design/style.css";

const SandboxCode = () => {
  const editorHTMLRef = useRef(null);
  const editorCSSRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [view, setView] = useState("HTML");
  const [codeCSS, setCodeCSS] = useState(`  html, body {
    height: 100%
  }
  
  *:root {
      --aura-blue: #e8f7fe
  }
  `);
  const [codeHTML, setCodeHTML] = useState(`<!--
  Welcome to Aura Design Playground, the official Aura Design Playground!

  Everything here works just as vanilla html and css.
  
  Feel free to play with this example.
  -->

  <section class="vfluid valign blue pad">
    <div class="pad smosh">
        <div class="mod">
          <div class="mod-media zoom">
            <img src="https://images.prismic.io/garitma/6435685c-7367-4bad-a9f2-8d382e324954_keyvisual.png?auto=compress&fit=crop&w=1200&h=570" />
          </div>
          <div class="mod-detail">
            <h3>Card example</h3>
            <p>This is a playground description.</p>
          </div>
        </div>
      </div>
  </section>
`);
  const [isCopied, setCopied] = useClipboard(
    { HTML: codeHTML, CSS: codeCSS }[view],
    {
      successDuration: 1300,
    }
  );
  const tabs = ["HTML", "CSS"];

  useEffect(() => setIsMounted(true));

  const clean = sanitizeHtml(codeHTML, {
    allowedTags: [
      "img",
      "div",
      "a",
      "section",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "b",
      "i",
      "hr",
    ],
    allowedAttributes: {
      "*": ["class"],
      a: ["href", "name", "target"],
      img: ["src"],
      allowedSchemes: ["http", "https"],
    },
  });

  const onEditableChange = useCallback((code) => {
    setCodeHTML(code.slice(0, -1));
  }, []);

  useEditable(editorHTMLRef, onEditableChange, {
    disabled: false,
    indentation: 2,
  });

  const onEditableChangeCSS = useCallback((code) => {
    setCodeCSS(code.slice(0, -1));
  }, []);

  useEditable(editorCSSRef, onEditableChangeCSS, {
    disabled: false,
    indentation: 2,
  });

  return (
    <>
      <div className="anchor code-box">
        <div className="pin left right top wall-pad accents-4 righttxt">
          <div>
            <ul className="nav-list">
              <li>
                {tabs.map((item) => {
                  const isActive = item === view;
                  return (
                    <button
                      key={item}
                      className={`button-${
                        isActive ? "fill" : "link"
                      } not-line`}
                      onClick={() => setView(item)}
                    >
                      <span className="white-text">{item}</span>
                    </button>
                  );
                })}
              </li>
              <li>
                <button className="button-link not-line" onClick={setCopied}>
                  <Icon sprite="copy" className="dark before" />{" "}
                  <span className="white-text">
                    {isCopied ? "Copied!" : "Copy"}
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <Highlight
          {...defaultProps}
          theme={auraVC}
          code={codeHTML}
          language="html"
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={[
                className,
                "m0",
                "pad",
                "vfluid",
                "code",
                view != "HTML" ? "hidden" : "",
              ]
                .join(" ")
                .trim()}
              style={style}
              ref={editorHTMLRef}
            >
              {tokens.map((line, i) => (
                <Fragment key={i + "a"}>
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

        <Highlight
          {...defaultProps}
          theme={auraVC}
          code={codeCSS}
          language="css"
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={[
                className,
                "m0",
                "pad",
                "vfluid",
                "flow-x",
                view != "CSS" ? "hidden" : "",
              ]
                .join(" ")
                .trim()}
              style={style}
              ref={editorCSSRef}
            >
              {tokens.map((line, i) => (
                <Fragment key={i + "b"}>
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
      <div className="fluid vfluid">
        {isMounted && (
          <iframe
            srcDoc={`<link rel="stylesheet" href="/sandbox.css"/>
            <style>${codeCSS}</style>
            ${clean}
          `}
            className="fluid vfluid b0 preview"
          >
            <p>Your browser does not support iframes.</p>
          </iframe>
        )}
      </div>
    </>
  );
};

export default SandboxCode;
