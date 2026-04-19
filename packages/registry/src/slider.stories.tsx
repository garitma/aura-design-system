import { Slider } from "../registry/default/components/ui/Slider";

export const Default = () => (
  <div className="p-4">
    <Slider defaultValue={[50]} max={100} step={1} />
  </div>
);

export const Disabled = () => (
  <div className="p-4">
    <Slider defaultValue={[25]} max={100} step={1} disabled />
  </div>
);

export const WithSteps = () => (
  <div className="p-4">
    <Slider defaultValue={[33]} max={100} step={33} />
  </div>
);
