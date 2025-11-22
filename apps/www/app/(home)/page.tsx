import HeroSection from "@/components/layout/home/HeroSection";
import ArchitecturalAdvantage from "@/components/layout/home/ArchitecturalAdvantage";
import AuraAesthetic from "@/components/layout/home/AuraAesthetic";
import ComponentShowcase from "@/components/layout/home/ComponentShowcase";
import GettingStarted from "@/components/layout/home/GettingStarted";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ArchitecturalAdvantage />
      <AuraAesthetic />
      <ComponentShowcase />
      <GettingStarted />
    </main>
  );
}
