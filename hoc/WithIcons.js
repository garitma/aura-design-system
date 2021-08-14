import React from "react";
import sprite from "../static/sprite_glyphs-v2.png";

const withIcons = ({ children }) => {
  const auraSprite = { ["--aura-sprite"]: `url(/${sprite})` };

  return <div style={auraSprite}>{children}</div>;
};

export default withIcons;
