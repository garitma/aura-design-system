import HeroSection from "@/components/landing/HeroSection";
import ArchitecturalAdvantage from "@/components/landing/ArchitecturalAdvantage";
import AuraAesthetic from "@/components/landing/AuraAesthetic";
import ComponentShowcase from "@/components/landing/ComponentShowcase";
import GettingStarted from "@/components/landing/GettingStarted";


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
