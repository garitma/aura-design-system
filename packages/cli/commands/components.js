import { spawn } from "child_process";
import inquirer from "inquirer";
import chalk from "chalk";
import { getRegistryItems } from "../utils/registry-utils.js";

export function registerComponentsCommand(program) {
  const { components } = getRegistryItems();

  const componentsCommand = program
    .command("components")
    .description("Manage components in the Aura Design System");

  componentsCommand
    .command("list")
    .description("List all components in the Aura Design System")
    .action(() => {
      components.forEach((component) => {
        console.log(chalk.blue(`- ${component}`));
      });
    });

  componentsCommand
    .command("add [componentName]")
    .description("Select and add a component in the Aura Design System")
    .option("--local", "Use the local server instead of the remote server")
    .option("--overwrite", "Overwrite existing components")
    .action(async (componentName, options) => {
      if (!componentName) {
        const answers = await inquirer.prompt([
          {
            type: "list",
            name: "selectedComponent",
            message: "Select a component to add:",
            choices: components,
          },
        ]);
        componentName = answers.selectedComponent;
      }

      if (componentName === "all") {
        console.log(chalk.blue("Adding all components from the registry..."));

        for (const component of components) {
          const baseUrl = options.local
            ? "http://localhost:3000"
            : "https://auradesignsystem.com";
          const componentUrl = `${baseUrl}/r/${component.toLowerCase()}.json`;
          const command = "pnpm";
          const args = ["dlx", "shadcn@latest", "add", componentUrl];

          if (options.overwrite) {
            args.push("--overwrite");
          }

          console.log(chalk.blue(`Adding ${component} component...`));

          await new Promise((resolve, reject) => {
            const child = spawn(command, args, { stdio: "inherit" });

            child.on("error", (error) => {
              console.error(
                chalk.red(`Error adding ${component}: ${error.message}`)
              );
              reject(error);
            });

            child.on("close", (code) => {
              if (code === 0) {
                console.log(chalk.green(`${component} added successfully!`));
                resolve();
              } else {
                console.error(
                  chalk.red(
                    `Failed to add ${component}, exited with code ${code}`
                  )
                );
                reject(new Error(`Exited with code ${code}`));
              }
            });
          });
        }

        return;
      }

      if (componentName && !components.includes(componentName)) {
        console.error(
          chalk.red(`Component '${componentName}' not found in the registry.`)
        );

        process.exit(1);
      }

      const baseUrl = options.local
        ? "http://localhost:3000"
        : "https://auradesignsystem.com";
      const componentUrl = `${baseUrl}/r/${componentName.toLowerCase()}.json`;
      const command = "pnpm";
      const args = ["dlx", "shadcn@latest", "add", componentUrl];

      if (options.overwrite) {
        args.push("--overwrite");
      }

      console.log(chalk.blue(`Adding ${componentName} component...`));

      const child = spawn(command, args, { stdio: "inherit" });

      child.on("error", (error) => {
        console.error(chalk.red(`Error executing command: ${error.message}`));
      });

      child.on("close", (code) => {
        if (code === 0) {
          console.log(chalk.green("Component added successfully!"));
        } else {
          console.error(chalk.red(`Command exited with code ${code}`));
        }
      });
    });
}