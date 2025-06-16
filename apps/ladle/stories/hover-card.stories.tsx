import React from "react";
import type { Story } from "@ladle/react";

import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/HoverCard";

export const Default: Story = () => (
  <HoverCard>
    <HoverCardTrigger>
      <div className="inline-block cursor-pointer rounded-full">
        <img
          className="block size-3 rounded-full"
          src="https://pbs.twimg.com/profile_images/1337055608613253126/r_eiMp2H_400x400.png"
          alt="Radix UI"
        />
      </div>
    </HoverCardTrigger>
    <HoverCardContent className="w-[300px] mr-auto ml-0">
      <div>
        <img
          className="block size-3 rounded-full"
          src="https://pbs.twimg.com/profile_images/1337055608613253126/r_eiMp2H_400x400.png"
          alt="Radix UI"
        />
        <div>
          <div className="font-bold">Radix</div>
          <div className="text-gray-9">@radix_ui</div>
        </div>
        <div className=" text-gray-12 my-1">
          Components, icons, colors, and templates for building high-quality,
          accessible UI. Free and open-source.
        </div>
        <div className="flex gap-1">
          <div className="flex gap-1">
            <div className="text-gray-12 font-bold">0</div>{" "}
            <div className="">Following</div>
          </div>
          <div className="flex gap-1">
            <div className="font-bold">2,900</div>{" "}
            <div className="text-gray-12">Followers</div>
          </div>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
);
