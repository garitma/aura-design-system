import chalk from "chalk";
import { getRegistryItems } from "../utils/registry-utils.js";
import { spawn } from "child_process";
import inquirer from "inquirer";

export function registerUtilsCommand(program) {
  const { utils } = getRegistryItems();

  const utilsCommand = program
    .command("utils")
    .description("Manage Utils in the Aura Design System");

  utilsCommand
    .command("list")
    .description("List all utils in the Aura Design System")
    .action(() => {
      utils.forEach((util) => {
        console.log(chalk.blue(`- ${util}`));
      });
    });

  utilsCommand
    .command("add [utilName]")
    .description("Select and add a util in the Aura Design System")
    .option("--local", "Use the local server instead of the remote server")
    .option("--overwrite", "Overwrite existing utils")
    .action(async (utilName, options) => {
      if (!utilName) {
        const answers = await inquirer.prompt([
          {
            type: "list",
            name: "selectedUtil",
            message: "Select a util to add:",
            choices: utils,
          },
        ]);
        utilName = answers.selectedUtil;
      }

      if (utilName === "all") {
        console.log(chalk.blue("Adding all utils from the registry..."));

        for (const util of utils) {
          const baseUrl = options.local
            ? "http://localhost:3000"
            : "https://auradesignsystem.com";
          const utilUrl = `${baseUrl}/r/${util.toLowerCase()}.json`;
          const command = "pnpm";
          const args = ["dlx", "shadcn@latest", "add", utilUrl];

          if (options.overwrite) {
            args.push("--overwrite");
          }

          console.log(chalk.blue(`Adding ${util} util...`));

          await new Promise((resolve, reject) => {
            const child = spawn(command, args, { stdio: "inherit" });

            child.on("error", (error) => {
              console.error(
                chalk.red(`Error adding ${util}: ${error.message}`)
              );
              reject(error);
            });

            child.on("close", (code) => {
              if (code === 0) {
                console.log(chalk.green(`${util} added successfully!`));
                resolve();
              } else {
                console.error(
                  chalk.red(
                    `Failed to add ${util}, exited with code ${code}`
                  )
                );
                reject(new Error(`Exited with code ${code}`));
              }
            });
          });
        }

        return;
      }

      if (utilName && !utils.includes(utilName)) {
        console.error(
          chalk.red(`Util '${utilName}' not found in the registry.`)
        );
        process.exit(1);
      }

      const baseUrl = options.local
        ? "http://localhost:3000"
        : "https://auradesignsystem.com";
      const utilUrl = `${baseUrl}/r/${utilName.toLowerCase()}.json`;
      const command = "pnpm";
      const args = ["dlx", "shadcn@latest", "add", utilUrl];

      if (options.overwrite) {
        args.push("--overwrite");
      }

      console.log(chalk.blue(`Adding ${utilName} util...`));

      const child = spawn(command, args, { stdio: "inherit" });

      child.on("error", (error) => {
        console.error(chalk.red(`Error executing command: ${error.message}`));
      });

      child.on("close", (code) => {
        if (code === 0) {
          console.log(chalk.green("Util added successfully!"));
        } else {
          console.error(chalk.red(`Command exited with code ${code}`));
        }
      });
    });
}