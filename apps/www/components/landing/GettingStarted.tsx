import Section from "@/components/Section";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";

export default function GettingStarted() {
    return (
        <Section className="py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center space-y-12">
                <h2 className="h2 font-bold text-gray-12">Ready to Build? Let’s Get Started.</h2>

                <div className="grid md:grid-cols-2 gap-8 text-left">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="size-8 rounded-full bg-gray-12 text-gray-1 flex items-center justify-center font-bold">1</div>
                            <h3 className="h4 font-medium text-gray-12">Setup the CLI</h3>
                        </div>
                        <div className="bg-gray-12 text-gray-1 p-4 rounded-lg font-mono text-sm flex items-center gap-2">
                            <Terminal className="size-4 text-gray-8" />
                            <span>npx aura-cli init</span>
                        </div>
                        <p className="text-gray-11 text-sm">
                            Run the init command to configure your project and create the necessary directories.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="size-8 rounded-full bg-gray-12 text-gray-1 flex items-center justify-center font-bold">2</div>
                            <h3 className="h4 font-medium text-gray-12">Add Components</h3>
                        </div>
                        <div className="bg-gray-12 text-gray-1 p-4 rounded-lg font-mono text-sm flex items-center gap-2">
                            <Terminal className="size-4 text-gray-8" />
                            <span>npx aura-cli add button</span>
                        </div>
                        <p className="text-gray-11 text-sm">
                            Use the add command to install components directly into your project as source code.
                        </p>
                    </div>
                </div>

                <div className="pt-8">
                    <Button size="lg" asChild className="gap-2">
                        <Link href="/docs">
                            Read the Documentation <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </Section>
    );
}
