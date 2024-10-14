#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs");
const path = require("path");
const glob = require("glob");

// Basic CLI setup with commander
program
  .version("1.0.0")
  .description("Aura Design CLI tool")
  .option(
    "-d, --dir <directory>",
    "Specify directory to scan for TSX files. Defaults to current directory.",
    "."
  )
  .parse(process.argv);

function generateSpacing() {
  const result = {};
  for (let i = 0.5; i <= 50; i += 0.5) {
    result[i] = `${i * 13}px`;
  }
  return { 0: "0px", ...result };
}

const customSpacing = generateSpacing();

function mapToCustomSpacing(defaultPxValue) {
  const spacingValues = Object.keys(customSpacing).map(Number);
  const customPxValues = Object.values(customSpacing).map(v => parseFloat(v)); // Extract pixel values as numbers

  // Find the closest spacing
  let closestSpacing = spacingValues[0];
  let minDiff = Math.abs(defaultPxValue - customPxValues[0]);

  for (let i = 1; i < spacingValues.length; i++) {
    const diff = Math.abs(defaultPxValue - customPxValues[i]);
    if (diff < minDiff) {
      closestSpacing = spacingValues[i];
      minDiff = diff;
    }
  }

  return closestSpacing;
}

function replaceSpacingClass(className) {
  const spacingClassRegex = /\b(m|p|mt|mb|mr|ml|mx|my|pt|pb|pr|pl|px|py|gap|space-x|space-y)-(\d+)\b/g;

  return className.replace(spacingClassRegex, (match, prefix, value) => {
    const defaultPxValue = parseInt(value) * 4; // Tailwind default spacing (multiplied by 4px)
    const closestSpacing = mapToCustomSpacing(defaultPxValue);
    return `${prefix}-${closestSpacing}`;
  });
}


// Function to extract Tailwind spacing classes from TSX content
function extractSpacingClasses(tsxContent) {
  const spacingClasses = new Set(); // Use Set to avoid duplicates

  // Updated regex to match Tailwind spacing classes like m-4, mt-6, etc.
  const spacingClassRegex =
    /\b(m|p|mt|mb|mr|ml|mx|my|pt|pb|pr|pl|px|py|space-x|space-y|gap)-(auto|\d+|px|full)\b/g;

  const matches = tsxContent.matchAll(spacingClassRegex);
  for (const match of matches) {
    spacingClasses.add(match[0]); // Add the full class (e.g., 'm-4', 'mt-2')
  }

  return Array.from(spacingClasses); // Convert Set to array
}

async function main() {
  const directory = path.resolve(program.opts().dir); // Get directory from CLI argument
  console.log(`Scanning directory: ${directory}`);

  try {
    // Use glob to find all .tsx files in the directory (recursively)
    const tsxFiles = glob.sync(`${directory}/**/*.tsx`);

    const spacingClasses = {};
    for (const filePath of tsxFiles) {
      // Read the content of each .tsx file
      const tsxContent = await fs.promises.readFile(filePath, "utf-8");
      const extractedClasses = extractSpacingClasses(tsxContent);

      if (extractedClasses.length > 0) {
        spacingClasses[filePath] = extractedClasses;
      }
    }

    // Output the results
    if (Object.keys(spacingClasses).length > 0) {
      console.log("Tailwind spacing classes found:");
      for (const filePath in spacingClasses) {
        const tailwindClass = spacingClasses[filePath].join(" ");
        const updatedClass = replaceSpacingClass(tailwindClass);
        //TODO rewrite spacing
        console.log(`  * ${filePath}: ${spacingClasses[filePath].join(", ")} custom: ${updatedClass}`);
      }
    } else {
      console.log(
        "No Tailwind spacing classes found in the scanned TSX files."
      );
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
