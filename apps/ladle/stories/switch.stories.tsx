import React from "react";
import * as Switch from "@radix-ui/react-switch";

import CommandLine from "../components/CommandLine";

export const Radix = () => (
  <div className="flex items-center">
    <label className="pr-1 leading-none" htmlFor="airplane-mode">
      Airplane mode
    </label>
    <Switch.Root
      className="relative h-2.5 w-4.5 cursor-default rounded-full outline-none bg-accents-2 data-[state=checked]:bg-black"
      id="airplane-mode"
    >
      <Switch.Thumb className="block size-2 translate-x-[3.25px] rounded-full bg-white shadow-md transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[29.25px]" />
    </Switch.Root>
  </div>
);

Radix.decorators = [
  (Component) => (
    <>
      <CommandLine code="pnpm i @radix-ui/react-switch" />
      <Component />
    </>
  ),
];
