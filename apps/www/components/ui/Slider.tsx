"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "radix-ui";

import { cn } from "@/utils/class-names";

function Slider({
  className,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn(className)}
      {...props}
    />
  );
}

function SliderPrimitiveTrack({
  className,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Track>) {
  return (
    <SliderPrimitive.Track
      data-slot="slider-track"
      className={cn(className)}
      {...props}
    />
  );
}

function SliderPrimitiveRange({
  className,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Range>) {
  return (
    <SliderPrimitive.Range
      data-slot="slider-range"
      className={cn(className)}
      {...props}
    />
  );
}

function SliderPrimitiveThumb({
  className,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Thumb>) {
  return (
    <SliderPrimitive.Thumb
      data-slot="slider-thumb"
      className={cn(className)}
      {...props}
    />
  );
}

export {
  Slider,
  SliderPrimitiveTrack,
  SliderPrimitiveRange,
  SliderPrimitiveThumb,
};
