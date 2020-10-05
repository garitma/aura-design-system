import React from "react";

import { Icon } from "../aura-design-system";
import "../aura-design-system/css/style.css";

export default {
  title: "Atoms/Icon",
  component: Icon,
};

const Template = (args) => <Icon {...args} />;

export const Sprite = Template.bind({});
Sprite.args = {
  sprite: "search",
};
