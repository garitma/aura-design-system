import React from "react";
import * as Avatar from "@radix-ui/react-avatar";

import CommandLine from "../components/CommandLine";

export default {
  title: "Avatar",
};

export const Radix = () => {
  return (
    <div className="flex gap-2">
      <Avatar.Root className="inline-flex size-[45px] select-none items-center justify-center overflow-hidden rounded-full bg-black align-middle">
        <Avatar.Image
          className="size-full rounded-[inherit] object-cover"
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          alt="Colm Tuite"
        />
        <Avatar.Fallback
          className="leading-1 flex size-full items-center justify-center bg-white text-[15px] font-medium"
          delayMs={600}
        >
          CT
        </Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root className="inline-flex size-[45px] select-none items-center justify-center overflow-hidden rounded-full  align-middle">
        <Avatar.Image
          className="size-full rounded-[inherit] object-cover"
          src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
          alt="Pedro Duarte"
        />
        <Avatar.Fallback
          className="leading-1 flex size-full items-center justify-center bg-white text-[15px] font-medium "
          delayMs={600}
        >
          JD
        </Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root className="inline-flex size-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
        <Avatar.Fallback className="leading-1 flex size-full items-center justify-center bg-accents-1 text-[15px] font-medium ">
          PD
        </Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
};

Radix.decorators = [
  (Component) => (
    <>
      <CommandLine code="pnpm i @radix-ui/react-avatar" />
      <Component />
    </>
  ),
];
