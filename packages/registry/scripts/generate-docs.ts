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

const DEFAULT_DESCRIPTION =
  "Re-usable components built using Radix UI and Tailwind CSS.";

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
 * Extract description from JSDoc comment at the top of a component file
 *
 * Supports formats:
 * - /** @description Your description here *\/
 * - /** Your description here *\/
 * - /**
 *    * @description Your description here
 *    *\/
 * - /**
 *    * Your description here
 *    *\/
 */
function extractDescription(filePath: string): string | null {
  const content = fs.readFileSync(filePath, "utf-8");

  // Remove "use client" directive if present to find the first JSDoc comment
  const contentWithoutDirective = content
    .replace(/^["']use client["'];?\s*/m, "")
    .trim();

  // Match JSDoc comment at the start of the file (after removing directive)
  const jsdocMatch = contentWithoutDirective.match(/^\/\*\*([\s\S]*?)\*\//);

  if (!jsdocMatch) {
    return null;
  }

  const commentContent = jsdocMatch[1];

  // Try to extract @description tag first
  const descriptionTagMatch = commentContent.match(
    /@description\s+([\s\S]*?)(?=@\w+|$)/
  );
  if (descriptionTagMatch) {
    return cleanDescription(descriptionTagMatch[1]);
  }

  // If no @description tag, use the entire comment content (excluding other tags)
  const cleanedContent = commentContent
    .replace(/@\w+\s+[\s\S]*?(?=@\w+|$)/g, "") // Remove all @tags
    .trim();

  if (cleanedContent) {
    return cleanDescription(cleanedContent);
  }

  return null;
}

/**
 * Clean up description text by removing comment artifacts
 */
function cleanDescription(text: string): string {
  return text
    .split("\n")
    .map((line) => line.replace(/^\s*\*\s?/, "").trim()) // Remove leading * from each line
    .filter((line) => line.length > 0)
    .join(" ")
    .trim();
}

/**
 * Generate MDX frontmatter content
 */
function generateMdxContent(
  componentName: string,
  description: string
): string {
  const title = toTitleCase(componentName);
  return `---
title: ${title}
description: ${description}
---
`;
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
  let withCustomDescription = 0;

  console.log(`\nFound ${components.length} UI components\n`);

  for (const component of components) {
    const kebabName = toKebabCase(component.name);
    const mdxFileName = `${kebabName}.mdx`;
    const mdxFilePath = path.join(DOCS_OUTPUT_PATH, mdxFileName);

    // if (fs.existsSync(mdxFilePath)) {
    //   console.log(`⏭️  Skipped: ${mdxFileName} (already exists)`);
    //   skipped++;
    //   continue;
    // }

    // Extract description from component file
    const customDescription = extractDescription(component.path);
    const description = customDescription || DEFAULT_DESCRIPTION;

    if (customDescription) {
      withCustomDescription++;
    }

    const content = generateMdxContent(component.name, description);
    fs.writeFileSync(mdxFilePath, content);
    console.log(
      `✅ Created: ${mdxFileName}${customDescription ? " (with custom description)" : ""}`
    );
    created++;
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Created: ${created}`);
  console.log(`   With custom description: ${withCustomDescription}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Total:   ${components.length}\n`);
}

generateDocs();

