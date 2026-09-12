import * as React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/Badge";
import { BadgeOverflow } from "@/components/ui/BadgeOverflow";
import { Button } from "@/components/ui/Button";

const frameworks = [
  "React",
  "TypeScript",
  "Next.js",
  "Tailwind",
  "Radix",
  "Vite",
  "Node.js",
  "GraphQL",
] as const;

const skills = [
  { id: 1, name: "Accessibility" },
  { id: 2, name: "Design systems" },
  { id: 3, name: "Motion" },
  { id: 4, name: "Typography" },
  { id: 5, name: "Theming" },
  { id: 6, name: "Forms" },
] as const;


export const BadgeOverflowDemo = () => (
  <div className="w-64">
    <BadgeOverflow
      className="gap-1"
      items={[...frameworks]}
      renderBadge={(_, label) => <Badge variant="secondary">{label}</Badge>}
    />
  </div>
)

export const BadgeOverflowDemoWithObjects = () => (
  <div className="w-64">
    <BadgeOverflow
      className="gap-1"
      items={[...skills]}
      getBadgeLabel={(item) => item.name}
      renderBadge={(_, label) => <Badge variant="secondary">{label}</Badge>}
    />
  </div>
)

export const BadgeOverflowDemoMultiLine = () => (
  <div className="w-64">
    <BadgeOverflow
      className="gap-1"
      items={[...frameworks]}
      lineCount={2}
      renderBadge={(_, label) => <Badge variant="secondary">{label}</Badge>}
    />
  </div>
)

export const BadgeOverflowDemoCustomOverflow = () => (
  <div className="w-64">
    <BadgeOverflow
      className="gap-1"
      items={[...frameworks]}
      renderBadge={(_, label) => <Badge variant="secondary">{label}</Badge>}
      renderOverflow={(count) => (
        <Badge className="bg-accent-9 text-accent-contrast hover:bg-accent-10">
          +{count} more
        </Badge>
      )}
    />
  </div>
)

export const BadgeOverflowDemoInteractiveTags = () => {
  const catalog = [
    "React",
    "Vue",
    "Svelte",
    "Solid",
    "Angular",
    "Qwik",
    "Astro",
    "Remix",
  ];
  const [tags, setTags] = React.useState(catalog.slice(0, 5));

  return (
    <div className="flex w-80 flex-col gap-2">
      <BadgeOverflow
        className="gap-1"
        items={tags}
        lineCount={2}
        renderBadge={(item) => (
          <Badge variant="secondary" className="gap-1 pr-1">
            {item}
            <button
              type="button"
              aria-label={`Remove ${item}`}
              className="inline-flex rounded-full p-0.5 hover:bg-gray-5"
              onClick={() =>
                setTags((current) => current.filter((tag) => tag !== item))
              }
            >
              <Cross2Icon className="icon" />
            </button>
          </Badge>
        )}
      />
      <div className="flex flex-wrap gap-1">
        {catalog
          .filter((item) => !tags.includes(item))
          .map((item) => (
            <Button
              key={item}
              type="button"
              variant="pill"
              size="sm"
              onClick={() => setTags((current) => [...current, item])}
            >
              Add {item}
            </Button>
          ))}
      </div>
    </div>
  );
};