import * as React from "react";
import {
  AngleSlider,
  AngleSliderRange,
  AngleSliderThumb,
  AngleSliderTrack,
  AngleSliderValue,
} from "@/components/ui/AngleSlider";
import { Button } from "@/components/ui/Button";

export const AngleSliderDemo = () => (
  <AngleSlider defaultValue={[45]} max={360}>
    <AngleSliderTrack>
      <AngleSliderRange />
    </AngleSliderTrack>
    <AngleSliderThumb />
    <AngleSliderValue />
  </AngleSlider>
)

export const AngleSliderDemoControlled = () => {
  const [value, setValue] = React.useState([120]);

  return (
    <div className="flex flex-col items-center gap-2">
      <AngleSlider value={value} onValueChange={setValue} max={360}>
        <AngleSliderTrack>
          <AngleSliderRange />
        </AngleSliderTrack>
        <AngleSliderThumb />
        <AngleSliderValue />
      </AngleSlider>
      <div className="flex gap-1">
        <Button
          type="button"
          variant="pill"
          size="sm"
          onClick={() => setValue([0])}
        >
          Reset
        </Button>
        <Button
          type="button"
          variant="pill"
          size="sm"
          onClick={() => setValue([180])}
        >
          180°
        </Button>
      </div>
    </div>
  );
};

export const AngleSliderDemoRangeSelection = () => (
  <AngleSlider defaultValue={[40, 200]} max={360} minStepsBetweenThumbs={10}>
    <AngleSliderTrack>
      <AngleSliderRange />
    </AngleSliderTrack>
    <AngleSliderThumb index={0} />
    <AngleSliderThumb index={1} />
    <AngleSliderValue />
  </AngleSlider>
)

export const AngleSliderDemoThemes = () => (
  <div className="flex flex-wrap items-center justify-center gap-4">
    <AngleSlider defaultValue={[72]} max={360}>
      <AngleSliderTrack className="*:data-[slot=angle-slider-track-rail]:stroke-gray-5">
        <AngleSliderRange className="stroke-accent-9" />
      </AngleSliderTrack>
      <AngleSliderThumb className="border-accent-9 bg-gray-1" />
      <AngleSliderValue className="text-accent-11" />
    </AngleSlider>
    <AngleSlider defaultValue={[210]} max={360}>
      <AngleSliderTrack className="*:data-[slot=angle-slider-track-rail]:stroke-gray-6">
        <AngleSliderRange className="stroke-gray-12" />
      </AngleSliderTrack>
      <AngleSliderThumb className="border-gray-12 bg-gray-1" />
      <AngleSliderValue className="text-gray-12" />
    </AngleSlider>
  </div>
)

export const AngleSliderDemoWithForm = () => {
  const [submitted, setSubmitted] = React.useState<string | null>(null);

  return (
    <form
      className="flex flex-col items-center gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setSubmitted(String(data.get("heading") ?? ""));
      }}
    >
      <AngleSlider name="heading" defaultValue={[90]} max={360}>
        <AngleSliderTrack>
          <AngleSliderRange />
        </AngleSliderTrack>
        <AngleSliderThumb />
        <AngleSliderValue />
      </AngleSlider>
      <Button type="submit" variant="pill" size="sm">
        Submit heading
      </Button>
      {submitted ? (
        <p className="text-xs text-gray-11">Submitted: {submitted}°</p>
      ) : null}
    </form>
  );
};