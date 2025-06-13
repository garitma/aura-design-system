import type { Story } from "@ladle/react";

import { Label } from "@/components/ui/Label";
import { Switch } from "@/components/ui/Switch";

export const Default: Story = () => (
  <div className="flex items-center gap-2">
    <Switch id="airplane-mode" />
    <Label htmlFor="airplane-mode">Airplane Mode</Label>
  </div>
);
