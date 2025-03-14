import React from "react";
import Grid from "@aura-design/system/grid";
import type { Story } from "@ladle/react";

export const withOneColumns: Story = () => (
  <Grid col="one">
    <div className="pad bg-black-4" />
    <div className="pad bg-black-4" />
    <div className="pad bg-black-4" />
    <div className="pad bg-black-4" />
    <div className="pad bg-black-4" />
    <div className="pad bg-black-4" />
    <div className="pad bg-black-4" />
    <div className="pad bg-black-4" />
  </Grid>
);

export const withTwoColumns: Story = () => (
  <Grid col="two">
    <div className="pad bg-black-4" />
    <div className="pad bg-black-4" />
    <div className="pad bg-black-4" />
    <div className="pad bg-black-4" />
    <div className="pad bg-black-4" />
    <div className="pad bg-black-4" />
    <div className="pad bg-black-4" />
    <div className="pad bg-black-4" />
  </Grid>
);

export const withThreeColumns: Story = () => (
  <Grid col="three">
    <div className="pad bg-black-4" />
    <div className="pad bg-black-4" />
    <div className="pad bg-black-4" />
    <div className="pad bg-black-4" />
    <div className="pad bg-black-4" />
    <div className="pad bg-black-4" />
    <div className="pad bg-black-4" />
    <div className="pad bg-black-4" />
  </Grid>
);

export const withFourColumns: Story = () => (
  <Grid col="four">
    <div className="pad bg-black-4" />
    <div className="pad bg-black-4" />
    <div className="pad bg-black-4" />
    <div className="pad bg-black-4" />
    <div className="pad bg-black-4" />
    <div className="pad bg-black-4" />
    <div className="pad bg-black-4" />
    <div className="pad bg-black-4" />
  </Grid>
);

export const withColumnsReverse: Story = () => (
  <Grid col="two" className="reverse">
    <div className="pad bg-black-4 one">1</div>
    <div className="pad bg-black-4 two">2</div>
  </Grid>
);

export const withSpan: Story = () => (
  <Grid col="twelve">
    <div className="pad bg-black-4 span-6">span-6</div>
    <div className="pad bg-black-4 span-3">span-3</div>
    <div className="pad bg-black-4 span-2">span-2</div>
    <div className="pad bg-black-4 span-1">span-1</div>
  </Grid>
);
