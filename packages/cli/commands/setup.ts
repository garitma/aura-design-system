import { Command } from "commander";
import { existsSync } from "fs";
import { join, resolve } from "path";
import { applyAuraToProject } from "./init.js";

export function registerSetupCommand(program: Command) {
  program
    .command("setup")
    .description(
      "Apply Aura to an existing Next.js project (skips create-next-app; updates components.json, globals.css, adds registry packages, and runs blueprint)",
    )
    .option(
      "-d, --dir <path>",
      "Project root (default: current working directory)",
      process.cwd(),
    )
    .action(async (opts: { dir: string }) => {
      const appDir = resolve(opts.dir);
      const pkgPath = join(appDir, "package.json");
      if (!existsSync(pkgPath)) {
        console.error(
          `No package.json in ${appDir}. Use --dir to point at your app root, or run from that folder.`,
        );
        process.exit(1);
      }
      console.log(`Applying Aura Design System in: ${appDir}\n`);
      await applyAuraToProject(appDir);
    });
}
