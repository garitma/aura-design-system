import React from "react";
import Grid from "../../components/grid";

export const withOneColumns = () => (
  <Grid col="one">
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

export const withTwoColumns = () => (
  <Grid col="two">
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

export const withThreeColumns = () => (
  <Grid col="three">
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

export const withFourColumns = () => (
  <Grid col="four">
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

export const withColumnsFixed = () => (
  <Grid col="four" isFixed>
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

export const withColumnsReverse = () => (
  <Grid col="two" className="reverse">
    <div className="pad green one">1</div>
    <div className="pad blue two">2</div>
  </Grid>
);

export const withSpan = () => (
  <Grid col="twelve">
    <div className="pad green span-6">span-6</div>
    <div className="pad yellow span-3">span-3</div>
    <div className="pad orange span-2">span-2</div>
    <div className="pad blue span-1">span-1</div>
  </Grid>
);
