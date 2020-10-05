import React from "react";

import { Button } from "../aura-design-system";
import "../aura-design-system/css/style.css";

export default {
  title: "Atoms/Button",
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Fill = Template.bind({});
Fill.args = {
  type: "button",
  label: "Button fill",
  mode: "fill",
};

export const Pill = Template.bind({});
Pill.args = {
  type: "button",
  label: "Button pill",
  mode: "pill",
};

export const Link = Template.bind({});
Link.args = {
  type: "button",
  label: "Button link",
  mode: "link",
};

export const Fluid = Template.bind({});

Fluid.args = {
  type: "button",
  label: "Button fill fluid",
  mode: "fill",
  fluid: true,
};

export const Hyperlink = Template.bind({});

Hyperlink.args = {
  type: "link",
  label: "Button fill Hyperlink",
  mode: "fill",
};
