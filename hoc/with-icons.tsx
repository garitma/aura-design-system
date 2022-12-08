import { SharedBasic } from "../types/global";
import glyphs from "../static/sprite_glyphs-v2.png"



const withIcons = ({ children }: SharedBasic) => {
  const auraSprite : any = { ["--aura-sprite"]: `url(${glyphs})` };

  return <div style={auraSprite}>{children}</div>;
};

export default withIcons;
