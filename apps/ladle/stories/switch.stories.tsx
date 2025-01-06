import React from "react";
import * as Switch from "@radix-ui/react-switch";

import CommandLine from "../components/CommandLine";

export const Radix = () => (
  <div className="flex items-center">
    <label className="pr-1 leading-none" htmlFor="airplane-mode">
      Airplane mode
    </label>
    <Switch.Root
      className="relative h-2.5 w-4 cursor-default rounded-full outline-none border bg-snow data-[state=checked]:bg-accents-2"
      id="airplane-mode"
    >
      <Switch.Thumb className="block size-2 translate-x-0 rounded-full bg-white shadow-md transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-2" />
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
