"use client";

import Image from "next/image";

import { AspectRatio } from "@/components/ui/AspectRatio";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";

export function GardeningChecklist() {
    return (
        <Card className="relative overflow-hidden group">
            <AspectRatio ratio={4 / 5}>
                <Image
                    src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80"
                    alt="Plants"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </AspectRatio>

            <Card className="absolute bottom-1.5 right-1.5 w-16 p-1.5 bg-gray-2/90 backdrop-blur-md shadow-lg border-gray-6 rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
                <h4 className="h4 font-serif text-lg mb-1 text-success-contrast">To Water</h4>
                <div className="space-y-1">
                    <div className="flex items-center space-x-1">
                        <Checkbox id="plant1" className="data-[state=checked]:bg-success data-[state=checked]:border-success-contrast" />
                        <Label htmlFor="plant1" className="text-sm font-medium text-gray-12">Snake plant</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Checkbox id="plant2" defaultChecked className="data-[state=checked]:bg-success data-[state=checked]:border-success-contrast" />
                        <Label htmlFor="plant2" className="text-sm font-medium text-gray-11 line-through opacity-50">Pothos</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Checkbox id="plant3" className="data-[state=checked]:bg-success data-[state=checked]:border-success-contrast" />
                        <Label htmlFor="plant3" className="text-sm font-medium text-gray-12">Monstera</Label>
                    </div>
                </div>
            </Card>
        </Card>
    );
}
