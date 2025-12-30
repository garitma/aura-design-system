import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REGISTRY_PATH = path.join(__dirname, "../registry.json");
const CUSTOM_ITEMS_PATH = path.join(__dirname, "../registry-items.custom.json");
const ROOT_COMPONENTS_PATH = path.join(__dirname, "../registry/default/components");
const UI_COMPONENTS_PATH = path.join(__dirname, "../registry/default/components/ui");
const BLOCKS_PATH = path.join(__dirname, "../registry/default/blocks");
const UTILS_PATH = path.join(__dirname, "../registry/default/utils");
const HOOKS_PATH = path.join(__dirname, "../registry/default/hooks");
const STYLES_PATH = path.join(__dirname, "../registry/default/styles");
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
 * Recursively collect all files from a directory, excluding specified directories
 */
function collectFilesRecursively(
  dirPath: string,
  excludeDirs: string[] = [],
  basePath: string = dirPath
): Array<{ filePath: string; relativePath: string }> {
  const files: Array<{ filePath: string; relativePath: string }> = [];
  
  if (!fs.existsSync(dirPath)) return files;
  
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.relative(basePath, fullPath);
    
    // Skip excluded directories
    if (entry.isDirectory() && excludeDirs.includes(entry.name)) {
      continue;
    }
    
    if (entry.isFile() && (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts"))) {
      files.push({
        filePath: fullPath,
        relativePath: relativePath,
      });
    } else if (entry.isDirectory()) {
      // Recursively collect files from subdirectories
      const subFiles = collectFilesRecursively(fullPath, excludeDirs, basePath);
      files.push(...subFiles);
    }
  }
  
  return files;
}

function getComponentItemsFromPath(dirPath: string, registryPrefix: string, itemType: RegistryItemType, excludeDirs: string[] = []) {
  if (!fs.existsSync(dirPath)) return [];
  
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const items: RegistryItem[] = [];
  
  for (const entry of entries) {
    // Skip excluded directories
    if (entry.isDirectory() && excludeDirs.includes(entry.name)) {
      continue;
    }
    
    // Process files directly in the directory
    if (entry.isFile() && entry.name.endsWith(".tsx")) {
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
    // Process component subdirectories (like Editor)
    else if (entry.isDirectory() && !excludeDirs.includes(entry.name)) {
      const subDirPath = path.join(dirPath, entry.name);
      const subRegistryPrefix = `${registryPrefix}/${entry.name}`;
      const name = entry.name;
      const kebabName = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      
      // Collect all files recursively from the subdirectory
      const allFiles = collectFilesRecursively(subDirPath, excludeDirs, subDirPath);
      
      if (allFiles.length > 0) {
        // Collect all dependencies from all files
        const allDependencies = new Set<string>();
        const allRegistryDependencies = new Set<string>();
        
        const fileEntries = allFiles.map((file) => {
          const fileDeps = extractDependencies(file.filePath);
          const fileRegDeps = extractRegistryDependencies(file.filePath);
          
          fileDeps.forEach(dep => allDependencies.add(dep));
          fileRegDeps.forEach(dep => allRegistryDependencies.add(dep));
          
          return {
            path: `${subRegistryPrefix}/${file.relativePath}`,
            type: itemType,
            target: file.relativePath.includes("/") 
              ? `components/${entry.name}/${file.relativePath}`
              : `components/${entry.name}/${file.relativePath}`,
          };
        });
        
        const item: RegistryItem = {
          name: kebabName,
          type: itemType,
          title: name,
          description: `The ${name} component.`,
          files: fileEntries,
        };
        
        // Only add dependencies field if there are external dependencies
        if (allDependencies.size > 0) {
          item.dependencies = Array.from(allDependencies).sort();
        }
        
        // Only add registryDependencies field if there are registry dependencies
        if (allRegistryDependencies.size > 0) {
          item.registryDependencies = Array.from(allRegistryDependencies).sort();
        }
        
        items.push(item);
      }
    }
  }
  
  return items;
}

/**
 * Get block items from blocks directory
 * Each subdirectory in blocks is treated as a separate block
 */
function getBlockItems(): RegistryItem[] {
  if (!fs.existsSync(BLOCKS_PATH)) return [];
  
  const entries = fs.readdirSync(BLOCKS_PATH, { withFileTypes: true });
  const items: RegistryItem[] = [];
  
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    
    const blockDirPath = path.join(BLOCKS_PATH, entry.name);
    const blockRegistryPrefix = `registry/default/blocks/${entry.name}`;
    const blockName = entry.name;
    const kebabName = blockName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    
    // Collect all files from the block directory recursively
    const allFiles = collectFilesRecursively(blockDirPath, [], blockDirPath);
    
    if (allFiles.length > 0) {
      // Collect all dependencies from all files
      const allDependencies = new Set<string>();
      const allRegistryDependencies = new Set<string>();
      
      const fileEntries = allFiles.map((file) => {
        const fileDeps = extractDependencies(file.filePath);
        const fileRegDeps = extractRegistryDependencies(file.filePath);
        
        fileDeps.forEach(dep => allDependencies.add(dep));
        fileRegDeps.forEach(dep => allRegistryDependencies.add(dep));
        
        return {
          path: `${blockRegistryPrefix}/${file.relativePath}`,
          type: "registry:block" as const,
          target: file.relativePath.includes("/")
            ? `blocks/${blockName}/${file.relativePath}`
            : `blocks/${blockName}/${file.relativePath}`,
        };
      });
      
      const item: RegistryItem = {
        name: kebabName,
        type: "registry:block" as const,
        title: blockName,
        description: `The ${blockName} block.`,
        files: fileEntries,
      };
      
      // Only add dependencies field if there are external dependencies
      if (allDependencies.size > 0) {
        item.dependencies = Array.from(allDependencies).sort();
      }
      
      // Only add registryDependencies field if there are registry dependencies
      if (allRegistryDependencies.size > 0) {
        item.registryDependencies = Array.from(allRegistryDependencies).sort();
      }
      
      items.push(item);
    }
  }
  
  return items;
}

function getComponentItems() {
  // Get root components, excluding 'ui' directory to prevent it from being included as an item
  const rootItems = getComponentItemsFromPath(
    ROOT_COMPONENTS_PATH, 
    "registry/default/components", 
    "registry:component",
    ["ui"] // Exclude ui folder
  );
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

  // Copy root components (excluding ui subdirectory)
  if (fs.existsSync(ROOT_COMPONENTS_PATH)) {
    const entries = fs.readdirSync(ROOT_COMPONENTS_PATH, { withFileTypes: true });
    const componentFiles = entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".tsx") && entry.name !== ".DS_Store")
      .map((entry) => entry.name);

    for (const file of componentFiles) {
      const sourcePath = path.join(ROOT_COMPONENTS_PATH, file);
      const destPath = path.join(WWW_COMPONENTS_PATH, file);

      // Always copy/overwrite to ensure registry is source of truth
      const exists = fs.existsSync(destPath);
      fs.copyFileSync(sourcePath, destPath);
      
      if (exists) {
        console.log(`[INFO] Overwritten component: ${file} -> ${destPath}`);
        overwrittenCount++;
      } else {
        console.log(`[INFO] Copied component: ${file} -> ${destPath}`);
        copiedCount++;
      }
    }
  }

  // Copy UI components
  if (fs.existsSync(UI_COMPONENTS_PATH)) {
    const entries = fs.readdirSync(UI_COMPONENTS_PATH, { withFileTypes: true });
    const componentFiles = entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".tsx") && entry.name !== ".DS_Store")
      .map((entry) => entry.name);

    for (const file of componentFiles) {
      const sourcePath = path.join(UI_COMPONENTS_PATH, file);
      const destPath = path.join(WWW_UI_COMPONENTS_PATH, file);

      // Always copy/overwrite to ensure registry is source of truth
      const exists = fs.existsSync(destPath);
      fs.copyFileSync(sourcePath, destPath);
      
      if (exists) {
        console.log(`[INFO] Overwritten UI component: ${file} -> ${destPath}`);
        overwrittenCount++;
      } else {
        console.log(`[INFO] Copied UI component: ${file} -> ${destPath}`);
        copiedCount++;
      }
    }
  }

  const totalCount = copiedCount + overwrittenCount;
  if (totalCount > 0) {
    if (overwrittenCount > 0) {
      console.log(`[INFO] Synced ${totalCount} component(s) to www app (${copiedCount} copied, ${overwrittenCount} overwritten)`);
    } else {
      console.log(`[INFO] Copied ${copiedCount} component(s) to www app`);
    }
  } else {
    console.log(`[INFO] No components found to sync`);
  }
}

function buildRegistry() {
  // Copy components to www app first
  copyComponentsToWww();

  const components = getComponentItems();
  const blocks = getBlockItems();
  const utils = getUtilsItems();
  const hooks = getHooksItems();
  const animationStyles = getAnimationStyleItems();
  const customItems = getCustomItems();

  registry.items = [...components, ...blocks, ...utils, ...hooks, ...animationStyles, ...customItems];

  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2));
  console.log(`Registry generated at ${REGISTRY_PATH}`);
  console.log(`  Components: ${components.length}`);
  console.log(`  Blocks: ${blocks.length}`);
  console.log(`  Utils: ${utils.length}`);
  console.log(`  Hooks: ${hooks.length}`);
  console.log(`  Animation Styles: ${animationStyles.length}`);
  console.log(`  Custom Items: ${customItems.length}`);
  console.log(`  Total: ${registry.items.length}`);
}

buildRegistry();