import { postInstall } from "fumadocs-mdx/next";

/** `createMDX()` initializes asynchronously, so `.source` must exist before Turbopack first resolves `@/.source`. */
await postInstall({
  configPath: "source.config.ts",
  outDir: ".source",
});
console.log("[MDX] .source ready");
