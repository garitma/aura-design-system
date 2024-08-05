import React from "react";
import Textarea from "@aura-design/ui/textarea";

export const WithPlaceholder = () => <Textarea placeholder="Placeholder" />;

export const WithLabel = () => (
  <Textarea placeholder="Placeholder and label" isLabelable />
);
