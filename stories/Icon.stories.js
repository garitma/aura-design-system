import React from "react"

import Icon from "../packages/atoms/icon"
import SpriteProvider from "../packages/provider/spriteProvider"

export default {
  title: "Atoms/Icon",
  component: Icon,
}

const Template = args => (
  <SpriteProvider>
    <Icon {...args} />
  </SpriteProvider>
)

export const Sprite = Template.bind({})
Sprite.args = {
  sprite: "search",
}
