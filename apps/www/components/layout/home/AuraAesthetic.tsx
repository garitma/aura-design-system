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
    <Section container="smesh">
      <div className="relative">
        <div className="text-center">
          <h2 >
            Soft Pop & Material You
          </h2>
          <p >
            Aura's aesthetic combines large rounded corners, masonry-style layouts, and playful interactions to create a warm, inviting digital environment.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-auto ">
            {/* Column 1 */}
            <div className="flex flex-col gap-4 h-full">
              <div className="flex-[0.4]">
                <EventInvite />
              </div>
              <div className="flex-[0.6]">
                <GroupChat />
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4 h-full">
              <div className="flex-[0.3]">
                <PhotoEditor />
              </div>
              <div className="flex-[0.7]">
                <MusicPlayer />
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-4 h-full">
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
            <div className="flex flex-col gap-4 h-full">
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
    </Section>
  );
}
