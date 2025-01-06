import React from "react";
import { SunIcon, ImageIcon } from "@radix-ui/react-icons";

import CommandLine from "../components/CommandLine";

export default {
  title: "Icons",
};

export const RadixIcon = () => <SunIcon className="icon" />;

RadixIcon.decorators = [
  (Component) => (
    <>
      <CommandLine code="pnpm i @radix-ui/react-icons" />
      <Component />
    </>
  ),
];
