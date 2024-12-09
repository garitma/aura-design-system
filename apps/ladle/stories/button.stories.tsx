import React from "react";
import Button from "@aura-design/system/button";

export const ButtonFill = () => <Button label="Button fill" />;
export const ButtonPill = () => <Button mode="pill" label="Button Pill" />;
export const ButtonLink = () => <Button mode="link" label="Button Pill" />;
export const ButtonFluid = () => <Button isFluid label="Button Fluid" />;
export const ButtonDisabled = () => <Button label="Disabled" isDisabled />;
export const ButtonWaiting = () => (
  <Button isLoading isLoadingText="Loading..." ></Button>
);
export const ButtonHref = () => (
  <Button mode="link" href="/"  label="I'm an href"></Button>
);