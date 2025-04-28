import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modifyGlobalsCss = async () => {
  const globalsCssPath = path.resolve(process.cwd(), 'app', 'globals.css');
  const importStatement = `@import "@aura-design/system/main.css";`;
  const layerBaseStart = '@layer base {';

  try {
    const data = await fs.readFile(globalsCssPath, 'utf8');
    const lines = data.split('\n');
    let layerBaseStartIndex = -1;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() === layerBaseStart) {
        layerBaseStartIndex = i;
        break;
      }
    }

    if (layerBaseStartIndex === -1) {
      throw new Error(`Could not find @layer base in ${globalsCssPath}`);
    }

    const importAlreadyExists = lines.some(line => line.trim() === importStatement);
    if (importAlreadyExists) {
      // If the import exists, check if it's in the correct position
      const importIndex = lines.findIndex(line => line.trim() === importStatement);
      if (importIndex === layerBaseStartIndex + 1) {
        console.log('Import already exists and is in the correct position in globals.css');
        return;
      } else {
        // If it's not in the correct position, remove it
        lines.splice(importIndex, 1);
      }
    }

    // Insert the import statement after the @layer base { line
    lines.splice(layerBaseStartIndex + 1, 0, `  ${importStatement}`);

    const updatedData = lines.join('\n');
    await fs.writeFile(globalsCssPath, updatedData, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`globals.css not found at ${globalsCssPath}`);
    } else {
      throw error;
    }
  }
};

export { modifyGlobalsCss };
