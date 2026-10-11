import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX({
  configPath: "source.config.ts",
  outDir: ".source",
  // Next 16.1 Turbopack rejects the default macro loader rules from fumadocs-mdx.
  macro: false,
});

const config: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    const utils = [
      "client-only",
      "direction",
      "hitbox",
      "pending",
      "portal",
      "presence",
      "visually-hidden",
      "visually-hidden-input",
    ];

    return [
      {
        source: "/docs/components/app-bar",
        destination: "/docs/components",
        permanent: true,
      },
      {
        source: "/docs/components/attachment",
        destination: "/docs/components",
        permanent: true,
      },
      ...utils.map((slug) => ({
        source: `/docs/components/${slug}`,
        destination: `/docs/utils/${slug}`,
        permanent: true,
      })),
    ];
  },
  async rewrites() {
    return [
      {
        source: "/docs/:slug*.md",
        destination: "/llms.mdx/docs/:slug*/content.md",
      },
    ];
  },
};

export default withMDX(config);
