import React from "react";

import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

export default {
  title: "Checkbox / Radix",
};

export const Default = () => (
  <div className="flex items-center">
    <Checkbox.Root
      className="flex size-2 items-center justify-center rounded bg-accents-1 outline-none hover:bg-violet3"
      defaultChecked
      id="c1"
    >
      <Checkbox.Indicator className="text-violet11">
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox.Root>
    <label
      className="pl-1 leading-none"
      htmlFor="c1"
    >
      Accept terms and conditions.
    </label>
  </div>
);
