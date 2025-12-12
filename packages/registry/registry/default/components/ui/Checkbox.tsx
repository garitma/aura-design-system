"use client";
/**
 * @description A control that allows the user to toggle between checked and not checked.
 */
import * as React from "react";
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
        "border border-gray-a6 flex size-1.5 items-center justify-center rounded outline-none hover:bg-accent-2 cursor-pointer",
        className
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
      <CheckIcon className={cn(className, "text-accent-9")} />
    </CheckboxRadix.Indicator>
  );
}

interface CheckboxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string[];
  onValueChange?: (value: string[]) => void;
  defaultValue?: string[];
}

function CheckboxGroup({
  className,
  value,
  onValueChange,
  defaultValue,
  children,
  ...props
}: CheckboxGroupProps) {
  const [internalValue, setInternalValue] = React.useState<string[]>(
    defaultValue ?? []
  );
  const controlledValue = value ?? internalValue;

  const handleValueChange = React.useCallback(
    (itemValue: string, checked: boolean) => {
      const newValue = checked
        ? [...controlledValue, itemValue]
        : controlledValue.filter((v) => v !== itemValue);

      if (onValueChange) {
        onValueChange(newValue);
      } else {
        setInternalValue(newValue);
      }
    },
    [controlledValue, onValueChange]
  );

  return (
    <div
      data-slot="checkbox-group"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (
          React.isValidElement<CheckboxGroupItemProps>(child) &&
          child.type === CheckboxGroupItem
        ) {
          const childProps = child.props;
          return React.cloneElement(child, {
            ...childProps,
            checked: controlledValue.includes(childProps.value),
            onCheckedChange: (checked: boolean) =>
              handleValueChange(childProps.value, checked),
          });
        }
        return child;
      })}
    </div>
  );
}

interface CheckboxGroupItemProps
  extends Omit<React.ComponentProps<typeof CheckboxRadix.Root>, "onCheckedChange"> {
  value: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
}

function CheckboxGroupItem({
  className,
  value,
  label,
  description,
  id,
  ...props
}: CheckboxGroupItemProps) {
  const checkboxId = id || `checkbox-${value}`;

  return (
    <div
      data-slot="checkbox-group-item"
      className={cn("flex items-start gap-1", className)}
    >
      <Checkbox id={checkboxId} {...props} />
      {(label || description) && (
        <div className="flex flex-col gap-1">
          {label && (
            <label
              htmlFor={checkboxId}
              className="text-sm font-medium leading-none cursor-pointer"
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-sm text-gray-a11 m-0">{description}</p>
          )}
        </div>
      )}
    </div>
  );
}

export { Checkbox, CheckboxIndicator, CheckboxGroup, CheckboxGroupItem };
