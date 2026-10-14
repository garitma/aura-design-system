"use client";
import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { cn } from "@/utils/class-names";

function DatePicker({
  value: valueProp,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date",
  className,
}: {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (value: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}) {
  const [uncontrolled, setUncontrolled] = React.useState<Date | undefined>(
    defaultValue,
  );
  const [open, setOpen] = React.useState(false);
  const value = valueProp ?? uncontrolled;

  function select(next: Date | undefined) {
    if (valueProp === undefined) setUncontrolled(next);
    onValueChange?.(next);
    setOpen(false);
  }

  const label = value
    ? value.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="pill"
          className={cn("w-full justify-between", className)}
          aria-label={value ? `Date, ${label}` : "Choose a date"}
        >
          {label}
          <CalendarIcon className="icon" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={13}>
        <Calendar
          mode="single"
          selected={value}
          onSelect={select}
          defaultMonth={value}
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker };

