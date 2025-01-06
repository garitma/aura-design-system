import React from "react";

import Skeleton from "@aura-design/system/skeleton";

export const Basic = () => (
  <Skeleton widthAspectRation={5} heightAspectRation={5} />
);
export const Circle = () => (
  <Skeleton widthAspectRation={5} heightAspectRation={5} isCircle />
);
export const Fluid = () => (
  <Skeleton widthAspectRation={5} heightAspectRation={1.5} isFluid />
);
export const Composed = () => (
  <div className="flex gap-1">
    <div>
      <Skeleton widthAspectRation={5} heightAspectRation={5} isCircle />
    </div>
    <div className="flex flex-col gap-1 w-full justify-center">
      <Skeleton widthAspectRation={5} heightAspectRation={1.5} isFluid />
      <Skeleton widthAspectRation={5} heightAspectRation={1.5} isFluid />
    </div>
  </div>
);
