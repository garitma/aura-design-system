import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REGISTRY_PATH = path.join(__dirname, "../registry.json");
const CUSTOM_ITEMS_PATH = path.join(__dirname, "../registry-items.custom.json");
const ROOT_COMPONENTS_PATH = path.join(__dirname, "../registry/default/components");
const UI_COMPONENTS_PATH = path.join(__dirname, "../registry/default/components/ui");
const UTILS_PATH = path.join(__dirname, "../registry/default/utils");
const STYLES_PATH = path.join(__dirname, "../registry/default/styles");

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
  title?: string;
  description?: string;
  files?: Array<{
    path: string;
    type: RegistryItemType;
  }>;
  dependencies?: string[];
  registryDependencies?: string[];
  cssVars?: {
    theme: Record<string, string>;
  };
  css?: Record<string, Record<string, string> | Record<string, Record<string, string>>>;
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

function getComponentItemsFromPath(dirPath: string, registryPrefix: string, itemType: RegistryItemType) {
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
        type: itemType,
        title: name,
        description: `The ${name} component.`,
        files: [
          {
            path: `${registryPrefix}/${file}`,
            type: itemType,
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
  const rootItems = getComponentItemsFromPath(ROOT_COMPONENTS_PATH, "registry/default/components", "registry:component");
  const uiItems = getComponentItemsFromPath(UI_COMPONENTS_PATH, "registry/default/components/ui", "registry:ui");
  
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

/**
 * Load custom registry items from registry-items.custom.json
 */
function getCustomItems(): RegistryItem[] {
  if (!fs.existsSync(CUSTOM_ITEMS_PATH)) {
    console.log("No custom items file found at", CUSTOM_ITEMS_PATH);
    return [];
  }

  try {
    const content = fs.readFileSync(CUSTOM_ITEMS_PATH, "utf-8");
    const customRegistry = JSON.parse(content);
    
    if (customRegistry.items && Array.isArray(customRegistry.items)) {
      console.log(`Loaded ${customRegistry.items.length} custom item(s) from registry-items.custom.json`);
      return customRegistry.items;
    }
    
    return [];
  } catch (error) {
    console.error("Error loading custom items:", error);
    return [];
  }
}

/**
 * Parse CSS variables from @theme block
 * Example: @theme animations { --animate-foo: bar 1s ease; }
 */
function parseCssVars(content: string): Record<string, string> {
  const vars: Record<string, string> = {};
  
  // Match @theme block (handles both "animations" and "animatons" typo)
  const themeMatch = content.match(/@theme\s+\w+\s*\{([^}]+)\}/);
  if (themeMatch) {
    const themeContent = themeMatch[1];
    // Match CSS variable declarations
    const varRegex = /(--[\w-]+)\s*:\s*([^;]+);/g;
    let match;
    while ((match = varRegex.exec(themeContent)) !== null) {
      vars[match[1].trim()] = match[2].trim();
    }
  }
  
  return vars;
}

/**
 * Parse @keyframes from CSS content
 * Returns an object with keyframe definitions
 */
function parseKeyframes(content: string): Record<string, Record<string, Record<string, string>>> {
  const keyframes: Record<string, Record<string, Record<string, string>>> = {};
  
  // First, extract the @layer components block
  const layerMatch = content.match(/@layer\s+\w+\s*\{([\s\S]*)\}/);
  const searchContent = layerMatch ? layerMatch[1] : content;
  
  // Match each @keyframes
  const keyframeBlockRegex = /@keyframes\s+([\w-]+)\s*\{([\s\S]*?)\n\s*\}/g;
  let match;
  
  while ((match = keyframeBlockRegex.exec(searchContent)) !== null) {
    const keyframeName = match[1];
    const keyframeContent = match[2];
    
    const frames: Record<string, Record<string, string>> = {};
    
    // Match frame selectors (from, to, percentages)
    const frameRegex = /(from|to|\d+%(?:\s*,\s*\d+%)*)\s*\{([^}]+)\}/g;
    let frameMatch;
    
    while ((frameMatch = frameRegex.exec(keyframeContent)) !== null) {
      const selector = frameMatch[1].trim();
      const properties = frameMatch[2];
      
      const props: Record<string, string> = {};
      // Match property declarations
      const propRegex = /([\w-]+)\s*:\s*([^;]+);?/g;
      let propMatch;
      
      while ((propMatch = propRegex.exec(properties)) !== null) {
        props[propMatch[1].trim()] = propMatch[2].trim();
      }
      
      frames[selector] = props;
    }
    
    keyframes[`@keyframes ${keyframeName}`] = frames;
  }
  
  return keyframes;
}

/**
 * Get animation style items from .animation.css files
 */
function getAnimationStyleItems(): RegistryItem[] {
  if (!fs.existsSync(STYLES_PATH)) return [];

  const files = fs.readdirSync(STYLES_PATH);
  return files
    .filter((file) => file.endsWith(".animation.css"))
    .map((file) => {
      const name = file.replace(".animation.css", "");
      const kebabName = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      const filePath = path.join(STYLES_PATH, file);
      const content = fs.readFileSync(filePath, "utf-8");
      
      const cssVars = parseCssVars(content);
      const keyframes = parseKeyframes(content);
      
      const item: RegistryItem = {
        name: `${kebabName}-animation`,
        type: "registry:style" as const,
      };
      
      // Add cssVars if there are any
      if (Object.keys(cssVars).length > 0) {
        item.cssVars = { theme: cssVars };
      }
      
      // Add css (keyframes) if there are any
      if (Object.keys(keyframes).length > 0) {
        item.css = keyframes;
      }
      
      return item;
    });
}

function buildRegistry() {
  const components = getComponentItems();
  const utils = getUtilsItems();
  const animationStyles = getAnimationStyleItems();
  const customItems = getCustomItems();

  registry.items = [...components, ...utils, ...animationStyles, ...customItems];

  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2));
  console.log(`Registry generated at ${REGISTRY_PATH}`);
}

buildRegistry();
