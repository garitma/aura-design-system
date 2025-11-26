"use client";

import Section from "@/components/Section";

import { AlarmWidget } from "./demos/AlarmWidget";
import { ControlCenter } from "./demos/ControlCenter";
import { EventInvite } from "./demos/EventInvite";
import { GardeningChecklist } from "./demos/GardeningChecklist";
import { GroupChat } from "./demos/GroupChat";
import { MusicList } from "./demos/MusicList";
import { MusicPlayer } from "./demos/MusicPlayer";
import { PhotoEditor } from "./demos/PhotoEditor";
import { ShoppingTag } from "./demos/ShoppingTag";
import { VoiceAssistant } from "./demos/VoiceAssistant";

export default function AuraAesthetic() {
  return (
    <Section container="smesh" className="border-t border-gray-6 bg-gray-2">
      <div className="relative">
        <div className="text-center smash mb-2">
          <h2 className="font-bold">Soft Pop & Material You</h2>
          <p className="text-gray-11">
            Aura's aesthetic combines large rounded corners, masonry-style
            layouts, and playful interactions to create a warm, inviting digital
            environment.
          </p>
        </div>
        {/* Demo Blocks */}
        <div className="flex justify-center overflow-hidden w-full mask-linear-fade">
          <div className="flex animate-marquee w-max">
            {/* Original Set */}
            <div className="flex gap-2 mr-2">
              {/* Column 1 */}
              <div className="flex flex-col gap-4 h-full w-[280px]">
                <div className="flex-[0.4]">
                  <EventInvite />
                </div>
                <div className="flex-[0.6]">
                  <GroupChat />
                </div>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-4 h-full w-[280px]">
                <div className="flex-[0.3]">
                  <PhotoEditor />
                </div>
                <div className="flex-[0.7]">
                  <MusicPlayer />
                </div>
              </div>

              {/* Column 3 */}
              <div className="flex flex-col gap-4 h-full w-[280px]">
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
              <div className="flex flex-col gap-4 h-full w-[280px]">
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
              <div className="flex flex-col gap-4 h-full w-[280px]">
                <div className="flex-[0.4]">
                  <EventInvite />
                </div>
                <div className="flex-[0.6]">
                  <GroupChat />
                </div>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-4 h-full w-[280px]">
                <div className="flex-[0.3]">
                  <PhotoEditor />
                </div>
                <div className="flex-[0.7]">
                  <MusicPlayer />
                </div>
              </div>

              {/* Column 3 */}
              <div className="flex flex-col gap-4 h-full w-[280px]">
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
              <div className="flex flex-col gap-4 h-full w-[280px]">
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
      </div>
    </Section>
  );
}
