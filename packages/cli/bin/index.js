#!/usr/bin/env node

import { program } from "commander";
import { registerInitCommand } from "../commands/init.js";
import { registerComponentsCommand } from "../commands/components.js";
import { registerHooksCommand } from "../commands/hooks.js";
import { registerUtilsCommand } from "../commands/utils.js";
import { registerCssCommand } from "../commands/css.js";
import { registerUpgradeCommand } from "../commands/upgrade.js";
import { registerColorsCommand } from "../commands/colors.js";
import { registerThemeCommand } from "../commands/themes.js";
import { registerTypographyCommand } from "../commands/typography.js";

registerInitCommand(program);
registerComponentsCommand(program);
registerHooksCommand(program);
registerUtilsCommand(program);
registerCssCommand(program);
registerUpgradeCommand(program);
registerColorsCommand(program);
registerThemeCommand(program);
registerTypographyCommand(program);

program.parse(process.argv);
