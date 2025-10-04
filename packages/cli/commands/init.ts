import { Command } from "commander";

async function initializeAura() {
  console.log("Initializing Aura");
}

export function registerInitCommand(program: Command) {
  program
    .command("init")
    .description("Initialize Aura Design System")
    .action(async () => {
      await initializeAura();
    });
}
