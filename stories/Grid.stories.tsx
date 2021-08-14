import React from "react";

import { Story, Meta } from "@storybook/react";

import Grid, {GridProps} from "../layout/grid";

export default {
  title: "Layout/Grid",
  component: Grid,
  argTypes: {
    col: {
      options: ["one" , "two" , "three" , "fourd" , "five" , "six" , "box" , "box-2" , "blog" , "docs" , "field" , "tag"],
      control: { type: "select" },
    },
  },
} as Meta;


const Template: Story<GridProps> = (args) => (
    <Grid {...args}>
        <div className="pad blue" />
        <div className="pad blue" />
        <div className="pad blue" />
        <div className="pad blue" />
        <div className="pad blue" />
        <div className="pad blue" />
        <div className="pad blue" />
        <div className="pad blue" />
    </Grid>
  );
  
  export const defaultConfig = Template.bind({});

  export const fixedGrid = Template.bind({});

  fixedGrid.args = {
    isFixed: true
  }
  
  