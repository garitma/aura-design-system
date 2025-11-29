import HeroSection from "@/components/HeroSection";
import AuraAesthetic from "@/components/AuraAesthetic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aura Design System",
  description:
    "A collection of components built from our team's experience, distributed using the 'shadcn mode'. Built for our team, but you can use it too.",
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AuraAesthetic />
    </main>
  );
}
