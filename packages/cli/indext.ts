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



async function main() {
  const directory = path.resolve(program.opts().dir); // Get directory from CLI argument
  console.log(`Scanning directory: ${directory}`);

  try {
    // Use glob to find all .tsx files in the directory (recursively)
    const tsxFiles = glob.sync(`${directory}/**/*.tsx`);

    for (const filePath of tsxFiles) {
      // Read the content of each .tsx file
      let tsxContent = await fs.promises.readFile(filePath, "utf-8");
      const extractedClasses = extractSpacingClasses(tsxContent);

      if (extractedClasses.length > 0) {
        for (const className of extractedClasses) {
          const updatedClass = replaceSpacingClass(className);
          tsxContent = tsxContent.replace(className, updatedClass);
        }

        // Write the updated content back to the file
        await fs.promises.writeFile(filePath, tsxContent, "utf-8");
        console.log(`Updated spacing classes in ${filePath}`);
      }
    }

    console.log("Spacing class update complete!");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
