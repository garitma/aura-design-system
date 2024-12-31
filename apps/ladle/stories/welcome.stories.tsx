import React from "react";
import CommandLine from "../components/CommandLine";

export default {
  title: "AA Welcome",
};

export const Welcome = () => {
  return (
    <>
      <h1>Aura Design System</h1>
      <p>
        Aura Design System was created to solve my specific challenges in
        building user interfaces quickly and efficiently. It's a practical,
        lightweight design system built with vanilla CSS, designed to complement
        and coexist with other solutions like Tailwind CSS and Radix UI.
      </p>

      <p>
        Feel free to copy and paste components or mix them with your existing
        setups to keep your workflow fast and flexible. Aura isn't here to
        replace your tools—it's here to live alongside them, helping you get
        things done without compromising on speed or simplicity.
      </p>

      <p>Let’s build together and move fast!</p>
      <CommandLine code=" pnpm i @aura-design/system" />
    </>
  );
};
