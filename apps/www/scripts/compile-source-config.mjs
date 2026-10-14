import { postInstall } from "fumadocs-mdx/next";

await postInstall({
  configPath: "source.config.ts",
  outDir: ".source",
});
console.log("[MDX] .source ready");

