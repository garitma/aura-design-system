import React from "react";
import type { Story } from "@ladle/react";

import { Label } from "@/components/ui/Label";

export const Default: Story = () => (
  <Label htmlFor="email">Email address</Label>
);

export const WithInput: Story = () => (
  <div>
    <Label htmlFor="name">Your name</Label>
    <input type="text" id="name" />
  </div>
);
