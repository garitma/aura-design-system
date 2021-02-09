import React from "react";

import { Input } from "../src/atoms/input";
import "../stylus/style.css";

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

export const WithDialog = Template.bind({});

WithDialog.args = {
  placeholder: "Placeholder",
  dialog: true,
  dialogMessage: "⚠️ Oooops, something happened text",
};

export const WithOutLabel = Template.bind({});

WithOutLabel.args = {
  placeholder: "With out label",
  label: false,
};

export const WithIcon = Template.bind({});

WithIcon.args = {
  placeholder: "Instagram username",
  icon: "instagram",
};
