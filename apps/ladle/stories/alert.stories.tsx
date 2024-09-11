import React from "react";
import Alert from "@aura-design/system/alert";

export const infoAlert = () => (
  <Alert
    state={{ info: { message: "This is a info alert", isError: false } }}
  />
);

export const dangerAlert = () => (
  <Alert
    state={{ info: { message: "This is a danger alert", isError: true } }}
  />
);
