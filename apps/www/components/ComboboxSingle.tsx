"use client";

/**
 * @description A single-select combobox component that allows users to search and select one option from a list.
 */
import * as React from "react";
import { useId, useRef } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxClear,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxPopup,
  ComboboxList,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxEmpty,
} from "@/components/ui/Combobox";
import { Cross2Icon, ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/utils/class-names";

export interface ComboboxOption {
  label: string;
  value: string;
}

export interface ComboboxSingleProps {
  options: ComboboxOption[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
  id?: string;
  container?: React.RefObject<HTMLElement> | null;
}

export const ComboboxSingle = React.forwardRef<
  HTMLDivElement,
  ComboboxSingleProps
>(
  (
    {
      options,
      defaultValue,
      value: controlledValue,
      onChange,
      onBlur,
      placeholder = "Select an option",
      disabled = false,
      className,
      name,
      id,
      container,
    },
    forwardedRef
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const inputId = id || useId();
    const isControlled = controlledValue !== undefined;

    // Get current value (controlled or default)
    const currentValue = isControlled ? controlledValue : defaultValue;

    // Get selected option
    const selectedOption: ComboboxOption | undefined = React.useMemo(() => {
      return currentValue
        ? options.find((opt) => opt.value === currentValue)
        : undefined;
    }, [options, currentValue]);

    // Handle value change
    const handleValueChange = (newValue: ComboboxOption | null) => {
      if (onChange) {
        const newValueString = newValue ? newValue.value : "";
        onChange(newValueString);
      }
    };

    return (
      <div ref={containerRef} className={cn("relative", className)}>
        <Combobox
          items={options}
          value={isControlled ? selectedOption : undefined}
          onValueChange={handleValueChange}
          disabled={disabled}
        >
          <div className="relative flex flex-col gap-0.5">
            <div className="relative flex items-center gap-0.5">
              <ComboboxInput
                id={inputId}
                placeholder={placeholder}
                onBlur={onBlur}
                name={name}
                className="flex-1 outline-none bg-transparent"
              />
              <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center gap-0.5">
                <ComboboxClear
                  className="flex h-2 w-2 items-center justify-center rounded-sm bg-transparent p-0 cursor-pointer hover:bg-accent-3"
                  aria-label="Clear selection"
                >
                  <Cross2Icon className="size-1" />
                </ComboboxClear>
                <ComboboxTrigger
                  className="flex h-2 w-2 items-center justify-center rounded-sm bg-transparent p-0 cursor-pointer hover:bg-accent-3"
                  aria-label="Open popup"
                >
                  <ChevronDownIcon className="size-1" />
                </ComboboxTrigger>
              </div>
            </div>
          </div>

          <ComboboxPortal>
            <ComboboxPositioner sideOffset={4} anchor={containerRef}>
              <ComboboxPopup>
                <ComboboxEmpty>No options found.</ComboboxEmpty>
                <ComboboxList>
                  {(option: ComboboxOption) => (
                    <ComboboxItem key={option.value} value={option}>
                      <div className="flex items-center gap-0.5">
                        <span className="flex-1">{option.label}</span>
                      </div>
                      <ComboboxItemIndicator>
                        <CheckIcon className="size-1" />
                      </ComboboxItemIndicator>
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxPopup>
            </ComboboxPositioner>
          </ComboboxPortal>
        </Combobox>
      </div>
    );
  }
);

ComboboxSingle.displayName = "ComboboxSingle";
