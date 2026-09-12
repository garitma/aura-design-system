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
