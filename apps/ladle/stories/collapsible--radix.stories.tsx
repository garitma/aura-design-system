import React from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { RowSpacingIcon, Cross2Icon } from "@radix-ui/react-icons";

import CommandLine from "../components/CommandLine";

export default {
  title: "Collapsible",
};

export const Radix = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Collapsible.Root className="w-[300px]" open={open} onOpenChange={setOpen}>
      <div className="flex items-center justify-between">
        <span>@peduarte starred 3 repositories</span>
        <Collapsible.Trigger asChild>
          <button className="inline-flex size-2 items-center justify-center rounded-full  outline-none  data-[state=closed]:bg-white data-[state=open]:bg-snow border">
            {open ? <Cross2Icon /> : <RowSpacingIcon />}
          </button>
        </Collapsible.Trigger>
      </div>

      <div className="my-1 rounded bg-white p-1 border">
        <span className=" text-violet11">@radix-ui/primitives</span>
      </div>

      <Collapsible.Content>
        <div className="my-1 rounded bg-white p-1 border">
          <span className=" text-violet11">@radix-ui/colors</span>
        </div>
        <div className="my-1 rounded bg-white p-1 border">
          <span className=" text-violet11">@radix-ui/themes</span>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

Radix.decorators = [
  (Component) => (
    <>
      <CommandLine code="pnpm i @radix-ui/react-collapsible" />
      <Component />
    </>
  ),
];
