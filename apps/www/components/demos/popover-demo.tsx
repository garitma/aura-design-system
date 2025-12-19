import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  PopoverArrow,
  PopoverAnchor,
} from "@/components/ui/Popover";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export const PopoverDemo = () => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="menu">Open Popover</Button>
    </PopoverTrigger>
    <PopoverContent className="w-30 p-1">
      <div className="space-y-1">
        <h4 className="font-medium leading-none">Dimensions</h4>
        <p className="text-sm text-gray-11">
          Set the dimensions for the layer.
        </p>
      </div>
    </PopoverContent>
  </Popover>
);

export const PopoverDemoWithCloseButton = () => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="menu">Open Popover</Button>
    </PopoverTrigger>
    <PopoverContent className="w-30 p-1">
      <PopoverClose />
      <div className="space-y-1">
        <h4 className="font-medium leading-none">Notifications</h4>
        <p className="text-sm text-gray-11">
          You have 3 unread messages. Click the close button to dismiss.
        </p>
      </div>
    </PopoverContent>
  </Popover>
);

export const PopoverDemoWithArrow = () => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="menu">Open Popover</Button>
    </PopoverTrigger>
    <PopoverContent className="w-30 p-1">
      <PopoverArrow />
      <div className="space-y-1">
        <h4 className="font-medium leading-none">Info</h4>
        <p className="text-sm text-gray-11">
          This popover includes an arrow pointing to the trigger.
        </p>
      </div>
    </PopoverContent>
  </Popover>
);

export const PopoverDemoControlled = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-0.5">
        <span className="text-sm text-gray-11">Status:</span>
        <span className="text-sm font-medium">{open ? "Open" : "Closed"}</span>
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="menu">Toggle Popover</Button>
        </PopoverTrigger>
        <PopoverContent className="w-30 p-1">
          <div className="space-y-1">
            <h4 className="font-medium leading-none">Controlled Popover</h4>
            <p className="text-sm text-gray-11">
              This popover's open state is controlled by React state.
            </p>
            <Button
              onClick={() => setOpen(false)}
              variant="link"
              className="w-full mt-0.5"
            >
              Close
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export const PopoverDemoWithAnchor = () => (
  <div className="space-y-1">
    <p className="text-sm text-gray-11">
      The popover can be anchored to a different element than the trigger.
    </p>
    <Popover>
      <PopoverAnchor asChild>
        <div className="inline-block p-1 bg-accent-3 rounded-sm">
          Anchor Element
        </div>
      </PopoverAnchor>
      <PopoverTrigger asChild>
        <Button variant="menu" className="ml-1">
          Open (Anchored)
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-30 p-1">
        <div className="space-y-1">
          <h4 className="font-medium leading-none">Anchored Popover</h4>
          <p className="text-sm text-gray-11">
            This popover is positioned relative to the anchor element, not the
            trigger.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  </div>
);

export const PopoverDemoPositioning = () => (
  <div className="grid grid-cols-2 gap-1">
    {(["top", "right", "bottom", "left"] as const).map((side) => (
      <Popover key={side}>
        <PopoverTrigger asChild>
          <Button variant="menu" className="capitalize">
            {side}
          </Button>
        </PopoverTrigger>
        <PopoverContent side={side} className="w-15 p-1">
          <p className="text-sm">
            Popover positioned on the <strong>{side}</strong> side.
          </p>
        </PopoverContent>
      </Popover>
    ))}
  </div>
);