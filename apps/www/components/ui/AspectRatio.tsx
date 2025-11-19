"use client";

import * as React from "react";
import { AspectRatio as AspectRatioRadix } from "radix-ui";

function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioRadix.Root>) {
  return <AspectRatioRadix.Root data-slot="aspect-ratio" {...props} />;
}

export { AspectRatio };
