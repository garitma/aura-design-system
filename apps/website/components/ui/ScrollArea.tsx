import { ScrollArea as ScrollAreaRadix } from "radix-ui";

type ScrollAreaProps = {
  children: React.ReactNode;
  rootProps?: keyof ScrollAreaRadix.Root;
  viewportProps?: keyof ScrollAreaRadix.Viewport;
};

const ScrollArea = ({ children, rootProps, viewportProps }: ScrollAreaProps) => {
  return (
    <ScrollAreaRadix.Root>
      <ScrollAreaRadix.Viewport {...viewportProps}>{children}</ScrollAreaRadix.Viewport>
      <ScrollAreaRadix.Scrollbar
        orientation="horizontal"
        className="flex touch-none select-none bg-black-a2 h-0.5 rounder-1"
      >
        <ScrollAreaRadix.Thumb className="bg-black-4 rounded-full" />
      </ScrollAreaRadix.Scrollbar>
      <ScrollAreaRadix.Scrollbar
        orientation="vertical"
        className="flex touch-none select-none bg-black-a2 h-0.5 rounder-1"
      >
        <ScrollAreaRadix.Thumb className="bg-black-4 rounded-full" />
      </ScrollAreaRadix.Scrollbar>
      <ScrollAreaRadix.Corner />
    </ScrollAreaRadix.Root>
  );
};

export default ScrollArea;
