import React from "react";

import { Input } from "..";
import "../css/style.css";

export default {
  title: "Atoms/Input",
  component: Input,
};

const Template = (args) => <Input {...args} />;

export const Naked = Template.bind({});

Naked.args = {};

export const WithPlaceholder = Template.bind({});

WithPlaceholder.args = {
  placeholder: "Placeholder",
};

export const WithOutLabel = Template.bind({});

WithOutLabel.args = {
  placeholder: "With out label",
  label: false,
};

export const WithIcon = Template.bind({});

WithIcon.args = {
  placeholder: "With icon",
  icon: "heart-fill",
};
