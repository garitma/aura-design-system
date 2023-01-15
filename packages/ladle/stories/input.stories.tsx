import React from "react";
import Input from "../../components/input";

export const WithPlaceholder = () => <Input placeholder="Placeholder" />;
export const WithLabel = () => (
  <Input placeholder="Placeholder and label" isLabelable />
);
export const WithDialog = () => (
  <Input
    placeholder="Placeholder"
    isHelping
    helpText="⚠️ Oooops, something happened text"
  />
);
