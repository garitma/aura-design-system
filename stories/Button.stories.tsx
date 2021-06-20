import React from "react"
import { Story, Meta } from '@storybook/react';

import SpriteProvider from "../packages/provider/spriteProvider"
import Button, {ButtonProps} from "../packages/atoms/button"

export default {
  title: "Atoms/Button",
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = args => (
  <SpriteProvider>
    <Button {...args} />
  </SpriteProvider>
)

export const Fill = Template.bind({})
Fill.args = {
  label: "Button fill",
  mode: "fill",
}

export const Pill = Template.bind({})
Pill.args = {
  label: "Button pill",
  mode: "pill",
}

export const Link = Template.bind({})
Link.args = {
  label: "Button link",
  mode: "link",
}

export const Fluid = Template.bind({})

Fluid.args = {
  label: "Button fill fluid",
  mode: "fill",
  isFluid: true,
}

export const Hyperlink = Template.bind({})

Hyperlink.args = {
  href: "#",
  label: "This is an Anchor",
  mode: "fill",
}
