import React from "react";
const sprite = require("../static/sprite_glyphs-v2.png");



const withIcons = ({ children }) => {
  const auraSprite : any = { ["--aura-sprite"]: `url(/${sprite})` };

  return <div style={auraSprite}>{children}</div>;
};

export default withIcons;
