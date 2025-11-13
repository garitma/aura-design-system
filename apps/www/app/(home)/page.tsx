import Link from "next/link";

import { Button } from "@/components/ui/Button";
import Section from "@/components/Section";
import Image from "next/image";

export default function HomePage() {
  return (
    <main style={{ "--spacing": "13px" } as React.CSSProperties}>
      <Section container="smush">
        <div className="flex flex-col items-center justify-center text-center gap-1">
          <h1 className="font-bold">Welcome to my imagination</h1>
          <h3 className="h4">Just another design system with my own taste.</h3>
          <Button asChild>
            <Link href="/docs">Get Started</Link>
          </Button>
        </div>
      </Section>
    </main>
  );
}
