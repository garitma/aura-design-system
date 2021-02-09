import React from "react";

import { Section } from "../src/layout/section";
import "../stylus/style.css";

export default {
  title: "Layout/Section",
  component: Section,
};

const Template = (args) => (
  <Section {...args}>
    <p>
      This is a long child. Lorem ipsum dolor sit amet, consectetur adipiscing
      elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
      sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
      mollit anim id est laborum.
    </p>
  </Section>
);

export const defaultConfig = Template.bind({});

export const withColor = Template.bind({});
withColor.args = {
  color: "blue",
};

export const withContainer = Template.bind({});
withContainer.args = {
  color: "purple",
  container: "smish",
};

export const withSpacingOption = Template.bind({});

withSpacingOption.args = {
  color: "teal-green",
  space: "aura",
};
