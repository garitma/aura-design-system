/**
 * Scaffold a new rule: creates registry/default/rules/<name>.mdc and
 * metadata/<name>.rule.yml from templates. Run from packages/registry:
 *   npx tsx scripts/new-rule.ts <rule-name>
 * Example: npx tsx scripts/new-rule.ts my-foundation
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RULES_PATH = path.join(__dirname, "../registry/default/rules");
const METADATA_PATH = path.join(__dirname, "../metadata");

function kebab(name: string): string {
  return name
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/gi, "")
    .toLowerCase();
}

function humanize(name: string): string {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

const defaultMdcBody = `## Overview

* **MUST**: (add your rule requirements)
* **SHOULD**: (optional guidance)
`;

function main() {
  const rawName = process.argv[2];
  if (!rawName) {
    console.error("Usage: npx tsx scripts/new-rule.ts <rule-name>");
    console.error("Example: npx tsx scripts/new-rule.ts my-foundation");
    process.exit(1);
  }

  const name = kebab(rawName);
  if (!name) {
    console.error("Invalid rule name.");
    process.exit(1);
  }

  const mdcPath = path.join(RULES_PATH, `${name}.mdc`);
  const ruleYmlPath = path.join(METADATA_PATH, `${name}.rule.yml`);

  if (fs.existsSync(mdcPath)) {
    console.error(`Rule already exists: ${mdcPath}`);
    process.exit(1);
  }

  const title = humanize(name);
  const mdcContent = `---
alwaysApply: false
---

# ${title}

${defaultMdcBody}
`;

  if (!fs.existsSync(RULES_PATH)) {
    fs.mkdirSync(RULES_PATH, { recursive: true });
  }
  fs.writeFileSync(mdcPath, mdcContent);
  console.log(`Created ${mdcPath}`);

  const ruleYmlContent = `# Rule metadata. Used by build-registry and generate-rules-docs.
# Optional overrides for registry title and doc description.
header:
  title: ${title}
  description: Aura rule for ${title}.
`;
  fs.writeFileSync(ruleYmlPath, ruleYmlContent);
  console.log(`Created ${ruleYmlPath}`);

  console.log("\nNext steps:");
  console.log("  1. Edit the rule content in registry/default/rules/" + name + ".mdc");
  console.log("  2. Run pnpm sync:rules to copy from .cursor/rules if you edit there");
  console.log("  3. Run pnpm registry:generate to update the registry");
  console.log("  4. Run pnpm docs:generate to regenerate rules docs");
}

main();
