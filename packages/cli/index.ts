#!/usr/bin/env node
import { Command } from "commander";
import { registerInitCommand } from "./commands/init";

const program = new Command();

registerInitCommand(program);

program.parse(process.argv);
