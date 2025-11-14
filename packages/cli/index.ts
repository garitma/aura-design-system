#!/usr/bin/env node
import { Command } from "commander";
import { registerInitCommand } from "./commands/init.js";
import { registerTypographyCommand } from "./commands/typography.js";
import { registerColorsCommand } from "./commands/colors.js";

const program = new Command();

registerInitCommand(program);
registerTypographyCommand(program);
registerColorsCommand(program);

program.parse(process.argv);
