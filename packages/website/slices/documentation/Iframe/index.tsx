import React from "react";
import Section from "@aura-design/system/section";

/**
 * @typedef {import("@prismicio/client").Content.IframeSlice} IframeSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<IframeSlice>} IframeProps
 * @param { IframeProps }
 */
const Iframe = ({ slice }) => (
  <iframe
    className="fluid b0"
    height="60"
    src="https://ladle.auradesignsystem.com/?mode=preview&story=button--button-fluid"
  ></iframe>
);

export default Iframe;
