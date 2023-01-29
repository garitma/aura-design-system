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

export const WithDate = () => (
  <>
    <Input type="date" />
    <Input type="datetime-local" />
    <Input type="time" />
    <Input type="week" />
    <Input type="month" />
  </>
);

export const WithPicker = () => (
  <Input type="color" className="p0" value="#e8ebfe" />
);

export const WithRage = () => <Input type="range" />;

export const WithFile = () => <Input type="file" className="pt0" />;

// <Input type="file"/>

// <Input type="image"/>
