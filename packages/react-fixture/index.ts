#!/usr/bin/env node
import { Command } from "commander";
import { registerUpdateDepsCommand } from "./commands/update-deps.js";
import packageJson from "./package.json" with { type: "json" };

const program = new Command();

program
  .name("react-fixture")
  .description(packageJson.description)
  .version(packageJson.version);

registerUpdateDepsCommand(program);

program.parse(process.argv);

