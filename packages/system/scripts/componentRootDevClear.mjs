import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get __filename and __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const componentsDir = path.join(__dirname, '../components');
const rootDir = path.join(__dirname, '..'); // Parent directory

// Function to delete generated .ts files
const deleteGeneratedFiles = (componentName) => {
  const tsFilePath = path.join(rootDir, `${componentName}.ts`);

  // Check and delete the .ts file
  if (fs.existsSync(tsFilePath)) {
    fs.unlinkSync(tsFilePath);
    console.log(`Deleted ${componentName}.ts`);
  } else {
    console.log(`${componentName}.ts does not exist, skipping...`);
  }
};

// Function to process components in the components folder and delete corresponding .ts files
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
      deleteGeneratedFiles(componentName); // Delete the corresponding .ts file in the root folder
    });
  });
};

// Start processing components
processComponents();
