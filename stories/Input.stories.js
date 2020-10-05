import React from "react";

import { Input } from "../aura-design-system";
import "../aura-design-system/css/style.css";

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

export const withPlaceholder = Template.bind({});

withPlaceholder.args = {
  placeholder: "With placeholder",
};
