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
  
  // For React.ComponentProps types, ensure proper formatting
  const componentPropsMatch = propType.match(/React\.ComponentProps<(.+)>/);
  if (componentPropsMatch) {
    const innerType = componentPropsMatch[1].trim();
    // Keep typeof if present, add it if missing (unless it's a string literal)
    if (innerType.includes("typeof")) {
      return `React.ComponentProps<${innerType}>`;
    } else if (innerType.match(/^["'].*["']$/)) {
      // String literal like "button"
      return `React.ComponentProps<${innerType}>`;
    } else {
      // Add typeof for component references
      return `React.ComponentProps<typeof ${innerType}>`;
    }
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

generateDocs();
