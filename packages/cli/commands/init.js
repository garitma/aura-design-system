import chalk from "chalk";
import { modifyGlobalsCss } from "../utils/file-utils.js";

export function registerInitCommand(program) {
  program
    .command("init")
    .description("Initialize Aura Design System in your project")
    .action(async () => {
      console.log(chalk.blue("Initializing Aura Design System..."));
      try {
        await modifyGlobalsCss();
        console.log(chalk.green("Aura Design System initialized successfully!"));
      } catch (error) {
        console.error(chalk.red("Error initializing Aura Design System:"), error);
      }
    });
}
