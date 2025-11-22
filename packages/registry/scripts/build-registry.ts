import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REGISTRY_PATH = path.join(__dirname, "../registry.json");
const COMPONENTS_PATH = path.join(__dirname, "../registry/default/components/ui");
const UTILS_PATH = path.join(__dirname, "../registry/default/utils");

type RegistryItemType = 
  | "registry:lib"
  | "registry:block"
  | "registry:component"
  | "registry:ui"
  | "registry:hook"
  | "registry:theme"
  | "registry:page"
  | "registry:file"
  | "registry:style"
  | "registry:item";

interface RegistryItem {
  name: string;
  type: RegistryItemType;
  title: string;
  description: string;
  files: Array<{
    path: string;
    type: RegistryItemType;
  }>;
  dependencies?: string[];
  registryDependencies?: string[];
}

const registry = {
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "Aura Design System",
  "homepage": "https://auradesignsystem.com",
  "items": [] as RegistryItem[]
};

function getComponentItems() {
  if (!fs.existsSync(COMPONENTS_PATH)) return [];
  
  const files = fs.readdirSync(COMPONENTS_PATH);
  return files
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => {
      const name = file.replace(".tsx", "");
      const kebabName = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      
      return {
        name: kebabName,
        type: "registry:ui" as const,
        title: name,
        description: `The ${name} component.`,
        files: [
          {
            path: `registry/default/components/ui/${file}`,
            type: "registry:ui" as const,
          },
        ],
      };
    });
}

function getUtilsItems() {
  if (!fs.existsSync(UTILS_PATH)) return [];

  const files = fs.readdirSync(UTILS_PATH);
  return files
    .filter((file) => file.endsWith(".ts"))
    .map((file) => {
      const name = file.replace(".ts", "");
      const kebabName = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

      return {
        name: kebabName,
        type: "registry:lib" as const,
        title: name,
        description: `Utility: ${name}`,
        files: [
          {
            path: `registry/default/utils/${file}`,
            type: "registry:lib" as const,
          },
        ],
      };
    });
}

function buildRegistry() {
  const components = getComponentItems();
  const utils = getUtilsItems();

  registry.items = [...components, ...utils];

  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2));
  console.log(`Registry generated at ${REGISTRY_PATH}`);
}

buildRegistry();
