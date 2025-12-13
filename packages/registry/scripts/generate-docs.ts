import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UI_COMPONENTS_PATH = path.join(
  __dirname,
  "../registry/default/components/ui"
);
const DOCS_OUTPUT_PATH = path.join(
  __dirname,
  "../../../apps/www/content/docs/components"
);
const METADATA_PATH = path.join(__dirname, "../metadata");
const STORIES_PATH = path.join(__dirname, "../src");

const DEFAULT_DESCRIPTION =
  "Re-usable components built using Radix UI and Tailwind CSS.";

interface MetadataContent {
  preview?: string;
  installation?: string;
  usage?: string;
}

interface Metadata {
  header?: {
    description?: string;
  };
  content?: MetadataContent[];
}

/**
 * Convert PascalCase to Title Case with spaces
 * e.g., "AlertDialog" -> "Alert Dialog"
 */
function toTitleCase(name: string): string {
  return name.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
}

/**
 * Convert PascalCase to kebab-case
 * e.g., "AlertDialog" -> "alert-dialog"
 */
function toKebabCase(name: string): string {
  return name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Parse YAML metadata file
 */
function parseMetadata(componentName: string): Metadata | null {
  const kebabName = toKebabCase(componentName);
  const yamlFilePath = path.join(METADATA_PATH, `${kebabName}.yml`);

  if (!fs.existsSync(yamlFilePath)) {
    return null;
  }

  try {
    const yamlContent = fs.readFileSync(yamlFilePath, "utf-8");
    const metadata: Metadata = {};

    // Parse header.description
    const headerMatch = yamlContent.match(/^header:\s*\n\s+description:\s*(.+)$/m);
    if (headerMatch) {
      metadata.header = {
        description: headerMatch[1].trim(),
      };
    }

    // Parse content array
    const contentMatch = yamlContent.match(/^content:\s*\n((?:\s+-\s+.*\n?)+)/m);
    if (contentMatch) {
      const contentLines = contentMatch[1].trim().split("\n");
      metadata.content = [];
      let currentItem: MetadataContent = {};

      for (const line of contentLines) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith("- ")) {
          // If we have a current item with data, save it before starting a new one
          if (Object.keys(currentItem).length > 0) {
            metadata.content.push(currentItem);
          }
          currentItem = {};
          
          const contentItem = trimmedLine.substring(2);
          
          if (contentItem.startsWith("preview: ")) {
            const previewValue = contentItem.substring("preview: ".length).trim();
            currentItem.preview = previewValue;
          } else if (contentItem.startsWith("installation: ")) {
            const installationValue = contentItem.substring("installation: ".length).trim();
            currentItem.installation = installationValue;
          } else if (contentItem.startsWith("usage: ")) {
            const usageValue = contentItem.substring("usage: ".length).trim();
            currentItem.usage = usageValue;
          }
        }
      }
      
      // Don't forget to add the last item
      if (Object.keys(currentItem).length > 0) {
        metadata.content.push(currentItem);
      }
    }

    return metadata;
  } catch (error) {
    console.warn(`Failed to parse YAML file: ${yamlFilePath}`, error);
    return null;
  }
}

/**
 * Replace import paths from ../registry/default/ to @/
 */
function replaceImportPaths(code: string): string {
  return code.replace(/\.\.\/registry\/default\//g, "@/");
}

/**
 * Extract imports from stories file
 */
function extractImports(storiesContent: string): string {
  // Extract imports (all import statements at the top, including multi-line)
  const importSectionMatch = storiesContent.match(/^(import[\s\S]*?from\s+["'][^"']+["'];?\s*\n)+/m);
  let importSection = "";
  
  if (importSectionMatch) {
    importSection = importSectionMatch[0].trim();
  } else {
    // Fallback: try to extract imports line by line
    const lines = storiesContent.split("\n");
    const importLines: string[] = [];
    let inMultiLineImport = false;
    let currentImport = "";
    
    for (const line of lines) {
      const trimmed = line.trim();
      
      if (trimmed.startsWith("import ")) {
        if (trimmed.includes(" from ")) {
          // Single line import
          importLines.push(line);
        } else {
          // Start of multi-line import
          inMultiLineImport = true;
          currentImport = line;
        }
      } else if (inMultiLineImport) {
        currentImport += "\n" + line;
        if (trimmed.includes(" from ")) {
          // End of multi-line import
          importLines.push(currentImport);
          currentImport = "";
          inMultiLineImport = false;
        }
      } else if (importLines.length > 0 && trimmed && !trimmed.startsWith("//")) {
        // Stop at first non-import, non-comment line
        break;
      }
    }
    
    if (currentImport) {
      importLines.push(currentImport);
    }
    
    importSection = importLines.join("\n");
  }
  
  // Replace import paths
  return replaceImportPaths(importSection);
}

interface Story {
  name: string;
  code: string;
}

/**
 * Extract all stories from stories file, returning an array of story objects
 */
function extractAllStories(componentName: string): Story[] | null {
  const storiesFilePath = path.join(STORIES_PATH, `${toKebabCase(componentName)}.stories.tsx`);

  if (!fs.existsSync(storiesFilePath)) {
    return null;
  }

  try {
    const storiesContent = fs.readFileSync(storiesFilePath, "utf-8");

    // Extract imports
    const importSection = extractImports(storiesContent);

    // Extract all exported const functions (stories)
    // Use regex to match each story from "export const StoryName" to the closing "};"
    // We'll match from one export to the next, or to the end of file
    const storyMatches: Array<{ name: string; start: number }> = [];
    const storyStartRegex = /export\s+const\s+(\w+)\s*=\s*(?:\(\)\s*=>|\([^)]*\)\s*=>)\s*\{/g;
    let startMatch;

    // Find all story start positions
    while ((startMatch = storyStartRegex.exec(storiesContent)) !== null) {
      storyMatches.push({
        name: startMatch[1],
        start: startMatch.index,
      });
    }

    const stories: Story[] = [];

    // Extract each story by finding the next export or end of file
    for (let i = 0; i < storyMatches.length; i++) {
      const currentStory = storyMatches[i];
      const startIndex = currentStory.start;
      
      // Find the end: either the next export or end of file
      let endIndex = storiesContent.length;
      if (i < storyMatches.length - 1) {
        endIndex = storyMatches[i + 1].start;
      }
      
      // Extract the story text and find the actual end (the };)
      const storySection = storiesContent.substring(startIndex, endIndex);
      const storyEndMatch = storySection.match(/(export\s+const\s+\w+\s*=\s*(?:\(\)\s*=>|\([^)]*\)\s*=>)\s*\{[\s\S]*?\n\});/);
      
      if (storyEndMatch) {
        const storyText = storyEndMatch[0];
        
        // Combine imports with the story code
        let fullStoryCode = storyText;
        if (importSection) {
          fullStoryCode = `${importSection}\n\n${storyText}`;
        }
        
        // Replace import paths
        fullStoryCode = replaceImportPaths(fullStoryCode);
        
        stories.push({
          name: currentStory.name,
          code: fullStoryCode,
        });
      }
    }

    if (stories.length === 0) {
      return null;
    }

    return stories;
  } catch (error) {
    console.warn(`Failed to read stories file: ${storiesFilePath}`, error);
    return null;
  }
}

/**
 * Extract Default story from stories file
 */
function extractDefaultStory(componentName: string): string | null {
  const storiesFilePath = path.join(STORIES_PATH, `${toKebabCase(componentName)}.stories.tsx`);

  if (!fs.existsSync(storiesFilePath)) {
    return null;
  }

  try {
    const storiesContent = fs.readFileSync(storiesFilePath, "utf-8");

    // Use regex to match the complete Default function
    // Match from "export const Default" to the closing "};"
    const defaultFunctionMatch = storiesContent.match(
      /(export\s+const\s+Default\s*=\s*(?:\(\)\s*=>|\([^)]*\)\s*=>)\s*\{[\s\S]*?\n\});/m
    );

    if (!defaultFunctionMatch) {
      return null;
    }

    const defaultFunction = defaultFunctionMatch[1];

    // Extract imports
    const importSection = extractImports(storiesContent);

    // Combine imports and Default function
    let result = defaultFunction;
    if (importSection) {
      result = `${importSection}\n\n${defaultFunction}`;
    }

    // Replace import paths
    return replaceImportPaths(result);
  } catch (error) {
    console.warn(`Failed to read stories file: ${storiesFilePath}`, error);
    return null;
  }
}

/**
 * Generate MDX content with frontmatter, preview, usage, and installation
 * Sections are generated in the same order as they appear in the YAML metadata
 */
function generateMdxContent(
  componentName: string,
  metadata: Metadata | null,
  defaultStory: string | null,
  allStories: Story[] | null
): string {
  const title = toTitleCase(componentName);
  const kebabName = toKebabCase(componentName);
  const description =
    metadata?.header?.description || DEFAULT_DESCRIPTION;

  let content = `---
title: ${title}
description: ${description}
---

`;

  // Generate sections in the order they appear in the YAML metadata
  if (metadata?.content) {
    for (const item of metadata.content) {
      // Preview section
      if (item.preview === "Default" && defaultStory) {
        content += `## Preview

\`\`\`tsx
${defaultStory}
\`\`\`

`;
      }

      // Usage section - each story as a separate code block
      if (item.usage === "all" && allStories && allStories.length > 0) {
        content += `## Usage

`;
        
        for (const story of allStories) {
          content += `### ${story.name}

\`\`\`tsx
${story.code}
\`\`\`

`;
        }
      }

      // Installation section
      if (item.installation === "@aura") {
        content += `## Installation

\`\`\`bash
pnpm dlx shadcn@latest @aura/${kebabName}
\`\`\`
`;
      }
    }
  }

  return content;
}

/**
 * Get all UI component files from the registry
 */
function getUIComponentFiles(): { name: string; path: string }[] {
  if (!fs.existsSync(UI_COMPONENTS_PATH)) {
    console.error(`UI components path not found: ${UI_COMPONENTS_PATH}`);
    return [];
  }

  const files = fs.readdirSync(UI_COMPONENTS_PATH);
  return files
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => ({
      name: file.replace(".tsx", ""),
      path: path.join(UI_COMPONENTS_PATH, file),
    }));
}

/**
 * Generate documentation files for all UI components
 */
function generateDocs() {
  // Ensure output directory exists
  if (!fs.existsSync(DOCS_OUTPUT_PATH)) {
    fs.mkdirSync(DOCS_OUTPUT_PATH, { recursive: true });
    console.log(`Created docs directory: ${DOCS_OUTPUT_PATH}`);
  }

  const components = getUIComponentFiles();
  let created = 0;
  let skipped = 0;
  let withPreview = 0;
  let withUsage = 0;
  let withCustomDescription = 0;

  console.log(`\nFound ${components.length} UI components\n`);

  for (const component of components) {
    const kebabName = toKebabCase(component.name);
    const mdxFileName = `${kebabName}.mdx`;
    const mdxFilePath = path.join(DOCS_OUTPUT_PATH, mdxFileName);

    // Parse metadata
    const metadata = parseMetadata(component.name);
    
    // Extract Default story if preview is requested
    let defaultStory: string | null = null;
    const hasPreviewDefault = metadata?.content?.some((item) => item.preview === "Default");
    if (hasPreviewDefault) {
      defaultStory = extractDefaultStory(component.name);
      if (defaultStory) {
        withPreview++;
      }
    }

    // Extract all stories if usage: all is requested
    let allStories: Story[] | null = null;
    const hasUsageAll = metadata?.content?.some((item) => item.usage === "all");
    if (hasUsageAll) {
      allStories = extractAllStories(component.name);
      if (allStories && allStories.length > 0) {
        withUsage++;
      }
    }

    if (metadata?.header?.description) {
      withCustomDescription++;
    }

    const content = generateMdxContent(component.name, metadata, defaultStory, allStories);
    fs.writeFileSync(mdxFilePath, content);
    
    const previewInfo = defaultStory ? " (with preview)" : "";
    const usageInfo = allStories ? " (with usage)" : "";
    const descInfo = metadata?.header?.description ? " (with custom description)" : "";
    console.log(`✅ Created: ${mdxFileName}${previewInfo}${usageInfo}${descInfo}`);
    created++;
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Created: ${created}`);
  console.log(`   With custom description: ${withCustomDescription}`);
  console.log(`   With preview: ${withPreview}`);
  console.log(`   With usage: ${withUsage}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Total:   ${components.length}\n`);
}

generateDocs();
