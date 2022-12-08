import React from "react";
import Grid from "../layout/grid";

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
