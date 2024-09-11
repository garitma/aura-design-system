import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get __filename and __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const componentsDir = path.join(__dirname, '../components');
const hooksDir = path.join(__dirname, '../hooks'); // Path to hooks folder
const rootDir = path.join(__dirname, '..'); // Parent directory

// Function to delete generated .d.ts and .js files
const deleteGeneratedFiles = (name) => {
  const dtsFilePath = path.join(rootDir, `${name}.d.ts`);
  const jsFilePath = path.join(rootDir, `${name}.js`);

  // Check and delete the .d.ts file
  if (fs.existsSync(dtsFilePath)) {
    fs.unlinkSync(dtsFilePath);
    console.log(`Deleted ${name}.d.ts`);
  } else {
    console.log(`${name}.d.ts does not exist, skipping...`);
  }

  // Check and delete the .js file
  if (fs.existsSync(jsFilePath)) {
    fs.unlinkSync(jsFilePath);
    console.log(`Deleted ${name}.js`);
  } else {
    console.log(`${name}.js does not exist, skipping...`);
  }
};

// Function to process components in the components folder and delete corresponding .d.ts and .js files
const processComponents = () => {
  // Read components directory
  fs.readdir(componentsDir, (err, files) => {
    if (err) {
      console.error("Error reading components directory:", err);
      return;
    }

    // Filter out only .ts or .tsx files (if you want to handle TypeScript components)
    const tsFiles = files.filter(file => file.endsWith('.ts') || file.endsWith('.tsx'));

    tsFiles.forEach(file => {
      const componentName = path.basename(file, path.extname(file)); // Get the component name without extension
      deleteGeneratedFiles(componentName); // Delete the corresponding .d.ts and .js files in the root folder
    });
  });
};

// Function to process hooks in the hooks folder and delete corresponding .d.ts and .js files
const processHooks = () => {
  // Read hooks directory
  fs.readdir(hooksDir, (err, files) => {
    if (err) {
      console.error("Error reading hooks directory:", err);
      return;
    }

    // Filter out only .ts or .tsx files (if you want to handle TypeScript hooks)
    const tsFiles = files.filter(file => file.endsWith('.ts') || file.endsWith('.tsx'));
    tsFiles.forEach(file => {
      let hookName = path.basename(file, path.extname(file)); // Get the hook name without extension
      if (hookName.startsWith('use-')) {
        hookName = hookName.slice(4); // Remove 'use-' prefix
      }
      deleteGeneratedFiles(hookName); // Delete the corresponding .d.ts and .js files in the root folder
    });
  });
};

// Start processing components and hooks
processComponents();
processHooks();
