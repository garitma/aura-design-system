import { Command } from "commander";
import { execa } from "execa";

async function initializeAura() {
  console.log("Initializing Aura Design System...");
  console.log("Running shadcn init...\n");

  try {
    const projectDir = process.cwd();

    // Run shadcn init interactively - stdio: 'inherit' allows user to interact
    await execa(
      "pnpm",
      [
        "dlx",
        "shadcn@latest",
        "init",
        "--base-color",
        "neutral",
        "--no-base-style",
      ],
      {
        stdio: "inherit",
        cwd: projectDir,
      }
    );
    
  } catch (error) {
    console.error("Error initializing Aura:", error);
    process.exit(1);
  }
}

export function registerInitCommand(program: Command) {
  program
    .command("init")
    .description("Initialize Aura Design System")
    .action(async () => {
      await initializeAura();
    });
}
