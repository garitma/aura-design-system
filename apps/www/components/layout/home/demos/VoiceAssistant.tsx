"use client";

import { Mic, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export function VoiceAssistant() {
  return (
    <Card className="p-1 pl-2 flex items-center gap-1 bg-gray-2 border-gray-6 shadow-lg shadow-gray-a3">
      <div className="p-0.5 bg-gradient-to-tr from-accent-9 to-accent-11 rounded-full text-accent-contrast">
        <Sparkles className="icon" />
      </div>
      <Input
        className="border-0 bg-transparent text-gray-12"
        placeholder="Make me a fit..."
      />
      <Button>
        <Mic className="icon" />
      </Button>
    </Card>
  );
}
