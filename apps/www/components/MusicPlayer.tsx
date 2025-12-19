"use client";

import { Play, SkipBack, SkipForward } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { Slider } from "@/components/ui/Slider";

export function MusicPlayer() {
  return (
    <Card className="relative overflow-hidden h-full min-h-[400px] flex flex-col justify-end p-2 group bg-gray-2 border-gray-6">
      <Image
        src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2000&auto=format&fit=crop"
        alt="Album Art"
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-5"
      />

      <div className="relative z-10 space-y-2 p-1">
        <div className="space-y-0.5">
          <h2>Serafina</h2>
          <p>Midnight Sessions</p>
        </div>

        <div className="space-y-1.5">
          <Slider defaultValue={[33]} max={100} step={1} />
          <div className="flex items-center justify-between font-medium">
            <span>1:24</span>
            <span>4:12</span>
          </div>
        </div>

        <Section className="flex items-center justify-center gap-2 pt-1">
          <Button variant="menu">
            <SkipBack className="icon" />
          </Button>
          <Button>
            <Play className="icon fill-current" />
          </Button>
          <Button variant="menu">
            <SkipForward className="icon" />
          </Button>
        </Section>
      </div>
    </Card>
  );
}
