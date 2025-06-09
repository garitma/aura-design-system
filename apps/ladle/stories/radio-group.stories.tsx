import type { Story } from "@ladle/react";
import { Label } from "../components/ui/Label";
import { RadioGroup, RadioGroupItem } from "../components/ui/RadioGroup";

export const Default: Story = () => (
  <RadioGroup defaultValue="comfortable" className="space-y-0.5">
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="default" id="r1" />
      <Label htmlFor="r1">Default</Label>
    </div>
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="comfortable" id="r2" />
      <Label htmlFor="r2">Comfortable</Label>
    </div>
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="compact" id="r3" />
      <Label htmlFor="r3">Compact</Label>
    </div>
  </RadioGroup>
); 