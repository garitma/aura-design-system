import React, { useId } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

import CommandLine from "../components/CommandLine";

export default {
  title: "Checkbox",
};

interface CheckboxProps extends Checkbox.CheckboxProps {
  id?: string;
  label?: string;
}

export const WithRadix = ({
  id,
  label = "Acept terms and conditions.",
  ...props
}: CheckboxProps) => {
  const idConnect = id ? id : useId();

  return (
    <div className="flex items-center">
      <Checkbox.Root
        className="border flex size-2 items-center justify-center rounded outline-none"
        id={idConnect}
        {...props}
      >
        <Checkbox.Indicator>
          <CheckIcon className="icon" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label className="pl-1 leading-none" htmlFor={idConnect}>
        {label}
      </label>
    </div>
  );
};

WithRadix.decorators = [
  (Component) => (
    <>
      <CommandLine code="pnpm i @radix-ui/react-checkbox" />
      <Component />
    </>
  ),
];
