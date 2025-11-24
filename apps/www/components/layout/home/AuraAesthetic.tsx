"use client";

import { useState } from "react";
import Section from "@/components/Section";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";

export default function AuraAesthetic() {
  const [radius] = useState(0.5);

  return (
    <Section className="py-5 md:py-7.5">
      <div className="space-y-8">
        <div className="space-y-0.5 text-center">
          <h2 className="h2 font-bold text-gray-12">
            Make It Yours: Your Brand, Our Beautiful Base.
          </h2>
          <p className="p text-gray-11 text-lg">
            Aura isn't just a library; it's a starting point. Tweak the tokens
            to match your brand identity instantly.
          </p>
        </div>

        <div className="relative">
          <div
            className={`p-10 rounded-2xl border border-gray-6 transition-colors duration-300  bg-gray-1 text-gray-12"`}
          >
            {/* We apply the generated variables to this container */}
            <div
              className="max-w-md mx-auto space-y-6"
              style={{ "--radius": `${radius}rem` } as React.CSSProperties}
            >
              <Card
                className="bg-gray-2 border-gray-6"
                style={{ borderRadius: "var(--radius)" }}
              >
                <CardHeader>
                  <CardTitle>Create Account</CardTitle>
                  <CardDescription>
                    Enter your details to get started.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-1">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      placeholder="hello@example.com"
                      style={{ borderRadius: "var(--radius)" }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      style={{ borderRadius: "var(--radius)" }}
                    />
                  </div>
                  <Button
                    className="w-full bg-accent-9 hover:bg-accent-10 text-accent-contrast"
                    style={{
                      borderRadius: "var(--radius)",
                    }}
                  >
                    Sign Up
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
