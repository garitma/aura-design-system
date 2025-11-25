"use client";

import { Wifi, Bluetooth, Tv, Sun, Volume2 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Slider } from "@/components/ui/Slider";

export function ControlCenter() {
    return (
        <Card className="h-full p-2 bg-gray-2 border-gray-6 text-gray-12 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-1">
                <Button variant="fill" className="h-10 rounded-xl flex flex-col items-start justify-between p-1.5 bg-gray-3 hover:bg-gray-4 border-0 text-gray-12 group">
                    <div className="p-0.5 bg-accent-9 rounded-full text-white">
                        <Wifi className="w-2 h-2" />
                    </div>
                    <span className="font-medium text-sm">Wi-Fi</span>
                </Button>
                <div className="grid grid-rows-2 gap-1">
                    <Button variant="fill" className="h-full rounded-lg justify-start px-1.5 gap-1 bg-gray-3 hover:bg-gray-4 border-0 text-gray-12">
                        <Bluetooth className="w-2 h-2 text-accent-9" />
                        <span className="font-medium text-xs">Bluetooth</span>
                    </Button>
                    <Button variant="fill" className="h-full rounded-lg justify-start px-1.5 gap-1 bg-gray-3 hover:bg-gray-4 border-0 text-gray-12">
                        <Tv className="w-2 h-2 text-warning-contrast" />
                        <span className="font-medium text-xs">Living Room</span>
                    </Button>
                </div>
            </div>

            <div className="space-y-1.5">
                <div className="bg-gray-3 rounded-xl p-1.5 flex items-center gap-1.5">
                    <Sun className="w-2 h-2 text-gray-11" />
                    <Slider defaultValue={[75]} max={100} step={1} className="flex-1 [&_[role=slider]]:h-3 [&_[role=slider]]:w-1.5 [&_[role=slider]]:rounded-full [&_[role=slider]]:bg-gray-12" />
                </div>
                <div className="bg-gray-3 rounded-xl p-1.5 flex items-center gap-1.5">
                    <Volume2 className="w-2 h-2 text-gray-11" />
                    <Slider defaultValue={[40]} max={100} step={1} className="flex-1 [&_[role=slider]]:h-3 [&_[role=slider]]:w-1.5 [&_[role=slider]]:rounded-full [&_[role=slider]]:bg-gray-12" />
                </div>
            </div>
        </Card>
    );
}
