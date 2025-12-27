"use client";

/**
 * @description A multi-select combobox component that allows users to search and select multiple options from a list.
 */
import * as React from "react";
import { useId, useRef } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxPopup,
  ComboboxList,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxEmpty,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipRemove,
} from "@/components/ui/Combobox";
import { ChevronDownIcon, Cross2Icon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/utils/class-names";

export interface ComboboxOption {
  label: string;
  value: string;
}

export interface ComboboxMultipleProps {
  options: ComboboxOption[];
  defaultValue?: string[];
  value?: string[];
  onChange?: (value: string[]) => void;
  onBlur?: () => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
  id?: string;
  container?: React.RefObject<HTMLElement> | null;
}

export const ComboboxMultiple = React.forwardRef<
  HTMLDivElement,
  ComboboxMultipleProps
>(
  (
    {
      options,
      defaultValue = [],
      value: controlledValue,
      onChange,
      onBlur,
      placeholder = "Select one or more options",
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

    // Convert string[] to ComboboxOption[]
    const selectedOptions: ComboboxOption[] = React.useMemo(() => {
      if (!Array.isArray(currentValue) || currentValue.length === 0) {
        return [];
      }
      return options.filter((opt) => currentValue.includes(opt.value));
    }, [options, currentValue]);

    // Handle value change
    const handleValueChange = (newValue: ComboboxOption[]) => {
      if (onChange) {
        const stringValues = newValue.map((item) => item.value);
        onChange(stringValues);
      }
    };

    return (
      <div ref={containerRef} className={cn("relative", className)}>
        <Combobox
          items={options}
          multiple
          value={isControlled ? selectedOptions : undefined}
          onValueChange={handleValueChange}
          disabled={disabled}
        >
          <div className="relative w-full flex flex-col gap-0.5">
            <ComboboxChips
              className={cn(
                "w-full flex flex-wrap items-center gap-0.5 rounded-sm border border-gray-6 px-0.5 focus-within:ring-2 focus-within:ring-gray-8",
                currentValue.length > 0 ? "h-auto py-1" : "py-0"
              )}
              onBlur={onBlur}
            >
              <ComboboxValue>
                {(valueItems: ComboboxOption[]) => (
                  <React.Fragment>
                    {valueItems.map((option) => (
                      <ComboboxChip
                        key={option.value}
                        className="flex items-center gap-0.5 rounded-sm bg-gray-3 p-0.5 outline-none cursor-default hover:bg-accent-3 focus-within:bg-accent-3"
                        aria-label={option.value}
                      >
                        {option.label}
                        <ComboboxChipRemove
                          className="hover:text-accent-9 hover:cursor-pointer"
                          aria-label="Remove"
                        >
                          <Cross2Icon className="size-1" />
                        </ComboboxChipRemove>
                      </ComboboxChip>
                    ))}
                    <ComboboxInput
                      id={inputId}
                      name={name}
                      placeholder={valueItems.length > 0 ? "" : placeholder}
                      className="min-w-12 flex-1 h-4 rounded-sm border-0 bg-transparent pl-2 text-gray-12 outline-none"
                    />
                  </React.Fragment>
                )}
              </ComboboxValue>
            </ComboboxChips>
            {currentValue.length === 0 && (
              <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center gap-0.5">
                <ComboboxTrigger
                  className="flex h-2 w-2 items-center justify-center rounded-sm bg-transparent p-0 cursor-pointer hover:bg-accent-3"
                  aria-label="Open popup"
                >
                  <ChevronDownIcon className="size-1" />
                </ComboboxTrigger>
              </div>
            )}
          </div>

          <ComboboxPortal>
            <ComboboxPositioner sideOffset={4} anchor={containerRef}>
              <ComboboxPopup>
                <ComboboxEmpty>No options found.</ComboboxEmpty>
                <ComboboxList>
                  {(option: ComboboxOption) => (
                    <ComboboxItem key={option.value} value={option}>
                      <span className="flex-1">{option.label}</span>
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

ComboboxMultiple.displayName = "ComboboxMultiple";

