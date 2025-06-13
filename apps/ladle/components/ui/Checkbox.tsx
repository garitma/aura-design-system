"use client";
import { Checkbox as CheckboxRadix } from "radix-ui";
import { CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/utils/class-names";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxRadix.Root>) {
  return (
    <CheckboxRadix.Root
      data-slot="checkbox"
      className={cn(
        className,
        (className =
          "border border-gray-a6 flex size-1.5 items-center justify-center rounded outline-none hover:bg-accent-2 cursor-pointer")
      )}
      {...props}
    >
      <CheckboxIndicator />
    </CheckboxRadix.Root>
  );
}

function CheckboxIndicator({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxRadix.Indicator>) {
  return (
    <CheckboxRadix.Indicator {...props}>
      <CheckIcon className={cn(className, "text-accent-9") }/>
    </CheckboxRadix.Indicator>
  );
}

export { Checkbox, CheckboxIndicator };
