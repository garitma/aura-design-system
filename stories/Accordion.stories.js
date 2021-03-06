import React from "react"

import Accordion from "../packages/molecules/accordion"
import SpriteProvider from "../packages/provider/spriteProvider"

export default {
  title: "Molecules/Acordion",
  component: Accordion,
}

const Template = args => (
  <SpriteProvider>
    <Accordion {...args} />
  </SpriteProvider>
)

export const Basic = Template.bind({})
Basic.args = {
  title: "According",
}

export const withDescription = Template.bind({})
withDescription.args = {
  title: "According",
  content:
    "Posponer el amor como la alarma que abres y luego la pospones indefinidamente hasta que es muy tarde.",
}
