import React from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";

import CommandLine from "../components/CommandLine";

export default {
  title: "Select",
};

const SelectItem = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={[
          "relative flex h-2 select-none items-center rounded-[3px] pl-2 pr-[35px] text-[13px] leading-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accents-2 data-[disabled]:text-black/50 data-[highlighted]:text-violet1 data-[highlighted]:outline-none",
          className,
        ].join(" ")}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 inline-flex w-2 items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

export const Radix = () => {
  return (
    <Select.Root>
      <Select.Trigger
        className="bg-accents-1 inline-flex w-full h-4 items-center justify-between gap-0.5 rounded bg-white px-2 leading-none outline-none focus:outline-2 focus:outline-info data-[placeholder]:text-violet9"
        aria-label="Food"
      >
        <Select.Value placeholder="Select a fruit…" />
        <Select.Icon className="">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden rounded-md bg-white shadow">
          <Select.ScrollUpButton className="flex h-2 cursor-default items-center justify-center bg-white ">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-0.5">
            <Select.Group>
              <Select.Label className="px-2 text-xs leading-2 font-bold">
                Fruits
              </Select.Label>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </Select.Group>

            <Select.Separator className="m-0.5 h-[1px] bg-accents-2" />

            <Select.Group>
              <Select.Label className="px-2 text-xs leading-2 font-bold">
                Vegetables
              </Select.Label>
              <SelectItem value="aubergine">Aubergine</SelectItem>
              <SelectItem value="broccoli">Broccoli</SelectItem>
              <SelectItem value="carrot" disabled>
                Carrot
              </SelectItem>
              <SelectItem value="courgette">Courgette</SelectItem>
              <SelectItem value="leek">Leek</SelectItem>
            </Select.Group>

            <Select.Separator className="m-0.5 h-[1px] bg-accents-2" />

            <Select.Group>
              <Select.Label className="px-2 text-xs leading-2 font-bold">
                Meat
              </Select.Label>
              <SelectItem value="beef">Beef</SelectItem>
              <SelectItem value="chicken">Chicken</SelectItem>
              <SelectItem value="lamb">Lamb</SelectItem>
              <SelectItem value="pork">Pork</SelectItem>
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="flex h-2 cursor-default items-center justify-center bg-white ">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

Radix.decorators = [
  (Component) => (
    <>
      <CommandLine code="pnpm i @radix-ui/react-select" />
      <Component />
    </>
  ),
];
