import { Command } from "commander";
import { execa } from "execa";

async function initializeAura() {
  console.log("Initializing Aura Design System...");
  console.log("Running shadcn init...\n");

  try {
    // Run shadcn init interactively - stdio: 'inherit' allows user to interact
    await execa("pnpm", ["dlx", "shadcn@latest", "init"], {
      stdio: "inherit",
      cwd: process.cwd(),
    });

    // After shadcn init completes, generate and print TODO
    const todo = generateTodo();
    console.log("\n" + "=".repeat(50));
    console.log("TODO:");
    console.log("=".repeat(50));
    todo.forEach((item, index) => {
      console.log(`${index + 1}. ${item}`);
    });
    console.log("=".repeat(50));
  } catch (error) {
    console.error("Error initializing Aura:", error);
    process.exit(1);
  }
}

function generateTodo(): string[] {
  return [
    "Review and customize components.json configuration",
    "Install Aura Design System components",
    "Set up theme configuration",
    "Configure Tailwind CSS with Aura theme",
    "Import and use Aura components in your project",
  ];
}

export function registerInitCommand(program: Command) {
  program
    .command("init")
    .description("Initialize Aura Design System")
    .action(async () => {
      await initializeAura();
    });
}
