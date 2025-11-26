"use client";

import { MapPin, Calendar } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Badge } from "@/components/ui/Badge";

export function EventInvite() {
  return (
    <Card
      className="h-full p-2 flex flex-col justify-between bg-gray-2 border-gray-6 shadow-sm"
      data-block="event-invite"
    >
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div className="space-y-0.5">
            <Badge status="info" className="mb-1">
              Invite
            </Badge>
            <h3 className="h3  font-medium text-gray-12">Echo Bridge</h3>
            <p className="text-gray-11 text-sm">Album Listening Party</p>
          </div>
          <Avatar className="h-4 w-4 border-2 border-gray-1 shadow-sm">
            <AvatarImage src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&h=128&fit=crop&crop=faces" />
            <AvatarFallback>OD</AvatarFallback>
          </Avatar>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          <div className="space-y-0.5">
            <Label className="text-xs text-gray-11 tracking-wider font-semibold">
              Where
            </Label>
            <div className="flex items-center gap-0.5 text-sm text-gray-12 font-medium">
              <MapPin className="icon" />
              <span>The Loft, NYC</span>
            </div>
          </div>
          <div className="space-y-0.5">
            <Label className="text-xs text-gray-11 tracking-wider font-semibold">
              When
            </Label>
            <div className="flex items-center gap-0.5 text-sm text-gray-12 font-medium">
              <Calendar className="icon" />
              <span>Oct 24, 8 PM</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-1 mt-2">
        <Label className="text-xs text-gray-11 tracking-wider font-semibold">
          Registration
        </Label>
        <div className="bg-gray-3 p-0.5 rounded-full border border-gray-6 flex">
          <Button variant="menu">Going</Button>
          <Button variant="menu">Maybe</Button>
          <Button variant="menu">No</Button>
        </div>
      </div>
    </Card>
  );
}
