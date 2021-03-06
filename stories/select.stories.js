import React from "react"

import Select from "../packages/atoms/select"
import SpriteProvider from "../packages/provider/spriteProvider"

export default {
  title: "Atoms/Select",
  component: Select,
}

const Template = args => (
  <SpriteProvider>
    <Select {...args}>
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
      <option value="Option 3">Option 3</option>
    </Select>
  </SpriteProvider>
)

export const Naked = Template.bind({})

Naked.args = {}

export const WithPlaceholder = Template.bind({})

WithPlaceholder.args = {
  placeholder: "Select option",
}

export const WithDialog = Template.bind({})

WithDialog.args = {
  isHelping: true,
  helpText: "⚠️ Oooops, something happened text",
}
