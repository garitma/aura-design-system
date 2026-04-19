import { Slider } from "@/components/ui/Slider";

export const SliderDemo = () => (
  <div className="p-4">
    <Slider defaultValue={[50]} max={100} step={1} />
  </div>
)

export const SliderDemoDisabled = () => (
  <div className="p-4">
    <Slider defaultValue={[25]} max={100} step={1} disabled />
  </div>
)

export const SliderDemoWithSteps = () => (
  <div className="p-4">
    <Slider defaultValue={[33]} max={100} step={33} />
  </div>
)