import Link from "next/link";
import { Button } from "@/components/ui/Button";
import Section from "@/components/Section";

export default function HeroSection() {
    return (
        <Section className="pt-6 pb-5 md:pt-10 md:pb-7.5">
            <div className="flex flex-col items-center text-center gap-0.5 max-w-4xl mx-auto">
                <div className="space-y-1">
                    <h1 className="h1 font-bold tracking-tight text-gray-12">
                        Beautiful Components, Full Control. <br className="hidden md:block" />
                        <span className="text-gray-11">Start with Great Taste, Finish with Your Own Vision.</span>
                    </h1>
                    <p className="p text-gray-11 max-w-2xl mx-auto text-lg">
                        Unbundled and Opinionated. We provide a thoughtfully styled, production-ready foundation that you install as source code, not a dependency. Say goodbye to version conflicts and unexpected updates.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-1 items-center">
                    <Button size="lg" asChild>
                        <Link href="/docs">Explore Components</Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                        <Link href="https://github.com/garitma/aura-design-system" target="_blank" rel="noopener noreferrer">
                            View on GitHub
                        </Link>
                    </Button>
                </div>

                <div className="pt-2.5 flex items-center gap-1 text-sm text-gray-11">
                    <div className="flex items-center gap-2">
                        <div className="size-0.5 rounded-full bg-accent-9" />
                        <span>Accessible Primitives (Radix UI)</span>
                    </div>
                    <div className="w-px h-1 bg-gray-6" />
                    <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-accent-9" />
                        <span>Utility-First Styling (Tailwind)</span>
                    </div>
                </div>
            </div>
        </Section>
    );
}
