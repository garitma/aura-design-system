import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WORKSPACE_ROOT = path.resolve(__dirname, "../../..");
const CURSOR_SKILLS_PATH = path.join(WORKSPACE_ROOT, ".cursor/skills");
const REGISTRY_SKILLS_PATH = path.join(__dirname, "../registry/default/skills");

/** Skill folders under .cursor/skills/ that ship via the registry. */
const SKILL_DIRS = ["port-component-to-aura", "generate-brand-images"];

function copyDir(src: string, dest: string) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(from, to);
    } else {
      fs.copyFileSync(from, to);
    }
  }
}

function syncSkills() {
  if (!fs.existsSync(CURSOR_SKILLS_PATH)) {
    console.warn(`[sync-skills] Source not found: ${CURSOR_SKILLS_PATH}`);
    return;
  }

  if (!fs.existsSync(REGISTRY_SKILLS_PATH)) {
    fs.mkdirSync(REGISTRY_SKILLS_PATH, { recursive: true });
    console.log(`[sync-skills] Created ${REGISTRY_SKILLS_PATH}`);
  }

  let synced = 0;
  for (const dir of SKILL_DIRS) {
    const src = path.join(CURSOR_SKILLS_PATH, dir);
    const dest = path.join(REGISTRY_SKILLS_PATH, dir);
    const skillMd = path.join(src, "SKILL.md");
    if (fs.existsSync(skillMd)) {
      if (fs.existsSync(dest)) {
        fs.rmSync(dest, { recursive: true, force: true });
      }
      copyDir(src, dest);
      synced++;
      console.log(`[sync-skills] ${dir}`);
    } else {
      console.warn(`[sync-skills] Skip (missing SKILL.md): ${dir}`);
    }
  }
  console.log(`[sync-skills] Synced ${synced}/${SKILL_DIRS.length} skills.\n`);
}

syncSkills();
