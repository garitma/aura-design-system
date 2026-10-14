"use client";
import * as React from "react";
import { MinusIcon } from "@radix-ui/react-icons";

import {
  SegmentedInput,
  SegmentedInputItem,
} from "@/components/ui/SegmentedInput";
import { cn } from "@/utils/class-names";

function InputOTP({
  length = 6,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  disabled,
  invalid,
  id,
  name,
  separatorAfter,
  className,
}: {
  length?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  id?: string;
  name?: string;
  separatorAfter?: number;
  className?: string;
}) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
  const value = (valueProp ?? uncontrolled).slice(0, length);
  const refs = React.useRef<Array<HTMLInputElement | null>>([]);

  function commit(next: string) {
    const clipped = next.replace(/\D/g, "").slice(0, length);
    if (valueProp === undefined) setUncontrolled(clipped);
    onValueChange?.(clipped);
  }

  function focusAt(index: number) {
    refs.current[Math.max(0, Math.min(index, length - 1))]?.focus();
  }

  const indexes = Array.from({ length }, (_, index) => index);
  const groups =
    separatorAfter && separatorAfter > 0 && separatorAfter < length
      ? [indexes.slice(0, separatorAfter), indexes.slice(separatorAfter)]
      : [indexes];

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {groups.map((group, groupIndex) => (
        <React.Fragment key={group[0]}>
          {groupIndex > 0 ? <MinusIcon className="icon" aria-hidden /> : null}
          <SegmentedInput
            center
            disabled={disabled}
            invalid={invalid}
            aria-label="One-time code"
            className="gap-0.5"
          >
            {group.map((index) => (
              <SegmentedInputItem
                key={index}
                id={index === 0 ? id : undefined}
                ref={(node) => {
                  refs.current[index] = node;
                }}
                value={value[index] ?? ""}
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                autoCapitalize="off"
                spellCheck={false}
                aria-label={`Digit ${index + 1} of ${length}`}
                maxLength={length}
                position="isolated"
                className="w-3 flex-none"
                onChange={(event) => {
                  const raw = event.target.value.replace(/\D/g, "");
                  if (!raw) {
                    commit(value.slice(0, index) + value.slice(index + 1));
                    return;
                  }
                  const next = (value.slice(0, index) + raw).slice(0, length);
                  commit(next);
                  focusAt(index + raw.length);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Backspace" && !value[index] && index > 0) {
                    commit(value.slice(0, index - 1) + value.slice(index));
                    focusAt(index - 1);
                  }
                  if (event.key === "ArrowLeft") focusAt(index - 1);
                  if (event.key === "ArrowRight") focusAt(index + 1);
                }}
                onPaste={(event) => {
                  event.preventDefault();
                  const text = event.clipboardData
                    .getData("text")
                    .replace(/\D/g, "");
                  const next = (value.slice(0, index) + text).slice(0, length);
                  commit(next);
                  focusAt(index + text.length);
                }}
              />
            ))}
          </SegmentedInput>
        </React.Fragment>
      ))}
      {name ? <input type="hidden" name={name} value={value} /> : null}
    </div>
  );
}

export { InputOTP };

