import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get __filename and __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const componentsDir = path.join(__dirname, '../components');
const rootDir = path.join(__dirname, '..'); // Parent directory

// Function to generate the .ts file for re-exporting
const generateRootFiles = (componentName) => {
  const jsFilePath = path.join(rootDir, `${componentName}.js`);
  const dtsFilePath = path.join(rootDir, `${componentName}.d.ts`);
  const tsFilePath = path.join(rootDir, `${componentName}.ts`);

  // Check and delete existing .js and .d.ts files
  if (fs.existsSync(jsFilePath)) {
    fs.unlinkSync(jsFilePath);
    console.log(`Deleted ${componentName}.js`);
  }

  if (fs.existsSync(dtsFilePath)) {
    fs.unlinkSync(dtsFilePath);
    console.log(`Deleted ${componentName}.d.ts`);
  }

  // Generate the .ts content for re-exporting
  const tsContent = `export * from './components/${componentName}';\n` +
                    `export { default } from './components/${componentName}';`;

  // Write the new .ts file in the parent folder
  fs.writeFileSync(tsFilePath, tsContent, 'utf8');
  console.log(`Generated ${componentName}.ts for re-exporting`);
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
      generateRootFiles(componentName); // Generate the .ts re-export file
    });
  });
};

// Start processing components
processComponents();
