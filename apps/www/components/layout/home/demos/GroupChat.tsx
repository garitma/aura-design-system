"use client";

import { Phone, Video, Send, Plus } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ScrollArea } from "@/components/ui/ScrollArea";

export function GroupChat() {
  return (
    <Card className="flex flex-col h-full bg-gray-2 text-gray-12 border-gray-6 overflow-hidden">
      {/* Header */}
      <div className="p-1.5 border-b border-gray-6 flex items-center justify-between bg-gray-2 z-10">
        <div className="flex items-center gap-1">
          <div className="flex -space-x-2 overflow-hidden">
            <Avatar className="border-2 border-gray-2">
              <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-gray-2">
              <AvatarImage src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=faces" />
              <AvatarFallback>KM</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-gray-2">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces" />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <div className="flex items-center gap-0.5">
              <h3 className="font-semibold text-sm text-gray-12">
                Music Night Out
              </h3>
              <Badge className="h-2 px-0.5 text-[10px]">3</Badge>
            </div>
            <p className="text-xs text-gray-11">Active now</p>
          </div>
        </div>
        <div className="flex gap-0.5">
          <Button variant="menu">
            <Phone className="icon" />
          </Button>
          <Button variant="menu">
            <Video className="icon" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-1.5">
        <div className="space-y-1.5">
          <div className="flex gap-1">
            <Avatar className="mt-0.5">
              <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="bg-gray-3 p-1 rounded-lg rounded-tl-none max-w-[80%]">
              <p className="text-sm text-gray-12">
                Are we still on for the jazz club tonight? 🎷
              </p>
            </div>
          </div>

          <div className="flex gap-1 flex-row-reverse">
            <div className="bg-accent-9 text-accent-contrast p-1 rounded-lg rounded-tr-none max-w-[80%]">
              <p className="text-sm">Definitely! I'm bringing the camera.</p>
            </div>
          </div>

          <div className="flex gap-1">
            <Avatar className="mt-0.5">
              <AvatarImage src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=faces" />
              <AvatarFallback>KM</AvatarFallback>
            </Avatar>
            <div className="bg-gray-3 p-1 rounded-lg rounded-tl-none max-w-[80%]">
              <p className="text-sm text-gray-12">
                Who's got that group photo from last time?
              </p>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-1 bg-gray-2">
        <div className="relative flex items-center gap-0.5">
          <Button variant="menu">
            <Plus className="icon" />
          </Button>
          <Input
            placeholder="Message..."
            className="rounded-full bg-gray-3 border-transparent text-gray-12 placeholder:text-gray-11 focus-visible:ring-gray-7"
          />
          <Button>
            <Send className="icon" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
