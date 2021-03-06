import React from "react"
import sprite from "../static/sprite_glyphs.png"
import spriteDark from "../static/sprite_glyphs.png"

export default function CenterView({ children, isDark }) {
  return (
    <div style={{ "--aura-sprite": `url(/${isDark ? spriteDark : sprite})` }}>
      {children}
    </div>
  )
}
