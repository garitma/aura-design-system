import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import ts from "typescript";

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
const DEMOS_OUTPUT_PATH = path.join(
  __dirname,
  "../../../apps/www/components/demos"
);
const REGISTRY_OUTPUT_PATH = path.join(
  __dirname,
  "../../../apps/www/components"
);

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

    // Extract all exported const functions and function declarations (stories)
    // Handle both formats: () => { ... } and () => <JSX /> and function declarations
    const storyMatches: Array<{ name: string; start: number; type: "const" | "function" }> = [];
    // Match both: export const Name = () => { and export const Name = () =>
    const constStoryRegex = /export\s+const\s+(\w+)\s*=\s*(?:\(\)\s*=>|\([^)]*\)\s*=>)/g;
    // Match: export function Name() {
    const functionStoryRegex = /export\s+function\s+(\w+)\s*\(/g;
    
    let startMatch;
    // Find all const story exports
    while ((startMatch = constStoryRegex.exec(storiesContent)) !== null) {
      storyMatches.push({
        name: startMatch[1],
        start: startMatch.index,
        type: "const",
      });
    }
    // Find all function story exports
    while ((startMatch = functionStoryRegex.exec(storiesContent)) !== null) {
      storyMatches.push({
        name: startMatch[1],
        start: startMatch.index,
        type: "function",
      });
    }
    
    // Sort by position in file
    storyMatches.sort((a, b) => a.start - b.start);

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
      
      let storyEndMatch: RegExpMatchArray | null = null;
      
      if (currentStory.type === "const") {
        // Try to match story with braces first: () => { ... };
        storyEndMatch = storySection.match(/(export\s+const\s+\w+\s*=\s*(?:\(\)\s*=>|\([^)]*\)\s*=>)\s*\{[\s\S]*?\n\});/);
        
        // If no match, try to match story without braces: () => <JSX />; or () => expression;
        if (!storyEndMatch) {
          // Match from export to the semicolon (handles single-line arrow functions)
          storyEndMatch = storySection.match(/(export\s+const\s+\w+\s*=\s*(?:\(\)\s*=>|\([^)]*\)\s*=>)[\s\S]*?;)/);
        }
      } else if (currentStory.type === "function") {
        // Match function declaration: export function Name() { ... }
        // Try to find the matching closing brace
        const functionStart = storySection.indexOf("export function");
        if (functionStart !== -1) {
          let braceCount = 0;
          let inFunction = false;
          let endPos = functionStart;
          
          for (let i = functionStart; i < storySection.length; i++) {
            const char = storySection[i];
            if (char === '{') {
              braceCount++;
              inFunction = true;
            } else if (char === '}') {
              braceCount--;
              if (inFunction && braceCount === 0) {
                endPos = i + 1;
                break;
              }
            }
          }
          
          if (endPos > functionStart) {
            storyEndMatch = [storySection.substring(functionStart, endPos)];
          }
        }
        
        // Fallback to regex if brace matching didn't work
        if (!storyEndMatch) {
          storyEndMatch = storySection.match(/(export\s+function\s+\w+\s*\([^)]*\)\s*\{[\s\S]*?\n\})/);
        }
      }
      
      if (storyEndMatch) {
        const storyText = storyEndMatch[0];
        
        // Replace import paths in story code
        let fullStoryCode = replaceImportPaths(storyText);
        
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
 * Format a TypeScript type to a readable string
 */
function formatType(type: ts.Type, checker: ts.TypeChecker): string {
  if (type.isUnion()) {
    return type.types.map(t => formatType(t, checker)).join(" | ");
  }
  if (type.isIntersection()) {
    return type.types.map(t => formatType(t, checker)).join(" & ");
  }
  
  const typeString = checker.typeToString(type, undefined, ts.TypeFormatFlags.NoTruncation);
  return typeString;
}

/**
 * Extract props from a TypeScript type using the compiler API
 */
function extractPropsFromType(
  type: ts.Type,
  checker: ts.TypeChecker
): ComponentProp[] {
  const props: ComponentProp[] = [];
  
  // Get all properties from the type
  const properties = checker.getPropertiesOfType(type);
  
  for (const property of properties) {
    const propertyType = checker.getTypeOfSymbolAtLocation(
      property,
      property.valueDeclaration || type.symbol?.valueDeclaration!
    );
    const typeString = formatType(propertyType, checker);
    
    // Check if the property is optional
    // In TypeScript, optional properties are marked differently
    let isOptional = false;
    const declarations = property.getDeclarations();
    if (declarations && declarations.length > 0) {
      for (const declaration of declarations) {
        if (ts.isPropertySignature(declaration) || ts.isParameter(declaration)) {
          isOptional = !!declaration.questionToken;
        }
      }
    }
    
    // Try to get JSDoc comment for description
    let description: string | undefined = undefined;
    if (declarations && declarations.length > 0) {
      const declaration = declarations[0];
      const sourceFile = declaration.getSourceFile();
      const fullText = sourceFile.getFullText();
      const nodeStart = declaration.getFullStart();
      
      // Look for JSDoc comments before the declaration
      const beforeText = fullText.substring(Math.max(0, nodeStart - 500), nodeStart);
      const jsdocMatch = beforeText.match(/(?:\/\*\*[\s\S]*?\*\/)\s*$/);
      if (jsdocMatch) {
        description = jsdocMatch[0]
          .replace(/\/\*\*|\*\//g, "")
          .replace(/^\s*\*/gm, "")
          .trim();
      }
    }
    
    props.push({
      name: property.getName(),
      type: typeString,
      required: !isOptional,
      description: description,
    });
  }
  
  return props;
}

/**
 * Extract props from Radix UI type definitions using TypeScript compiler API
 * This function creates a temporary TypeScript file to extract React.ComponentProps types
 */
function extractPropsFromRadixType(
  typeReference: string,
  componentContent: string,
  componentFilePath: string
): ComponentProp[] {
  try {
    // Load tsconfig.json to get proper compiler options
    const tsconfigPath = path.join(__dirname, "../tsconfig.json");
    let compilerOptions: ts.CompilerOptions = {
      target: ts.ScriptTarget.Latest,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
      skipLibCheck: true,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      resolveJsonModule: true,
      allowSyntheticDefaultImports: true,
      baseUrl: path.join(__dirname, ".."),
      paths: {
        "@/*": [path.join(__dirname, "../registry/default/*")]
      }
    };
    
    if (fs.existsSync(tsconfigPath)) {
      const configFile = ts.readConfigFile(tsconfigPath, (path) => fs.readFileSync(path, "utf-8"));
      if (configFile.config) {
        const parsed = ts.parseJsonConfigFileContent(
          configFile.config,
          ts.sys,
          path.dirname(tsconfigPath)
        );
        compilerOptions = { ...compilerOptions, ...parsed.options };
      }
    }
    
    // Create a program from the actual component file (not a temp file)
    // This ensures all imports and module resolution work correctly
    const host = ts.createCompilerHost(compilerOptions);
    const program = ts.createProgram([componentFilePath], compilerOptions, host);
    const checker = program.getTypeChecker();
    const sourceFile = program.getSourceFile(componentFilePath);
    
    if (!sourceFile) {
      return [];
    }
    
    // Parse the type reference (e.g., "AccordionRadix.Root" or "typeof AccordionRadix.Root")
    const isTypeof = typeReference.startsWith("typeof ");
    const cleanTypeRef = typeReference.replace(/^typeof\s+/, "").trim();
    const [namespace, member] = cleanTypeRef.split(".");
    
    if (!namespace || !member) {
      return [];
    }
    
    // Find any usage of React.ComponentProps with this type reference
    // This works for function declarations, arrow functions, const declarations, etc.
    let propsTypeNode: ts.TypeNode | null = null;
    
    function visit(node: ts.Node): void {
      // Check function declarations
      if (ts.isFunctionDeclaration(node)) {
        if (node.parameters.length > 0) {
          const firstParam = node.parameters[0];
          if (firstParam.type && ts.isTypeReferenceNode(firstParam.type)) {
            const typeName = firstParam.type.typeName;
            if (ts.isQualifiedName(typeName) && 
                typeName.left.getText() === "React" &&
                (typeName.right.getText() === "ComponentProps" || 
                 typeName.right.getText() === "ComponentPropsWithoutRef")) {
              const typeArgs = firstParam.type.typeArguments;
              if (typeArgs && typeArgs.length > 0) {
                const innerType = typeArgs[0];
                if (ts.isTypeQuery(innerType) && innerType.exprName) {
                  const exprName = innerType.exprName;
                  if (ts.isQualifiedName(exprName) &&
                      exprName.left.getText() === namespace &&
                      exprName.right.getText() === member) {
                    propsTypeNode = firstParam.type;
                    return; // Found it, stop searching
                  }
                }
              }
            }
          }
        }
      }
      
      // Check arrow functions in variable declarations (const Component = () => {})
      if (ts.isVariableStatement(node)) {
        for (const declaration of node.declarationList.declarations) {
          if (declaration.initializer && ts.isArrowFunction(declaration.initializer)) {
            const arrowFunc = declaration.initializer;
            if (arrowFunc.parameters.length > 0) {
              const firstParam = arrowFunc.parameters[0];
              if (firstParam.type && ts.isTypeReferenceNode(firstParam.type)) {
                const typeName = firstParam.type.typeName;
                if (ts.isQualifiedName(typeName) && 
                    typeName.left.getText() === "React" &&
                    (typeName.right.getText() === "ComponentProps" || 
                     typeName.right.getText() === "ComponentPropsWithoutRef")) {
                  const typeArgs = firstParam.type.typeArguments;
                  if (typeArgs && typeArgs.length > 0) {
                    const innerType = typeArgs[0];
                    if (ts.isTypeQuery(innerType) && innerType.exprName) {
                      const exprName = innerType.exprName;
                      if (ts.isQualifiedName(exprName) &&
                          exprName.left.getText() === namespace &&
                          exprName.right.getText() === member) {
                        propsTypeNode = firstParam.type;
                        return; // Found it, stop searching
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      
      // Check React.forwardRef patterns
      if (ts.isVariableStatement(node)) {
        for (const declaration of node.declarationList.declarations) {
          if (declaration.initializer && ts.isCallExpression(declaration.initializer)) {
            const callExpr = declaration.initializer;
            if (callExpr.expression && ts.isPropertyAccessExpression(callExpr.expression) &&
                callExpr.expression.name.text === "forwardRef") {
              // This is React.forwardRef<..., PropsType>
              if (callExpr.typeArguments && callExpr.typeArguments.length > 1) {
                const propsTypeArg = callExpr.typeArguments[1];
                if (ts.isTypeReferenceNode(propsTypeArg)) {
                  const typeName = propsTypeArg.typeName;
                  if (ts.isQualifiedName(typeName) && 
                      typeName.left.getText() === "React" &&
                      (typeName.right.getText() === "ComponentProps" || 
                       typeName.right.getText() === "ComponentPropsWithoutRef")) {
                    const typeArgs = propsTypeArg.typeArguments;
                    if (typeArgs && typeArgs.length > 0) {
                      const innerType = typeArgs[0];
                      if (ts.isTypeQuery(innerType) && innerType.exprName) {
                        const exprName = innerType.exprName;
                        if (ts.isQualifiedName(exprName) &&
                            exprName.left.getText() === namespace &&
                            exprName.right.getText() === member) {
                          propsTypeNode = propsTypeArg;
                          return; // Found it, stop searching
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      
      ts.forEachChild(node, visit);
    }
    
    visit(sourceFile);
    
    if (propsTypeNode && ts.isTypeReferenceNode(propsTypeNode)) {
      // Get the type that React.ComponentProps resolves to
      const propsType = checker.getTypeAtLocation(propsTypeNode);
      
      // Check if the type resolved correctly (not 'any')
      const typeString = checker.typeToString(propsType);
      if (typeString !== "any" && !typeString.includes("ComponentProps<any>")) {
        // Extract properties from the props type
        const props = extractPropsFromType(propsType, checker);
        
        if (props.length > 0) {
          return props;
        }
      }
      
      // If no props found or type didn't resolve, try to unwrap React.ComponentProps
      const typeArgs = propsTypeNode.typeArguments;
      if (typeArgs && typeArgs.length > 0) {
        // Get the inner type (the component type)
        const componentType = checker.getTypeAtLocation(typeArgs[0]);
        const componentTypeString = checker.typeToString(componentType);
        
        // For React components, props are the first parameter of the function signature
        const callSignatures = componentType.getCallSignatures();
        if (callSignatures.length > 0) {
          const firstParam = callSignatures[0].parameters[0];
          if (firstParam) {
            const paramType = checker.getTypeOfSymbolAtLocation(firstParam, sourceFile);
            const paramTypeString = checker.typeToString(paramType);
            if (paramTypeString !== "any") {
              const props = extractPropsFromType(paramType, checker);
              if (props.length > 0) {
                return props;
              }
            }
          }
        }
        
        // Try to get properties directly from the component type
        const properties = checker.getPropertiesOfType(componentType);
        if (properties.length > 0 && componentTypeString !== "any") {
          const props = extractPropsFromType(componentType, checker);
          if (props.length > 0) {
            return props;
          }
        }
      }
    }
    
    return [];
  } catch (error) {
    // Silently fail - return empty array so we fall back to showing the type reference
    return [];
  }
}

/**
 * Extract individual props from a Props interface definition
 */
function extractPropsFromInterface(
  componentContent: string,
  interfaceName: string
): ComponentProp[] {
  const props: ComponentProp[] = [];
  
  // Find the interface definition - match the entire interface block
  const interfaceRegex = new RegExp(
    `(?:interface|type)\\s+${interfaceName}(?:\\s+extends\\s+([^\\{\\n]+))?\\s*\\{([\\s\\S]*?)^\\}`, 
    "m"
  );
  const interfaceMatch = componentContent.match(interfaceRegex);
  
  if (!interfaceMatch) {
    return props;
  }
  
  const extendedType = interfaceMatch[1]?.trim();
  const interfaceBody = interfaceMatch[2];
  const lines = interfaceBody.split("\n");
  
  // If this interface extends another interface, extract props from it first
  // (but skip React.ComponentProps types as those are handled separately)
  if (extendedType && !extendedType.includes("React.ComponentProps")) {
    const extendedProps = extractPropsFromInterface(componentContent, extendedType);
    props.push(...extendedProps);
  }
  
  // Extract props from this interface
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Skip empty lines, comments, and extends clauses
    if (
      !trimmed ||
      trimmed.startsWith("//") ||
      trimmed.startsWith("extends") ||
      trimmed.startsWith("*")
    ) {
      i++;
      continue;
    }
    
    // Match prop definitions: propName?: type; or propName: type;
    // Also handle: propName?: type = defaultValue;
    // Be careful: function types use => which contains =, so we need to distinguish
    // Default values appear as "= value" (with space before =), function types use "=>" (no space)
    // First try to match with default value (has " = " with spaces, not "=>")
    let propMatch = trimmed.match(/^(\w+)(\??):\s*(.+?)\s+=\s+([^;]+);/);
    if (!propMatch) {
      // Match without default value - capture everything up to semicolon
      // This will correctly capture function types like "(x: string) => void"
      propMatch = trimmed.match(/^(\w+)(\??):\s*(.+?);/);
    }
    if (!propMatch) {
      // Match without semicolon (for multi-line types)
      propMatch = trimmed.match(/^(\w+)(\??):\s*(.+)$/);
    }
    
    if (propMatch) {
      const propName = propMatch[1];
      const isOptional = propMatch[2] === "?";
      let propType = (propMatch[3] || "").trim();
      const defaultValue = propMatch[4]?.trim();
      
      // Check if the type is incomplete (multi-line type)
      // This happens when type starts with opening char but doesn't have semicolon on same line
      const hasSemicolon = trimmed.includes(";");
      
      // If type starts with opening char but doesn't have semicolon, it's multi-line
      // Also check if the type looks incomplete (e.g., just "(" without closing)
      const looksIncomplete = (propType.startsWith("(") || propType.startsWith("<") || propType.startsWith("{")) && 
                               !hasSemicolon &&
                               !propType.includes("=>") && // Single-line function types should have =>
                               (propType.match(/[\(\[\{<]/g) || []).length > (propType.match(/[\)\]\}>]/g) || []).length;
      
      if (looksIncomplete) {
        // Collect additional lines until we find the closing semicolon
        let fullType = propType;
        i++;
        
        while (i < lines.length) {
          const nextLine = lines[i];
          const nextTrimmed = nextLine.trim();
          
          // Skip empty lines and comments
          if (!nextTrimmed || nextTrimmed.startsWith("//")) {
            i++;
            continue;
          }
          
          fullType += " " + nextTrimmed;
          
          // Check if this line completes the type (has semicolon)
          if (nextTrimmed.includes(";")) {
            // Extract just the type part (before semicolon)
            const semicolonIndex = fullType.indexOf(";");
            if (semicolonIndex !== -1) {
              fullType = fullType.substring(0, semicolonIndex).trim();
            }
            break;
          }
          i++;
        }
        
        propType = fullType;
      } else {
        // Clean up the type - remove trailing semicolons and whitespace
        propType = propType.replace(/;?\s*$/, "").trim();
      }
      
      // Avoid duplicates (in case extended interface has same prop)
      if (!props.some(p => p.name === propName)) {
        props.push({
          name: propName,
          type: propType,
          default: defaultValue || (isOptional ? "undefined" : undefined),
          required: !isOptional,
        });
      }
    }
    
    i++;
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
  isAllProps?: boolean; // Flag to indicate if this is an "All props" case
}

/**
 * Helper: Extract React.ComponentProps type from a match result
 */
function extractComponentPropsType(match: RegExpMatchArray, index: number = 1): string {
  const innerType = match[index].trim();
  // Normalize typeof - add it if missing and it's not a string literal
  if (!innerType.includes("typeof") && !innerType.match(/^["'].*["']$/)) {
    return `React.ComponentProps<typeof ${innerType}>`;
  }
  return `React.ComponentProps<${innerType}>`;
}

/**
 * Helper: Find prop type from React.forwardRef pattern
 */
function findForwardRefPropType(componentContent: string, componentName: string): string | null {
  const forwardRefMatch = componentContent.match(
    new RegExp(`const\\s+${componentName}\\s*=\\s*React\\.forwardRef<[^,]+,\\s*([^>]+)>`, "m")
  );
  
  if (!forwardRefMatch) {
    return null;
  }

  const refType = forwardRefMatch[1].trim();
  
  // If it's a Props interface, try to find its definition with extends
  if (refType.includes("Props")) {
    const propsInterfaceMatch = componentContent.match(
      new RegExp(`(?:interface|type)\\s+${refType}[\\s\\S]*?React\\.ComponentProps<([^>]+)>`, "m")
    );
    if (propsInterfaceMatch) {
      const baseType = propsInterfaceMatch[1].trim();
      const cleanBaseType = baseType.replace(/^["']|["']$/g, "");
      return `${refType} (extends React.ComponentProps<"${cleanBaseType}">)`;
    }
  }
  
  return refType;
}

/**
 * Helper: Find prop type from Props interface/type definition
 */
function findPropsInterfaceType(componentContent: string, componentName: string): string | null {
  const propsInterfaceMatch = componentContent.match(
    new RegExp(`(?:interface|type)\\s+${componentName}Props[\\s\\S]{0,500}?extends[\\s\\S]{0,500}?React\\.ComponentProps<([^>]+)>`, "m")
  );
  
  if (!propsInterfaceMatch) {
    return null;
  }
  
  return `${componentName}Props (extends React.ComponentProps<${propsInterfaceMatch[1].trim()}>)`;
}

/**
 * Helper: Find prop type from function definition
 */
function findFunctionPropType(componentContent: string, componentName: string): string | null {
  // Pattern: function ComponentName({ ... }: React.ComponentProps<typeof SomeType.Root>)
  const functionDefRegex = new RegExp(
    `function\\s+${componentName}[\\s\\S]{0,500}?:\\s*React\\.ComponentProps<([^>]+)>`,
    "m"
  );
  const functionMatch = componentContent.match(functionDefRegex);
  
  if (functionMatch) {
    return extractComponentPropsType(functionMatch);
  }
  
  // Alternative: function ComponentName({ ... }: Type) on same line
  const altFunctionMatch = componentContent.match(
    new RegExp(`function\\s+${componentName}\\s*\\([^)]*\\)\\s*:\\s*([^\\{\\n]+)`, "m")
  );
  
  if (altFunctionMatch) {
    return altFunctionMatch[1].trim();
  }
  
  // Pattern: function ComponentName(props: PropsType) - extract parameter type
  const paramTypeMatch = componentContent.match(
    new RegExp(`function\\s+${componentName}\\s*\\([^:]*:\\s*([^)]+)\\)`, "m")
  );
  
  if (paramTypeMatch) {
    return paramTypeMatch[1].trim();
  }
  
  return null;
}

/**
 * Helper: Find prop type from const arrow function pattern
 */
function findConstPropType(componentContent: string, componentName: string): string | null {
  const constPropsPattern = new RegExp(
    `const\\s+${componentName}[\\s\\S]{0,2000}?React\\.ComponentProps<([^>]+)>`,
    "m"
  );
  const constMatch = componentContent.match(constPropsPattern);
  
  if (!constMatch) {
    return null;
  }
  
  return extractComponentPropsType(constMatch);
}

/**
 * Helper: Determine if we should extract individual props or show "All props"
 * Returns true if propType is a custom Props interface (e.g., "ButtonProps")
 * Returns false for direct React.ComponentProps types (e.g., "React.ComponentProps<typeof X>")
 */
function shouldExtractIndividualProps(propType: string): boolean {
  // Extract individual props only if it's a custom Props interface
  // Direct React.ComponentProps types should show "All props from" message
  return propType.includes("Props") && !propType.startsWith("React.ComponentProps<");
}

/**
 * Helper: Clean and normalize prop type string
 */
function normalizePropType(propType: string): string {
  return propType.replace(/\s+/g, " ").trim();
}

/**
 * Extract component props information from component file
 */
function extractComponentProps(componentName: string): ExportedComponent[] | null {
  const componentFilePath = path.join(UI_COMPONENTS_PATH, `${componentName}.tsx`);

  if (!fs.existsSync(componentFilePath)) {
    return null;
  }

  try {
    const componentContent = fs.readFileSync(componentFilePath, "utf-8");
    const components: ExportedComponent[] = [];

    // Find all exported function components
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
      // Try different patterns in order of specificity
      let propType: string | null = 
        findForwardRefPropType(componentContent, exportedName) ||
        findPropsInterfaceType(componentContent, exportedName) ||
        findFunctionPropType(componentContent, exportedName) ||
        findConstPropType(componentContent, exportedName);

      // Normalize the prop type
      if (propType) {
        propType = normalizePropType(propType);
      } else {
        // Fallback: use generic type
        propType = "React.ComponentProps<any>";
      }

      // Determine if we should extract individual props
      let individualProps: ComponentProp[] | undefined = undefined;
      const isAllProps = !shouldExtractIndividualProps(propType);
      
      if (!isAllProps) {
        // Try to extract props from Props interface
        const propsInterfaceNameMatch = propType.match(/(\w+Props)/);
        if (propsInterfaceNameMatch) {
          const propsInterfaceName = propsInterfaceNameMatch[1];
          individualProps = extractPropsFromInterface(componentContent, propsInterfaceName);
          // Only use if we actually found props
          if (!individualProps || individualProps.length === 0) {
            individualProps = undefined;
          }
        }
      }
      
      components.push({
        name: exportedName,
        propType: propType,
        props: individualProps,
        isAllProps: isAllProps && !individualProps,
      });
    }

    return components.length > 0 ? components : null;
  } catch (error) {
    console.warn(`Failed to read component file: ${componentFilePath}`, error);
    return null;
  }
}

/**
 * Format prop type for display in the table
 */
function formatPropTypeForDisplay(propType: string): string {
  // If it's a custom Props interface with extends, keep as is
  if (propType.includes("Props") && propType.includes("extends")) {
    return propType;
  }
  
  // For React.ComponentProps types, extract just the inner type
  const componentPropsMatch = propType.match(/React\.ComponentProps(?:WithoutRef)?<(.+)>/);
  if (componentPropsMatch) {
    let innerType = componentPropsMatch[1].trim();
    
    // Special case: if the inner type is "any" or "typeof any", just return "any"
    if (innerType === "any" || innerType === "typeof any") {
      return "any";
    }
    
    // If the inner type starts with "typeof ", remove it and keep the rest
    if (innerType.startsWith("typeof ")) {
      innerType = innerType.substring(7).trim(); // Remove "typeof " (7 characters)
    }
    
    // Return just the inner type (without React.ComponentProps wrapper)
    return innerType;
  }
  
  return propType;
}

/**
 * Escape HTML entities in type strings to prevent MDX parsing issues
 * Escapes < and > which are used in generics like Promise<boolean>
 */
function escapeTypeForMDX(type: string): string {
  return type
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Generate props table for a component
 */
function generatePropsTable(component: ExportedComponent): string {
  const formattedType = formatPropTypeForDisplay(component.propType);
  
  let tableContent = `### ${component.name}


| Prop | Type | Default |
|------|------|---------|
`;

  // If we have individual props, show them
  if (component.props && component.props.length > 0) {
    for (const prop of component.props) {
      const defaultValue = prop.default || "-";
      const required = prop.required ? "" : "?";
      // Escape angle brackets in type to prevent MDX parsing issues
      const escapedType = escapeTypeForMDX(prop.type);
      tableContent += `| \`${prop.name}${required}\` | \`${escapedType}\` | ${defaultValue} |\n`;
    }
  } else {
    // Show "All props from" message with the formatted type
    const escapedFormattedType = escapeTypeForMDX(formattedType);
    tableContent += `| *All props from* | \`${escapedFormattedType}\` | - |\n`;
  }

  tableContent += "\n";

  return tableContent;
}

/**
 * Extract Default story from stories file
 * Reuses extractAllStories logic for consistency and reliability
 */
function extractDefaultStory(componentName: string): string | null {
  const allStories = extractAllStories(componentName);
  
  if (!allStories) {
    return null;
  }
  
  // Find the Default story
  const defaultStory = allStories.find((story) => story.name === "Default");
  
  return defaultStory ? defaultStory.code : null;
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
  // Track if preview was already added from metadata
  let previewAdded = false;
  
  if (metadata?.content) {
    for (const item of metadata.content) {
      // Preview section
      if (item.preview === "Default" && defaultStory) {
        content += `## Preview

\`\`\`tsx
${defaultStory}
\`\`\`

`;
        previewAdded = true;
      }

      // Usage section - each story as a separate code block (excluding Default)
      if (item.usage === "all" && allStories && allStories.length > 0) {
        // Filter out the "Default" story from usage section
        const usageStories = allStories.filter((story) => story.name !== "Default");
        
        if (usageStories.length > 0) {
          content += `## Usage

`;
          
          for (const story of usageStories) {
            content += `### ${story.name}

\`\`\`tsx
${story.code}
\`\`\`

`;
          }
        }
      }

      // Installation section
      if (item.installation === "@aura") {
        content += `## Installation
Make sure that \`namespace\` is set in your component.json file. Namespace docs: [Learn more about namespaces](/docs/namespace)
\`\`\`bash
pnpm dlx shadcn@latest add @aura/${kebabName}
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
  
  // Auto-generate preview for components with Default story if not already added
  // Insert it right after the frontmatter, before other sections
  if (!previewAdded && defaultStory) {
    const previewSection = `## Preview

\`\`\`tsx
${defaultStory}
\`\`\`

`;
    // Find the position after frontmatter (after "---\n\n")
    const frontmatterEnd = content.indexOf("---\n\n");
    if (frontmatterEnd !== -1) {
      const insertPosition = frontmatterEnd + 5; // After "---\n\n"
      content = content.slice(0, insertPosition) + previewSection + content.slice(insertPosition);
    } else {
      // Fallback: find first section and insert before it
      const firstSectionMatch = content.match(/\n## /);
      if (firstSectionMatch && firstSectionMatch.index !== undefined) {
        const insertPosition = firstSectionMatch.index + 1; // After the newline before "## "
        content = content.slice(0, insertPosition) + previewSection + content.slice(insertPosition);
      } else {
        // Last resort: prepend
        content = content.replace("---\n\n", `---\n\n${previewSection}`);
      }
    }
  }

  return content;
}

/**
 * Convert story name to PascalCase demo name
 * e.g., "Default" -> "ButtonDemo", "Fill" -> "ButtonDemoFill"
 * Handles cases where story name already includes component name or "Demo"
 */
function toDemoName(componentName: string, storyName: string): string {
  const componentPascal = componentName.replace(/(?:^|[-_])(\w)/g, (_, c) => c.toUpperCase());
  const storyPascal = storyName.replace(/(?:^|[-_])(\w)/g, (_, c) => c.toUpperCase());
  
  // If story name is "Default", just use ComponentDemo
  if (storyName === "Default") {
    return `${componentPascal}Demo`;
  }
  
  // If story name already ends with "Demo", don't add it again
  if (storyName.endsWith("Demo") || storyPascal.endsWith("Demo")) {
    // Check if it already starts with component name
    const componentLower = componentPascal.toLowerCase();
    const storyLower = storyPascal.toLowerCase();
    if (storyLower.startsWith(componentLower)) {
      // Already has component prefix, just return as is
      return storyPascal;
    }
    // Has "Demo" but not component prefix, add component prefix
    return `${componentPascal}${storyPascal}`;
  }
  
  // Check if story name already starts with component name (case-insensitive)
  const componentLower = componentPascal.toLowerCase();
  const storyLower = storyPascal.toLowerCase();
  if (storyLower.startsWith(componentLower)) {
    // Already has component prefix, just add "Demo" if not present
    return storyPascal.endsWith("Demo") ? storyPascal : `${storyPascal}Demo`;
  }
  
  // Normal case: add component prefix and "Demo"
  return `${componentPascal}Demo${storyPascal}`;
}

/**
 * Convert story name to kebab-case registry key
 * e.g., "button", "Default" -> "button-demo", "button", "Fill" -> "button-demo-fill"
 * Handles cases where story name already includes "Demo"
 */
function toRegistryKey(componentName: string, storyName: string, demoName: string): string {
  const kebabComponent = toKebabCase(componentName);
  
  // "Default" story always gets the simple key
  if (storyName === "Default") {
    return `${kebabComponent}-demo`;
  }
  
  // Convert story name to kebab-case (always use story name, not demo name)
  const storyKebab = storyName.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  
  // Always use component-demo-story-name format for non-Default stories
  // This ensures uniqueness even if story name already includes "demo"
  return `${kebabComponent}-demo-${storyKebab}`;
}

/**
 * Generate demo file from stories with specific demo names
 */
function generateDemoFileWithNames(componentName: string, stories: Story[], demoNames: string[]): string {
  const kebabName = toKebabCase(componentName);
  const storiesContent = fs.readFileSync(
    path.join(STORIES_PATH, `${kebabName}.stories.tsx`),
    "utf-8"
  );
  const importSection = extractImports(storiesContent);
  const replacedImports = replaceImportPaths(importSection);
  
  // Collect unique imports (avoid duplicates)
  const importLines = replacedImports ? replacedImports.split("\n").filter(line => line.trim()) : [];
  const seenImports = new Set<string>();
  const uniqueImports: string[] = [];
  
  for (const line of importLines) {
    if (!seenImports.has(line)) {
      seenImports.add(line);
      uniqueImports.push(line);
    }
  }
  
  let demoContent = uniqueImports.length > 0 ? `${uniqueImports.join("\n")}\n\n` : "";
  
  // Export all stories with specified demo names
  for (let i = 0; i < stories.length; i++) {
    const story = stories[i];
    const demoName = demoNames[i];
    let storyCode = story.code;
    
    // Remove the import section from story code if it exists (we already have it at the top)
    if (replacedImports) {
      // Remove imports from story code to avoid duplication
      const lines = storyCode.split("\n");
      const codeWithoutImports = lines.filter(line => {
        const trimmed = line.trim();
        return !trimmed.startsWith("import ") || !trimmed.includes(" from ");
      });
      storyCode = codeWithoutImports.join("\n");
    }
    
    // Rename the export
    if (storyCode.includes(`export const ${story.name}`)) {
      storyCode = storyCode.replace(
        new RegExp(`export\\s+const\\s+${story.name}\\s*=`),
        `export const ${demoName} =`
      );
    } else if (storyCode.includes(`export function ${story.name}`)) {
      storyCode = storyCode.replace(
        new RegExp(`export\\s+function\\s+${story.name}\\s*\\(`),
        `export function ${demoName}(`
      );
    }
    
    demoContent += `${storyCode}\n\n`;
  }
  
  return demoContent.trim();
}

/**
 * Generate demo file from stories
 */
function generateDemoFile(componentName: string, stories: Story[]): string {
  const kebabName = toKebabCase(componentName);
  const storiesContent = fs.readFileSync(
    path.join(STORIES_PATH, `${kebabName}.stories.tsx`),
    "utf-8"
  );
  const importSection = extractImports(storiesContent);
  const replacedImports = replaceImportPaths(importSection);
  
  // Collect unique imports (avoid duplicates)
  const importLines = replacedImports ? replacedImports.split("\n").filter(line => line.trim()) : [];
  const seenImports = new Set<string>();
  const uniqueImports: string[] = [];
  
  for (const line of importLines) {
    if (!seenImports.has(line)) {
      seenImports.add(line);
      uniqueImports.push(line);
    }
  }
  
  let demoContent = uniqueImports.length > 0 ? `${uniqueImports.join("\n")}\n\n` : "";
  
  // Export all stories with demo names
  for (const story of stories) {
    const demoName = toDemoName(componentName, story.name);
    // Extract just the component code without the export keyword
    let storyCode = story.code;
    
    // Remove the import section from story code if it exists (we already have it at the top)
    if (replacedImports) {
      // Remove imports from story code to avoid duplication
      const lines = storyCode.split("\n");
      const codeWithoutImports = lines.filter(line => {
        const trimmed = line.trim();
        return !trimmed.startsWith("import ") || !trimmed.includes(" from ");
      });
      storyCode = codeWithoutImports.join("\n");
    }
    
    // Rename the export
    if (storyCode.includes(`export const ${story.name}`)) {
      storyCode = storyCode.replace(
        new RegExp(`export\\s+const\\s+${story.name}\\s*=`),
        `export const ${demoName} =`
      );
    } else if (storyCode.includes(`export function ${story.name}`)) {
      storyCode = storyCode.replace(
        new RegExp(`export\\s+function\\s+${story.name}\\s*\\(`),
        `export function ${demoName}(`
      );
    }
    
    demoContent += `${storyCode}\n\n`;
  }
  
  return demoContent.trim();
}

/**
 * Convert kebab-case to PascalCase
 * e.g., "button" -> "Button", "navigation-menu" -> "NavigationMenu"
 */
function kebabToPascal(kebab: string): string {
  return kebab
    .split("-")
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

/**
 * Generate preview component registry
 */
function generatePreviewRegistry() {
  // Ensure output directories exist
  if (!fs.existsSync(DEMOS_OUTPUT_PATH)) {
    fs.mkdirSync(DEMOS_OUTPUT_PATH, { recursive: true });
    console.log(`[INFO] Created demos directory: ${DEMOS_OUTPUT_PATH}`);
  }

  const components = getUIComponentFiles();
  const registryEntries: Array<{ key: string; demoName: string; componentName: string }> = [];
  const imports: Array<{ path: string; names: string[] }> = [];
  
  console.log(`\n[INFO] Generating preview component registry...\n`);

  // Process each component
  for (const component of components) {
    const allStories = extractAllStories(component.name);
    
    if (!allStories || allStories.length === 0) {
      continue;
    }

    const kebabName = toKebabCase(component.name);
    const demoFileName = `${kebabName}-demo.tsx`;
    const demoFilePath = path.join(DEMOS_OUTPUT_PATH, demoFileName);
    
    // Check for naming conflicts and resolve them
    const componentPascal = component.name.replace(/(?:^|[-_])(\w)/g, (_, c) => c.toUpperCase());
    const defaultDemoName = `${componentPascal}Demo`;
    
    // Check if any story already uses the default demo name
    const hasDefaultDemoName = allStories.some(story => {
      const storyPascal = story.name.replace(/(?:^|[-_])(\w)/g, (_, c) => c.toUpperCase());
      return storyPascal === defaultDemoName || 
             (story.name.endsWith("Demo") && storyPascal.toLowerCase().startsWith(componentPascal.toLowerCase()));
    });
    
    // Generate demo names with conflict resolution
    const demoNames: string[] = [];
    const usedNames = new Set<string>();
    const usedKeys = new Set<string>();
    
    // First pass: assign demo names
    for (const story of allStories) {
      let demoName = toDemoName(component.name, story.name);
      
      // Handle conflict: if "Default" story conflicts with existing "Demo" story
      if (story.name === "Default" && hasDefaultDemoName && demoName === defaultDemoName) {
        // Rename Default to ComponentDemoDefault
        demoName = `${defaultDemoName}Default`;
      }
      
      // Ensure uniqueness
      let finalDemoName = demoName;
      let counter = 1;
      while (usedNames.has(finalDemoName)) {
        finalDemoName = `${demoName}${counter}`;
        counter++;
      }
      usedNames.add(finalDemoName);
      demoNames.push(finalDemoName);
    }
    
    // Second pass: assign registry keys (ensuring uniqueness)
    for (let i = 0; i < allStories.length; i++) {
      const story = allStories[i];
      const demoName = demoNames[i];
      
      let registryKey = toRegistryKey(component.name, story.name, demoName);
      
      // Ensure key uniqueness
      let finalKey = registryKey;
      let counter = 1;
      while (usedKeys.has(finalKey)) {
        // If it's the Default story and key is taken, use a different approach
        if (story.name === "Default") {
          finalKey = `${toKebabCase(component.name)}-demo-default`;
        } else {
          finalKey = `${registryKey}-${counter}`;
        }
        counter++;
      }
      usedKeys.add(finalKey);
      
      registryEntries.push({
        key: finalKey,
        demoName: demoName,
        componentName: component.name,
      });
    }
    
    // Generate demo file with correct names
    const demoContent = generateDemoFileWithNames(component.name, allStories, demoNames);
    fs.writeFileSync(demoFilePath, demoContent);
    
    imports.push({
      path: `@/components/demos/${kebabName}-demo`,
      names: demoNames,
    });
    
    console.log(`[SUCCESS] Generated ${demoFileName} with ${allStories.length} demo${allStories.length !== 1 ? 's' : ''}`);
  }

  // Generate registry file
  const registryFilePath = path.join(REGISTRY_OUTPUT_PATH, "registry.tsx");
  
  let registryContent = `import * as React from "react"\n\n`;
  registryContent += `// Component demos\n`;
  
  // Add imports
  for (const imp of imports) {
    if (imp.names.length > 0) {
      registryContent += `import { \n`;
      registryContent += imp.names.map(name => `  ${name}`).join(",\n");
      registryContent += `\n} from "${imp.path}"\n`;
    }
  }
  
  registryContent += `\n`;
  registryContent += `export const Registry = {\n`;
  
  // Add registry entries
  for (const entry of registryEntries) {
    registryContent += `  "${entry.key}": {\n`;
    registryContent += `    component: ${entry.demoName},\n`;
    registryContent += `  },\n`;
  }
  
  registryContent += `} as const\n\n`;
  registryContent += `export type RegistryItem = {\n`;
  registryContent += `  component: React.ComponentType<any>\n`;
  registryContent += `}\n\n`;
  registryContent += `export type RegistryName = keyof typeof Registry\n`;
  
  fs.writeFileSync(registryFilePath, registryContent);
  console.log(`\n[SUCCESS] Generated registry.tsx with ${registryEntries.length} entries\n`);
  
  // Generate demos index file
  const demosIndexFilePath = path.join(DEMOS_OUTPUT_PATH, "index.tsx");
  
  let demosIndexContent = `import * as React from "react"\n\n`;
  demosIndexContent += `// Component demos\n`;
  
  // Add imports with relative paths
  for (const imp of imports) {
    if (imp.names.length > 0) {
      // Extract filename from path (e.g., "@/components/demos/button-demo" -> "button-demo")
      const fileName = imp.path.replace("@/components/demos/", "");
      demosIndexContent += `import { \n`;
      demosIndexContent += imp.names.map(name => `  ${name}`).join(",\n");
      demosIndexContent += `\n} from "./${fileName}"\n`;
    }
  }
  
  demosIndexContent += `\n`;
  demosIndexContent += `export const Registry = {\n`;
  
  // Add registry entries
  for (const entry of registryEntries) {
    demosIndexContent += `  "${entry.key}": {\n`;
    demosIndexContent += `    component: ${entry.demoName},\n`;
    demosIndexContent += `  },\n`;
  }
  
  demosIndexContent += `} as const\n\n`;
  demosIndexContent += `export type RegistryItem = {\n`;
  demosIndexContent += `  component: React.ComponentType<any>\n`;
  demosIndexContent += `}\n\n`;
  demosIndexContent += `export type RegistryName = keyof typeof Registry\n`;
  
  fs.writeFileSync(demosIndexFilePath, demosIndexContent);
  console.log(`[SUCCESS] Generated demos/index.tsx with ${registryEntries.length} entries\n`);
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
    console.log(`[INFO] Created documentation directory: ${DOCS_OUTPUT_PATH}`);
  }

  const components = getUIComponentFiles();
  let created = 0;
  let skipped = 0;
  let withPreview = 0;
  let withUsage = 0;
  let withCustomDescription = 0;

  console.log(`\n[INFO] Processing ${components.length} UI component${components.length !== 1 ? 's' : ''}\n`);

  for (const component of components) {
    const kebabName = toKebabCase(component.name);
    const mdxFileName = `${kebabName}.mdx`;
    const mdxFilePath = path.join(DOCS_OUTPUT_PATH, mdxFileName);

    // Parse metadata
    const metadata = parseMetadata(component.name);
    
    // Always try to extract Default story (for auto-preview generation)
    let defaultStory: string | null = null;
    defaultStory = extractDefaultStory(component.name);
    
    // Check if preview should be shown (either from metadata or auto-detected)
    const hasPreviewDefault = metadata?.content?.some((item) => item.preview === "Default");
    const shouldShowPreview = hasPreviewDefault || defaultStory !== null;
    
    if (shouldShowPreview && defaultStory) {
      withPreview++;
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
    
    const features: string[] = [];
    if (defaultStory) features.push("preview");
    if (allStories) features.push("usage");
    if (metadata?.header?.description) features.push("custom description");
    
    const featuresText = features.length > 0 ? ` [${features.join(", ")}]` : "";
    console.log(`[SUCCESS] Generated ${mdxFileName}${featuresText}`);
    created++;
  }

  console.log(`\n[SUMMARY] Documentation Generation Complete`);
  console.log(`  Total components:     ${components.length}`);
  console.log(`  Documentation files: ${created}`);
  console.log(`  With preview:         ${withPreview}`);
  console.log(`  With usage:           ${withUsage}`);
  console.log(`  With custom desc:     ${withCustomDescription}`);
  console.log(`  Skipped:              ${skipped}\n`);
}

// Generate preview component registry
generatePreviewRegistry();

// Generate documentation files
generateDocs();
