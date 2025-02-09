import React from "react";
import CommandLine from "../components/CommandLine";

export const Welcome = () => {
  return (
    <>
      <h1>Aura Design System</h1>
      <p>
        Aura Design was created to solve my specific challenges in
        building user interfaces quickly and efficiently. It's a practical,
        lightweight design system built with vanilla CSS, designed to complement
        and coexist with other solutions like Tailwind CSS and Radix UI.
      </p>

      <CommandLine code=" pnpm i @aura-design/system" />
    </>
  );
};
