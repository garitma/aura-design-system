import React from "react";
import type { Story } from "@ladle/react";

import Button from "@/components/ui/button";

export const ButtonFill: Story = () => <Button label="Button fill" />;
export const ButtonPill: Story = () => (
  <Button mode="pill" label="Button Pill" />
);
export const ButtonLink: Story = () => (
  <Button mode="link" label="Button Pill" />
);
export const ButtonFluid: Story = () => <Button isFluid label="Button Fluid" />;
export const ButtonDisabled: Story = () => (
  <Button label="Disabled" isDisabled />
);
export const ButtonWaiting: Story = () => (
  <Button isLoading isLoadingText="Loading..."></Button>
);
export const ButtonHref: Story = () => (
  <Button mode="link" href="/" label="I'm an href"></Button>
);
