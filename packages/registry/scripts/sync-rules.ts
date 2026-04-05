import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WORKSPACE_ROOT = path.resolve(__dirname, "../../..");
const CURSOR_RULES_PATH = path.join(WORKSPACE_ROOT, ".cursor/rules");
const REGISTRY_RULES_PATH = path.join(__dirname, "../registry/default/rules");

const RULE_FILES = [
  "design-md.mdc",
  "fundation-animations.mdc",
  "fundation-icons.mdc",
  "fundations-colors.mdc",
  "fundations-layout-spacing.mdc",
  "fundations-typography.mdc",
  "principles.mdc",
];

function syncRules() {
  if (!fs.existsSync(CURSOR_RULES_PATH)) {
    console.warn(`[sync-rules] Source not found: ${CURSOR_RULES_PATH}`);
    return;
  }

  if (!fs.existsSync(REGISTRY_RULES_PATH)) {
    fs.mkdirSync(REGISTRY_RULES_PATH, { recursive: true });
    console.log(`[sync-rules] Created ${REGISTRY_RULES_PATH}`);
  }

  let synced = 0;
  for (const file of RULE_FILES) {
    const src = path.join(CURSOR_RULES_PATH, file);
    const dest = path.join(REGISTRY_RULES_PATH, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      synced++;
      console.log(`[sync-rules] ${file}`);
    } else {
      console.warn(`[sync-rules] Skip (missing): ${file}`);
    }
  }
  console.log(`[sync-rules] Synced ${synced}/${RULE_FILES.length} rules.\n`);
}

syncRules();
