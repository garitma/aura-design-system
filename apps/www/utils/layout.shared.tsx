import type { BaseLayoutProps } from "@/components/layout/shared/index";

export function baseOptions(): BaseLayoutProps {
  return {
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
        text: "Utils",
        url: "/docs/utils",
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

