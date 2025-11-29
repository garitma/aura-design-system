"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/Button";

import { AlarmWidget } from "./demos/AlarmWidget";
import { ControlCenter } from "./demos/ControlCenter";
import { EventInvite } from "./demos/EventInvite";
import { GroupChat } from "./demos/GroupChat";
import { MusicList } from "./demos/MusicList";
import { MusicPlayer } from "./demos/MusicPlayer";
import { PhotoEditor } from "./demos/PhotoEditor";
import { ShoppingTag } from "./demos/ShoppingTag";
import { VoiceAssistant } from "./demos/VoiceAssistant";
import { cn } from "@/utils/class-names";

export default function AuraAesthetic() {
  const [isVisible, setIsVisible] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (marqueeRef.current) {
      observer.observe(marqueeRef.current);
    }

    return () => {
      if (marqueeRef.current) {
        observer.unobserve(marqueeRef.current);
      }
    };
  }, []);

  return (
    <section className="border-t border-gray-6 bg-gray-2 overflow-hidden mb-2">
      <div className="relative">
        <div className="text-center smash mb-2 pad">
          <h2 className="font-bold">
            {" "}
            Start with Great Taste, Finish with{" "}
            <span className="text-gray-11">Your Own Flavor</span>.
          </h2>
          <p className="text-gray-11">
            We've compiled the high-quality basic ingredients for your product;
            by adding just a few of taste—your final signature touch—we believe
            you can achieve something truly great. We think the best systems
            empower you to build something diferent. <b>Do you?</b>
          </p>
        </div>
        {/* Demo Blocks */}
        <div
          ref={marqueeRef}
          className={cn(
            "flex justify-center  w-full mask-linear-fade",
            // "overflow-scroll"
            "overflow-hidden"
          )}
        >
          <div className={cn("flex w-max", "animate-marquee")}>
            {/* Original Set */}
            <div className="flex gap-2 mr-2">
              {/* Column 1 */}
              <div className="flex flex-col gap-4 h-full ">
                <div className="flex-[0.4]">
                  <EventInvite />
                </div>
                <div className="flex-[0.6]">
                  <GroupChat />
                </div>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-4 h-full ">
                <div className="flex-[0.3]">
                  <PhotoEditor />
                </div>
                <div className="flex-[0.7]">
                  <MusicPlayer />
                </div>
              </div>

              {/* Column 3 */}
              <div className="flex flex-col gap-4 h-full min-w-[400px]">
                <div className="flex-[0.4]">
                  <ControlCenter />
                </div>
                <div className="flex-[0.2]">
                  <VoiceAssistant />
                </div>
                <div className="flex-[0.4]">
                  <AlarmWidget />
                </div>
              </div>

              {/* Column 4 */}
              <div className="flex flex-col gap-4 h-full ">
                <div className="flex-[0.4]">
                  <ShoppingTag />
                </div>
                <div className="flex-[0.6]">
                  <MusicList />
                </div>
              </div>
            </div>

            {/* Duplicate Set */}
            <div className="flex gap-2 mr-2" aria-hidden="true">
              {/* Column 1 */}
              <div className="flex flex-col gap-4 h-full ">
                <div className="flex-[0.4]">
                  <EventInvite />
                </div>
                <div className="flex-[0.6]">
                  <GroupChat />
                </div>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-4 h-full ">
                <div className="flex-[0.3]">
                  <PhotoEditor />
                </div>
                <div className="flex-[0.7]">
                  <MusicPlayer />
                </div>
              </div>

              {/* Column 3 */}
              <div className="flex flex-col gap-4 h-full min-w-[400px]">
                <div className="flex-[0.4]">
                  <ControlCenter />
                </div>
                <div className="flex-[0.2]">
                  <VoiceAssistant />
                </div>
                <div className="flex-[0.4]">
                  <AlarmWidget />
                </div>
              </div>

              {/* Column 4 */}
              <div className="flex flex-col gap-4 h-full ">
                <div className="flex-[0.4]">
                  <ShoppingTag />
                </div>
                <div className="flex-[0.6]">
                  <MusicList />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "fixed bottom-9 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out",
            isVisible
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none"
          )}
        >
          <Button asChild size="lg" className="shadow-2xl">
            <Link href="/docs">
              Get Started 
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
