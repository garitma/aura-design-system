import chalk from "chalk";
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";

export function registerUpgradeCommand(program) {
  program
    .command("upgrade")
    .description("Upgrade the Aura CLI to the latest version globally")
    .action(() => {
      let pkgManager = "pnpm";
      const projectRoot = process.cwd();
      if (fs.existsSync(path.join(projectRoot, "yarn.lock"))) {
        pkgManager = "yarn";
      } else if (fs.existsSync(path.join(projectRoot, "package-lock.json"))) {
        pkgManager = "npm";
      }
      let upgradeCmd;
      let args;
      switch (pkgManager) {
        case "yarn":
          upgradeCmd = "yarn";
          args = ["global", "add", "@aura-design/cli@latest"];
          break;
        case "npm":
          upgradeCmd = "npm";
          args = ["install", "-g", "@aura-design/cli@latest"];
          break;
        default:
          upgradeCmd = "pnpm";
          args = ["add", "-g", "@aura-design/cli@latest"];
      }
      console.log(chalk.blue(`Upgrading @aura-design/cli globally using ${pkgManager}...`));
      const result = spawnSync(upgradeCmd, args, { stdio: "inherit" });
      if (result.status === 0) {
        console.log(chalk.green("@aura-design/cli upgraded to the latest global version!"));
      } else {
        console.error(chalk.red("Failed to upgrade @aura-design/cli globally. Please try manually."));
        process.exit(1);
      }
    });
} 