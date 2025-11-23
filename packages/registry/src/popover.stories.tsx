import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  PopoverArrow,
  PopoverAnchor,
} from "../registry/default/components/ui/Popover";
import { Button } from "../registry/default/components/ui/Button";
import { Input } from "../registry/default/components/ui/Input";
import { Label } from "../registry/default/components/ui/Label";

export const Default = () => (
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

export const WithForm = () => {
  const [width, setWidth] = useState("100%");
  const [maxWidth, setMaxWidth] = useState("300px");
  const [height, setHeight] = useState("25px");
  const [maxHeight, setMaxHeight] = useState("none");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="menu">Set Dimensions</Button>
      </PopoverTrigger>
      <PopoverContent className="w-30 p-1">
        <div className="space-y-1">
          <h4 className="font-medium leading-none mb-0.5">Dimensions</h4>
          <p className="text-sm text-gray-11 mb-1">
            Set the dimensions for the layer.
          </p>
          <div className="space-y-0.5">
            <div className="grid gap-0.5">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="h-2"
              />
            </div>
            <div className="grid gap-0.5">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input
                id="maxWidth"
                value={maxWidth}
                onChange={(e) => setMaxWidth(e.target.value)}
                className="h-2"
              />
            </div>
            <div className="grid gap-0.5">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="h-2"
              />
            </div>
            <div className="grid gap-0.5">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input
                id="maxHeight"
                value={maxHeight}
                onChange={(e) => setMaxHeight(e.target.value)}
                className="h-2"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export const WithCloseButton = () => (
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

export const WithArrow = () => (
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

export const Controlled = () => {
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

export const WithAnchor = () => (
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

export const Positioning = () => (
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

export const ComplexContent = () => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="menu">User Settings</Button>
    </PopoverTrigger>
    <PopoverContent className="w-30 p-1">
      <PopoverClose />
      <div className="space-y-1">
        <div className="space-y-0.5">
          <h4 className="font-medium leading-none">Profile Settings</h4>
          <p className="text-sm text-gray-11">
            Manage your account preferences.
          </p>
        </div>
        <div className="space-y-0.5 pt-0.5">
          <div className="grid gap-0.5">
            <Label htmlFor="name">Display Name</Label>
            <Input id="name" placeholder="Enter your name…" className="h-2" />
          </div>
          <div className="grid gap-0.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              className="h-2"
            />
          </div>
          <div className="grid gap-0.5">
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              placeholder="Tell us about yourself…"
              className="h-2"
            />
          </div>
          <div className="flex gap-0.5 pt-0.5">
            <Button variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button className="flex-1">Save Changes</Button>
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
);
