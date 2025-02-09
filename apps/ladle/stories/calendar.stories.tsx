import React from "react";
import {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
} from "@radix-ui/react-icons";
import "cally";
import type {
  CalendarRangeProps,
  CalendarMonthProps,
  CalendarDateProps,
} from "cally";
import { format } from "@formkit/tempo";
import * as Popover from "@radix-ui/react-popover";
import Input from "@aura-design/system/input";

import CommandLine from "../components/CommandLine";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "calendar-month": unknown;
      "calendar-range": unknown;
      "calendar-date": unknown;
    }
  }
}

function useListener(ref, event, listener) {
  useEffect(() => {
    const current = ref.current;

    if (current && listener) {
      current.addEventListener(event, listener);
      return () => current.removeEventListener(event, listener);
    }
  }, [ref, event, listener]);
}

function useProperty(ref, prop, value) {
  useEffect(() => {
    if (ref.current) {
      ref.current[prop] = value;
    }
  }, [ref, prop, value]);
}

const CalendarMonth = forwardRef(function CalendarMonth(props, forwardedRef) {
  return <calendar-month offset={props.offset} ref={forwardedRef} />;
});

const CalendarRange = forwardRef(function CalendarRange(
  {
    onChange,
    showOutsideDays,
    firstDayOfWeek,
    isDateDisallowed,
    ...props
  }: CalendarRangeProps,
  forwardedRef
) {
  const ref = useRef();
  useImperativeHandle(forwardedRef, () => ref.current, []);
  useListener(ref, "change", onChange);
  useProperty(ref, "isDateDisallowed", isDateDisallowed);

  return (
    <calendar-range
      ref={ref}
      show-outside-days={showOutsideDays || undefined}
      first-day-of-week={firstDayOfWeek}
      className="w-full"
      locale="en-GB"
      {...props}
    />
  );
});

const CalendarDate = forwardRef(function CalendarDate(
  { onChange, showOutsideDays, firstDayOfWeek, isDateDisallowed, ...props },
  forwardedRef
) {
  const ref = useRef();
  useImperativeHandle(forwardedRef, () => ref.current, []);
  useListener(ref, "change", onChange);
  useProperty(ref, "isDateDisallowed", isDateDisallowed);

  return (
    <calendar-date
      ref={ref}
      show-outside-days={showOutsideDays || undefined}
      first-day-of-week={firstDayOfWeek}
      {...props}
    />
  );
});

function PickerSigle({ value, onChange }) {
  return (
    <CalendarDate value={value} onChange={onChange}>
      <ChevronLeftIcon aria-label="Previous" slot="previous" />
      <ChevronRightIcon aria-label="Next" slot="next" />
      <div className="flex flex-wrap gap-1 justify-center">
        <CalendarMonth />
      </div>
    </CalendarDate>
  );
}

function Picker({ value, onChange }) {
  return (
    <div>
      <CalendarRange value={value} onChange={onChange}>
        <ChevronLeftIcon aria-label="Previous" slot="previous" />
        <ChevronRightIcon aria-label="Next" slot="next" />
        <div className="flex flex-wrap gap-1 justify-center">
          <CalendarMonth />
          <CalendarMonth offset={1} />
        </div>
      </CalendarRange>
    </div>
  );
}

function formatDate(value) {
  const rage = value.split("/");
  for (let i = 0; i < rage.length; i++) {
    rage[i] = format(rage[i], "medium", "en");
  }
  return rage.join(" - ");
}

export const PickerDate = () => {
  const [value, setValue] = useState("");
  const onChange = (event) => setValue(formatDate(event.target.value));

  return (
    <Popover.Root>
      <Popover.Trigger className="w-full">
        <div className="relative">
          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="dd/mm/yyyy"
          />{" "}
          <CalendarIcon className="icon absolute right-2 top-1.5" />
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="rounded bg-white p-1 shadow">
          <PickerSigle value={value} onChange={onChange} />{" "}
          <Popover.Arrow className="fill-white drop-shadow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export const PickerDateRage = () => {
  const [value, setValue] = useState("");
  const onChange = (event) => setValue(formatDate(event.target.value));

  return (
    <Popover.Root>
      <Popover.Trigger className="w-full">
        <div className="relative">
          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="dd/mm/yyyy - dd/mm/yyyy"
          />{" "}
          <CalendarIcon className="icon absolute right-2 top-1.5" />
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="rounded bg-white p-1 shadow">
          <Picker value={value} onChange={onChange} />{" "}
          <Popover.Arrow className="fill-white drop-shadow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

PickerDate.decorators = [
  (Component) => (
    <>
      <CommandLine code="pnpm i cally" />
      <Component />
    </>
  ),
];

PickerDateRage.decorators = [
  (Component) => (
    <>
      <CommandLine code="pnpm i cally" />
      <Component />
    </>
  ),
];
