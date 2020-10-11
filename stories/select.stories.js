import React from "react";

import { Select } from "../src";
import "../css/style.css";

export default {
  title: "Atoms/Select",
  component: Select,
};

const Template = (args) => <Select {...args} />;

export const Naked = Template.bind({});

Naked.args = {};

export const withPlaceholder = Template.bind({});

withPlaceholder.args = {
  placeholder: "Select with placeholder"
};

export const withOption = Template.bind({});

withOption.args = {
  placeholder: "Select with options",
  options: [["key", "value"], ["key", "value2"], ["key", "value3"], ["key", "value3"]]
};

export const withDialog = Template.bind({});

withDialog.args = {
  placeholder: "Select with options",
  options: [["key", "value"], ["key2", "value2"], ["key3", "value3"]],
  dialog: "⚠️ Oooops, something happened text"
};