import React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";

import CommandLine from "../components/CommandLine";

export default {
  title: "Radio",
};

export const Radix = () => (
  <RadioGroup.Root
    className="flex flex-col gap-1"
    defaultValue="default"
    aria-label="View density"
  >
    <div className="flex items-center">
      <RadioGroup.Item
        className="size-2 cursor-default rounded-full bg-white border outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
        value="default"
        id="r1"
      >
        <RadioGroup.Indicator className="relative flex size-full items-center justify-center after:block after:size-[11px] after:rounded-full after:bg-black" />
      </RadioGroup.Item>
      <label className="pl-[15px]  leading-none " htmlFor="r1">
        Default
      </label>
    </div>
    <div className="flex items-center">
      <RadioGroup.Item
        className="size-2 cursor-default rounded-full bg-white border outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
        value="comfortable"
        id="r2"
      >
        <RadioGroup.Indicator className="relative flex size-full items-center justify-center after:block after:size-[11px] after:rounded-full after:bg-black" />
      </RadioGroup.Item>
      <label className="pl-[15px]  leading-none " htmlFor="r2">
        Comfortable
      </label>
    </div>
    <div className="flex items-center">
      <RadioGroup.Item
        className="size-2 cursor-default rounded-full bg-white border outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
        value="compact"
        id="r3"
      >
        <RadioGroup.Indicator className="relative flex size-full items-center justify-center after:block after:size-[11px] after:rounded-full after:bg-black" />
      </RadioGroup.Item>
      <label className="pl-1 leading-none" htmlFor="r3">
        Compact
      </label>
    </div>
  </RadioGroup.Root>
);

Radix.decorators = [
  (Component) => (
    <>
      <CommandLine code="pnpm i @radix-ui/react-accordion" />
      <Component />
    </>
  ),
];
