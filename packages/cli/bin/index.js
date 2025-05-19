#!/usr/bin/env node

import { program } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

import { modifyGlobalsCss } from "../utils/file-utils.js";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const registryPath = path.resolve(
  __dirname,
  "../../../apps/ladle/registry.json"
);

let components = [];
let hooks = [];
let utils = [];

try {
  const registryData = JSON.parse(fs.readFileSync(registryPath, "utf-8"));
  components = registryData.items
    .filter((item) => ["registry:component", "registry:ui"].includes(item.type))
    .map((item) => item.name)
    .sort();

  hooks = registryData.items
    .filter((item) => ["registry:hook"].includes(item.type))
    .map((item) => item.name)
    .sort();

  utils = registryData.items
    .filter((item) => ["registry:lib"].includes(item.type))
    .map((item) => item.name)
    .sort();
} catch (error) {
  console.error(chalk.red("Error reading registry file:"), error);
}

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
  .option("--name <componentName>", "Name of the component to add") // Added option for component name
  .option("--all", "Add all components from the registry") // Added option to add all components
  .action(async (options) => { // Changed to async
    if (options.all) {
      console.log(chalk.blue("Adding all components from the registry..."));

      for (const component of components) { // Changed to for...of loop for sequential execution
        const baseUrl = options.local
          ? "http://localhost:3000"
          : "https://auradesignsystem.com";
        const componentUrl = `${baseUrl}/r/${component.toLowerCase()}.json`;
        const command = "pnpm";
        const args = ["dlx", "shadcn@latest", "add", componentUrl];

        console.log(chalk.blue(`Adding ${component} component...`));

        await new Promise((resolve, reject) => { // Await each addition
          const child = spawn(command, args, { stdio: "inherit" });

          child.on("error", (error) => {
            console.error(chalk.red(`Error adding ${component}: ${error.message}`));
            reject(error);
          });

          child.on("close", (code) => {
            if (code === 0) {
              console.log(chalk.green(`${component} added successfully!`));
              resolve();
            } else {
              console.error(chalk.red(`Failed to add ${component}, exited with code ${code}`));
              reject(new Error(`Exited with code ${code}`));
            }
          });
        });
      }

      return;
    }

    const selectedComponent = options.name || null;

    if (selectedComponent && !components.includes(selectedComponent)) {
      console.error(chalk.red(`Component '${selectedComponent}' not found in the registry.`));
      process.exit(1);
    }

    const prompt = selectedComponent
      ? Promise.resolve({ component: selectedComponent })
      : inquirer.prompt([
          {
            type: "list",
            name: "component",
            message: "Select a component to add:",
            choices: components, // Use the provided components list
          },
        ]);

    prompt.then((answers) => {
      const baseUrl = options.local
        ? "http://localhost:3000"
        : "https://auradesignsystem.com";
      const componentUrl = `${baseUrl}/r/${answers.component.toLowerCase()}.json`;
      const command = "pnpm"; // Assuming pnpm is the package manager
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

const hooksCommand = program
  .command("hooks")
  .description("Manage hooks in the Aura Design System");

hooksCommand
  .command("list")
  .description("List all hooks in the Aura Design System")
  .action(() => {
    hooks.forEach((component) => {
      console.log(chalk.blue(`- ${component}`));
    });
  });

const utilsCommand = program
  .command("utils")
  .description("Manage Utils in the Aura Design System");

utilsCommand
  .command("list")
  .description("List all utils in the Aura Design System")
  .action(() => {
    utils.forEach((component) => {
      console.log(chalk.blue(`- ${component}`));
    });
  });

program.parse(process.argv);
