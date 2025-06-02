import chalk from "chalk";
import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import https from "https";
import { spawnSync } from 'child_process';


export function registerInitCommand(program) {
  program
    .command("init")
    .description("Initialize Aura Design System in your project")
    .action(async () => {
      console.log(chalk.blue("Initializing Aura Design System..."));
      try {
        const projectRoot = process.cwd();
        // 1. Check for package.json
        const pkgPath = path.join(projectRoot, "package.json");
        if (!fs.existsSync(pkgPath)) {
          console.error(chalk.red("No package.json found. Are you in a project root?"));
          process.exit(1);
        }
        const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
        const deps = { ...pkg.dependencies, ...pkg.devDependencies };
        if (!deps["next"]) {
          console.error(chalk.red("'next' is not listed as a dependency. This does not appear to be a Next.js project."));
          process.exit(1);
        }
        // 2. Check for next.config.js or next.config.ts
        const hasNextConfig = fs.existsSync(path.join(projectRoot, "next.config.js")) || fs.existsSync(path.join(projectRoot, "next.config.ts"));
        if (!hasNextConfig) {
          console.error(chalk.red("No next.config.js or next.config.ts found. This does not appear to be a Next.js project."));
          process.exit(1);
        }
        // 3. Check for app/globals.css
        const globalsCssPath = path.join(projectRoot, "app", "globals.css");
        if (!fs.existsSync(globalsCssPath)) {
          console.error(chalk.red("app/globals.css not found. Please ensure you have an 'app/globals.css' file."));
          process.exit(1);
        }

        // 4. Check for components.json
        const componentsJsonPath = path.join(projectRoot, "components.json");
        let shouldWrite = true;
        if (fs.existsSync(componentsJsonPath)) {
          const { overwrite } = await inquirer.prompt([
            {
              type: "confirm",
              name: "overwrite",
              message: "components.json already exists. Do you want to overwrite it?",
              default: false,
            },
          ]);
          shouldWrite = overwrite;
        }
        if (shouldWrite) {
          // Fetch components.json from remote
          await new Promise((resolve, reject) => {
            https.get("https://auradesignsystem.com/components.json", (res) => {
              let data = "";
              res.on("data", (chunk) => {
                data += chunk;
              });
              res.on("end", () => {
                try {
                  fs.writeFileSync(componentsJsonPath, data, "utf-8");
                  console.log(chalk.green("components.json has been created/updated from Aura Design System."));
                  resolve();
                } catch (err) {
                  reject(err);
                }
              });
            }).on("error", (err) => {
              reject(err);
            });
          });
        } else {
          console.log(chalk.yellow("Skipped overwriting components.json."));
        }
        // After components.json, run the shadcn add commands
        const styleResult = spawnSync('pnpm', ['dlx', 'shadcn', 'add', 'https://auradesignsystem.com/style.json'], { stdio: 'inherit' });
        if (styleResult.status !== 0) {
          console.error(chalk.red('Failed to add style.json with shadcn.'));
          process.exit(1);
        }
        const themeResult = spawnSync('pnpm', ['dlx', 'shadcn', 'add', 'https://auradesignsystem.com/theme.json'], { stdio: 'inherit' });
        if (themeResult.status !== 0) {
          console.error(chalk.red('Failed to add theme.json with shadcn.'));
          process.exit(1);
        }
        // Run aura css clean
        const cleanResult = spawnSync('aura', ['css', 'clean'], { stdio: 'inherit' });
        if (cleanResult.status !== 0) {
          console.error(chalk.red('Failed to run aura css clean.'));
          process.exit(1);
        }
        // Run aura css main
        const mainResult = spawnSync('aura', ['css', 'main'], { stdio: 'inherit' });
        if (mainResult.status !== 0) {
          console.error(chalk.red('Failed to run aura css main.'));
          process.exit(1);
        }
        // Run aura css link
        const linkResult = spawnSync('aura', ['css', 'link'], { stdio: 'inherit' });
        if (linkResult.status !== 0) {
          console.error(chalk.red('Failed to run aura css link.'));
          process.exit(1);
        }
        console.log(chalk.green("Aura Design System initialized successfully!"));
      } catch (error) {
        console.error(chalk.red("Error initializing Aura Design System:"), error);
      }
    });
}
