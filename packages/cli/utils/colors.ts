import { writeFileSync } from "fs";

const cssToJs = (cssString: string, label: string) => {
  const lines = cssString.split("\n");
  const result = {
    [`${label}`]: {},
    [`${label}A1`]: {},
    [`${label}Context`]: {}
  };

  lines.forEach((line) => {
    // Match lines with CSS variable definitions
    const match = line.match(/--(custom[-a-zA-Z0-9]+):\s*(.+);/);
    if (match) {
      const [_, variableName, colorValue] = match;

      // Split the variable name and determine the key group
      const parts = variableName.split("-");
      const number = parts[1] || ""; // e.g., "1", "a1", etc.

      if (number.startsWith("a")) {
        // Alpha colors (custom-a1, custom-a2, etc.)
        const keyName = `${label}${number.charAt(0).toUpperCase() + number.slice(1)}`;
        result[`${label}A1`][keyName] = colorValue.trim();
      } else if (
        ["contrast", "surface", "indicator", "track"].includes(parts[1])
      ) {
        // Context colors (custom-contrast, custom-surface, etc.)
        const keyName = `${label}${parts[1].charAt(0).toUpperCase() + parts[1].slice(1)}`;
        result[`${label}Context`][keyName] = colorValue.trim();
      } else {
        // Regular colors (custom-1, custom-2, etc.)
        const keyName = `${label}${number}`;
        result[`${label}`][keyName] = colorValue.trim();
      }
    }
  });

  return result;
};

// Input CSS string
const cssString = `
  --custom-1: #fcfcff;
  --custom-2: #f9f9fe;
  --custom-3: #efeff8;
  --custom-4: #e7e7f3;
  --custom-5: #dfdfee;
  --custom-6: #d8d8e9;
  --custom-7: #cdcde1;
  --custom-8: #b9b9d2;
  --custom-9: #000;
  --custom-10: #2c2c3b;
  --custom-11: #626276;
  --custom-12: #1f1f2c;
  --custom-a1: #0000ff03;
  --custom-a2: #0000d506;
  --custom-a3: #00009010;
  --custom-a4: #00008018;
  --custom-a5: #00007820;
  --custom-a6: #00007027;
  --custom-a7: #00006632;
  --custom-a8: #00005c46;
  --custom-a9: #000000;
  --custom-a10: #000012d3;
  --custom-a11: #0000219d;
  --custom-a12: #00000fe0;
  --custom-contrast: #fff;
  --custom-surface: #f8f8fecc;
  --custom-indicator: #000;
  --custom-track: #000;
`;

// Replace "custom" with a specific label, e.g., "theme"
const label = "theme";

// Generate the JS object
const jsColors = cssToJs(cssString, label);

// Format the result for export
const formattedResult = `
export const ${label} = ${JSON.stringify(jsColors[label], null, 2)};
export const ${label}A1 = ${JSON.stringify(jsColors[`${label}A1`], null, 2)};
export const ${label}Context = ${JSON.stringify(jsColors[`${label}Context`], null, 2)};
`;

// Write the result to a file named "colors.js"
writeFileSync("colors.js", formattedResult.trim());

console.log("colors.js file has been created successfully!");
