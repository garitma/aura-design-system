#!/usr/bin/env node
import { Command } from "commander";
import { registerInitCommand } from "./commands/init.js";

const program = new Command();

registerInitCommand(program);

program.parse(process.argv);
