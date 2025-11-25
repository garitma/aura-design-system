"use client";

import { Tag, ShoppingBag } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function ShoppingTag() {
    return (
        <Card className="relative h-full overflow-hidden group">
            <Image
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
                alt="Fashion"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative group/tag">
                    <div className="w-2 h-2 bg-white rounded-full shadow-lg cursor-pointer animate-pulse group-hover/tag:animate-none" />

                    <div className="absolute left-1/2 bottom-full mb-1 -translate-x-1/2 opacity-0 group-hover/tag:opacity-100 transition-all transform translate-y-1 group-hover/tag:translate-y-0 pointer-events-none group-hover/tag:pointer-events-auto">
                        <Card className="p-1.5 bg-gray-2/95 backdrop-blur-md border-gray-6 shadow-xl w-16 flex flex-col gap-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs font-medium text-gray-12">Silk Dress</p>
                                    <p className="text-xs text-gray-11">$120</p>
                                </div>
                            </div>
                            <Button className="w-full h-3 text-[10px] rounded-md gap-0.5 bg-accent-9 hover:bg-accent-10 text-white border-0">
                                <ShoppingBag className="w-1.5 h-1.5" />
                                Add
                            </Button>
                        </Card>
                        {/* Triangle pointer */}
                        <div className="absolute left-1/2 top-full -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-2/95" />
                    </div>
                </div>
            </div>

            <div className="absolute bottom-2 left-2">
                <Button className="h-4 px-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm border-0 gap-0.5 text-xs">
                    <Tag className="w-1.5 h-1.5" />
                    <span>Shop Look</span>
                </Button>
            </div>
        </Card>
    );
}
