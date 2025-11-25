"use client";

import { Mic, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export function VoiceAssistant() {
    return (
        <Card className="rounded-full p-1 pl-2 flex items-center gap-1 bg-gray-2/80 backdrop-blur-xl border-gray-6 shadow-lg shadow-black/5">
            <div className="p-0.5 bg-gradient-to-tr from-accent-9 to-accent-11 rounded-full text-white">
                <Sparkles className="w-2 h-2" />
            </div>
            <Input
                className="border-0 bg-transparent shadow-none focus-visible:ring-0 px-0 h-auto placeholder:text-gray-11 font-medium text-gray-12"
                placeholder="Make me a fit..."
            />
            <Button className="rounded-full h-4 w-4 shrink-0 p-0 flex items-center justify-center">
                <Mic className="w-2 h-2" />
            </Button>
        </Card>
    );
}
