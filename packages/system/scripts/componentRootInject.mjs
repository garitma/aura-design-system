import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const componentsDir = path.join(__dirname, '../components');
const rootDir = __dirname; // Current directory (the root of the project)

// Function to generate the .d.ts and .js files
const generateRootFiles = (componentName) => {
  const distPath = `./dist/components/${componentName}`;

  // Generate .d.ts content
  const dtsContent = `export * from "${distPath}";\nexport { default } from "${distPath}";`;

  // Generate .js content
  const jsContent = `module.exports = require("${distPath}");`;

  // Write .d.ts file in the root
  fs.writeFileSync(path.join(rootDir, `${componentName}.d.ts`), dtsContent, 'utf8');
  
  // Write .js file in the root
  fs.writeFileSync(path.join(rootDir, `${componentName}.js`), jsContent, 'utf8');

  console.log(`Generated files for ${componentName}`);
};

// Function to process components in the components folder
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
      generateRootFiles(componentName); // Generate root files
    });
  });
};

// Start processing components
processComponents();
