"use client";

import { Card } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Switch } from "@/components/ui/Switch";

export function AlarmWidget() {
  return (
    <Card
      className="h-full p-2 flex flex-col justify-between bg-gray-2 border-gray-6"
      data-block="alarm-widget"
    >
      <div className="flex items-center justify-between">
        <Label className="text-accent-11 font-medium tracking-wider text-xs">
          Feeding times
        </Label>
        <div className="h-1 w-1 rounded-full bg-accent-9" />
      </div>

      <div className="grid grid-cols-2 gap-1.5 mt-1">
        <div className="bg-gray-a2 p-1.5 rounded-xl flex flex-col justify-between gap-1.5 border border-accent-a6">
          <span className="h2  text-accent-12 tracking-tight">
            07:30{" "}
            <span className="text-sm font-sans text-accent-11 font-medium">
              AM
            </span>
          </span>
          <div className="flex justify-end">
            <Switch defaultChecked />
          </div>
        </div>
        <div className="bg-gray-a2 p-1.5 rounded-xl flex flex-col justify-between gap-1.5 border border-accent-a6">
          <span className="h2  text-accent-12 tracking-tight">
            07:35{" "}
            <span className="text-sm font-sans text-accent-11 font-medium">
              AM
            </span>
          </span>
          <div className="flex justify-end">
            <Switch defaultChecked />
          </div>
        </div>
        <div className="bg-gray-a2 p-1.5 rounded-xl flex flex-col justify-between gap-1.5 border border-accent-a6">
          <span className="h2  text-accent-12 tracking-tight">
            07:40{" "}
            <span className="text-sm font-sans text-accent-11 font-medium">
              AM
            </span>
          </span>
          <div className="flex justify-end">
            <Switch defaultChecked />
          </div>
        </div>
        <div className="bg-gray-a2 p-1.5 rounded-xl flex flex-col justify-between gap-1.5 border border-accent-a6">
          <span className="h2  text-accent-12 tracking-tight">
            12:30{" "}
            <span className="text-sm font-sans text-accent-11 font-medium">
              PM
            </span>
          </span>
          <div className="flex justify-end">
            <Switch />
          </div>
        </div>
      </div>
    </Card>
  );
}
