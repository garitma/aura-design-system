import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// Get __filename and __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const componentsDir = path.join(__dirname, "../components");
const hooksDir = path.join(__dirname, "../hooks"); // Path to hooks folder
const rootDir = path.join(__dirname, ".."); // Parent directory

// Function to generate the .ts file for re-exporting
const generateRootFiles = (fileName, folderName) => {
  const isHooks = folderName === "hooks";

  const jsFilePath = path.join(rootDir, `${fileName}.js`);
  const dtsFilePath = path.join(rootDir, `${fileName}.d.ts`);
  const tsFilePath = path.join(rootDir, `${fileName.slice(4)}.ts`);

  // Check and delete existing .js and .d.ts files
  if (fs.existsSync(jsFilePath)) {
    fs.unlinkSync(jsFilePath);
    console.log(`Deleted ${fileName}.js`);
  }

  if (fs.existsSync(dtsFilePath)) {
    fs.unlinkSync(dtsFilePath);
    console.log(`Deleted ${fileName}.d.ts`);
  }

 
  // Generate the .ts content for re-exporting
  const tsContent = isHooks
    ? `export * from './${folderName}/${fileName}';`
    : `export * from './${folderName}/${fileName}';\n` +
      `export { default } from './${folderName}/${fileName}';`;

  // Write the new .ts file in the parent folder
  fs.writeFileSync(tsFilePath, tsContent, "utf8");
  console.log(`Generated ${fileName}.ts for re-exporting`);
};

// Function to process components in the components folder
const processComponents = () => {
  // Read components directory
  fs.readdir(componentsDir, (err, files) => {
    if (err) {
      console.error("Error reading components directory:", err);
      return;
    }

    // Filter out only .ts or .tsx files
    const tsFiles = files.filter(
      (file) => file.endsWith(".ts") || file.endsWith(".tsx")
    );

    tsFiles.forEach((file) => {
      const componentName = path.basename(file, path.extname(file)); // Get the component name without extension
      generateRootFiles(componentName, "components"); // Generate the .ts re-export file
    });
  });
};

// Function to process hooks in the hooks folder and remove "use-" prefix
const processHooks = () => {
  // Read hooks directory
  fs.readdir(hooksDir, (err, files) => {
    if (err) {
      console.error("Error reading hooks directory:", err);
      return;
    }

    // Filter out only .ts or .tsx files
    const tsFiles = files.filter(
      (file) => file.endsWith(".ts") || file.endsWith(".tsx")
    );

    tsFiles.forEach((file) => {
      let hookName = path.basename(file, path.extname(file)); // Get the hook name without extension
      generateRootFiles(hookName, "hooks"); // Generate the .ts re-export file
    });
  });
};

// Start processing components and hooks
processComponents();
processHooks();
