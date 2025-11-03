import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 512 512"
            version="1.1"
            className="icon h5"
            style={{
              fillRule: "evenodd",
              clipRule: "evenodd",
              strokeLinejoin: "round",
              strokeMiterlimit: 2,
            }}
          >
            <circle
              id="Elipse-1-copia-3"
              cx="258.188"
              cy="258.719"
              r="236.344"
              style={{ fill: "#010927" }}
            />
            <circle
              id="Elipse-1-copia-4"
              cx="258.188"
              cy="258.719"
              r="219.969"
              style={{ fill: "#5dfbdd" }}
            />
            <circle
              id="Elipse-1-copia-2"
              cx="258.188"
              cy="258.719"
              r="203.594"
              style={{ fill: "#04123e" }}
            />
            <circle
              id="Elipse-1"
              cx="258.172"
              cy="258.734"
              r="182.859"
              style={{ fill: "#dda0fe" }}
            />
            <ellipse
              id="Elipse-1-copia"
              cx="258.188"
              cy="258.734"
              rx="159.938"
              ry="159.922"
              style={{ fill: "#04123e" }}
            />
          </svg>
          Aura Design System
        </>
      ),
    },
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [],
  };
}
