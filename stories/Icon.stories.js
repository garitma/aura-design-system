import React from "react";

import Icon from "../src/atoms/icon";
import "../stylus/style.css";

export default {
  title: "Atoms/Icon",
  component: Icon
};

const Template = args => <Icon {...args} />;

export const Sprite = Template.bind({});
Sprite.args = {
  sprite: "search"
};
