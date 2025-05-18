#!/usr/bin/env node

import { program } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import { exec, spawn } from "child_process";

import { modifyGlobalsCss } from "../utils/file-utils.js";

const components = ["Accordion", "AccordionList"];

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
  .command("add")
  .description("Select and add a component in the Aura Design System")
  .option("--local", "Use the local server instead of the remote server")
  .action((options) => {
    console.log(chalk.blue("Available components:"));

    inquirer
      .prompt([
        {
          type: "list",
          name: "component",
          message: "Select a component to add:",
          choices: components,
        },
      ])
      .then((answers) => {
        const baseUrl = options.local ? "https://localhost:3000" : "https://auradesignsystem.com";
        const componentUrl = `${baseUrl}/r/${answers.component.toLowerCase()}.json`;
        const command = "pnpm";
        const args = ["dlx", "shadcn@latest", "add", componentUrl];

        console.log(chalk.blue(`Adding ${answers.component} component...`));

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
  });

program.parse(process.argv);
