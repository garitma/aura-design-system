import { useState } from "react";
import type { DateRange } from "react-day-picker";

import { Calendar } from "../registry/default/components/ui/Calendar";

const DEMO_MONTH = new Date(2026, 3, 1);

export const Default = () => {
  const [selected, setSelected] = useState<Date | undefined>(
    new Date(2026, 3, 11),
  );

  return (
    <Calendar
      mode="single"
      defaultMonth={DEMO_MONTH}
      selected={selected}
      onSelect={setSelected}
    />
  );
};

export const Dropdown = () => {
  const [selected, setSelected] = useState<Date | undefined>(
    new Date(2026, 3, 11),
  );

  return (
    <Calendar
      mode="single"
      captionLayout="dropdown"
      defaultMonth={DEMO_MONTH}
      startMonth={new Date(2026, 0, 1)}
      endMonth={new Date(2026, 11, 1)}
      selected={selected}
      onSelect={setSelected}
    />
  );
};

export const Range = () => {
  const [selected, setSelected] = useState<DateRange | undefined>({
    from: new Date(2026, 3, 8),
    to: new Date(2026, 3, 14),
  });

  return (
    <Calendar
      mode="range"
      defaultMonth={DEMO_MONTH}
      today={new Date(2026, 3, 8)}
      selected={selected}
      onSelect={setSelected}
    />
  );
};

export const DisabledDays = () => (
  <Calendar
    mode="single"
    defaultMonth={DEMO_MONTH}
    disabled={{ before: new Date(2026, 3, 10) }}
  />
);

