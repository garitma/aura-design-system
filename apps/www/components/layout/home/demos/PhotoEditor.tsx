"use client";

import { Crop, RotateCw, Sliders, Wand2 } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ScrollArea, ScrollBar } from "@/components/ui/ScrollArea";

const FILTERS = [
    { name: "None", src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=150&h=150&fit=crop" },
    { name: "Vivid", src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=150&h=150&fit=crop&sat=50" },
    { name: "B&W", src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=150&h=150&fit=crop&sat=-100" },
    { name: "Warm", src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=150&h=150&fit=crop&temp=20" },
    { name: "Cool", src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=150&h=150&fit=crop&temp=-20" },
];

export function PhotoEditor() {
    return (
        <Card className="h-full bg-gray-2 text-gray-12 border-gray-6 flex flex-col overflow-hidden">
            <div className="relative flex-1 bg-gray-3 min-h-[200px]">
                <Image
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
                    alt="Preview"
                    fill
                    className="object-contain p-1.5"
                />
                <div className="absolute top-1.5 right-1.5 flex flex-col gap-0.5">
                    <Button className="h-4 w-4 rounded-full bg-gray-1/50 text-gray-12 hover:bg-gray-1/70 border-0 p-0 flex items-center justify-center">
                        <Crop className="w-2 h-2" />
                    </Button>
                    <Button className="h-4 w-4 rounded-full bg-gray-1/50 text-gray-12 hover:bg-gray-1/70 border-0 p-0 flex items-center justify-center">
                        <RotateCw className="w-2 h-2" />
                    </Button>
                </div>
            </div>

            <div className="p-1.5 bg-gray-2 border-t border-gray-6 space-y-1.5">
                <div className="flex items-center justify-between px-0.5">
                    <span className="text-xs font-medium text-gray-11">Filters</span>
                    <Wand2 className="w-2 h-2 text-accent-9" />
                </div>
                <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex w-max space-x-1.5 pb-0.5">
                        {FILTERS.map((filter) => (
                            <button key={filter.name} className="flex flex-col items-center gap-0.5 group">
                                <div className="relative w-6 h-6 rounded-lg overflow-hidden border-2 border-transparent group-hover:border-accent-9 transition-all">
                                    <Image src={filter.src} alt={filter.name} fill className="object-cover" />
                                </div>
                                <span className="text-[10px] text-gray-11 group-hover:text-gray-12 transition-colors">{filter.name}</span>
                            </button>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" className="hidden" />
                </ScrollArea>
            </div>
        </Card>
    );
}
