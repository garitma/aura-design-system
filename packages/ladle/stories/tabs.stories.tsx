import React from "react";

import Tabs from "../../components/tabs";

export const Basic = () => (
  <Tabs data={[{ label: "One" }, { label: "Two" }, { label: "Three" }]}>
    <div className="mod-detail one">One</div>
    <div className="mod-detail two">Two</div>
    <div className="mod-detail three">Three</div>
  </Tabs>
);
