import { Command } from "commander";
import { mkdirSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import chalk from "chalk";

/** Canonical Aura shadcn config (same source as the docs site). */
export const AURA_COMPONENTS_JSON_URL =
  "https://raw.githubusercontent.com/garitma/aura-design-system/main/apps/www/components.json";

export function registerLinkCommand(program: Command) {
  program
    .command("link")
    .description(
      "Download Aura components.json (shadcn config with @aura registry) into your project",
    )
    .option(
      "-o, --output <path>",
      "Output path (relative to cwd)",
      "components.json",
    )
    .action(async (options: { output: string }) => {
      const outPath = resolve(process.cwd(), options.output);
      const url = new URL(AURA_COMPONENTS_JSON_URL);

      const res = await fetch(url, {
        headers: {
          Accept: "application/json, text/plain;q=0.9,*/*;q=0.8",
        },
      });

      if (!res.ok) {
        console.error(
          chalk.red(`Request failed: ${res.status} ${res.statusText}`),
        );
        process.exit(1);
      }

      const text = await res.text();
      let data: unknown;
      try {
        data = JSON.parse(text);
      } catch {
        console.error(chalk.red("Response is not valid JSON."));
        process.exit(1);
      }

      const formatted = `${JSON.stringify(data, null, 2)}\n`;
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, formatted, "utf-8");

      console.log(chalk.green(`Wrote ${outPath}`));
    });
}
