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
  props?: string[];
}

interface ComponentProp {
  name: string;
  type: string;
  default?: string;
  description?: string;
  required?: boolean;
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
 * Parse content array from YAML content string
 */
function parseContentArray(contentString: string): MetadataContent[] {
  const contentLines = contentString.split("\n");
  const content: MetadataContent[] = [];
  let currentItem: MetadataContent = {};
  let inPropsSection = false;

  for (let i = 0; i < contentLines.length; i++) {
    const line = contentLines[i];
    const trimmedLine = line.trim();
    const indentLevel = line.length - line.trimStart().length;
    
    // Match lines that start with "- " (after trimming whitespace)
    if (trimmedLine.startsWith("- ")) {
      // If this is a top-level item (indent level 2 or less, since content: is at level 0)
      if (indentLevel <= 2) {
        // If we have a current item with data, save it before starting a new one
        if (Object.keys(currentItem).length > 0) {
          content.push(currentItem);
        }
        currentItem = {};
        inPropsSection = false;
        
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
        } else if (contentItem === "props:" || contentItem.startsWith("props:")) {
          // Start of props section - just mark that props should be shown
          currentItem.props = [];
          inPropsSection = true;
        }
      } else if (inPropsSection && indentLevel > 2) {
        // This is a nested props list item (indented under props:)
        // We don't need to store these, they're just metadata about table columns
        // The presence of props: is enough to trigger props generation
      }
    } else if (trimmedLine && indentLevel <= 2 && !trimmedLine.startsWith("#")) {
      // Non-empty line at top level means we're done with props section
      inPropsSection = false;
    }
  }
  
  // Don't forget to add the last item
  if (Object.keys(currentItem).length > 0) {
    content.push(currentItem);
  }

  return content;
}

/**
 * Load template content from _templates directory
 */
function loadTemplateContent(templatePath: string): MetadataContent[] | null {
  const templateFilePath = path.join(METADATA_PATH, templatePath);
  
  if (!fs.existsSync(templateFilePath)) {
    return null;
  }

  try {
    const templateContent = fs.readFileSync(templateFilePath, "utf-8");
    
    // Try to match content: ... format first
    const contentMatch = templateContent.match(/^content:\s*\n((?:\s+-\s+.*\n?)+)/m);
    if (contentMatch) {
      return parseContentArray(contentMatch[1]);
    }
    
    // If no content: key, parse the entire file as content array
    // (template files may just have the list items directly)
    return parseContentArray(templateContent);
  } catch (error) {
    console.warn(`Failed to load template: ${templateFilePath}`, error);
    return null;
  }
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

    // Check for extends/template reference
    const extendsMatch = yamlContent.match(/^extends:\s*(.+)$/m);
    const templatePath = extendsMatch ? extendsMatch[1].trim() : null;

    // Parse content array
    const contentMatch = yamlContent.match(/^content:\s*\n((?:\s+-\s+.*\n?)+)/m);
    let content: MetadataContent[] = [];

    if (contentMatch) {
      // Parse content from the file
      content = parseContentArray(contentMatch[1]);
    } else if (templatePath) {
      // If no content but has extends, load from template
      const templateContent = loadTemplateContent(templatePath);
      if (templateContent) {
        content = templateContent;
      }
    } else {
      // If no content and no extends, try default template
      const defaultTemplate = loadTemplateContent("_templates/content.yml");
      if (defaultTemplate) {
        content = defaultTemplate;
      }
    }

    // If content is still empty and no template was found, try default template
    if (content.length === 0) {
      const defaultTemplate = loadTemplateContent("_templates/content.yml");
      if (defaultTemplate) {
        content = defaultTemplate;
      }
    }

    if (content.length > 0) {
      metadata.content = content;
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
    // Handle both formats: () => { ... } and () => <JSX />
    const storyMatches: Array<{ name: string; start: number }> = [];
    // Match both: export const Name = () => { and export const Name = () =>
    const storyStartRegex = /export\s+const\s+(\w+)\s*=\s*(?:\(\)\s*=>|\([^)]*\)\s*=>)/g;
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
      
      // Extract the story section
      const storySection = storiesContent.substring(startIndex, endIndex);
      
      // Try to match story with braces first: () => { ... };
      let storyEndMatch = storySection.match(/(export\s+const\s+\w+\s*=\s*(?:\(\)\s*=>|\([^)]*\)\s*=>)\s*\{[\s\S]*?\n\});/);
      
      // If no match, try to match story without braces: () => <JSX />; or () => expression;
      if (!storyEndMatch) {
        // Match from export to the semicolon (handles single-line arrow functions)
        storyEndMatch = storySection.match(/(export\s+const\s+\w+\s*=\s*(?:\(\)\s*=>|\([^)]*\)\s*=>)[\s\S]*?;)/);
      }
      
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
 * Extract props from Radix UI type definitions
 * This is a simplified approach - for full type extraction, we'd need TypeScript compiler API
 */
function extractPropsFromRadixType(typeReference: string): ComponentProp[] {
  // Common Radix UI props based on the component type
  // This is a mapping of known props for common Radix UI components
  const radixPropsMap: Record<string, ComponentProp[]> = {
    "AlertDialogRadix.Root": [
      { name: "open", type: "boolean", required: false },
      { name: "defaultOpen", type: "boolean", required: false },
      { name: "onOpenChange", type: "(open: boolean) => void", required: false },
      { name: "modal", type: "boolean", required: false, default: "true" },
    ],
    "AccordionRadix.Root": [
      { name: "type", type: "'single' | 'multiple'", required: false },
      { name: "defaultValue", type: "string | string[]", required: false },
      { name: "value", type: "string | string[]", required: false },
      { name: "onValueChange", type: "(value: string | string[]) => void", required: false },
      { name: "collapsible", type: "boolean", required: false },
      { name: "disabled", type: "boolean", required: false },
    ],
    "AccordionRadix.Item": [
      { name: "value", type: "string", required: true },
      { name: "disabled", type: "boolean", required: false },
    ],
    "AccordionRadix.Trigger": [
      { name: "asChild", type: "boolean", required: false },
    ],
    "AccordionRadix.Content": [
      { name: "asChild", type: "boolean", required: false },
      { name: "forceMount", type: "boolean", required: false },
    ],
  };
  
  // Clean the type reference - remove typeof if present
  const cleanType = typeReference.replace(/^typeof\s+/, "").trim();
  
  // Check if we have props for this type
  if (radixPropsMap[cleanType]) {
    return radixPropsMap[cleanType];
  }
  
  return [];
}

/**
 * Extract individual props from a Props interface definition
 */
function extractPropsFromInterface(
  componentContent: string,
  interfaceName: string
): ComponentProp[] {
  const props: ComponentProp[] = [];
  
  // Find the interface definition
  const interfaceMatch = componentContent.match(
    new RegExp(`(?:interface|type)\\s+${interfaceName}[\\s\\S]*?\\{([\\s\\S]*?)\\n\\}`, "m")
  );
  
  if (!interfaceMatch) {
    return props;
  }
  
  const interfaceBody = interfaceMatch[1];
  const lines = interfaceBody.split("\n");
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Skip empty lines, comments, and extends clauses
    if (
      !trimmed ||
      trimmed.startsWith("//") ||
      trimmed.startsWith("extends") ||
      trimmed.startsWith("*")
    ) {
      continue;
    }
    
    // Match prop definitions: propName?: type; or propName: type;
    // Also handle: propName?: type = defaultValue;
    const propMatch = trimmed.match(/^(\w+)(\??):\s*(.+?)(?:\s*=\s*(.+?))?(;|$)/);
    
    if (propMatch) {
      const propName = propMatch[1];
      const isOptional = propMatch[2] === "?";
      let propType = propMatch[3].trim();
      const defaultValue = propMatch[4]?.trim();
      
      // Clean up the type - remove trailing semicolons and whitespace
      propType = propType.replace(/;?\s*$/, "").trim();
      
      props.push({
        name: propName,
        type: propType,
        default: defaultValue || (isOptional ? "undefined" : undefined),
        required: !isOptional,
      });
    }
  }
  
  return props;
}

/**
 * Extract component props information from component file
 */
interface ExportedComponent {
  name: string;
  propType: string;
  props?: ComponentProp[];
}

function extractComponentProps(componentName: string): ExportedComponent[] | null {
  const componentFilePath = path.join(UI_COMPONENTS_PATH, `${componentName}.tsx`);

  if (!fs.existsSync(componentFilePath)) {
    return null;
  }

  try {
    const componentContent = fs.readFileSync(componentFilePath, "utf-8");
    const components: ExportedComponent[] = [];

    // Find all exported function components
    // First, find the export statement at the end: export { Component1, Component2, ... }
    const exportMatch = componentContent.match(/export\s+\{([^}]+)\}/);
    if (!exportMatch) {
      return null;
    }

    const exportedNames = exportMatch[1]
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    // For each exported component, find its definition and prop type
    for (const exportedName of exportedNames) {
      let propType: string | null = null;

      // First, try React.forwardRef pattern: const ComponentName = React.forwardRef<..., PropsType>
      const forwardRefMatch = componentContent.match(
        new RegExp(`const\\s+${exportedName}\\s*=\\s*React\\.forwardRef<[^,]+,\\s*([^>]+)>`, "m")
      );
      
      if (forwardRefMatch) {
        const refType = forwardRefMatch[1].trim();
        // Check if it's a Props interface - if so, find its definition
        if (refType.includes("Props")) {
          // Try to find the Props interface definition to get more details
          // Look for: interface ButtonProps ... React.ComponentProps<"button">
          // Use a flexible pattern that handles multi-line interfaces
          const propsInterfaceMatch = componentContent.match(
            new RegExp(`(?:interface|type)\\s+${refType}[\\s\\S]*?React\\.ComponentProps<([^>]+)>`, "m")
          );
          if (propsInterfaceMatch) {
            const baseType = propsInterfaceMatch[1].trim();
            // Remove quotes if present (e.g., "button" -> button)
            const cleanBaseType = baseType.replace(/^["']|["']$/g, "");
            propType = `${refType} (extends React.ComponentProps<"${cleanBaseType}">)`;
          } else {
            propType = refType;
          }
        } else {
          propType = refType;
        }
      } else {
        // Try to find if there's a custom Props interface/type
        // Pattern: interface ComponentNameProps or type ComponentNameProps
        const propsInterfaceMatch = componentContent.match(
          new RegExp(`(?:interface|type)\\s+${exportedName}Props[\\s\\S]{0,500}?extends[\\s\\S]{0,500}?React\\.ComponentProps<([^>]+)>`, "m")
        );
        
        if (propsInterfaceMatch) {
          propType = `${exportedName}Props (extends React.ComponentProps<${propsInterfaceMatch[1].trim()}>)`;
        } else {
          // Find the function definition for this component
          // Pattern: function ComponentName({ ... }: React.ComponentProps<typeof SomeType.Root>)
          // The type annotation can be on the same line or next line
          const functionDefRegex = new RegExp(
            `function\\s+${exportedName}[\\s\\S]{0,500}?:\\s*React\\.ComponentProps<([^>]+)>`,
            "m"
          );
          const functionMatch = componentContent.match(functionDefRegex);

          if (functionMatch) {
            // Extract the type reference (e.g., "typeof AccordionRadix.Root")
            propType = `React.ComponentProps<${functionMatch[1].trim()}>`;
          } else {
            // Try alternative pattern: function ComponentName({ ... }: Type) on same line
            const altFunctionMatch = componentContent.match(
              new RegExp(`function\\s+${exportedName}\\s*\\([^)]*\\)\\s*:\\s*([^\\{\\n]+)`, "m")
            );
            if (altFunctionMatch) {
              propType = altFunctionMatch[1].trim();
            } else {
              // Try const pattern: const ComponentName = ... React.ComponentProps<...>
              const constPropsPattern = new RegExp(
                `const\\s+${exportedName}[\\s\\S]{0,2000}?React\\.ComponentProps<([^>]+)>`,
                "m"
              );
              const constMatch = componentContent.match(constPropsPattern);
              if (constMatch) {
                propType = `React.ComponentProps<${constMatch[1].trim()}>`;
              }
            }
          }
        }
      }

      if (propType) {
        // Clean up the prop type - remove extra whitespace and newlines
        propType = propType.replace(/\s+/g, " ").trim();
        
        // Try to extract individual props
        let individualProps: ComponentProp[] | undefined = undefined;
        
        // If it's a Props interface, extract props from it
        if (propType.includes("Props")) {
          const propsInterfaceNameMatch = propType.match(/(\w+Props)/);
          if (propsInterfaceNameMatch) {
            const propsInterfaceName = propsInterfaceNameMatch[1];
            individualProps = extractPropsFromInterface(componentContent, propsInterfaceName);
          }
        } else if (propType.includes("React.ComponentProps")) {
          // For React.ComponentProps types, try to extract props from Radix UI types
          // Extract the type reference (e.g., "typeof AlertDialogRadix.Root")
          const componentPropsMatch = propType.match(/React\.ComponentProps<(.+)>/);
          if (componentPropsMatch) {
            let innerType = componentPropsMatch[1].trim();
            // Remove "typeof" prefix if present
            innerType = innerType.replace(/^typeof\s+/, "").trim();
            // Try to extract props from Radix UI type definitions
            individualProps = extractPropsFromRadixType(innerType);
          }
        }
        
        components.push({
          name: exportedName,
          propType: propType,
          props: individualProps && individualProps.length > 0 ? individualProps : undefined,
        });
      } else {
        // If we can't find the type, still add the component with a generic type
        components.push({
          name: exportedName,
          propType: "React.ComponentProps<any>",
        });
      }
    }

    return components.length > 0 ? components : null;
  } catch (error) {
    console.warn(`Failed to read component file: ${componentFilePath}`, error);
    return null;
  }
}

/**
 * Generate props table for a component
 */
function generatePropsTable(component: ExportedComponent): string {
  // Format the prop type for better readability
  let formattedType = component.propType;
  
  // Check if it's a custom Props interface with extends
  const isCustomPropsWithExtends = formattedType.includes("Props") && formattedType.includes("extends");
  
  if (!isCustomPropsWithExtends) {
    // If it's a React.ComponentProps type, extract the inner type for cleaner display
    const componentPropsMatch = formattedType.match(/React\.ComponentProps<(.+)>/);
    if (componentPropsMatch) {
      const innerType = componentPropsMatch[1];
      // Clean up typeof references - keep them if they exist, but don't add to string literals
      if (innerType.includes("typeof")) {
        formattedType = `React.ComponentProps<${innerType.trim()}>`;
      } else if (innerType.match(/^["'].*["']$/)) {
        // It's a string literal like "button", keep as is
        formattedType = `React.ComponentProps<${innerType.trim()}>`;
      } else {
        formattedType = `React.ComponentProps<typeof ${innerType.trim()}>`;
      }
    }
  }

  // Check if it's a custom Props interface
  const isCustomProps = formattedType.includes("Props") && !formattedType.includes("React.ComponentProps");
  
  const description = isCustomProps || isCustomPropsWithExtends
    ? "Custom props interface. See the component source for details."
    : "All props are passed through to the underlying component. See the [Radix UI documentation](https://www.radix-ui.com/primitives) for the full API.";

  let tableContent = `### ${component.name}

${description}

| Prop | Type | Default |
|------|------|---------|
`;

  // If we have individual props, show them
  if (component.props && component.props.length > 0) {
    for (const prop of component.props) {
      const defaultValue = prop.default || "-";
      const required = prop.required ? "" : "?";
      tableContent += `| \`${prop.name}${required}\` | \`${prop.type}\` | ${defaultValue} |\n`;
    }
  } else {
    // Fallback: show the type reference
    tableContent += `| *All props from* | \`${formattedType}\` | - |\n`;
  }

  tableContent += "\n";

  return tableContent;
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

      // Props section - check if props key exists (even if empty array)
      if (item.props !== undefined) {
        const componentProps = extractComponentProps(componentName);
        if (componentProps && componentProps.length > 0) {
          content += `## Props

`;
          
          for (const component of componentProps) {
            content += generatePropsTable(component);
          }
        }
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
