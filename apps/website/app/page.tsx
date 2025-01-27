import Link from "next/link";

import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import CommandLine from "@/components/CommandLine";

export default function Home() {
  return (
    <>
      <Section>
        <div className="flex flex-col">
          <h1>
            Aura Design System is a modern approach to styling and spacing in
            web development
          </h1>
          <p>
            Efficient, CSS-first components designed to seamlessly coexist with
            Tailwind CSS and Radix UI. Build beautiful, consistent, and
            responsive web applications with a focus on intuitive spacing and
            design.
          </p>
        </div>
        <div className="mt-0.5 md:flex items-center gap-1">
          <div className="items-center">
            <Link href="/start">
              <Button className="w-full md:w-auto">Get Starter</Button>
            </Link>
          </div>
          <div className="w-full md:w-[400px]">
            <CommandLine code="pnpm install @aura-design/system" />
          </div>
        </div>
      </Section>
    </>
  );
}
