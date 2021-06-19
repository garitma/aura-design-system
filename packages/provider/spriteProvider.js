import React from "react"
import sprite from "../static/sprite_glyphs-v2.png"

export default function CenterView({ children }) {
  return <div style={{ "--aura-sprite": `url(/${sprite})` }}>{children}</div>
}
