import * as React from "react";
import { AspectRatio } from "@/components/ui/AspectRatio";

export const AspectRatioDemo = () => (
  <div className="w-[300px] overflow-hidden rounded-md">
    <AspectRatio ratio={16 / 9}>
      <img
        className="size-full object-cover"
        src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
        alt="Landscape photograph by Tobias Tullius"
      />
    </AspectRatio>
  </div>
);
