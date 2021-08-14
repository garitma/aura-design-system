import React from "react";

import { Story, Meta } from "@storybook/react";

import Select, { SelectProps } from "../atoms/select";
import WithIcons from "../hoc/WithIcons.js";

export default {
  title: "Atoms/Select",
  component: Select,
} as Meta;

const Template: Story<SelectProps> = (args) => (
  <WithIcons>
    <Select {...args}>
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
      <option value="Option 3">Option 3</option>
    </Select>
  </WithIcons>
);


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
