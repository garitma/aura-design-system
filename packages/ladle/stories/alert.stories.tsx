import React from "react";
import Alert from "../../components/alert";

export const warningAlert = () => (
  <Alert
    state={{ info: { message: "This is a warning alert", isError: false } }}
  />
);

export const dangerAlert = () => (
  <Alert
    state={{ info: { message: "This is a danger alert", isError: true } }}
  />
);
