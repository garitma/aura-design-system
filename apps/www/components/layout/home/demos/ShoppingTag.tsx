"use client";

import { Tag, ShoppingBag } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/HoverCard";

export function ShoppingTag() {
  return (
    <Card
      className="relative h-full overflow-hidden group"
      data-block="shopping-tag"
    >
      <Image
        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
        alt="Fashion"
        fill
        className="object-cover"
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="w-2 h-2 bg-gray-contrast rounded-full shadow-lg cursor-pointer animate-pulse hover:animate-none" />
          </HoverCardTrigger>
          <HoverCardContent side="top">
            <div className="flex justify-between items-start mb-2">
              <div className="space-y-0.5">
                <h4 className="text-sm font-medium text-gray-12">Silk Dress</h4>
                <p className="text-xs text-gray-11">Summer Collection</p>
              </div>
              <span className="text-sm font-medium text-gray-12">$120</span>
            </div>
            <Button className="w-full gap-0.5">
              <ShoppingBag className="icon" />
              Add to Cart
            </Button>
          </HoverCardContent>
        </HoverCard>
      </div>

      <div className="absolute bottom-2 left-2">
        <Button className="gap-0.5">
          <Tag className="icon" />
          <span>Shop Look</span>
        </Button>
      </div>
    </Card>
  );
}
