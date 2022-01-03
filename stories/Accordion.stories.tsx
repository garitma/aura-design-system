import React from "react";

import { Story, Meta } from "@storybook/react";

import Accordion, { AccordionProps } from "../molecules/accordion";
import WithIcons from "../hoc/WithIcons.js";

export default {
  title: "Molecule/Accordion",
  component: Accordion,
  argTypes: {},
} as Meta;

const Template: Story<AccordionProps> = (args) => (
    <Accordion {...args} >
      Posponer el amor como la alarma que abres y luego la pospones
      indefinidamente hasta que es muy tarde.
    </Accordion>
);

export const defaultConfig = Template.bind({});

defaultConfig.args = {
  title: "Default Config",
};

export const withHeadline = Template.bind({});

withHeadline.args = {
  headline: "h2",
  title: "With Headline",
};
