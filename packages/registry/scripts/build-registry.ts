import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REGISTRY_PATH = path.join(__dirname, "../registry.json");
const CUSTOM_ITEMS_PATH = path.join(__dirname, "../registry-items.custom.json");
const ROOT_COMPONENTS_PATH = path.join(__dirname, "../registry/default/components");
const UI_COMPONENTS_PATH = path.join(__dirname, "../registry/default/components/ui");
const BLOCKS_PATH = path.join(__dirname, "../registry/default/components/blocks");
const UTILS_PATH = path.join(__dirname, "../registry/default/utils");
const HOOKS_PATH = path.join(__dirname, "../registry/default/hooks");
const STYLES_PATH = path.join(__dirname, "../registry/default/styles");
const RULES_PATH = path.join(__dirname, "../registry/default/rules");
const SKILLS_PATH = path.join(__dirname, "../registry/default/skills");
const METADATA_PATH = path.join(__dirname, "../metadata");
const WWW_COMPONENTS_PATH = path.join(__dirname, "../../../apps/www/components");
const WWW_UI_COMPONENTS_PATH = path.join(__dirname, "../../../apps/www/components/ui");
const WWW_BLOCKS_PATH = path.join(__dirname, "../../../apps/www/components/blocks");

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

function extractDependencies(filePath: string): string[] {
  const content = fs.readFileSync(filePath, "utf-8");
  const dependencies = new Set<string>();
  
  const importRegex = /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)\s+from\s+)?["']([^"']+)["']/g;
  
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    
    if (importPath.startsWith('.') || importPath.startsWith('/')) {
      continue;
    }
    
    if (importPath.startsWith('@/')) {
      continue;
    }
    
    if (importPath === 'react' || importPath === 'react-dom' || importPath === 'react/jsx-runtime') {
      continue;
    }
    
    let packageName = importPath;
    if (importPath.startsWith('@')) {
      const parts = importPath.split('/');
      packageName = `${parts[0]}/${parts[1]}`;
    } else {
      packageName = importPath.split('/')[0];
    }
    
    dependencies.add(
      packageName === "react-resizable-panels"
        ? "react-resizable-panels@2.1.9"
        : packageName === "recharts"
          ? "recharts@2.15.4"
          : packageName,
    );
  }
  
  return Array.from(dependencies).sort();
}

function extractRegistryDependencies(filePath: string): string[] {
  const content = fs.readFileSync(filePath, "utf-8");
  const registryDeps = new Set<string>();
  
  const importRegex = /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)\s+from\s+)?["']([^"']+)["']/g;
  
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    
    if (!importPath.startsWith('@/')) {
      continue;
    }
    
    if (importPath.startsWith('@/hooks/')) {
      const hookPath = importPath.replace('@/hooks/', '');
      const hookName = hookPath.split('/')[0];
      const kebabName = hookName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      registryDeps.add(`@aura/${kebabName}`);
    } 
    else if (importPath.startsWith('@/utils/')) {
      const utilPath = importPath.replace('@/utils/', '');
      const utilName = utilPath.split('/')[0];
      const kebabName = utilName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      registryDeps.add(`@aura/${kebabName}`);
    }
    else if (importPath.startsWith('@/components/')) {
      const componentPath = importPath.replace('@/components/', '');
      const pathParts = componentPath.split('/');
      
      if (pathParts[0] === 'blocks' && pathParts.length > 1) {
        const blockName = pathParts[1];
        const kebabName = blockName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
        registryDeps.add(`@aura/${kebabName}`);
      }
      else if (pathParts[0] === 'ui' && pathParts.length > 1) {
        const componentName = pathParts[1];
        const kebabName = componentName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
        registryDeps.add(`@aura/${kebabName}`);
      }
      else {
        const componentName = pathParts[0];
        const kebabName = componentName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
        registryDeps.add(`@aura/${kebabName}`);
      }
    }
  }
  
  return Array.from(registryDeps).sort();
}

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
    
    if (entry.isDirectory() && excludeDirs.includes(entry.name)) {
      continue;
    }
    
    if (entry.isFile() && (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts"))) {
      files.push({
        filePath: fullPath,
        relativePath: relativePath,
      });
    } else if (entry.isDirectory()) {
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
    if (entry.isDirectory() && excludeDirs.includes(entry.name)) {
      continue;
    }
    
    if (entry.isFile() && entry.name.endsWith(".tsx")) {
      const name = entry.name.replace(".tsx", "");
      const kebabName = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      const filePath = path.join(dirPath, entry.name);
      
      const dependencies = extractDependencies(filePath);
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

      const cssFileName = `${kebabName}.css`;
      const cssFilePath = path.join(STYLES_PATH, cssFileName);
      if (fs.existsSync(cssFilePath)) {
        item.files?.push({
          path: `registry/default/styles/${cssFileName}`,
          type: "registry:component",
          target: `./styles/${cssFileName}`,
        });

        item.css = {
          "@layer components": {
            [`@import "../styles/${cssFileName}"`]: {}
          }
        };
      }

      const componentSource = fs.readFileSync(filePath, "utf8");
      if (componentSource.includes("aura-overlay")) {
        item.files?.push({
          path: "registry/default/styles/overlay.css",
          type: "registry:component",
          target: "./styles/overlay.css",
        });
        item.css = item.css ?? { "@layer components": {} };
        const layer = item.css["@layer components"] as Record<string, unknown>;
        layer['@import "../styles/overlay.css"'] = {};
      }
      
      if (dependencies.length > 0) {
        item.dependencies = dependencies;
      }
      
      if (registryDependencies.length > 0) {
        item.registryDependencies = registryDependencies;
      }
      
      items.push(item);
    }
    else if (entry.isDirectory() && !excludeDirs.includes(entry.name)) {
      const subDirPath = path.join(dirPath, entry.name);
      const subRegistryPrefix = `${registryPrefix}/${entry.name}`;
      const name = entry.name;
      const kebabName = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      
      const allFiles = collectFilesRecursively(subDirPath, excludeDirs, subDirPath);
      
      if (allFiles.length > 0) {
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
        
        if (allDependencies.size > 0) {
          item.dependencies = Array.from(allDependencies).sort();
        }
        
        if (allRegistryDependencies.size > 0) {
          item.registryDependencies = Array.from(allRegistryDependencies).sort();
        }
        
        items.push(item);
      }
    }
  }
  
  return items;
}

function getBlockItems(): RegistryItem[] {
  if (!fs.existsSync(BLOCKS_PATH)) return [];
  
  const entries = fs.readdirSync(BLOCKS_PATH, { withFileTypes: true });
  const items: RegistryItem[] = [];
  
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    
    const blockDirPath = path.join(BLOCKS_PATH, entry.name);
    const blockRegistryPrefix = `registry/default/components/blocks/${entry.name}`;
    const blockName = entry.name;
    const kebabName = blockName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    
    const allFiles = collectFilesRecursively(blockDirPath, [], blockDirPath);
    
    if (allFiles.length > 0) {
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
          target: `components/blocks/${blockName}/${file.relativePath}`,
        };
      });
      
      const item: RegistryItem = {
        name: kebabName,
        type: "registry:block" as const,
        title: blockName,
        description: `The ${blockName} block.`,
        files: fileEntries,
      };
      
      if (allDependencies.size > 0) {
        item.dependencies = Array.from(allDependencies).sort();
      }
      
      if (allRegistryDependencies.size > 0) {
        item.registryDependencies = Array.from(allRegistryDependencies).sort();
      }
      
      items.push(item);
    }
  }
  
  return items;
}

function getComponentItems() {
  const rootItems = getComponentItemsFromPath(
    ROOT_COMPONENTS_PATH, 
    "registry/default/components", 
    "registry:component",
    ["ui", "blocks"]
  );
  const uiItems = getComponentItemsFromPath(UI_COMPONENTS_PATH, "registry/default/components/ui", "registry:ui");
  
  return [...rootItems, ...uiItems];
}

function getUtilsItems() {
  if (!fs.existsSync(UTILS_PATH)) return [];

  const files = fs.readdirSync(UTILS_PATH);
  return files
    .filter((file) => {
      const isValidFile = (file.endsWith(".ts") || file.endsWith(".tsx")) && 
                          !file.startsWith(".") && 
                          file !== "Untitled";
      return isValidFile;
    })
    .map((file) => {
      const name = file.replace(/\.tsx?$/, "");
      const kebabName = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      const filePath = path.join(UTILS_PATH, file);
      
      const dependencies = extractDependencies(filePath);
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
      
      if (dependencies.length > 0) {
        item.dependencies = dependencies;
      }
      
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
      const isValidFile = (file.endsWith(".ts") || file.endsWith(".tsx")) && 
                          !file.startsWith(".") && 
                          file !== "Untitled";
      return isValidFile;
    })
    .map((file) => {
      const name = file.replace(/\.tsx?$/, "");
      const kebabName = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      const filePath = path.join(HOOKS_PATH, file);
      
      const dependencies = extractDependencies(filePath);
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
      
      if (dependencies.length > 0) {
        item.dependencies = dependencies;
      }
      
      if (registryDependencies.length > 0) {
        item.registryDependencies = registryDependencies;
      }
      
      return item;
    });
}

function loadRuleMetadata(name: string): { title?: string; description?: string } {
  const ymlPath = path.join(METADATA_PATH, `${name}.rule.yml`);
  if (!fs.existsSync(ymlPath)) return {};
  try {
    const content = fs.readFileSync(ymlPath, "utf-8");
    const titleMatch = content.match(/^header:\s*\n\s+title:\s*(.+)$/m);
    const descMatch = content.match(/^header:\s*\n(?:\s+title:.*\n)?\s+description:\s*(.+)$/m);
    const out: { title?: string; description?: string } = {};
    if (titleMatch) out.title = titleMatch[1].trim().replace(/^["']|["']$/g, "");
    if (descMatch) out.description = descMatch[1].trim().replace(/^["']|["']$/g, "");
    return out;
  } catch {
    return {};
  }
}

function getRulesItems(): RegistryItem[] {
  if (!fs.existsSync(RULES_PATH)) return [];

  const files = fs.readdirSync(RULES_PATH);
  return files
    .filter((file) => file.endsWith(".mdc"))
    .map((file) => {
      const name = file.replace(".mdc", "");
      const kebabName = name;
      const defaultTitle = name
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
      const meta = loadRuleMetadata(name);
      const title = meta.title ?? defaultTitle;
      const description =
        meta.description ?? `Aura rule: ${title}. Install to .cursor/rules/ for Cursor AI guidance.`;

      const ruleFile = {
        path: `registry/default/rules/${file}`,
        type: "registry:file" as const,
        target: `.cursor/rules/${file}`,
      };

      const files =
        file === "design-md.mdc"
          ? [
              ruleFile,
              {
                path: "registry/default/design-md/DESIGN.md",
                type: "registry:file" as const,
                target: "DESIGN.md",
              },
            ]
          : file === "shadcn-lint.mdc"
            ? [
                ruleFile,
                {
                  path: "registry/default/lint/eslint.aura-shadcn.mjs",
                  type: "registry:file" as const,
                  target: "eslint.aura-shadcn.mjs",
                },
              ]
            : [ruleFile];

      return {
        name: `rule-${kebabName}`,
        type: "registry:file" as const,
        title: `Rule: ${title}`,
        description,
        files,
      };
    });
}

function getSkillsItems(): RegistryItem[] {
  if (!fs.existsSync(SKILLS_PATH)) return [];

  return fs
    .readdirSync(SKILLS_PATH, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const skillDir = path.join(SKILLS_PATH, entry.name);
      const skillMd = path.join(skillDir, "SKILL.md");
      if (!fs.existsSync(skillMd)) return null;

      const files = fs
        .readdirSync(skillDir, { withFileTypes: true })
        .filter((f) => f.isFile())
        .map((f) => ({
          path: `registry/default/skills/${entry.name}/${f.name}`,
          type: "registry:file" as const,
          target: `.cursor/skills/${entry.name}/${f.name}`,
        }));

      const defaultTitle = entry.name
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");

      return {
        name: `skill-${entry.name}`,
        type: "registry:file" as const,
        title: `Skill: ${defaultTitle}`,
        description: `Aura Cursor skill: ${defaultTitle}. Installs to .cursor/skills/${entry.name}/.`,
        files,
      } satisfies RegistryItem;
    })
    .filter((item): item is RegistryItem => item !== null);
}

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

function parseCssVars(content: string): Record<string, string> {
  const vars: Record<string, string> = {};
  
  const themeMatch = content.match(/@theme\s+\w+\s*\{([^}]+)\}/);
  if (themeMatch) {
    const themeContent = themeMatch[1];
    const varRegex = /(--[\w-]+)\s*:\s*([^;]+);/g;
    let match;
    while ((match = varRegex.exec(themeContent)) !== null) {
      vars[match[1].trim()] = match[2].trim();
    }
  }
  
  return vars;
}

function parseKeyframes(content: string): Record<string, Record<string, Record<string, string>>> {
  const keyframes: Record<string, Record<string, Record<string, string>>> = {};
  
  const layerMatch = content.match(/@layer\s+\w+\s*\{([\s\S]*)\}/);
  const searchContent = layerMatch ? layerMatch[1] : content;
  
  const keyframeBlockRegex = /@keyframes\s+([\w-]+)\s*\{([\s\S]*?)\n\s*\}/g;
  let match;
  
  while ((match = keyframeBlockRegex.exec(searchContent)) !== null) {
    const keyframeName = match[1];
    const keyframeContent = match[2];
    
    const frames: Record<string, Record<string, string>> = {};
    
    const frameRegex = /(from|to|\d+%(?:\s*,\s*\d+%)*)\s*\{([^}]+)\}/g;
    let frameMatch;
    
    while ((frameMatch = frameRegex.exec(keyframeContent)) !== null) {
      const selector = frameMatch[1].trim();
      const properties = frameMatch[2];
      
      const props: Record<string, string> = {};
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
      
      if (Object.keys(cssVars).length > 0) {
        item.cssVars = { theme: cssVars };
      }
      
      if (Object.keys(keyframes).length > 0) {
        item.css = keyframes;
      }
      
      return item;
    });
}

function destinationConsumesRegistrySource(sourcePath: string, destPath: string): boolean {
  if (!fs.existsSync(destPath)) return false;

  const stat = fs.lstatSync(destPath);
  if (stat.isSymbolicLink()) {
    return fs.realpathSync(destPath) === fs.realpathSync(sourcePath);
  }

  const content = fs.readFileSync(destPath, "utf8");
  const fromMatch = content.match(/from\s+["'](\.[^"']+)["']/);
  if (!fromMatch) return false;

  const resolved = path.resolve(path.dirname(destPath), fromMatch[1]);
  const resolvedFile = fs.existsSync(resolved)
    ? resolved
    : fs.existsSync(`${resolved}.tsx`)
      ? `${resolved}.tsx`
      : null;
  if (!resolvedFile) return false;

  return fs.realpathSync(resolvedFile) === fs.realpathSync(sourcePath);
}

function copyDirectoryRecursively(sourceDir: string, destDir: string, excludeDirs: string[] = []): { copied: number; overwritten: number } {
  let copied = 0;
  let overwritten = 0;
  
  if (!fs.existsSync(sourceDir)) {
    return { copied, overwritten };
  }
  
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
  
  for (const entry of entries) {
    if (entry.isDirectory() && excludeDirs.includes(entry.name)) {
      continue;
    }
    
    const sourcePath = path.join(sourceDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    
    if (entry.isDirectory()) {
      const result = copyDirectoryRecursively(sourcePath, destPath, excludeDirs);
      copied += result.copied;
      overwritten += result.overwritten;
    } else if (entry.isFile() && (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts"))) {
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

function copyComponentsToWww() {
  if (!fs.existsSync(WWW_COMPONENTS_PATH)) {
    fs.mkdirSync(WWW_COMPONENTS_PATH, { recursive: true });
    console.log(`[INFO] Created www components directory: ${WWW_COMPONENTS_PATH}`);
  }
  
  if (!fs.existsSync(WWW_UI_COMPONENTS_PATH)) {
    fs.mkdirSync(WWW_UI_COMPONENTS_PATH, { recursive: true });
    console.log(`[INFO] Created www ui components directory: ${WWW_UI_COMPONENTS_PATH}`);
  }
  
  if (!fs.existsSync(WWW_BLOCKS_PATH)) {
    fs.mkdirSync(WWW_BLOCKS_PATH, { recursive: true });
    console.log(`[INFO] Created www blocks directory: ${WWW_BLOCKS_PATH}`);
  }

  let totalCopied = 0;
  let totalOverwritten = 0;

  if (fs.existsSync(ROOT_COMPONENTS_PATH)) {
    const entries = fs.readdirSync(ROOT_COMPONENTS_PATH, { withFileTypes: true });
    const componentFiles = entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".tsx") && entry.name !== ".DS_Store")
      .map((entry) => entry.name);

    for (const file of componentFiles) {
      const sourcePath = path.join(ROOT_COMPONENTS_PATH, file);
      const destPath = path.join(WWW_COMPONENTS_PATH, file);

      const exists = fs.existsSync(destPath);
      fs.copyFileSync(sourcePath, destPath);
      
      if (exists) {
        totalOverwritten++;
      } else {
        totalCopied++;
      }
    }
  }

  if (fs.existsSync(UI_COMPONENTS_PATH)) {
    const entries = fs.readdirSync(UI_COMPONENTS_PATH, { withFileTypes: true });
    const componentFiles = entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".tsx") && entry.name !== ".DS_Store")
      .map((entry) => entry.name);

    for (const file of componentFiles) {
      const sourcePath = path.join(UI_COMPONENTS_PATH, file);
      const destPath = path.join(WWW_UI_COMPONENTS_PATH, file);

      if (destinationConsumesRegistrySource(sourcePath, destPath)) {
        continue;
      }

      const exists = fs.existsSync(destPath);
      fs.copyFileSync(sourcePath, destPath);
      
      if (exists) {
        totalOverwritten++;
      } else {
        totalCopied++;
      }
    }
  }

  if (fs.existsSync(BLOCKS_PATH)) {
    const result = copyDirectoryRecursively(BLOCKS_PATH, WWW_BLOCKS_PATH);
    totalCopied += result.copied;
    totalOverwritten += result.overwritten;
    
    if (result.copied > 0 || result.overwritten > 0) {
      console.log(`[INFO] Copied blocks: ${result.copied} copied, ${result.overwritten} overwritten`);
    }
  }

  const totalCount = totalCopied + totalOverwritten;
  if (totalCount > 0) {
    if (totalOverwritten > 0) {
      console.log(`[INFO] Synced ${totalCount} component(s) to www app (${totalCopied} copied, ${totalOverwritten} overwritten)`);
    } else {
      console.log(`[INFO] Copied ${totalCopied} component(s) to www app`);
    }
  } else {
    console.log(`[INFO] No components found to sync`);
  }
}

function buildRegistry() {
  copyComponentsToWww();

  const components = getComponentItems();
  const blocks = getBlockItems();
  const utils = getUtilsItems();
  const hooks = getHooksItems();
  const animationStyles = getAnimationStyleItems();
  const rulesItems = getRulesItems();
  const rulesBundle: RegistryItem = {
    name: "rules",
    type: "registry:file",
    title: "Aura Rules",
    description: "All Aura Design System Cursor rules. Installs to .cursor/rules/ for AI guidance.",
    files: rulesItems.flatMap((item) => item.files ?? []),
  };
  const skillsItems = getSkillsItems();
  const skillsBundle: RegistryItem = {
    name: "skills",
    type: "registry:file",
    title: "Aura Skills",
    description: "All Aura Design System Cursor skills. Installs to .cursor/skills/ for AI workflows.",
    files: skillsItems.flatMap((item) => item.files ?? []),
  };
  const customItems = getCustomItems();

  registry.items = [
    ...components,
    ...blocks,
    ...utils,
    ...hooks,
    ...animationStyles,
    ...rulesItems,
    rulesBundle,
    ...skillsItems,
    skillsBundle,
    ...customItems,
  ];

  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2));
  console.log(`Registry generated at ${REGISTRY_PATH}`);
  console.log(`  Components: ${components.length}`);
  console.log(`  Blocks: ${blocks.length}`);
  console.log(`  Utils: ${utils.length}`);
  console.log(`  Hooks: ${hooks.length}`);
  console.log(`  Animation Styles: ${animationStyles.length}`);
  console.log(`  Rules: ${rulesItems.length}`);
  console.log(`  Skills: ${skillsItems.length}`);
  console.log(`  Custom Items: ${customItems.length}`);
  console.log(`  Total: ${registry.items.length}`);
}

buildRegistry();