import React from "react";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";

import CommandLine from "../components/CommandLine";

export default {
  title: "Aspect Ratio",
};

export const AspectRatioDemo = () => (
  <div className="w-[300px] overflow-hidden rounded-md">
    <AspectRatio.Root ratio={16 / 9}>
      <img
        className="size-full object-cover"
        src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
        alt="Landscape photograph by Tobias Tullius"
      />
    </AspectRatio.Root>
  </div>
);

AspectRatioDemo.decorators = [
  (Component) => (
    <>
      <CommandLine code="pnpm i @radix-ui/react-aspect-ratio" />
      <Component />
    </>
  ),
];
