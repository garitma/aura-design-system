import { useState } from "react";

import { Calendar } from "../registry/default/components/ui/Calendar";

/** Fixed month so Ladle screenshots stay stable (April 2026). */
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
