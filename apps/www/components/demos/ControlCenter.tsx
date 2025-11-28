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
        <Card className="p-1.5 bg-gray-3 border-gray-6 flex flex-col justify-between cursor-pointer hover:bg-gray-4 transition-colors">
          <div className="text-accent-9">
            <Wifi className="icon" />
          </div>
          <div>
            <div className="font-medium text-sm">Wi-Fi</div>
            <div className="text-xs text-gray-11">Connected</div>
          </div>
        </Card>

        <Card className="p-1.5 bg-gray-3 border-gray-6 flex flex-col justify-between cursor-pointer hover:bg-gray-4 transition-colors">
          <div className="text-accent-9">
            <Bluetooth className="icon" />
          </div>
          <div>
            <div className="font-medium text-sm">Bluetooth</div>
            <div className="text-xs text-gray-11">On</div>
          </div>
        </Card>
        <Card className="p-1.5 bg-gray-3 border-gray-6 flex flex-col justify-between cursor-pointer hover:bg-gray-4 transition-colors">
          <div className="text-warning-contrast">
            <Tv className="icon" />
          </div>
          <div>
            <div className="font-medium text-sm">Living Room</div>
            <div className="text-xs text-gray-11">Apple TV</div>
          </div>
        </Card>
        <Card className="p-1.5 bg-gray-3 border-gray-6 flex flex-col justify-between cursor-pointer hover:bg-gray-4 transition-colors">
          <div className="text-warning-contrast">
            <Sun className="icon" />
          </div>
          <div>
            <div className="font-medium text-sm">Sun</div>
            <div className="text-xs text-gray-11">On</div>
          </div>
        </Card>
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
