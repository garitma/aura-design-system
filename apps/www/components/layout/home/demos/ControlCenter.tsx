"use client";

import { Wifi, Bluetooth, Tv, Sun, Volume2 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Slider } from "@/components/ui/Slider";

export function ControlCenter() {
  return (
    <Card
      className="h-full p-2 bg-gray-2 border-gray-6 text-gray-12 flex flex-col gap-2"
      data-block="control-center"
    >
      <div className="grid grid-cols-2 gap-1">
        <Button variant="fill">
          <div className="p-0.5 bg-accent-9 rounded-full text-accent-contrast">
            <Wifi className="icon" />
          </div>
          <span className="font-medium text-sm">Wi-Fi</span>
        </Button>
        <div className="grid grid-rows-2 gap-1">
          <Button variant="fill">
            <Bluetooth className="icon" />
            <span className="font-medium text-xs">Bluetooth</span>
          </Button>
          <Button variant="fill">
            <Tv className="icon" />
            <span className="font-medium text-xs">Living Room</span>
          </Button>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="bg-gray-3 rounded-xl p-1.5 flex items-center gap-1.5">
          <Sun className="icon" />
          <Slider defaultValue={[75]} max={100} step={1} />
        </div>
        <div className="bg-gray-3 rounded-xl p-1.5 flex items-center gap-1.5">
          <Volume2 className="icon" />
          <Slider defaultValue={[40]} max={100} step={1} />
        </div>
      </div>
    </Card>
  );
}
