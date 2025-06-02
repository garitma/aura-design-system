#!/usr/bin/env node

import { program } from "commander";
import { registerInitCommand } from "../commands/init.js";
import { registerComponentsCommand } from "../commands/components.js";
import { registerHooksCommand } from "../commands/hooks.js";
import { registerUtilsCommand } from "../commands/utils.js";

registerInitCommand(program);
registerComponentsCommand(program);
registerHooksCommand(program);
registerUtilsCommand(program);

program.parse(process.argv);
