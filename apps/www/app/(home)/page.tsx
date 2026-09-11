import {
  BookmarkIcon,
  MixerHorizontalIcon,
  Pencil1Icon,
  MagicWandIcon,
} from "@radix-ui/react-icons";

import HeroSection from "@/components/HeroSection";
import HomeDocSection from "@/components/HomeDocSection";
import AuraAesthetic from "@/components/AuraAesthetic";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HomeDocSection
        title="Handbook"
        description="Reference for styling, animations, composition, and customization when building with Aura."
        href="/docs/handbook"
        icon={<BookmarkIcon className="icon h4" />}
      />
      <HomeDocSection
        title="MCP"
        description="Connect Cursor to shadcn registries and recreate components in Aura from a pasted link."
        href="/docs/mcp"
        icon={<MagicWandIcon className="icon h4" />}
      />
      <HomeDocSection
        title="Rules"
        description="Cursor and AI rules for foundations and principles. Install via the registry or copy into .cursor/rules/."
        href="/docs/rules"
        icon={<MixerHorizontalIcon className="icon h4" />}
      />
      <HomeDocSection
        title="Forms"
        description="Declarative form state, validation, and UI with useFormDynamic and Form components."
        href="/docs/forms"
        icon={<Pencil1Icon className="icon h4" />}
      />
      <AuraAesthetic />
    </main>
  );
}
