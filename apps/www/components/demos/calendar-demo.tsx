import { useState } from "react";
import { Calendar } from "@/components/ui/Calendar";

const DEMO_MONTH = new Date(2026, 3, 1);


export const CalendarDemo = () => {
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