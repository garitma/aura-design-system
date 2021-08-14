
import React from "react"

import { Story, Meta } from "@storybook/react";

import Input, { InputProps } from "../atoms/input";
import WithIcons from "../hoc/WithIcons.js";

export default {
  title: "Atoms/Input",
  component: Input,
} as Meta


const Template: Story<InputProps> = (args) => (
    <WithIcons>
      <Input {...args} />
    </WithIcons>
  );


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

export const WithRightIcon = Template.bind({})

WithRightIcon.args = {
  placeholder: "password",
  leftIcon: "key",
  rightIcon: "view",
  onClickRightIcon: () => {}
}