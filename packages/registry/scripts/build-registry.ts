import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REGISTRY_PATH = path.join(__dirname, "../registry.json");
const ROOT_COMPONENTS_PATH = path.join(__dirname, "../registry/default/components");
const UI_COMPONENTS_PATH = path.join(__dirname, "../registry/default/components/ui");
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

/**
 * Extract external dependencies from a file by parsing import statements
 * Excludes react, react-dom, and internal imports (starting with @/)
 */
function extractDependencies(filePath: string): string[] {
  const content = fs.readFileSync(filePath, "utf-8");
  const dependencies = new Set<string>();
  
  // Match import statements: import ... from "package" or import ... from 'package'
  const importRegex = /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)\s+from\s+)?["']([^"']+)["']/g;
  
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    
    // Skip relative imports (starting with . or /)
    if (importPath.startsWith('.') || importPath.startsWith('/')) {
      continue;
    }
    
    // Skip internal imports (starting with @/)
    if (importPath.startsWith('@/')) {
      continue;
    }
    
    // Skip react and react-dom
    if (importPath === 'react' || importPath === 'react-dom' || importPath === 'react/jsx-runtime') {
      continue;
    }
    
    // Extract package name (handle scoped packages like @radix-ui/react-icons)
    let packageName = importPath;
    if (importPath.startsWith('@')) {
      // Scoped package: @scope/package or @scope/package/subpath
      const parts = importPath.split('/');
      packageName = `${parts[0]}/${parts[1]}`;
    } else {
      // Regular package: package or package/subpath
      packageName = importPath.split('/')[0];
    }
    
    dependencies.add(packageName);
  }
  
  return Array.from(dependencies).sort();
}

function getComponentItemsFromPath(dirPath: string, registryPrefix: string) {
  if (!fs.existsSync(dirPath)) return [];
  
  const files = fs.readdirSync(dirPath);
  return files
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => {
      const name = file.replace(".tsx", "");
      const kebabName = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      const filePath = path.join(dirPath, file);
      
      // Extract external dependencies from the component file
      const dependencies = extractDependencies(filePath);
      
      const item: RegistryItem = {
        name: kebabName,
        type: "registry:ui" as const,
        title: name,
        description: `The ${name} component.`,
        files: [
          {
            path: `${registryPrefix}/${file}`,
            type: "registry:ui" as const,
          },
        ],
      };
      
      // Only add dependencies field if there are external dependencies
      if (dependencies.length > 0) {
        item.dependencies = dependencies;
      }
      
      return item;
    });
}

function getComponentItems() {
  const rootItems = getComponentItemsFromPath(ROOT_COMPONENTS_PATH, "registry/default/components");
  const uiItems = getComponentItemsFromPath(UI_COMPONENTS_PATH, "registry/default/components/ui");
  
  return [...rootItems, ...uiItems];
}

function getUtilsItems() {
  if (!fs.existsSync(UTILS_PATH)) return [];

  const files = fs.readdirSync(UTILS_PATH);
  return files
    .filter((file) => file.endsWith(".ts"))
    .map((file) => {
      const name = file.replace(".ts", "");
      const kebabName = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      const filePath = path.join(UTILS_PATH, file);
      
      // Extract external dependencies from the utility file
      const dependencies = extractDependencies(filePath);
      
      const item: RegistryItem = {
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
      
      // Only add dependencies field if there are external dependencies
      if (dependencies.length > 0) {
        item.dependencies = dependencies;
      }
      
      return item;
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
