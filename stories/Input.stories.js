import React from "react"

import Input from "../packages/atoms/input.tsx"
import SpriteProvider from "../packages/provider/spriteProvider"

export default {
  title: "Atoms/Input",
  component: Input,
}

const Template = args => (
  <SpriteProvider>
    <Input {...args} />
  </SpriteProvider>
)

export const WithPlaceholder = Template.bind({})

WithPlaceholder.args = {
  placeholder: "Placeholder",
}

export const WithDialog = Template.bind({})

WithDialog.args = {
  placeholder: "Placeholder",
  isHelping: true,
  helpText: "⚠️ Oooops, something happened text",
}

export const WithOutLabel = Template.bind({})

WithOutLabel.args = {
  placeholder: "With out label",
  isLabelable: false,
}

export const WithIcon = Template.bind({})

WithIcon.args = {
  placeholder: "your@email.com",
  leftIcon: "mail",
  isLabelable: false,
}
