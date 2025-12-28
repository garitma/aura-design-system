import * as fs from "fs";
import * as path from "path";

// Color resolution map from CSS variables to actual hex values
const colorMap: Record<string, string> = {
  "--accent-1": "#17121c",
  "--accent-2": "#1c1524",
  "--accent-3": "#2e1d3d",
  "--accent-4": "#3b2351",
  "--accent-5": "#462b5e",
  "--accent-6": "#52356b",
  "--accent-7": "#634381",
  "--accent-8": "#7d55a2",
  "--accent-9": "#bf91ec",
  "--accent-10": "#b486e0",
  "--accent-11": "#cea0fc",
  "--accent-12": "#e9dbf9",
  "--gray-1": "#f6f9ff",
  "--gray-2": "#f0f6ff",
  "--gray-3": "#e3ecff",
  "--gray-4": "#d7e4ff",
  "--gray-5": "#ccdcff",
  "--gray-6": "#c2d4ff",
  "--gray-7": "#b4c8ff",
  "--gray-8": "#99b3ff",
  "--gray-9": "#6d84d5",
  "--gray-10": "#647ac5",
  "--gray-11": "#4b5c9a",
  "--gray-12": "#121b48",
  "--aura-accents-primary": "#bf91ec", // maps to accent-9
  "--aura-text-primary": "#e9dbf9", // maps to accent-12
  "--aura-text-primary-inverse": "#ffffff",
  "--aura-link": "#121b48", // maps to gray-12
  "--aura-link-hover": "#1c1524", // maps to accent-2
  "--aura-button-hover": "#cea0fc", // maps to accent-11
};

// Helper to convert hex to RGB (0-1 range for Figma)
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      }
    : null;
}

// Resolve CSS variable to hex color
function resolveColor(cssVar: string): string {
  // Remove var() wrapper if present
  const varName = cssVar.replace(/var\(([^)]+)\)/, "$1").trim();
  return colorMap[varName] || "#000000";
}

// Parse Button component to extract variants and sizes
function parseButtonComponent(filePath: string): {
  variants: string[];
  sizes: string[];
} {
  const content = fs.readFileSync(filePath, "utf-8");

  // Extract variants from buttonVariants - get keys from variant object
  const variantMatch = content.match(/variant:\s*\{([\s\S]+?)\}/);
  const variants: string[] = [];
  if (variantMatch) {
    const variantContent = variantMatch[1];
    // Match variant keys (default, fill, pill, link, menu)
    const variantKeys = variantContent.match(/(\w+):\s*"[^"]+"/g);
    if (variantKeys) {
      variants.push(...variantKeys.map((v) => v.split(":")[0].trim()));
    }
  }

  // Extract sizes - get keys from size object
  const sizeMatch = content.match(/size:\s*\{([\s\S]+?)\}/);
  const sizes: string[] = [];
  if (sizeMatch) {
    const sizeContent = sizeMatch[1];
    // Match size keys (default, xs, sm, md, lg, xl, icon)
    const sizeKeys = sizeContent.match(/(\w+):\s*"[^"]+"/g);
    if (sizeKeys) {
      sizes.push(...sizeKeys.map((s) => s.split(":")[0].trim()));
    }
  }

  // Remove duplicates and filter out 'default' from variants if 'fill' exists (they're the same)
  const uniqueVariants = [...new Set(variants)];
  const uniqueSizes = [...new Set(sizes)];

  return { variants: uniqueVariants, sizes: uniqueSizes };
}

// Parse CSS to extract button styles
function parseButtonStyles(mainCssPath: string, globalsCssPath: string): {
  buttonFill: { bg: string; text: string; border?: string };
  buttonPill: { bg: string; text: string; border: string };
  buttonLink: { bg: string; text: string; border?: string };
  buttonMenu: { bg: string; text: string; border?: string };
  borderRadius: number;
  padding: { x: number; y: number };
} {
  const mainCss = fs.readFileSync(mainCssPath, "utf-8");
  const globalsCss = fs.readFileSync(globalsCssPath, "utf-8");

  // Extract button-radius
  const radiusMatch = globalsCss.match(/--aura-button-radius:\s*([^;]+);/);
  const borderRadius = radiusMatch
    ? parseFloat(radiusMatch[1].replace("px", ""))
    : 6.5;

  // Extract padding (default is calc(var(--aura) * 2) = 26px)
  const paddingX = 26; // calc(var(--aura) * 2) = 13 * 2 = 26
  const paddingY = 0; // vertical padding is 0, height is controlled by height

  // Extract button-fill styles
  const fillMatch = mainCss.match(/\.button-fill\s*\{([\s\S]+?)\}/);
  let buttonFill = {
    bg: resolveColor("--aura-accents-primary"),
    text: resolveColor("--aura-text-primary-inverse"),
  };

  // Extract button-pill styles
  const pillMatch = mainCss.match(/\.button-pill\s*\{([\s\S]+?)\}/);
  let buttonPill = {
    bg: "transparent",
    text: resolveColor("--aura-link"),
    border: resolveColor("--aura-link"),
  };

  // Extract button-link styles
  const linkMatch = mainCss.match(/\.button-link\s*\{([\s\S]+?)\}/);
  let buttonLink = {
    bg: "transparent",
    text: resolveColor("--aura-link"),
  };

  // Extract button-menu styles (no explicit colors, uses default text)
  let buttonMenu = {
    bg: "transparent",
    text: resolveColor("--aura-text-primary"), // Uses default text color
  };

  return {
    buttonFill,
    buttonPill,
    buttonLink,
    buttonMenu,
    borderRadius,
    padding: { x: paddingX, y: 0 },
  };
}

// Generate Figma plugin code
function generateFigmaCode(
  variants: string[],
  sizes: string[],
  styles: ReturnType<typeof parseButtonStyles>
): string {
  const states = ["Default", "Hover", "Pressed"];
  const spacing = 100;

  let code = `// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This file is auto-generated by scripts/generate-button-code.ts
// Do not edit manually. Run the script to regenerate.

// Color helpers
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      }
    : null;
}

// Button style configurations
const buttonStyles: Record<string, any> = {
  default: {
    bg: hexToRgb("${styles.buttonFill.bg}"),
    text: hexToRgb("${styles.buttonFill.text}"),
    hover: hexToRgb("${resolveColor("--aura-button-hover")}"),
  },
  fill: {
    bg: hexToRgb("${styles.buttonFill.bg}"),
    text: hexToRgb("${styles.buttonFill.text}"),
    hover: hexToRgb("${resolveColor("--aura-button-hover")}"),
  },
  pill: {
    bg: null, // transparent
    text: hexToRgb("${styles.buttonPill.text}"),
    border: hexToRgb("${styles.buttonPill.border}"),
    hover: hexToRgb("${resolveColor("--aura-link-hover")}"),
  },
  link: {
    bg: null, // transparent
    text: hexToRgb("${styles.buttonLink.text}"),
    hover: hexToRgb("${resolveColor("--aura-link-hover")}"),
  },
  menu: {
    bg: null, // transparent
    text: hexToRgb("${styles.buttonMenu.text}"),
  },
};

// Size configurations (height in pixels)
const sizeConfig: Record<string, number> = {
  default: ${13 * 4}, // calc(var(--aura) * 4) = 52px
  xs: ${13 * 2.5}, // calc(var(--aura) * 2.5) = 32.5px
  sm: ${13 * 3}, // calc(var(--aura) * 3) = 39px
  md: ${13 * 4}, // calc(var(--aura) * 4) = 52px
  lg: ${13 * 5}, // calc(var(--aura) * 5) = 65px
  xl: ${13 * 6}, // calc(var(--aura) * 6) = 78px
  icon: ${13 * 3}, // calc(var(--aura) * 3) = 39px
};

// Async function to generate buttons with different variants and states
async function generateButtons() {
  const variants = ${JSON.stringify(variants)};
  const sizes = ${JSON.stringify(sizes)};
  const states = ${JSON.stringify(states)};

  // Load font first
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });

  const buttons: FrameNode[] = [];
  const buttonSpacing = ${spacing};

  variants.forEach((variant, vIdx) => {
    sizes.forEach((size, sIdx) => {
      states.forEach((state, stIdx) => {
        const style = buttonStyles[variant as keyof typeof buttonStyles];
        if (!style) return;

        // Create Frame (The Button)
        const button = figma.createFrame();
        button.name = \`Button / \${variant} / \${size} / \${state}\`;
        button.layoutMode = "HORIZONTAL";
        button.paddingLeft = ${styles.padding.x};
        button.paddingRight = ${styles.padding.x};
        button.paddingTop = 0;
        button.paddingBottom = 0;
        button.cornerRadius = ${styles.borderRadius};
        button.itemSpacing = 8;

        // Set height based on size
        const height = sizeConfig[size] || sizeConfig.default;
        // Set a default width that will accommodate the text (auto layout will adjust)
        button.resize(200, height);

        // Apply background color
        if (style.bg) {
          const fills = JSON.parse(JSON.stringify(button.fills));
          fills[0] = { type: 'SOLID', color: style.bg };
          
          if (state === 'Hover' && style.hover) {
            fills[0].color = style.hover;
          } else if (state === 'Pressed') {
            // Darken for pressed state
            fills[0].color = {
              r: Math.max(0, style.bg.r * 0.7),
              g: Math.max(0, style.bg.g * 0.7),
              b: Math.max(0, style.bg.b * 0.7),
            };
          }
          button.fills = fills;
        } else {
          // Transparent background - add subtle background for hover/pressed states
          if (state === 'Hover' && style.hover) {
            // Add subtle background tint for hover
            const hoverColor = style.hover;
            button.fills = [{ 
              type: 'SOLID', 
              color: hoverColor,
              opacity: 0.1 
            }];
          } else if (state === 'Pressed') {
            // Add more visible background for pressed
            const pressedColor = style.hover || style.text;
            button.fills = [{ 
              type: 'SOLID', 
              color: pressedColor,
              opacity: 0.2 
            }];
          } else {
            button.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0 }];
          }
        }

        // Apply border
        if (variant === 'pill' && style.border) {
          button.strokes = [{ type: 'SOLID', color: style.border }];
          button.strokeWeight = 2;
        } else if (variant === 'fill' && style.bg) {
          button.strokes = [{ type: 'SOLID', color: style.bg }];
          button.strokeWeight = 2;
        } else {
          button.strokes = [];
        }

        // Create Text
        const text = figma.createText();
        text.characters = \`\${variant} \${size} \${state}\`;
        
        let textColor = style.text;
        if (state === 'Hover' && style.hover && variant === 'link') {
          // For link variant, hover changes text color
          textColor = style.hover;
        }
        
        text.fills = [{ type: 'SOLID', color: textColor }];
        
        // Set font size based on button height
        const fontSize = Math.max(12, Math.floor(height * 0.4));
        text.fontSize = fontSize;
        
        button.appendChild(text);

        // Append to page first so layout is calculated
        figma.currentPage.appendChild(button);
        buttons.push(button);
      });
    });
  });

  // Position buttons after all are created and layout is calculated
  let maxWidth = 0;
  let maxHeight = 0;
  buttons.forEach(button => {
    if (button.width > maxWidth) maxWidth = button.width;
    if (button.height > maxHeight) maxHeight = button.height;
  });

  let currentX = 0;
  let currentY = 0;
  let rowHeight = 0;

  variants.forEach((variant, vIdx) => {
    sizes.forEach((size, sIdx) => {
      states.forEach((state, stIdx) => {
        const buttonIndex = vIdx * sizes.length * states.length + sIdx * states.length + stIdx;
        const button = buttons[buttonIndex];
        if (!button) return;

        button.x = currentX;
        button.y = currentY;
        
        currentX += maxWidth + buttonSpacing;
        rowHeight = Math.max(rowHeight, button.height);

        // Move to next row after all states for a size
        if (stIdx === states.length - 1) {
          currentX = 0;
          currentY += rowHeight + buttonSpacing;
          rowHeight = 0;
        }
      });
    });
    
    // Add extra spacing between variants
    if (vIdx < variants.length - 1) {
      currentY += buttonSpacing;
    }
  });

  figma.viewport.scrollAndZoomIntoView(figma.currentPage.children);
}

// Runs this code if the plugin is run in Figma
if (figma.editorType === 'figma') {
  generateButtons().then(() => {
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    figma.closePlugin();
  });
}

// Runs this code if the plugin is run in FigJam
if (figma.editorType === 'figjam') {
  // This plugin creates shapes and connectors on the screen.
  const numberOfShapes = 5;

  const nodes: SceneNode[] = [];
  for (let i = 0; i < numberOfShapes; i++) {
    const shape = figma.createShapeWithText();
    // You can set shapeType to one of: 'SQUARE' | 'ELLIPSE' | 'ROUNDED_RECTANGLE' | 'DIAMOND' | 'TRIANGLE_UP' | 'TRIANGLE_DOWN' | 'PARALLELOGRAM_RIGHT' | 'PARALLELOGRAM_LEFT'
    shape.shapeType = 'ROUNDED_RECTANGLE';
    shape.x = i * (shape.width + 200);
    shape.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
    figma.currentPage.appendChild(shape);
    nodes.push(shape);
  }

  for (let i = 0; i < numberOfShapes - 1; i++) {
    const connector = figma.createConnector();
    connector.strokeWeight = 8;

    connector.connectorStart = {
      endpointNodeId: nodes[i].id,
      magnet: 'AUTO',
    };

    connector.connectorEnd = {
      endpointNodeId: nodes[i + 1].id,
      magnet: 'AUTO',
    };
  }

  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
}
`;

  return code;
}

// Main execution
function main() {
  const registryPath = path.resolve(__dirname, "../../registry");
  const buttonPath = path.join(
    registryPath,
    "registry/default/components/ui/Button.tsx"
  );
  const mainCssPath = path.join(
    registryPath,
    "registry/default/styles/main.css"
  );
  const globalsCssPath = path.join(registryPath, "styles/globals.css");
  const outputPath = path.resolve(__dirname, "../code.ts");

  console.log("Parsing Button component...");
  const { variants, sizes } = parseButtonComponent(buttonPath);
  console.log(`Found variants: ${variants.join(", ")}`);
  console.log(`Found sizes: ${sizes.join(", ")}`);

  console.log("Parsing CSS styles...");
  const styles = parseButtonStyles(mainCssPath, globalsCssPath);

  console.log("Generating Figma plugin code...");
  const code = generateFigmaCode(variants, sizes, styles);

  console.log(`Writing to ${outputPath}...`);
  fs.writeFileSync(outputPath, code, "utf-8");

  console.log("✅ Successfully generated code.ts");
}

if (require.main === module) {
  main();
}

export { main };

