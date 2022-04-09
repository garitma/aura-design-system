import { SharedBasic } from "../types/global";
const sprite = require("../static/sprite_glyphs-v2.png");



const withIcons = ({ children }: SharedBasic) => {
  const auraSprite : any = { ["--aura-sprite"]: `url(/${sprite})` };

  return <div style={auraSprite}>{children}</div>;
};

export default withIcons;
