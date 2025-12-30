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
const HOOKS_PATH = path.join(__dirname, "../registry/default/hooks");
const STYLES_PATH = path.join(__dirname, "../registry/default/styles");
const BLOCKS_PATH = path.join(__dirname, "../registry/default/blocks");
const WWW_COMPONENTS_PATH = path.join(__dirname, "../../../apps/www/components");
const WWW_UI_COMPONENTS_PATH = path.join(__dirname, "../../../apps/www/components/ui");

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
    target?: string;
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

/**
 * Extract registry dependencies (internal hooks, utils, and components) from a file by parsing import statements
 * Converts @/hooks/use-as-ref to @aura/use-as-ref
 * Converts @/utils/class-names to @aura/class-names
 * Converts @/components/ComboboxSingle to @aura/combobox-single
 */
function extractRegistryDependencies(filePath: string): string[] {
  const content = fs.readFileSync(filePath, "utf-8");
  const registryDeps = new Set<string>();
  
  // Match import statements: import ... from "package" or import ... from 'package'
  const importRegex = /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)\s+from\s+)?["']([^"']+)["']/g;
  
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    
    // Only process internal imports (starting with @/)
    if (!importPath.startsWith('@/')) {
      continue;
    }
    
    // Check if it's a hook import
    if (importPath.startsWith('@/hooks/')) {
      // Extract hook name: @/hooks/use-as-ref -> use-as-ref
      const hookPath = importPath.replace('@/hooks/', '');
      const hookName = hookPath.split('/')[0]; // Handle subpaths if any
      // Convert to kebab-case if needed (most hooks are already kebab-case)
      const kebabName = hookName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      registryDeps.add(`@aura/${kebabName}`);
    } 
    // Check if it's a util import
    else if (importPath.startsWith('@/utils/')) {
      // Extract util name: @/utils/class-names -> class-names
      const utilPath = importPath.replace('@/utils/', '');
      const utilName = utilPath.split('/')[0]; // Handle subpaths if any
      // Convert to kebab-case if needed (most utils are already kebab-case)
      const kebabName = utilName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      registryDeps.add(`@aura/${kebabName}`);
    }
    // Check if it's a component import
    else if (importPath.startsWith('@/components/')) {
      // Extract component name: 
      // @/components/ComboboxSingle -> combobox-single
      // @/components/ui/Combobox -> combobox
      const componentPath = importPath.replace('@/components/', '');
      const pathParts = componentPath.split('/');
      
      // If it's @/components/ui/ComponentName, extract ComponentName
      // Otherwise extract the first part (which is the component name)
      const componentName = pathParts[0] === 'ui' && pathParts.length > 1 
        ? pathParts[1] 
        : pathParts[0];
      
      // Convert PascalCase to kebab-case: ComboboxSingle -> combobox-single
      const kebabName = componentName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      registryDeps.add(`@aura/${kebabName}`);
    }
  }
  
  return Array.from(registryDeps).sort();
}

/**
 * Recursively collect all TypeScript/TSX files from a directory
 */
function collectFilesRecursively(dirPath: string, basePath: string, relativePath: string = ""): string[] {
  const files: string[] = [];
  const fullPath = path.join(dirPath, relativePath);
  
  if (!fs.existsSync(fullPath)) return files;
  
  const entries = fs.readdirSync(fullPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const entryPath = path.join(relativePath, entry.name);
    const fullEntryPath = path.join(fullPath, entry.name);
    
    if (entry.isDirectory()) {
      // Recursively collect files from subdirectories
      files.push(...collectFilesRecursively(dirPath, basePath, entryPath));
    } else if (entry.isFile() && (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx"))) {
      files.push(entryPath);
    }
  }
  
  return files;
}

function getComponentItemsFromPath(dirPath: string, registryPrefix: string, itemType: RegistryItemType) {
  if (!fs.existsSync(dirPath)) return [];
  
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const items: RegistryItem[] = [];
  
  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      // Handle component directories (like Editor)
      const componentName = entry.name;
      const kebabName = componentName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      
      // Recursively collect all files from the component directory
      const allFiles = collectFilesRecursively(entryPath, entryPath);
      const tsFiles = allFiles.filter((file) => 
        file.endsWith(".ts") || file.endsWith(".tsx")
      );
      
      if (tsFiles.length === 0) continue;
      
      // Collect all dependencies from all files in the component directory
      const allDependencies = new Set<string>();
      const allRegistryDependencies = new Set<string>();
      
      tsFiles.forEach((file) => {
        const filePath = path.join(entryPath, file);
        if (fs.existsSync(filePath)) {
          const dependencies = extractDependencies(filePath);
          const registryDependencies = extractRegistryDependencies(filePath);
          
          dependencies.forEach((dep) => allDependencies.add(dep));
          registryDependencies.forEach((dep) => allRegistryDependencies.add(dep));
        }
      });
      
      const item: RegistryItem = {
        name: kebabName,
        type: itemType,
        title: componentName,
        description: `The ${componentName} component.`,
        files: tsFiles.map((file) => ({
          path: `${registryPrefix}/${componentName}/${file}`,
          type: itemType,
        })),
      };
      
      // Check for CSS files in the component directory
      const cssFiles = allFiles.filter((file) => file.endsWith(".css"));
      cssFiles.forEach((cssFile) => {
        const cssRelativePath = `${registryPrefix}/${componentName}/${cssFile}`;
        item.files?.push({
          path: cssRelativePath,
          type: "registry:component",
          target: `./${componentName}/${cssFile}`,
        });
      });
      
      // Only add dependencies field if there are external dependencies
      if (allDependencies.size > 0) {
        item.dependencies = Array.from(allDependencies).sort();
      }
      
      // Only add registryDependencies field if there are registry dependencies
      if (allRegistryDependencies.size > 0) {
        item.registryDependencies = Array.from(allRegistryDependencies).sort();
      }
      
      items.push(item);
    } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
      // Handle single file components
      const name = entry.name.replace(".tsx", "");
      const kebabName = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      const filePath = path.join(dirPath, entry.name);
      
      // Extract external dependencies from the component file
      const dependencies = extractDependencies(filePath);
      // Extract registry dependencies (hooks and utils)
      const registryDependencies = extractRegistryDependencies(filePath);
      
      const item: RegistryItem = {
        name: kebabName,
        type: itemType,
        title: name,
        description: `The ${name} component.`,
        files: [
          {
            path: `${registryPrefix}/${entry.name}`,
            type: itemType,
          },
        ],
      };

      // Check for corresponding CSS file in styles directory
      const cssFileName = `${kebabName}.css`;
      const cssFilePath = path.join(STYLES_PATH, cssFileName);
      if (fs.existsSync(cssFilePath)) {
        item.files?.push({
          path: `registry/default/styles/${cssFileName}`,
          type: "registry:component",
          target: `./styles/${cssFileName}`,
        });

        // Use @import for the CSS file instead of parsing variables and keyframes
        item.css = {
          "@layer components": {
            [`@import "../styles/${cssFileName}"`]: {}
          }
        };
      }
      
      // Only add dependencies field if there are external dependencies
      if (dependencies.length > 0) {
        item.dependencies = dependencies;
      }
      
      // Only add registryDependencies field if there are registry dependencies
      if (registryDependencies.length > 0) {
        item.registryDependencies = registryDependencies;
      }
      
      items.push(item);
    }
  }
  
  return items;
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
    .filter((file) => {
      // Include both .ts and .tsx files, exclude invalid files
      const isValidFile = (file.endsWith(".ts") || file.endsWith(".tsx")) && 
                          !file.startsWith(".") && 
                          file !== "Untitled";
      return isValidFile;
    })
    .map((file) => {
      // Extract name by removing both .ts and .tsx extensions
      const name = file.replace(/\.tsx?$/, "");
      const kebabName = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      const filePath = path.join(UTILS_PATH, file);
      
      // Extract external dependencies from the utility file
      const dependencies = extractDependencies(filePath);
      // Extract registry dependencies (utils might use other utils)
      const registryDependencies = extractRegistryDependencies(filePath);
      
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
      
      // Only add registryDependencies field if there are registry dependencies
      if (registryDependencies.length > 0) {
        item.registryDependencies = registryDependencies;
      }
      
      return item;
    });
}

function getHooksItems() {
  if (!fs.existsSync(HOOKS_PATH)) return [];

  const files = fs.readdirSync(HOOKS_PATH);
  return files
    .filter((file) => {
      // Include both .ts and .tsx files, exclude invalid files
      const isValidFile = (file.endsWith(".ts") || file.endsWith(".tsx")) && 
                          !file.startsWith(".") && 
                          file !== "Untitled";
      return isValidFile;
    })
    .map((file) => {
      // Extract name by removing both .ts and .tsx extensions
      const name = file.replace(/\.tsx?$/, "");
      const kebabName = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      const filePath = path.join(HOOKS_PATH, file);
      
      // Extract external dependencies from the hook file
      const dependencies = extractDependencies(filePath);
      // Extract registry dependencies (hooks might use other hooks or utils)
      const registryDependencies = extractRegistryDependencies(filePath);
      
      const item: RegistryItem = {
        name: kebabName,
        type: "registry:hook" as const,
        title: name,
        description: `Hook: ${name}`,
        files: [
          {
            path: `registry/default/hooks/${file}`,
            type: "registry:hook" as const,
          },
        ],
      };
      
      // Only add dependencies field if there are external dependencies
      if (dependencies.length > 0) {
        item.dependencies = dependencies;
      }
      
      // Only add registryDependencies field if there are registry dependencies
      if (registryDependencies.length > 0) {
        item.registryDependencies = registryDependencies;
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

/**
 * Get block items from the blocks directory
 * Each block is a directory containing multiple files
 */
function getBlockItems(): RegistryItem[] {
  if (!fs.existsSync(BLOCKS_PATH)) return [];

  const entries = fs.readdirSync(BLOCKS_PATH, { withFileTypes: true });
  const blockDirs = entries.filter((entry) => entry.isDirectory());

  return blockDirs.map((entry) => {
    const blockDirName = entry.name;
    const blockDirPath = path.join(BLOCKS_PATH, blockDirName);
    const blockFiles = fs.readdirSync(blockDirPath);
    
    // Filter for TypeScript/TSX files
    const tsFiles = blockFiles.filter((file) => 
      file.endsWith(".ts") || file.endsWith(".tsx")
    );

    // Collect all dependencies from all files in the block
    const allDependencies = new Set<string>();
    const allRegistryDependencies = new Set<string>();

    tsFiles.forEach((file) => {
      const filePath = path.join(blockDirPath, file);
      const dependencies = extractDependencies(filePath);
      const registryDependencies = extractRegistryDependencies(filePath);
      
      dependencies.forEach((dep) => allDependencies.add(dep));
      registryDependencies.forEach((dep) => allRegistryDependencies.add(dep));
    });

    const item: RegistryItem = {
      name: blockDirName,
      type: "registry:block" as const,
      title: blockDirName,
      description: `Block: ${blockDirName}`,
      files: tsFiles.map((file) => ({
        path: `registry/default/blocks/${blockDirName}/${file}`,
        type: "registry:block" as const,
      })),
    };

    // Only add dependencies field if there are external dependencies
    if (allDependencies.size > 0) {
      item.dependencies = Array.from(allDependencies).sort();
    }

    // Only add registryDependencies field if there are registry dependencies
    if (allRegistryDependencies.size > 0) {
      item.registryDependencies = Array.from(allRegistryDependencies).sort();
    }

    return item;
  });
}

/**
 * Recursively copy a directory and all its contents
 */
function copyDirectoryRecursively(sourceDir: string, destDir: string): { copied: number; overwritten: number } {
  let copied = 0;
  let overwritten = 0;
  
  if (!fs.existsSync(sourceDir)) {
    return { copied, overwritten };
  }
  
  // Ensure destination directory exists
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
  
  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    
    if (entry.isDirectory()) {
      // Recursively copy subdirectories
      const result = copyDirectoryRecursively(sourcePath, destPath);
      copied += result.copied;
      overwritten += result.overwritten;
    } else if (entry.isFile() && entry.name !== ".DS_Store") {
      // Copy files
      const exists = fs.existsSync(destPath);
      fs.copyFileSync(sourcePath, destPath);
      
      if (exists) {
        overwritten++;
      } else {
        copied++;
      }
    }
  }
  
  return { copied, overwritten };
}

/**
 * Copy components from registry to www app, always overwriting existing files
 * This ensures registry components are the source of truth
 */
function copyComponentsToWww() {
  // Ensure www components directories exist
  if (!fs.existsSync(WWW_COMPONENTS_PATH)) {
    fs.mkdirSync(WWW_COMPONENTS_PATH, { recursive: true });
    console.log(`[INFO] Created www components directory: ${WWW_COMPONENTS_PATH}`);
  }
  
  if (!fs.existsSync(WWW_UI_COMPONENTS_PATH)) {
    fs.mkdirSync(WWW_UI_COMPONENTS_PATH, { recursive: true });
    console.log(`[INFO] Created www ui components directory: ${WWW_UI_COMPONENTS_PATH}`);
  }

  let copiedCount = 0;
  let overwrittenCount = 0;

  // Copy root components (including directories like Editor)
  if (fs.existsSync(ROOT_COMPONENTS_PATH)) {
    const entries = fs.readdirSync(ROOT_COMPONENTS_PATH, { withFileTypes: true });
    
    for (const entry of entries) {
      const sourcePath = path.join(ROOT_COMPONENTS_PATH, entry.name);
      
      if (entry.isDirectory()) {
        // Copy component directory recursively
        const destPath = path.join(WWW_COMPONENTS_PATH, entry.name);
        const result = copyDirectoryRecursively(sourcePath, destPath);
        copiedCount += result.copied;
        overwrittenCount += result.overwritten;
      } else if (entry.isFile() && entry.name.endsWith(".tsx") && entry.name !== ".DS_Store") {
        // Copy single file component
        const destPath = path.join(WWW_COMPONENTS_PATH, entry.name);
        const exists = fs.existsSync(destPath);
        fs.copyFileSync(sourcePath, destPath);
        
        if (exists) {
          overwrittenCount++;
        } else {
          copiedCount++;
        }
      }
    }
  }

  // Copy UI components
  if (fs.existsSync(UI_COMPONENTS_PATH)) {
    const entries = fs.readdirSync(UI_COMPONENTS_PATH, { withFileTypes: true });
    
    for (const entry of entries) {
      const sourcePath = path.join(UI_COMPONENTS_PATH, entry.name);
      
      if (entry.isDirectory()) {
        // Copy component directory recursively
        const destPath = path.join(WWW_UI_COMPONENTS_PATH, entry.name);
        const result = copyDirectoryRecursively(sourcePath, destPath);
        copiedCount += result.copied;
        overwrittenCount += result.overwritten;
      } else if (entry.isFile() && entry.name.endsWith(".tsx") && entry.name !== ".DS_Store") {
        // Copy single file component
        const destPath = path.join(WWW_UI_COMPONENTS_PATH, entry.name);
        const exists = fs.existsSync(destPath);
        fs.copyFileSync(sourcePath, destPath);
        
        if (exists) {
          overwrittenCount++;
        } else {
          copiedCount++;
        }
      }
    }
  }

  const totalCount = copiedCount + overwrittenCount;
  if (totalCount > 0) {
    if (overwrittenCount > 0) {
      console.log(`[INFO] Synced ${totalCount} component file(s) to www app (${copiedCount} copied, ${overwrittenCount} overwritten)`);
    } else {
      console.log(`[INFO] Copied ${copiedCount} component file(s) to www app`);
    }
  } else {
    console.log(`[INFO] No components found to sync`);
  }
}

function buildRegistry() {
  // Copy components to www app first
  copyComponentsToWww();

  const components = getComponentItems();
  const utils = getUtilsItems();
  const hooks = getHooksItems();
  const animationStyles = getAnimationStyleItems();
  const blocks = getBlockItems();
  const customItems = getCustomItems();

  registry.items = [...components, ...utils, ...hooks, ...animationStyles, ...blocks, ...customItems];

  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2));
  console.log(`Registry generated at ${REGISTRY_PATH}`);
}

buildRegistry();
