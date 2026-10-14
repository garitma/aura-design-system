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
const UTILS_DOCS_OUTPUT_PATH = path.join(
  __dirname,
  "../../../apps/www/content/docs/utils"
);
const CHARTS_DOCS_OUTPUT_PATH = path.join(
  __dirname,
  "../../../apps/www/content/docs/charts"
);
const UTILS_GROUP = "utils";
const CHARTS_GROUP = "charts";
const SIDEBAR_GROUPS = new Set([UTILS_GROUP, CHARTS_GROUP]);
const CHART_PAGE_ORDER = [
  "area-chart",
  "bar-chart",
  "line-chart",
  "pie-chart",
  "radar-chart",
  "radial-chart",
  "chart-tooltips",
];
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
const ALL_TXT_OUTPUT_PATH = path.join(
  __dirname,
  "../../../apps/www/public"
);
const REGISTRY_JSON_PATH = path.join(__dirname, "../registry.json");

const DEFAULT_DESCRIPTION =
  "Re-usable components built using Radix UI and Tailwind CSS.";

interface MetadataContent {
  preview?: string;
  installation?: string;
  source?: string;
  usage?: string;
  props?: string[];
}

interface RegistryFile {
  path: string;
  type: string;
  target?: string;
}

interface RegistryItem {
  name: string;
  type: string;
  files?: RegistryFile[];
  dependencies?: string[];
  registryDependencies?: string[];
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
    title?: string;
  };
  links?: {
    doc?: string;
    api?: string;
  };
  status?: string;
  group?: string;
  page?: boolean;
  content?: MetadataContent[];
}

function toTitleCase(name: string): string {
  return name.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
}

function toKebabCase(name: string): string {
  return name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function parseContentArray(contentString: string): MetadataContent[] {
  const contentLines = contentString.split("\n");
  const content: MetadataContent[] = [];
  let currentItem: MetadataContent = {};
  let inPropsSection = false;

  for (let i = 0; i < contentLines.length; i++) {
    const line = contentLines[i];
    const trimmedLine = line.trim();
    const indentLevel = line.length - line.trimStart().length;
    
    if (trimmedLine.startsWith("- ")) {
      if (indentLevel <= 2) {
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
        } else if (contentItem.startsWith("source: ")) {
          const sourceValue = contentItem.substring("source: ".length).trim();
          currentItem.source = sourceValue;
        } else if (contentItem.startsWith("usage: ")) {
          const usageValue = contentItem.substring("usage: ".length).trim();
          currentItem.usage = usageValue;
        } else if (contentItem === "props:" || contentItem.startsWith("props:")) {
          currentItem.props = [];
          inPropsSection = true;
        }
      } else if (inPropsSection && indentLevel > 2) {
      }
    } else if (trimmedLine && indentLevel <= 2 && !trimmedLine.startsWith("#")) {
      inPropsSection = false;
    }
  }
  
  if (Object.keys(currentItem).length > 0) {
    content.push(currentItem);
  }

  return content;
}

function loadTemplateContent(templatePath: string): MetadataContent[] | null {
  const templateFilePath = path.join(METADATA_PATH, templatePath);
  
  if (!fs.existsSync(templateFilePath)) {
    return null;
  }

  try {
    const templateContent = fs.readFileSync(templateFilePath, "utf-8");
    
    const contentMatch = templateContent.match(/^content:\s*\n((?:\s+-\s+.*\n?)+)/m);
    if (contentMatch) {
      return parseContentArray(contentMatch[1]);
    }
    
    return parseContentArray(templateContent);
  } catch (error) {
    console.warn(`Failed to load template: ${templateFilePath}`, error);
    return null;
  }
}

function parseMetadata(componentName: string): Metadata | null {
  const kebabName = toKebabCase(componentName);
  const yamlFilePath = path.join(METADATA_PATH, `${kebabName}.yml`);

  if (!fs.existsSync(yamlFilePath)) {
    return null;
  }

  try {
    const yamlContent = fs.readFileSync(yamlFilePath, "utf-8");
    const metadata: Metadata = {};

    const headerBlock = yamlContent.match(/^header:\s*\n((?:[ \t]+[^\n]+\n)+)/m);
    if (headerBlock) {
      const description = headerBlock[1].match(/^[ \t]+description:\s*(.+)$/m);
      const title = headerBlock[1].match(/^[ \t]+title:\s*(.+)$/m);
      metadata.header = {};
      if (description) metadata.header.description = description[1].trim();
      if (title) {
        metadata.header.title = title[1].trim().replace(/^["']|["']$/g, "");
      }
    }

    const statusMatch = yamlContent.match(/^status:\s*(.+)$/m);
    if (statusMatch) {
      metadata.status = statusMatch[1].trim();
    }

    const groupMatch = yamlContent.match(/^group:\s*(.+)$/m);
    if (groupMatch) {
      metadata.group = groupMatch[1].trim();
    }

    const pageMatch = yamlContent.match(/^page:\s*(.+)$/m);
    if (pageMatch && pageMatch[1].trim() === "false") {
      metadata.page = false;
    }

    const linksMatch = yamlContent.match(/^links:\s*\n((?:\s+[a-z]+:\s*.+\n?)+)/m);
    if (linksMatch) {
      const linksContent = linksMatch[1];
      const links: { doc?: string; api?: string } = {};
      
      const docMatch = linksContent.match(/^\s+doc:\s*(.+)$/m);
      if (docMatch) {
        links.doc = docMatch[1].trim();
      }
      
      const apiMatch = linksContent.match(/^\s+api:\s*(.+)$/m);
      if (apiMatch) {
        links.api = apiMatch[1].trim();
      }
      
      if (Object.keys(links).length > 0) {
        metadata.links = links;
      }
    }

    const extendsMatch = yamlContent.match(/^extends:\s*(.+)$/m);
    const templatePath = extendsMatch ? extendsMatch[1].trim() : null;

    const contentMatch = yamlContent.match(/^content:\s*\n((?:\s+-\s+.*\n?)+)/m);
    let content: MetadataContent[] = [];

    if (contentMatch) {
      content = parseContentArray(contentMatch[1]);
    } else if (templatePath) {
      const templateContent = loadTemplateContent(templatePath);
      if (templateContent) {
        content = templateContent;
      }
    } else {
      const defaultTemplate = loadTemplateContent("_templates/content.yml");
      if (defaultTemplate) {
        content = defaultTemplate;
      }
    }

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

function replaceImportPaths(code: string): string {
  return code.replace(/\.\.\/registry\/default\//g, "@/");
}

function extractImports(storiesContent: string): string {
  const importSectionMatch = storiesContent.match(/^(import[\s\S]*?from\s+["'][^"']+["'];?\s*\n)+/m);
  let importSection = "";
  
  if (importSectionMatch) {
    importSection = importSectionMatch[0].trim();
  } else {
    const lines = storiesContent.split("\n");
    const importLines: string[] = [];
    let inMultiLineImport = false;
    let currentImport = "";
    
    for (const line of lines) {
      const trimmed = line.trim();
      
      if (trimmed.startsWith("import ")) {
        if (trimmed.includes(" from ")) {
          importLines.push(line);
        } else {
          inMultiLineImport = true;
          currentImport = line;
        }
      } else if (inMultiLineImport) {
        currentImport += "\n" + line;
        if (trimmed.includes(" from ")) {
          importLines.push(currentImport);
          currentImport = "";
          inMultiLineImport = false;
        }
      } else if (importLines.length > 0 && trimmed && !trimmed.startsWith("//")) {
        break;
      }
    }
    
    if (currentImport) {
      importLines.push(currentImport);
    }
    
    importSection = importLines.join("\n");
  }
  
  const importStatements = parseImportStatements(importSection);
  
  const filteredStatements = importStatements.filter(stmt => {
    const trimmed = stmt.trim();
    if (trimmed.startsWith("import type") && trimmed.includes("@ladle/react")) {
      return false;
    }
    if (trimmed.includes("import type") && trimmed.includes("Story") && trimmed.includes("@ladle")) {
      return false;
    }
    return true;
  });
  
  const filteredText = filteredStatements.join("\n");
  return replaceImportPaths(filteredText.trim());
}

interface Story {
  name: string;
  code: string;
}

function extractAllStories(componentName: string): Story[] | null {
  const storiesFilePath = path.join(STORIES_PATH, `${toKebabCase(componentName)}.stories.tsx`);

  if (!fs.existsSync(storiesFilePath)) {
    return null;
  }

  try {
    const storiesContent = fs.readFileSync(storiesFilePath, "utf-8");

    const storyMatches: Array<{ name: string; start: number; type: "const" | "function" }> = [];
    const constStoryRegex = /export\s+const\s+(\w+)\s*=\s*(?:\(\)\s*=>|\([^)]*\)\s*=>)/g;
    const functionStoryRegex = /export\s+function\s+(\w+)\s*\(/g;
    
    let startMatch;
    while ((startMatch = constStoryRegex.exec(storiesContent)) !== null) {
      storyMatches.push({
        name: startMatch[1],
        start: startMatch.index,
        type: "const",
      });
    }
    while ((startMatch = functionStoryRegex.exec(storiesContent)) !== null) {
      storyMatches.push({
        name: startMatch[1],
        start: startMatch.index,
        type: "function",
      });
    }
    
    storyMatches.sort((a, b) => a.start - b.start);

    const stories: Story[] = [];

    for (let i = 0; i < storyMatches.length; i++) {
      const currentStory = storyMatches[i];
      const startIndex = currentStory.start;
      
      let endIndex = storiesContent.length;
      if (i < storyMatches.length - 1) {
        endIndex = storyMatches[i + 1].start;
      }
      
      const storySection = storiesContent.substring(startIndex, endIndex);
      
      let storyEndMatch: RegExpMatchArray | null = null;
      
      if (currentStory.type === "const") {
        const constStart = storySection.indexOf("export const");
        if (constStart !== -1) {
          const arrowMatch = storySection.substring(constStart).match(/(?:\(\)\s*=>|\([^)]*\)\s*=>)\s*\{/);
          if (arrowMatch) {
            const arrowIndex = constStart + arrowMatch.index! + arrowMatch[0].length;
            let braceCount = 1;
            let endPos = -1;
            
            for (let i = arrowIndex; i < storySection.length; i++) {
              const char = storySection[i];
              if (char === '{') {
                braceCount++;
              } else if (char === '}') {
                braceCount--;
                if (braceCount === 0) {
                  const remaining = storySection.substring(i + 1).trim();
                  if (remaining.startsWith(";")) {
                    endPos = i + 1 + remaining.indexOf(";") + 1;
                  } else {
                    endPos = i + 1;
                  }
                  break;
                }
              }
            }
            
            if (endPos > constStart) {
              storyEndMatch = [storySection.substring(constStart, endPos)];
            }
          }
        }
        
        if (!storyEndMatch) {
          const arrowStart = storySection.indexOf("=>");
          if (arrowStart !== -1) {
            const afterArrow = storySection.substring(arrowStart + 2).trimStart();
            if (afterArrow.startsWith("(")) {
              let parenCount = 0;
              let foundStart = false;
              let endPos = -1;
              
              for (let i = 0; i < afterArrow.length; i++) {
                const char = afterArrow[i];
                if (char === '(') {
                  parenCount++;
                  foundStart = true;
                } else if (char === ')') {
                  parenCount--;
                  if (foundStart && parenCount === 0) {
                    const remaining = afterArrow.substring(i + 1).trim();
                    if (remaining.startsWith(";")) {
                      endPos = arrowStart + 2 + i + 1 + remaining.indexOf(";") + 1;
                      break;
                    }
                  }
                }
              }
              
              if (endPos > arrowStart) {
                const storyStart = storySection.indexOf("export");
                storyEndMatch = [storySection.substring(storyStart, endPos)];
              }
            }
          }
        }
        
        if (!storyEndMatch) {
          storyEndMatch = storySection.match(/(export\s+const\s+\w+\s*=\s*(?:\(\)\s*=>|\([^)]*\)\s*=>)[\s\S]*?;)/);
        }
      } else if (currentStory.type === "function") {
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
        
        if (!storyEndMatch) {
          storyEndMatch = storySection.match(/(export\s+function\s+\w+\s*\([^)]*\)\s*\{[\s\S]*?\n\})/);
        }
      }
      
      if (storyEndMatch) {
        const storyText = storyEndMatch[0];
        
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

function extractPropsFromType(
  type: ts.Type,
  checker: ts.TypeChecker
): ComponentProp[] {
  const props: ComponentProp[] = [];
  
  const properties = checker.getPropertiesOfType(type);
  
  for (const property of properties) {
    const propertyType = checker.getTypeOfSymbolAtLocation(
      property,
      property.valueDeclaration || type.symbol?.valueDeclaration!
    );
    const typeString = formatType(propertyType, checker);
    
    let isOptional = false;
    const declarations = property.getDeclarations();
    if (declarations && declarations.length > 0) {
      for (const declaration of declarations) {
        if (ts.isPropertySignature(declaration) || ts.isParameter(declaration)) {
          isOptional = !!declaration.questionToken;
        }
      }
    }
    
    let description: string | undefined = undefined;
    if (declarations && declarations.length > 0) {
      const declaration = declarations[0];
      const sourceFile = declaration.getSourceFile();
      const fullText = sourceFile.getFullText();
      const nodeStart = declaration.getFullStart();
      
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

function extractPropsFromRadixType(
  typeReference: string,
  componentContent: string,
  componentFilePath: string
): ComponentProp[] {
  try {
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
    
    const host = ts.createCompilerHost(compilerOptions);
    const program = ts.createProgram([componentFilePath], compilerOptions, host);
    const checker = program.getTypeChecker();
    const sourceFile = program.getSourceFile(componentFilePath);
    
    if (!sourceFile) {
      return [];
    }
    
    const isTypeof = typeReference.startsWith("typeof ");
    const cleanTypeRef = typeReference.replace(/^typeof\s+/, "").trim();
    const [namespace, member] = cleanTypeRef.split(".");
    
    if (!namespace || !member) {
      return [];
    }
    
    let propsTypeNode: ts.TypeNode | null = null;
    
    function visit(node: ts.Node): void {
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
                    return;
                  }
                }
              }
            }
          }
        }
      }
      
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
                        return;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      
      if (ts.isVariableStatement(node)) {
        for (const declaration of node.declarationList.declarations) {
          if (declaration.initializer && ts.isCallExpression(declaration.initializer)) {
            const callExpr = declaration.initializer;
            if (callExpr.expression && ts.isPropertyAccessExpression(callExpr.expression) &&
                callExpr.expression.name.text === "forwardRef") {
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
                          return;
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
      const propsType = checker.getTypeAtLocation(propsTypeNode);
      
      const typeString = checker.typeToString(propsType);
      if (typeString !== "any" && !typeString.includes("ComponentProps<any>")) {
        const props = extractPropsFromType(propsType, checker);
        
        if (props.length > 0) {
          return props;
        }
      }
      
      const typeArgs = propsTypeNode.typeArguments;
      if (typeArgs && typeArgs.length > 0) {
        const componentType = checker.getTypeAtLocation(typeArgs[0]);
        const componentTypeString = checker.typeToString(componentType);
        
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
    return [];
  }
}

function extractPropsFromInterface(
  componentContent: string,
  interfaceName: string
): ComponentProp[] {
  const props: ComponentProp[] = [];
  
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
  
  if (extendedType && !extendedType.includes("React.ComponentProps")) {
    const extendedProps = extractPropsFromInterface(componentContent, extendedType);
    props.push(...extendedProps);
  }
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    
    if (
      !trimmed ||
      trimmed.startsWith("//") ||
      trimmed.startsWith("extends") ||
      trimmed.startsWith("*")
    ) {
      i++;
      continue;
    }
    
    let propMatch = trimmed.match(/^(\w+)(\??):\s*(.+?)\s+=\s+([^;]+);/);
    if (!propMatch) {
      propMatch = trimmed.match(/^(\w+)(\??):\s*(.+?);/);
    }
    if (!propMatch) {
      propMatch = trimmed.match(/^(\w+)(\??):\s*(.+)$/);
    }
    
    if (propMatch) {
      const propName = propMatch[1];
      const isOptional = propMatch[2] === "?";
      let propType = (propMatch[3] || "").trim();
      const defaultValue = propMatch[4]?.trim();
      
      const hasSemicolon = trimmed.includes(";");
      
      const looksIncomplete = (propType.startsWith("(") || propType.startsWith("<") || propType.startsWith("{")) && 
                               !hasSemicolon &&
                               !propType.includes("=>") &&
                               (propType.match(/[\(\[\{<]/g) || []).length > (propType.match(/[\)\]\}>]/g) || []).length;
      
      if (looksIncomplete) {
        let fullType = propType;
        i++;
        
        while (i < lines.length) {
          const nextLine = lines[i];
          const nextTrimmed = nextLine.trim();
          
          if (!nextTrimmed || nextTrimmed.startsWith("//")) {
            i++;
            continue;
          }
          
          fullType += " " + nextTrimmed;
          
          if (nextTrimmed.includes(";")) {
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
        propType = propType.replace(/;?\s*$/, "").trim();
      }
      
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

interface ExportedComponent {
  name: string;
  propType: string;
  props?: ComponentProp[];
  isAllProps?: boolean;
}

function extractComponentPropsType(match: RegExpMatchArray, index: number = 1): string {
  const innerType = match[index].trim();
  if (!innerType.includes("typeof") && !innerType.match(/^["'].*["']$/)) {
    return `React.ComponentProps<typeof ${innerType}>`;
  }
  return `React.ComponentProps<${innerType}>`;
}

function findForwardRefPropType(componentContent: string, componentName: string): string | null {
  const forwardRefMatch = componentContent.match(
    new RegExp(`const\\s+${componentName}\\s*=\\s*React\\.forwardRef<[^,]+,\\s*([^>]+)>`, "m")
  );
  
  if (!forwardRefMatch) {
    return null;
  }

  const refType = forwardRefMatch[1].trim();
  
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

function findPropsInterfaceType(componentContent: string, componentName: string): string | null {
  const propsInterfaceMatch = componentContent.match(
    new RegExp(`(?:interface|type)\\s+${componentName}Props[\\s\\S]{0,500}?extends[\\s\\S]{0,500}?React\\.ComponentProps<([^>]+)>`, "m")
  );
  
  if (!propsInterfaceMatch) {
    return null;
  }
  
  return `${componentName}Props (extends React.ComponentProps<${propsInterfaceMatch[1].trim()}>)`;
}

function findFunctionPropType(componentContent: string, componentName: string): string | null {
  const functionDefRegex = new RegExp(
    `function\\s+${componentName}[\\s\\S]{0,500}?:\\s*React\\.ComponentProps<([^>]+)>`,
    "m"
  );
  const functionMatch = componentContent.match(functionDefRegex);
  
  if (functionMatch) {
    return extractComponentPropsType(functionMatch);
  }
  
  const altFunctionMatch = componentContent.match(
    new RegExp(`function\\s+${componentName}\\s*\\([^)]*\\)\\s*:\\s*([^\\{\\n]+)`, "m")
  );
  
  if (altFunctionMatch) {
    return altFunctionMatch[1].trim();
  }
  
  const paramTypeMatch = componentContent.match(
    new RegExp(`function\\s+${componentName}\\s*\\([^:]*:\\s*([^)]+)\\)`, "m")
  );
  
  if (paramTypeMatch) {
    return paramTypeMatch[1].trim();
  }
  
  return null;
}

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

function shouldExtractIndividualProps(propType: string): boolean {
  return propType.includes("Props") && !propType.startsWith("React.ComponentProps<");
}

function normalizePropType(propType: string): string {
  return propType.replace(/\s+/g, " ").trim();
}

function extractComponentProps(componentName: string): ExportedComponent[] | null {
  const componentFilePath = path.join(UI_COMPONENTS_PATH, `${componentName}.tsx`);

  if (!fs.existsSync(componentFilePath)) {
    return null;
  }

  try {
    const componentContent = fs.readFileSync(componentFilePath, "utf-8");
    const components: ExportedComponent[] = [];

    const exportMatch = componentContent.match(/export\s+\{([^}]+)\}/);
    if (!exportMatch) {
      return null;
    }

    const exportedNames = exportMatch[1]
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    for (const exportedName of exportedNames) {
      let propType: string | null = 
        findForwardRefPropType(componentContent, exportedName) ||
        findPropsInterfaceType(componentContent, exportedName) ||
        findFunctionPropType(componentContent, exportedName) ||
        findConstPropType(componentContent, exportedName);

      if (propType) {
        propType = normalizePropType(propType);
      } else {
        propType = "React.ComponentProps<any>";
      }

      let individualProps: ComponentProp[] | undefined = undefined;
      const isAllProps = !shouldExtractIndividualProps(propType);
      
      if (!isAllProps) {
        const propsInterfaceNameMatch = propType.match(/(\w+Props)/);
        if (propsInterfaceNameMatch) {
          const propsInterfaceName = propsInterfaceNameMatch[1];
          individualProps = extractPropsFromInterface(componentContent, propsInterfaceName);
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

function formatPropTypeForDisplay(propType: string): string {
  if (propType.includes("Props") && propType.includes("extends")) {
    return propType;
  }
  
  const componentPropsMatch = propType.match(/React\.ComponentProps(?:WithoutRef)?<(.+)>/);
  if (componentPropsMatch) {
    let innerType = componentPropsMatch[1].trim();
    
    if (innerType === "any" || innerType === "typeof any") {
      return "any";
    }
    
    if (innerType.startsWith("typeof ")) {
      innerType = innerType.substring(7).trim();
    }
    
    return innerType;
  }
  
  return propType;
}

function escapeTypeForMDX(type: string): string {
  return type
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/{/g, "&#123;")
    .replace(/}/g, "&#125;");
}

function generatePropsTable(component: ExportedComponent): string {
  const formattedType = formatPropTypeForDisplay(component.propType);
  
  let tableContent = `### ${component.name}

| Prop | Type | Default |
|------|------|---------|
`;

  if (component.props && component.props.length > 0) {
    for (const prop of component.props) {
      const defaultValue = prop.default || "-";
      const required = prop.required ? "" : "?";
      const escapedType = escapeTypeForMDX(prop.type);
      tableContent += `| \`${prop.name}${required}\` | \`${escapedType}\` | ${defaultValue} |\n`;
    }
  } else {
    const escapedFormattedType = escapeTypeForMDX(formattedType);
    tableContent += `| *All props from* | \`${escapedFormattedType}\` | - |\n`;
  }

  tableContent += "\n";

  return tableContent;
}

function extractDefaultStory(componentName: string): string | null {
  const allStories = extractAllStories(componentName);
  
  if (!allStories) {
    return null;
  }
  
  const defaultStory = allStories.find((story) => story.name === "Default");
  
  return defaultStory ? defaultStory.code : null;
}

function formatStoryCodeForPreview(storyCode: string, componentName: string): string {
  const componentPascal = componentName.replace(/(?:^|[-_])(\w)/g, (_, c) => c.toUpperCase());
  const demoName = `${componentPascal}Demo`;
  
  const kebabName = toKebabCase(componentName);
  const storiesFilePath = path.join(STORIES_PATH, `${kebabName}.stories.tsx`);
  let importLines: string[] = [];
  
  if (fs.existsSync(storiesFilePath)) {
    try {
      const storiesContent = fs.readFileSync(storiesFilePath, "utf-8");
      const extractedImports = extractImports(storiesContent);
      const replacedImports = replaceImportPaths(extractedImports);
      
      if (replacedImports) {
        importLines = replacedImports.split("\n").filter(line => line.trim());
      }
    } catch (error) {
    }
  }
  
  const lines = storyCode.split("\n");
  const codeLines: string[] = [];
  let foundExport = false;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("export ")) {
      foundExport = true;
      codeLines.push(line);
    } else if (foundExport || (trimmed && !trimmed.startsWith("import "))) {
      codeLines.push(line);
    }
  }
  
  const codeSection = codeLines.join("\n");
  
  let formattedCode = codeSection;
  
  if (/export\s+const\s+Default\s*=\s*\(\)\s*=>\s*\{/.test(formattedCode)) {
    formattedCode = formattedCode.replace(
      /export\s+const\s+Default\s*=\s*\(\)\s*=>\s*\{/g,
      `export function ${demoName}() {`
    );
    formattedCode = formattedCode.replace(/\};(\s*)$/, "}$1");
  }
  else if (formattedCode.includes("export const Default = () =>")) {
    formattedCode = formattedCode.replace(
      /export\s+const\s+Default\s*=\s*\(\)\s*=>\s*/g,
      `export function ${demoName}() {\n  return `
    );
    if (!formattedCode.includes("}")) {
      formattedCode = formattedCode.trim() + "\n}";
    }
  }
  else if (formattedCode.includes("export const Default:")) {
    formattedCode = formattedCode.replace(
      /export\s+const\s+Default\s*:\s*Story\s*=\s*\(\)\s*=>\s*\{/g,
      `export function ${demoName}() {`
    );
  }
  else if (formattedCode.includes("export function Default")) {
    formattedCode = formattedCode.replace(
      /export\s+function\s+Default\s*\(/g,
      `export function ${demoName}(`
    );
  }
  
  const imports = importLines.join("\n").trim();
  const formatted = formattedCode.trim();
  
  if (imports) {
    return `${imports}\n\n${formatted}`;
  }
  
  return formatted;
}

function loadRegistryData(): { items: RegistryItem[] } | null {
  if (!fs.existsSync(REGISTRY_JSON_PATH)) {
    return null;
  }

  try {
    const registryContent = fs.readFileSync(REGISTRY_JSON_PATH, "utf-8");
    return JSON.parse(registryContent);
  } catch (error) {
    console.warn(`Failed to load registry.json: ${REGISTRY_JSON_PATH}`, error);
    return null;
  }
}

function generateMdxContent(
  componentName: string,
  metadata: Metadata | null,
  defaultStory: string | null,
  allStories: Story[] | null
): string {
  const title = metadata?.header?.title || toTitleCase(componentName);
  const kebabName = toKebabCase(componentName);
  const description =
    metadata?.header?.description || DEFAULT_DESCRIPTION;

  let frontmatter = `---
title: ${title}
description: ${description}`;

  if (metadata?.status) {
    frontmatter += `\nstatus: ${metadata.status}`;
  }

  if (metadata?.links) {
    frontmatter += `\nlinks:`;
    if (metadata.links.doc) {
      frontmatter += `\n  doc: ${metadata.links.doc}`;
    }
    if (metadata.links.api) {
      frontmatter += `\n  api: ${metadata.links.api}`;
    }
  }

  frontmatter += `\n---\n\n`;

  let content = frontmatter + `import { ComponentPreview } from "@/components/ComponentPreview"
import { ComponentSource } from "@/components/ComponentSource"
import { Steps, Step } from "fumadocs-ui/components/steps"

`;

  let previewAdded = false;
  
  if (metadata?.content) {
    for (const item of metadata.content) {
      if (item.preview === "Default" && defaultStory) {
        const registryKey = `${toKebabCase(componentName)}-demo`;
        const componentCode = formatStoryCodeForPreview(defaultStory, componentName);
        
        content += `## Preview

<ComponentPreview name="${registryKey}" description="${description}">

\`\`\`tsx
${componentCode}
\`\`\`

</ComponentPreview>

`;
        previewAdded = true;
      }

      if (item.usage === "all" && allStories && allStories.length > 0) {
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

      if (item.installation === "@aura") {
        content += `## Installation
Make sure that \`namespace\` is set in your component.json file. Namespace docs: [Learn more about namespaces](/docs/namespace)
\`\`\`bash
pnpm dlx shadcn@latest add @aura/${kebabName}
\`\`\`

`;
      }

      if (item.source === "all") {
        const registryData = loadRegistryData();
        const componentData = registryData?.items?.find(
          (item: RegistryItem) => item.name === kebabName
        );
        
        if (componentData) {
          const dependencies = componentData.dependencies || [];
          const registryDependencies = componentData.registryDependencies || [];
          const componentFiles = componentData.files || [];
          
          if (dependencies.length > 0 || registryDependencies.length > 0 || componentFiles.length > 0) {
            content += `### Manual

<Steps>
`;
            
            if (dependencies.length > 0) {
              const depsList = dependencies.join(" ");
              content += `  <Step>
    Install the following dependencies:

    \`\`\`bash
pnpm install ${depsList}
    \`\`\`
  </Step>
`;
            }
            
            for (const regDep of registryDependencies) {
              const depName = regDep.replace("@aura/", "");
              
              const depComponentData = registryData?.items?.find(
                (item: RegistryItem) => item.name === depName && (item.type === "registry:ui" || item.type === "registry:component")
              );
              
              if (depComponentData && depComponentData.files && depComponentData.files.length > 0) {
                for (const depFile of depComponentData.files) {
                  if (depFile.path.endsWith(".css")) {
                    continue;
                  }
                  
                  const depFilePath = path.join(__dirname, "..", depFile.path);
                  if (fs.existsSync(depFilePath)) {
                    const depFileName = path.basename(depFile.path);
                    let depTargetPath = depFile.target;
                    if (!depTargetPath) {
                      if (depFile.path.includes("/components/ui/")) {
                        depTargetPath = `components/ui/${depFileName}`;
                      } else if (depFile.path.includes("/components/")) {
                        depTargetPath = `components/${depFileName}`;
                      } else {
                        depTargetPath = depFileName;
                      }
                    }
                    
                    const depNameFormatted = depName.replace(/-/g, " ");
                    const description = `Copy and paste the ${depNameFormatted} component into your \`${depTargetPath}\` file.`;
                    
                    const depFileContent = fs.readFileSync(depFilePath, "utf-8");
                    const depLang = depFilePath.endsWith(".tsx") ? "tsx" : depFilePath.endsWith(".ts") ? "ts" : "tsx";
                    
                    content += `  <Step>
    ${description}

\`\`\`${depLang}
${depFileContent}
\`\`\`
  </Step>
`;
                  }
                }
              } else {
                const utilPath = path.join(__dirname, "../registry/default/utils", `${depName}.ts`);
                const utilPathTsx = path.join(__dirname, "../registry/default/utils", `${depName}.tsx`);
                const hookPath = path.join(__dirname, "../registry/default/hooks", `${depName}.ts`);
                const hookPathTsx = path.join(__dirname, "../registry/default/hooks", `${depName}.tsx`);
                
                let filePath: string | null = null;
                let fileType = "util";
                
                if (fs.existsSync(utilPath)) {
                  filePath = utilPath;
                } else if (fs.existsSync(utilPathTsx)) {
                  filePath = utilPathTsx;
                } else if (fs.existsSync(hookPath)) {
                  filePath = hookPath;
                  fileType = "hook";
                } else if (fs.existsSync(hookPathTsx)) {
                  filePath = hookPathTsx;
                  fileType = "hook";
                }
                
                if (filePath) {
                  const fileName = path.basename(filePath);
                  const depNameFormatted = depName.replace(/-/g, " ");
                  const description = fileType === "hook" 
                    ? `Copy and paste the ${depNameFormatted} hook into your \`${fileType === "hook" ? "hooks" : "utils"}/${fileName}\` file.`
                    : `Copy and paste the ${depNameFormatted} utility into your \`${fileType === "hook" ? "hooks" : "utils"}/${fileName}\` file.`;
                  
                  const fileContent = fs.readFileSync(filePath, "utf-8");
                  const lang = filePath.endsWith(".tsx") ? "tsx" : filePath.endsWith(".ts") ? "ts" : "tsx";
                  
                  content += `  <Step>
    ${description}

\`\`\`${lang}
${fileContent}
\`\`\`
  </Step>
`;
                }
              }
            }
            
            for (const file of componentFiles) {
              if (file.path.endsWith(".css")) {
                continue;
              }
              
              const fileName = path.basename(file.path);
              const filePath = path.join(__dirname, "..", file.path);
              
              let targetPath = file.target;
              if (!targetPath) {
                if (file.path.includes("/components/ui/")) {
                  targetPath = `components/ui/${fileName}`;
                } else if (file.path.includes("/components/")) {
                  targetPath = `components/${fileName}`;
                } else {
                  targetPath = fileName;
                }
              }
              
              const componentPascalName = fileName.replace(/\.(tsx?|jsx?)$/, "");
              
              let description = `Copy and paste the following code into your \`${targetPath}\` file.`;
              if (file.path.includes("/components/ui/")) {
                description = `Copy and paste the ${componentPascalName} component into your \`${targetPath}\` file.`;
              } else if (file.path.includes("/components/")) {
                description = `Copy and paste the ${componentPascalName} component into your \`${targetPath}\` file.`;
              }
              
              if (fs.existsSync(filePath)) {
                const fileContent = fs.readFileSync(filePath, "utf-8");
                const lang = filePath.endsWith(".tsx") ? "tsx" : filePath.endsWith(".ts") ? "ts" : "tsx";
                
                content += `  <Step>
    ${description}

\`\`\`${lang}
${fileContent}
\`\`\`
  </Step>
`;
              }
            }
            
            content += `</Steps>

`;
          }
        }
      }

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
  
  if (!previewAdded && defaultStory) {
    const registryKey = `${toKebabCase(componentName)}-demo`;
    const componentCode = formatStoryCodeForPreview(defaultStory, componentName);
    
    const previewSection = `## Preview

<ComponentPreview name="${registryKey}" description="${description}">

\`\`\`tsx
${componentCode}
\`\`\`

</ComponentPreview>

`;
    const frontmatterEnd = content.indexOf("---\n\n");
    if (frontmatterEnd !== -1) {
      const insertPosition = frontmatterEnd + 5;
      content = content.slice(0, insertPosition) + previewSection + content.slice(insertPosition);
    } else {
      const firstSectionMatch = content.match(/\n## /);
      if (firstSectionMatch && firstSectionMatch.index !== undefined) {
        const insertPosition = firstSectionMatch.index + 1;
        content = content.slice(0, insertPosition) + previewSection + content.slice(insertPosition);
      } else {
        content = content.replace("---\n\n", `---\n\n${previewSection}`);
      }
    }
  }

  return content;
}

function toDemoName(componentName: string, storyName: string): string {
  const componentPascal = componentName.replace(/(?:^|[-_])(\w)/g, (_, c) => c.toUpperCase());
  const storyPascal = storyName.replace(/(?:^|[-_])(\w)/g, (_, c) => c.toUpperCase());
  
  if (storyName === "Default") {
    return `${componentPascal}Demo`;
  }
  
  if (storyName.endsWith("Demo") || storyPascal.endsWith("Demo")) {
    const componentLower = componentPascal.toLowerCase();
    const storyLower = storyPascal.toLowerCase();
    if (storyLower.startsWith(componentLower)) {
      return storyPascal;
    }
    return `${componentPascal}${storyPascal}`;
  }
  
  const componentLower = componentPascal.toLowerCase();
  const storyLower = storyPascal.toLowerCase();
  if (storyLower.startsWith(componentLower)) {
    return storyPascal.endsWith("Demo") ? storyPascal : `${storyPascal}Demo`;
  }
  
  return `${componentPascal}Demo${storyPascal}`;
}

function toRegistryKey(componentName: string, storyName: string, demoName: string): string {
  const kebabComponent = toKebabCase(componentName);
  
  if (storyName === "Default") {
    return `${kebabComponent}-demo`;
  }
  
  const storyKebab = storyName.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  
  return `${kebabComponent}-demo-${storyKebab}`;
}

function extractTopLevelConstants(storiesContent: string): string {
  const lines = storiesContent.split("\n");
  const constants: string[] = [];
  let inMultiLineImport = false;
  let foundFirstExport = false;
  let currentConstant: string[] = [];
  let braceCount = 0;
  let parenCount = 0;
  let inConstant = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    if (trimmed.startsWith("import ")) {
      if (trimmed.includes(" from ")) {
        inMultiLineImport = false;
        continue;
      }
      inMultiLineImport = true;
      continue;
    }

    if (inMultiLineImport) {
      if (trimmed.includes(" from ")) {
        inMultiLineImport = false;
      }
      continue;
    }
    
    if (trimmed.startsWith("export ")) {
      foundFirstExport = true;
      break;
    }
    
    if (!foundFirstExport) {
      const constMatch = trimmed.match(/^(const|let|var|function|type|interface)\s+(\w+)/);
      if (constMatch) {
        if (currentConstant.length > 0) {
          constants.push(currentConstant.join("\n"));
          currentConstant = [];
        }
        
        inConstant = true;
        currentConstant = [line];
        braceCount = 0;
        parenCount = 0;
        
        for (const char of line) {
          if (char === '{') braceCount++;
          if (char === '}') braceCount--;
          if (char === '(') parenCount++;
          if (char === ')') parenCount--;
        }
        
        if (trimmed.endsWith(";") && braceCount === 0 && parenCount === 0) {
          constants.push(line);
          currentConstant = [];
          inConstant = false;
        }
        continue;
      }
      
      if (inConstant) {
        currentConstant.push(line);
        
        for (const char of line) {
          if (char === '{') braceCount++;
          if (char === '}') braceCount--;
          if (char === '(') parenCount++;
          if (char === ')') parenCount--;
        }
        
        if (braceCount === 0 && parenCount === 0 && trimmed.endsWith(";")) {
          constants.push(currentConstant.join("\n"));
          currentConstant = [];
          inConstant = false;
        }
      }
    }
  }
  
  if (currentConstant.length > 0) {
    constants.push(currentConstant.join("\n"));
  }
  
  const result = constants.join("\n\n");
  return result ? result + "\n" : "";
}

function parseImportStatements(importText: string): string[] {
  if (!importText || !importText.trim()) {
    return [];
  }
  
  const statements: string[] = [];
  const lines = importText.split("\n");
  let currentStatement: string[] = [];
  let inMultiLineImport = false;
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    if (trimmed.startsWith("import ")) {
      if (currentStatement.length > 0) {
        statements.push(currentStatement.join("\n"));
        currentStatement = [];
      }
      
      if (trimmed.includes(" from ")) {
        statements.push(line);
      } else {
        inMultiLineImport = true;
        currentStatement = [line];
      }
    } else if (inMultiLineImport) {
      currentStatement.push(line);
      if (trimmed.includes(" from ")) {
        statements.push(currentStatement.join("\n"));
        currentStatement = [];
        inMultiLineImport = false;
      }
    }
  }
  
  if (currentStatement.length > 0) {
    statements.push(currentStatement.join("\n"));
  }
  
  return statements;
}

function generateDemoFileWithNames(componentName: string, stories: Story[], demoNames: string[]): string {
  const kebabName = toKebabCase(componentName);
  const storiesContent = fs.readFileSync(
    path.join(STORIES_PATH, `${kebabName}.stories.tsx`),
    "utf-8"
  );
  const importSection = extractImports(storiesContent);
  const replacedImports = replaceImportPaths(importSection);
  
  const importStatements = parseImportStatements(replacedImports);
  const seenImports = new Set<string>();
  const uniqueImports: string[] = [];
  
  for (const stmt of importStatements) {
    if (!seenImports.has(stmt)) {
      seenImports.add(stmt);
      uniqueImports.push(stmt);
    }
  }
  
  let demoContent = uniqueImports.length > 0 ? `${uniqueImports.join("\n")}\n\n` : "";
  
  const topLevelConstants = extractTopLevelConstants(storiesContent);
  if (topLevelConstants) {
    demoContent += `${topLevelConstants}\n\n`;
  }
  
  for (let i = 0; i < stories.length; i++) {
    const story = stories[i];
    const demoName = demoNames[i];
    let storyCode = story.code;
    
    if (replacedImports) {
      const lines = storyCode.split("\n");
      const codeWithoutImports: string[] = [];
      let inMultiLineImport = false;
      
      for (const line of lines) {
        const trimmed = line.trim();
        
        if (trimmed.startsWith("import ")) {
          if (trimmed.includes(" from ")) {
            continue;
          } else {
            inMultiLineImport = true;
            continue;
          }
        }
        
        if (inMultiLineImport) {
          if (trimmed.includes(" from ")) {
            inMultiLineImport = false;
            continue;
          } else {
            continue;
          }
        }
        
        codeWithoutImports.push(line);
      }
      
      storyCode = codeWithoutImports.join("\n");
    }
    
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

function generateDemoFile(componentName: string, stories: Story[]): string {
  const kebabName = toKebabCase(componentName);
  const storiesContent = fs.readFileSync(
    path.join(STORIES_PATH, `${kebabName}.stories.tsx`),
    "utf-8"
  );
  const importSection = extractImports(storiesContent);
  const replacedImports = replaceImportPaths(importSection);
  
  const importStatements = parseImportStatements(replacedImports);
  const seenImports = new Set<string>();
  const uniqueImports: string[] = [];
  
  for (const stmt of importStatements) {
    if (!seenImports.has(stmt)) {
      seenImports.add(stmt);
      uniqueImports.push(stmt);
    }
  }
  
  let demoContent = uniqueImports.length > 0 ? `${uniqueImports.join("\n")}\n\n` : "";
  
  for (const story of stories) {
    const demoName = toDemoName(componentName, story.name);
    let storyCode = story.code;
    
    if (replacedImports) {
      const lines = storyCode.split("\n");
      const codeWithoutImports: string[] = [];
      let inMultiLineImport = false;
      
      for (const line of lines) {
        const trimmed = line.trim();
        
        if (trimmed.startsWith("import ")) {
          if (trimmed.includes(" from ")) {
            continue;
          } else {
            inMultiLineImport = true;
            continue;
          }
        }
        
        if (inMultiLineImport) {
          if (trimmed.includes(" from ")) {
            inMultiLineImport = false;
            continue;
          } else {
            continue;
          }
        }
        
        codeWithoutImports.push(line);
      }
      
      storyCode = codeWithoutImports.join("\n");
    }
    
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

function kebabToPascal(kebab: string): string {
  return kebab
    .split("-")
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function generatePreviewRegistry() {
  if (!fs.existsSync(DEMOS_OUTPUT_PATH)) {
    fs.mkdirSync(DEMOS_OUTPUT_PATH, { recursive: true });
    console.log(`[INFO] Created demos directory: ${DEMOS_OUTPUT_PATH}`);
  }

  const components = getUIComponentFiles();
  const registryEntries: Array<{ key: string; demoName: string; componentName: string }> = [];
  const imports: Array<{ path: string; names: string[] }> = [];
  
  console.log(`\n[INFO] Generating preview component registry...\n`);

  for (const component of components) {
    const allStories = extractAllStories(component.name);
    
    if (!allStories || allStories.length === 0) {
      const kebabName = toKebabCase(component.name);
      const storiesFilePath = path.join(STORIES_PATH, `${kebabName}.stories.tsx`);
      if (fs.existsSync(storiesFilePath)) {
        console.warn(`[WARN] Found story file for ${component.name} but couldn't extract stories: ${storiesFilePath}`);
      }
      continue;
    }

    const kebabName = toKebabCase(component.name);
    const demoFileName = `${kebabName}-demo.tsx`;
    const demoFilePath = path.join(DEMOS_OUTPUT_PATH, demoFileName);
    
    const componentPascal = component.name.replace(/(?:^|[-_])(\w)/g, (_, c) => c.toUpperCase());
    const defaultDemoName = `${componentPascal}Demo`;
    
    const hasDefaultDemoName = allStories.some(story => {
      const storyPascal = story.name.replace(/(?:^|[-_])(\w)/g, (_, c) => c.toUpperCase());
      return storyPascal === defaultDemoName || 
             (story.name.endsWith("Demo") && storyPascal.toLowerCase().startsWith(componentPascal.toLowerCase()));
    });
    
    const demoNames: string[] = [];
    const usedNames = new Set<string>();
    const usedKeys = new Set<string>();
    
    for (const story of allStories) {
      let demoName = toDemoName(component.name, story.name);
      
      if (story.name === "Default" && hasDefaultDemoName && demoName === defaultDemoName) {
        demoName = `${defaultDemoName}Default`;
      }
      
      let finalDemoName = demoName;
      let counter = 1;
      while (usedNames.has(finalDemoName)) {
        finalDemoName = `${demoName}${counter}`;
        counter++;
      }
      usedNames.add(finalDemoName);
      demoNames.push(finalDemoName);
    }
    
    for (let i = 0; i < allStories.length; i++) {
      const story = allStories[i];
      const demoName = demoNames[i];
      
      let registryKey = toRegistryKey(component.name, story.name, demoName);
      
      let finalKey = registryKey;
      let counter = 1;
      while (usedKeys.has(finalKey)) {
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
    
    const demoContent = generateDemoFileWithNames(component.name, allStories, demoNames);
    fs.writeFileSync(demoFilePath, demoContent);
    
    imports.push({
      path: `@/components/demos/${kebabName}-demo`,
      names: demoNames,
    });
    
    console.log(`[SUCCESS] Generated ${demoFileName} with ${allStories.length} demo${allStories.length !== 1 ? 's' : ''}`);
  }

  const registryFilePath = path.join(REGISTRY_OUTPUT_PATH, "registry.tsx");
  
  let registryContent = `import * as React from "react"\n\n`;
  registryContent += `// Component demos\n`;
  
  for (const imp of imports) {
    if (imp.names.length > 0) {
      registryContent += `import { \n`;
      registryContent += imp.names.map(name => `  ${name}`).join(",\n");
      registryContent += `\n} from "${imp.path}"\n`;
    }
  }
  
  registryContent += `\n`;
  registryContent += `export const Registry = {\n`;
  
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
  
  const demosIndexFilePath = path.join(DEMOS_OUTPUT_PATH, "index.tsx");
  
  let demosIndexContent = `import * as React from "react"\n\n`;
  demosIndexContent += `// Component demos\n`;
  
  for (const imp of imports) {
    if (imp.names.length > 0) {
      const fileName = imp.path.replace("@/components/demos/", "");
      demosIndexContent += `import { \n`;
      demosIndexContent += imp.names.map(name => `  ${name}`).join(",\n");
      demosIndexContent += `\n} from "./${fileName}"\n`;
    }
  }
  
  demosIndexContent += `\n`;
  demosIndexContent += `export const Registry = {\n`;
  
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

function docsDirForGroup(group?: string) {
  if (group === UTILS_GROUP) return UTILS_DOCS_OUTPUT_PATH;
  if (group === CHARTS_GROUP) return CHARTS_DOCS_OUTPUT_PATH;
  return DOCS_OUTPUT_PATH;
}

function ensureDocsDir(dir: string, label: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`[INFO] Created ${label} directory: ${dir}`);
  }
}

function removeStaleDoc(kebabName: string, keepDir: string) {
  for (const dir of [DOCS_OUTPUT_PATH, UTILS_DOCS_OUTPUT_PATH, CHARTS_DOCS_OUTPUT_PATH]) {
    if (dir === keepDir) continue;
    const stalePath = path.join(dir, `${kebabName}.mdx`);
    if (fs.existsSync(stalePath)) {
      fs.unlinkSync(stalePath);
      console.log(`[INFO] Removed stale doc ${stalePath}`);
    }
  }
}

function generateDocs() {
  ensureDocsDir(DOCS_OUTPUT_PATH, "documentation");
  ensureDocsDir(UTILS_DOCS_OUTPUT_PATH, "utils documentation");
  ensureDocsDir(CHARTS_DOCS_OUTPUT_PATH, "charts documentation");

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
    const metadata = parseMetadata(component.name);

    if (!metadata) {
      console.log(`[SKIP] Skipping ${mdxFileName} - no metadata file found`);
      skipped++;
      continue;
    }

    if (metadata.page === false) {
      for (const dir of [DOCS_OUTPUT_PATH, UTILS_DOCS_OUTPUT_PATH, CHARTS_DOCS_OUTPUT_PATH]) {
        const stalePath = path.join(dir, mdxFileName);
        if (fs.existsSync(stalePath)) {
          fs.unlinkSync(stalePath);
          console.log(`[INFO] Removed docs page ${stalePath}`);
        }
      }
      console.log(`[SKIP] Skipping ${mdxFileName} - page: false`);
      skipped++;
      continue;
    }

    const outputDir = docsDirForGroup(metadata.group);
    const mdxFilePath = path.join(outputDir, mdxFileName);
    removeStaleDoc(kebabName, outputDir);
    
    let defaultStory: string | null = null;
    defaultStory = extractDefaultStory(component.name);
    
    const hasPreviewDefault = metadata?.content?.some((item) => item.preview === "Default");
    const shouldShowPreview = hasPreviewDefault || defaultStory !== null;
    
    if (shouldShowPreview && defaultStory) {
      withPreview++;
    }

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

type IndexEntry = {
  name: string;
  title: string;
  description: string;
  kebabName: string;
};

function collectIndexEntries(group?: string): IndexEntry[] {
  const entries: IndexEntry[] = [];

  for (const component of getUIComponentFiles()) {
    const metadata = parseMetadata(component.name);
    if (metadata?.page === false) continue;
    if (group) {
      if (metadata?.group !== group) continue;
    } else if (metadata?.group && SIDEBAR_GROUPS.has(metadata.group)) {
      continue;
    }

    const kebabName = toKebabCase(component.name);
    entries.push({
      name: component.name,
      title: metadata?.header?.title || toTitleCase(component.name),
      description: metadata?.header?.description || DEFAULT_DESCRIPTION,
      kebabName,
    });
  }

  entries.sort((a, b) => a.title.localeCompare(b.title));
  return entries;
}

function writeCatalogIndex(options: {
  dir: string;
  title: string;
  description: string;
  heading: string;
  intro: string;
  linkPrefix: string;
  entries: IndexEntry[];
  label: string;
}) {
  let indexContent = `---
title: ${options.title}
description: ${options.description}
---

## ${options.heading}

${options.intro}

`;

  for (const entry of options.entries) {
    indexContent += `### [${entry.title}](${options.linkPrefix}${entry.kebabName})\n\n`;
    indexContent += `${entry.description}\n\n`;
  }

  fs.writeFileSync(path.join(options.dir, "index.mdx"), indexContent);
  console.log(`[SUCCESS] Generated ${options.label} with ${options.entries.length} entries\n`);
}

const MANUAL_COMPONENT_PAGES: IndexEntry[] = [
  {
    name: "Toast",
    title: "Toast",
    description:
      "How to install sileo and style it with Aura tokens. Aura does not ship a Toast component.",
    kebabName: "toast",
  },
  {
    name: "Typography",
    title: "Typography",
    description:
      "The fluid type scale as CSS classes. Aura does not ship a Typography component.",
    kebabName: "typography",
  },
];

function generateComponentsIndex() {
  const entries = collectIndexEntries();
  for (const page of MANUAL_COMPONENT_PAGES) {
    const docPath = path.join(DOCS_OUTPUT_PATH, `${page.kebabName}.mdx`);
    if (!fs.existsSync(docPath)) continue;
    if (entries.some((entry) => entry.kebabName === page.kebabName)) continue;
    entries.push(page);
  }
  entries.sort((a, b) => a.title.localeCompare(b.title));

  writeCatalogIndex({
    dir: DOCS_OUTPUT_PATH,
    title: "All Components",
    description: "A comprehensive list of all available components in the Aura Design System.",
    heading: "All Components",
    intro: "Here is a complete list of all available components in the Aura Design System:",
    linkPrefix: "./components/",
    entries,
    label: "components index.mdx",
  });
}

function generateUtilsIndex() {
  ensureDocsDir(UTILS_DOCS_OUTPUT_PATH, "utils documentation");
  writeCatalogIndex({
    dir: UTILS_DOCS_OUTPUT_PATH,
    title: "Utils",
    description: "Headless helpers and primitives that support Aura components.",
    heading: "Utils",
    intro: "These utilities render little or no chrome of their own. Use them to compose accessible, client-safe, and directional UI.",
    linkPrefix: "./",
    entries: collectIndexEntries(UTILS_GROUP),
    label: "utils index.mdx",
  });
}

function generateChartsIndex() {
  ensureDocsDir(CHARTS_DOCS_OUTPUT_PATH, "charts documentation");
  const entries = collectIndexEntries(CHARTS_GROUP);
  entries.sort((a, b) => {
    const ai = CHART_PAGE_ORDER.indexOf(a.kebabName);
    const bi = CHART_PAGE_ORDER.indexOf(b.kebabName);
    const ao = ai === -1 ? CHART_PAGE_ORDER.length : ai;
    const bo = bi === -1 ? CHART_PAGE_ORDER.length : bi;
    if (ao !== bo) return ao - bo;
    return a.title.localeCompare(b.title);
  });

  writeCatalogIndex({
    dir: CHARTS_DOCS_OUTPUT_PATH,
    title: "Charts",
    description: "Area, bar, line, pie, radar, and radial charts, plus tooltip patterns.",
    heading: "Charts",
    intro: `Chart families sit in their own section. They share one base, \`Chart.tsx\` (\`@aura/chart\`). Components does not list a separate Chart page; \`/docs/components/chart\` redirects here.

### Chart container

\`ChartContainer\` wraps the Recharts plot. \`config\` maps each series key to a label and a color: \`var(--chart-1)\` through \`var(--chart-5)\`, or a plain CSS color such as \`#4015ca\`. \`label\` is the accessible name. The container writes \`--color-<key>\` for the series. On small screens the frame is square; from the \`sm\` breakpoint it is 16:9.

### Tooltip

\`ChartTooltip\` is the Recharts tooltip. \`ChartTooltipContent\` paints the Aura surface (gray step 1, gray step 6 border) and one marker per series: dot, line, or dashed. Markers use \`--chart-marker\` (8px) and \`--chart-marker-line\` (2px).

### Legend

\`ChartLegend\` is the Recharts legend. \`ChartLegendContent\` shows that same marker, or the series icon, beside the label from \`config\`.
`,
    linkPrefix: "./",
    entries,
    label: "charts index.mdx",
  });

  const meta = {
    title: "Charts",
    pages: ["index", ...entries.map((entry) => entry.kebabName)],
  };
  fs.writeFileSync(
    path.join(CHARTS_DOCS_OUTPUT_PATH, "meta.json"),
    `${JSON.stringify(meta, null, 2)}\n`,
  );
  console.log(`[SUCCESS] Generated charts meta.json\n`);
}

function generateAllTxt() {
  if (!fs.existsSync(ALL_TXT_OUTPUT_PATH)) {
    fs.mkdirSync(ALL_TXT_OUTPUT_PATH, { recursive: true });
    console.log(`[INFO] Created public directory: ${ALL_TXT_OUTPUT_PATH}`);
  }

  const components = getUIComponentFiles();
  const kebabNames = components
    .map((component) => toKebabCase(component.name))
    .sort();

  const command = `pnpm dlx shadcn@latest add ${kebabNames.map((name) => `@aura/${name}`).join(" ")}`;

  const allTxtPath = path.join(ALL_TXT_OUTPUT_PATH, "all.txt");
  fs.writeFileSync(allTxtPath, command);
  console.log(`[SUCCESS] Generated all.txt with ${kebabNames.length} primitives\n`);
}

generatePreviewRegistry();

generateDocs();

generateComponentsIndex();

generateUtilsIndex();

generateChartsIndex();

generateAllTxt();