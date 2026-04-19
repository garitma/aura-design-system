import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WORKSPACE_ROOT = path.resolve(__dirname, "../../..");
const SOURCE = path.join(WORKSPACE_ROOT, "packages/design-md/DESIGN.md");
const DEST_DIR = path.join(__dirname, "../registry/default/design-md");
const DEST = path.join(DEST_DIR, "DESIGN.md");
const ROOT_DESIGN = path.join(WORKSPACE_ROOT, "DESIGN.md");

function syncDesignMd() {
  if (!fs.existsSync(SOURCE)) {
    console.error(`[sync-design-md] Source not found: ${SOURCE}`);
    process.exit(1);
  }

  if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
  }

  fs.copyFileSync(SOURCE, DEST);
  fs.copyFileSync(SOURCE, ROOT_DESIGN);
  console.log(`[sync-design-md] ${SOURCE} -> ${DEST}`);
  console.log(`[sync-design-md] ${SOURCE} -> ${ROOT_DESIGN}\n`);
}

syncDesignMd();
