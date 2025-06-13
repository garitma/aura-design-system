import chalk from "chalk";
import { getRegistryItems } from "../utils/registry-utils.js";
import { spawn } from "child_process";
import inquirer from "inquirer";

export function registerHooksCommand(program) {
  const { hooks } = getRegistryItems();

  const hooksCommand = program
    .command("hooks")
    .description("Manage hooks in the Aura Design System");

  hooksCommand
    .command("list")
    .description("List all hooks in the Aura Design System")
    .action(() => {
      hooks.forEach((hook) => {
        console.log(chalk.blue(`- ${hook}`));
      });
    });

  hooksCommand
    .command("add [hookName]")
    .description("Select and add a hook in the Aura Design System")
    .option("--local", "Use the local server instead of the remote server")
    .option("--overwrite", "Overwrite existing hooks")
    .action(async (hookName, options) => {
      if (!hookName) {
        const answers = await inquirer.prompt([
          {
            type: "list",
            name: "selectedHook",
            message: "Select a hook to add:",
            choices: hooks,
          },
        ]);
        hookName = answers.selectedHook;
      }

      if (hookName === "all") {
        console.log(chalk.blue("Adding all hooks from the registry..."));

        for (const hook of hooks) {
          const baseUrl = options.local
            ? "http://localhost:3000"
            : "https://auradesignsystem.com";
          const hookUrl = `${baseUrl}/r/${hook.toLowerCase()}.json`;
          const command = "pnpm";
          const args = ["dlx", "shadcn@latest", "add", hookUrl];

          if (options.overwrite) {
            args.push("--overwrite");
          }

          console.log(chalk.blue(`Adding ${hook} hook...`));

          await new Promise((resolve, reject) => {
            const child = spawn(command, args, { stdio: "inherit" });

            child.on("error", (error) => {
              console.error(
                chalk.red(`Error adding ${hook}: ${error.message}`)
              );
              reject(error);
            });

            child.on("close", (code) => {
              if (code === 0) {
                console.log(chalk.green(`${hook} added successfully!`));
                resolve();
              } else {
                console.error(
                  chalk.red(
                    `Failed to add ${hook}, exited with code ${code}`
                  )
                );
                reject(new Error(`Exited with code ${code}`));
              }
            });
          });
        }

        return;
      }

      if (hookName && !hooks.includes(hookName)) {
        console.error(
          chalk.red(`Hook '${hookName}' not found in the registry.`)
        );
        process.exit(1);
      }

      const baseUrl = options.local
        ? "http://localhost:3000"
        : "https://auradesignsystem.com";
      const hookUrl = `${baseUrl}/r/${hookName.toLowerCase()}.json`;
      const command = "pnpm";
      const args = ["dlx", "shadcn@latest", "add", hookUrl];

      if (options.overwrite) {
        args.push("--overwrite");
      }

      console.log(chalk.blue(`Adding ${hookName} hook...`));

      const child = spawn(command, args, { stdio: "inherit" });

      child.on("error", (error) => {
        console.error(chalk.red(`Error executing command: ${error.message}`));
      });

      child.on("close", (code) => {
        if (code === 0) {
          console.log(chalk.green("Hook added successfully!"));
        } else {
          console.error(chalk.red(`Command exited with code ${code}`));
        }
      });
    });
}