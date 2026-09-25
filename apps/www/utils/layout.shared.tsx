import type { BaseLayoutProps } from "@/components/layout/shared/index";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(): BaseLayoutProps {
  return {
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [
      {
        text: "Get Started",
        url: "/docs",
        active: "nested-url",
      },
      {
        text: "Handbook",
        url: "/docs/handbook",
        active: "nested-url",
      },
      {
        text: "Rules",
        url: "/docs/rules",
        active: "nested-url",
      },
      {
        text: "Components",
        url: "/docs/components/accordion",
        active: "nested-url",
      },
     
      {
        text: "Forms",
        url: "/docs/forms",
        active: "nested-url",
      },
      {
        text: "DESIGN.md",
        url: "https://design-md.auradesignsystem.com/",
        active: "none",
      },
    ],
    searchToggle: {
      enabled: false,
    },
    githubUrl: "https://github.com/somosgented/aura-design-system",
  };
}
