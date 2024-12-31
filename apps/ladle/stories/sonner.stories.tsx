import React from "react";
import { Toaster, toast } from "sonner";
import Button from "@aura-design/system/button";

import CommandLine from "../components/CommandLine";

export default {
  title: "Toast",
};

export const Sonner = () => {
  return (
    <div>
      <Toaster position="top-center" />
      <Button onClick={() => toast.success("My first toast")}>
        Give me a toast
      </Button>
    </div>
  );
};

Sonner.decorators = [
  (Component) => (
    <>
      <CommandLine code="pnpm i sonner" />
      <Component />
    </>
  ),
];
