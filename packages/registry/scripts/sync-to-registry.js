import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Resolve paths relative to the script's location to ensure correctness
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SCRIPT_DIR = __dirname;
// const TSCONFIG_PATH = path.resolve(SCRIPT_DIR, '../tsconfig.json'); // No longer needed
const LADLE_COMPONENTS_PATH = path.resolve(SCRIPT_DIR, '../../../apps/ladle/components');
const REGISTRY_BASE_PATH = path.resolve(SCRIPT_DIR, '../registry/default');

async function buildRegistry() {
  try {
    const scanAndCopy = async (sourceDir, destBase) => {
      const entries = await fs.readdir(sourceDir, { withFileTypes: true });

      for (const entry of entries) {
        const sourcePath = path.join(sourceDir, entry.name);

        if (entry.isDirectory()) {
          // For directories like 'ui' or 'hooks', append their name to the destination base
          await scanAndCopy(sourcePath, path.join(destBase, entry.name));
        } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
          // Determine the correct destination directory for the file
          let finalDestDir = destBase;

          // If the file is directly under LADLE_COMPONENTS_PATH, it should go into the 'components' subfolder
          if (sourceDir === LADLE_COMPONENTS_PATH) {
            finalDestDir = path.join(destBase, 'components');
          }
          // If the file is under a subdirectory of LADLE_COMPONENTS_PATH (e.g., ui/, hooks/),
          // destBase will already reflect the correct path (e.g., registry/default/ui)

          await fs.ensureDir(finalDestDir); // Ensure the parent directory of the file exists
          const destPath = path.join(finalDestDir, entry.name);
          await fs.copy(sourcePath, destPath);
          console.log(`Copied ${sourcePath} to ${destPath}`);
        }
      }
    };

    await scanAndCopy(LADLE_COMPONENTS_PATH, REGISTRY_BASE_PATH);
    console.log('Registry build complete.');

  } catch (error) {
    console.error('Error building registry:', error);
  }
}

buildRegistry();
