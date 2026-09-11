import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createMDX } from "fumadocs-mdx/next";

const require = createRequire(import.meta.url);
const dir = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(dir, "source.config.ts");
const outDir = path.join(dir, ".source");

// Sync-compile before Turbopack loads MDX. createMDX() only fire-and-forgets
// start(), which races and yields "Cannot find module source.config.mjs".
mkdirSync(outDir, { recursive: true });
const fumadocsMdxDir = path.dirname(require.resolve("fumadocs-mdx/next"));
const { buildSync } = require(
  require.resolve("esbuild", { paths: [fumadocsMdxDir] })
);
buildSync({
  entryPoints: [{ in: configPath, out: "source.config" }],
  bundle: true,
  outdir: outDir,
  target: "node20",
  write: true,
  platform: "node",
  format: "esm",
  packages: "external",
  outExtension: { ".js": ".mjs" },
  allowOverwrite: true,
});

const withMDX = createMDX({ configPath, outDir });

/** @type {import('next').NextConfig} */
const config = {
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
};

export default withMDX(config);
