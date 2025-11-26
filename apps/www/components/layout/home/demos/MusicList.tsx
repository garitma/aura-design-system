"use client";

import { Play, Heart, MoreHorizontal } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ScrollArea } from "@/components/ui/ScrollArea";

const TRACKS = [
  {
    title: "Midnight City",
    artist: "M83",
    duration: "4:03",
    cover:
      "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=128&h=128&fit=crop",
  },
  {
    title: "Starboy",
    artist: "The Weeknd",
    duration: "3:50",

    cover:
      "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=128&h=128&fit=crop",
  },
  {
    title: "Get Lucky",
    artist: "Daft Punk",
    duration: "6:09",
    cover:
      "https://images.unsplash.com/photo-1619983081563-430f63602796?w=128&h=128&fit=crop",
  },
  {
    title: "Nightcall",
    artist: "Kavinsky",
    duration: "4:18",
    cover:
      "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=128&h=128&fit=crop",
  },
  {
    title: "Instant Crush",
    artist: "Daft Punk",
    duration: "5:37",
    cover:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=128&h=128&fit=crop",
  },
];

export function MusicList() {
  return (
    <Card
      className="h-full flex flex-col bg-gray-2 border-gray-6 overflow-hidden"
      data-block="music-list"
    >
      <div className="p-1.5 border-b border-gray-6 bg-gray-2 z-10 flex items-center justify-between">
        <h3 className="h4  text-gray-12">Aura Wave</h3>
        <Button variant="menu">
          <MoreHorizontal className="icon" />
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-1 space-y-0.5">
          {TRACKS.map((track, i) => (
            <div
              key={i}
              className="group flex items-center gap-1 p-1 rounded-lg hover:bg-gray-3 transition-colors cursor-pointer"
            >
              <div className="relative w-5 h-5 rounded-md overflow-hidden shadow-sm flex-shrink-0">
                <Image
                  src={track.cover}
                  alt={track.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gray-a8 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="icon fill-current" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-12 truncate">
                  {track.title}
                </h4>
                <p className="text-xs text-gray-11 truncate">{track.artist}</p>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-gray-11 tabular-nums">
                  {track.duration}
                </span>
                <Button variant="menu">
                  <Heart className="icon" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
