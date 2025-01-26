import Section from "@aura-design/system/section";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <>
      <Section>
        <div className="flex flex-col gap-1">
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
        <div>
          <Button></Button>
          <Button></Button>
        </div>
      </Section>
    </>
  );
}
