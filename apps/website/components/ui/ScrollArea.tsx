import React from "react";
import { ScrollArea as ScrollAreaRadix } from "radix-ui";

type ScrollAreaProps = {
  children: React.ReactNode;
  rootProps?: ScrollAreaRadix.ScrollAreaProps;
  viewportProps?: ScrollAreaRadix.ScrollAreaViewportProps;
  scrollbarProps?: ScrollAreaRadix.ScrollAreaScrollbarProps;
  thumbProps?: ScrollAreaRadix.ScrollAreaThumbProps;
  cornerProps?: ScrollAreaRadix.ScrollAreaCornerProps;
};

const ScrollArea = ({
  children,
  rootProps,
  viewportProps,
  scrollbarProps,
  thumbProps,
  cornerProps,
}: ScrollAreaProps) => {
  return (
    <ScrollAreaRadix.Root {...rootProps}>
      <ScrollAreaRadix.Viewport {...viewportProps}>
        {children}
      </ScrollAreaRadix.Viewport>
      <ScrollAreaRadix.Scrollbar
        orientation="horizontal"
        className="flex touch-none select-none bg-black-a2 h-0.5 rounder-1"
        {...scrollbarProps}
      >
        <ScrollAreaRadix.Thumb 
          className="bg-black-4 rounded-full"
          {...thumbProps}
        />
      </ScrollAreaRadix.Scrollbar>
      <ScrollAreaRadix.Scrollbar
        orientation="vertical" 
        className="flex touch-none select-none bg-black-a2 h-0.5 rounder-1"
        {...scrollbarProps}
      >
        <ScrollAreaRadix.Thumb 
          className="bg-black-4 rounded-full"
          {...thumbProps}
        />
      </ScrollAreaRadix.Scrollbar>
      <ScrollAreaRadix.Corner {...cornerProps} />
    </ScrollAreaRadix.Root>
  );
};

export default ScrollArea;
