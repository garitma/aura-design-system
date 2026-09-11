import fs from "fs";
import path from "path";
import chalk from "chalk";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export function getRegistryItems() {
  const registryPath = path.resolve(__dirname, "../registry.json");
  let components = [];
  let hooks = [];
  let utils = [];
  let css = [];
  let rules = [];
  let skills = [];

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

    css = registryData.items
      .filter((item) => ["registry:file"].includes(item.type) && item.meta?.css)
      .map((item) => item.name)
      .sort();

    rules = registryData.items
      .filter((item) => ["registry:file"].includes(item.type) && item.name?.startsWith("rule-"))
      .map((item) => item.name)
      .sort();

    skills = registryData.items
      .filter((item) => ["registry:file"].includes(item.type) && item.name?.startsWith("skill-"))
      .map((item) => item.name)
      .sort();
  } catch (error) {
    console.error(chalk.red("Error reading registry file:"), error);
  }

  return { components, hooks, utils, css, rules, skills };
}