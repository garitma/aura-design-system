import { postInstall } from "fumadocs-mdx/next";

/**
 * Generate `.source` after install. Prefer `postInstall` over the CLI:
 * `createMDX()` also initializes asynchronously; this keeps artifacts ready
 * before `next build` / Turbopack first resolve `@/.source`.
 */
await postInstall({
  configPath: "source.config.ts",
  outDir: ".source",
});
console.log("[MDX] .source ready");
