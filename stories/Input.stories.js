import React from "react";

import { Input } from "..";
import "../css/style.css";

export default {
  title: "Atoms/Input",
  component: Input,
};

const Template = (args) => (
  <form className="inputer">
    <Input {...args} />
  </form>
);

export const Naked = Template.bind({});

Naked.args = {};

export const WithPlaceholder = Template.bind({});

WithPlaceholder.args = {
  placeholder: "Placeholder",
};

export const WithIcon = Template.bind({});

WithIcon.args = {
  placeholder: "With icon and with place holder",
  icon: "heart-fill",
};
