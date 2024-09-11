import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get __filename and __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths for components and hooks
const componentsDir = path.join(__dirname, '../components');
const hooksDir = path.join(__dirname, '../hooks');
const rootDir = path.join(__dirname, '..'); // Parent directory

// Function to generate the .d.ts and .js files
const generateRootFiles = (componentName, folderName, isHook = false) => {
  const distPath = `./${folderName}/${componentName}`;

  // Remove "use-" prefix for hooks in root file names
  const rootFileName = isHook ? componentName.replace(/^use-/, '') : componentName;

  // Generate .d.ts content, skip default export for hooks
  const dtsContent = isHook 
    ? `export * from "${distPath}";` 
    : `export * from "${distPath}";\nexport { default } from "${distPath}";`;

  // Write .d.ts file in the parent folder
  fs.writeFileSync(path.join(rootDir, `${rootFileName}.ts`), dtsContent, 'utf8');


  console.log(`Generated files for ${componentName} in ${folderName}`);
};

// Function to process files in a folder (components or hooks)
const processFilesInFolder = (folderPath, folderName, isHook = false) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(`Error reading ${folderName} directory:`, err);
      return;
    }

    // Filter out only .ts or .tsx files
    const tsFiles = files.filter(file => file.endsWith('.ts') || file.endsWith('.tsx'));

    tsFiles.forEach(file => {
      const componentName = path.basename(file, path.extname(file)); // Get the component name without extension
      generateRootFiles(componentName, folderName, isHook); // Generate files in the parent folder
    });
  });
};

// Start processing components and hooks
processFilesInFolder(componentsDir, 'components');
processFilesInFolder(hooksDir, 'hooks', true); // Pass true to indicate it's processing hooks
