import React from "react";
import Grid from "@aura-design/system/grid";

export const withOneColumns = () => (
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

export const withTwoColumns = () => (
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

export const withThreeColumns = () => (
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

export const withFourColumns = () => (
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

export const withColumnsReverse = () => (
  <Grid col="two" className="reverse">
    <div className="pad bg-black-4 one">1</div>
    <div className="pad bg-black-4 two">2</div>
  </Grid>
);

export const withSpan = () => (
  <Grid col="twelve">
    <div className="pad bg-black-4 span-6">span-6</div>
    <div className="pad bg-black-4 span-3">span-3</div>
    <div className="pad bg-black-4 span-2">span-2</div>
    <div className="pad bg-black-4 span-1">span-1</div>
  </Grid>
);
