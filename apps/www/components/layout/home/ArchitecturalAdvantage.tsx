import Section from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Check, Code2, Layers, Lock, Zap } from "lucide-react";

const data = [
  {
    title: "Zero Dependency Risk",
    description:
      "Immune to external breaking changes. When you add a component, it's yours forever. No more fighting with npm peer dependencies or waiting for library updates.",
    icon: <Lock className="size-1.5" />,
  },
  {
    title: "Complete Control",
    description:
      "Modify component logic and styles without fighting complex overrides. Need to change how a dropdown behaves? Just edit the code directly in your project.",
    icon: <Layers className="size-1.5" />,
  },
  {
    title: "AI-Ready Architecture",
    description:
      "Clean, open code is optimized for emerging LLM development tools. AI agents can easily read, understand, and modify your components because they are standard React code.",
    icon: <Zap className="size-1.5" />,
  },
];

export default function ArchitecturalAdvantage() {
  return (
    <Section className="py-5 md:py-7.5 bg-gray-2 border-y border-gray-6">
      <div className="flex flex-col gap-3.5">
        <div className="text-center space-y-1 max-w-3xl mx-auto">
          <h2 className="h2 font-bold text-gray-12">
            Own Your Code, Own Your Future.
          </h2>
          <p className="p text-gray-11 text-lg">
            Skip Decision Fatigue, But Keep the Keys. We know starting from
            scratch can be exhausting. Aura gives you Beautiful Defaults—our
            tasteful, consistent components—so you can skip the hundreds of
            early design decisions. But because you install the source code,
            you're never locked in.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-2">
          {data.map((item, index) => (
            <Card className="bg-gray-1 border-gray-6" key={index}>
              <CardHeader>
                <div className="size-3 rounded-md bg-accent-3 flex items-center justify-center mb-1 text-accent-11">
                  {item.icon}
                </div>
                <CardTitle className="h4 text-gray-12">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-11">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
