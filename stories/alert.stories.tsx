import React from "react";
import Alert from "../molecules/alert";

export const warningAlert = () => (
  <Alert
    state={{ info: { message: "This is a warning alert", error: false } }}
  />
);

export const dangerAlert = () => (
  <Alert
    state={{ info: { message: "This is a danger alert", error: true } }}
  />
);
