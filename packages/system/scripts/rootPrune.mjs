import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const deleteGeneratedFiles = (name) => {
  const extensions = ['.d.ts', '.js', '.ts']; // Include .ts files for pruning as well
  extensions.forEach(ext => {
    const filePath = path.join(rootDir, `${name}${ext}`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Deleted ${name}${ext}`);
    } 
  });
};



const processFiles = (folderPath, removePrefix = '') => {  // removePrefix='' handles components & utils
  try {
    const files = fs.readdirSync(folderPath);  // Use synchronous readdir for simplicity within this script

    files.filter(file => file.endsWith('.ts') || file.endsWith('.tsx'))
      .forEach(file => {
        let name = path.basename(file, path.extname(file));
        if (removePrefix && name.startsWith(removePrefix)) {
          name = name.slice(removePrefix.length);
        }
        deleteGeneratedFiles(name);
      });

  } catch (err) {
    console.error(`Error processing directory ${folderPath}:`, err);
  }
};


const componentsDir = path.join(__dirname, '../components');
const hooksDir = path.join(__dirname, '../hooks');
const utilsDir = path.join(__dirname, '../utils');



processFiles(componentsDir);
processFiles(utilsDir);
processFiles(hooksDir, 'use-'); //  Pass 'use-' to remove the prefix for hooks



