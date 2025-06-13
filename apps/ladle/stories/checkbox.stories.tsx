import type { Story } from "@ladle/react";

import { Label } from "@/components/ui/Label";
import { Checkbox } from "@/components/ui/Checkbox";

export const Default: Story = () => (
  <div className="flex items-center gap-2">
    <Checkbox id="terms" />
    <Label htmlFor="terms">Accept terms and conditions</Label>
  </div>
);
