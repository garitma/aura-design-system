import path from "node:path";
import { start } from "fumadocs-mdx/next";

/**
 * Prefer `start()` over the `fumadocs-mdx` CLI postInstall: the CLI deletes
 * `.source` after compiling `source.config.mjs` into it, which races Turbopack
 * and yields "Cannot find module '.source/source.config.mjs'".
 */
await start(false, path.resolve("source.config.ts"), ".source");
console.log("[MDX] .source ready");
