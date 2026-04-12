import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RULES_PATH = path.join(__dirname, "../registry/default/rules");
const METADATA_PATH = path.join(__dirname, "../metadata");
const DOCS_RULES_PATH = path.join(__dirname, "../../../apps/www/content/docs/rules");

function humanize(name: string): string {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function parseFrontmatter(raw: string): { title?: string; description?: string; body: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n?/;
  const match = raw.match(frontmatterRegex);
  let body = raw;
  const result: { title?: string; description?: string; body: string } = { body: raw };

  if (match) {
    body = raw.slice(match[0].length);
    result.body = body;
    const yaml = match[1];
    const titleMatch = yaml.match(/^title:\s*(.+)$/m);
    const descMatch = yaml.match(/^description:\s*(.+)$/m);
    if (titleMatch) result.title = titleMatch[1].trim().replace(/^["']|["']$/g, "");
    if (descMatch) result.description = descMatch[1].trim().replace(/^["']|["']$/g, "");
  }

  return result;
}

function getFirstH1(body: string): string | null {
  const match = body.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

function getFirstParagraph(body: string): string | null {
  const trimmed = body.trim();
  const lines: string[] = [];
  for (const line of trimmed.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    if (t.startsWith("-") || t.startsWith("*")) break;
    lines.push(t);
    if (t.endsWith(".")) break;
  }
  const text = lines.join(" ").trim();
  return text.length > 0 ? text : null;
}

function getFirstLine(body: string): string {
  const line = body.trim().split("\n").find((l) => l.trim().length > 0);
  const raw = line ? line.trim().slice(0, 160) : "Aura design system rule.";
  // Avoid using a markdown heading as the description
  if (raw.startsWith("#")) return raw.replace(/^#+\s*/, "").trim() || "Aura design system rule.";
  return raw;
}

interface RuleDoc {
  name: string;
  title: string;
  description: string;
  body: string;
}

function loadRuleMetadata(name: string): { title?: string; description?: string } {
  const ymlPath = path.join(METADATA_PATH, `${name}.rule.yml`);
  if (!fs.existsSync(ymlPath)) return {};
  try {
    const content = fs.readFileSync(ymlPath, "utf-8");
    const titleMatch = content.match(/^header:\s*\n\s+title:\s*(.+)$/m);
    const descMatch = content.match(/^header:\s*\n(?:\s+title:.*\n)?\s+description:\s*(.+)$/m);
    const out: { title?: string; description?: string } = {};
    if (titleMatch) out.title = titleMatch[1].trim().replace(/^["']|["']$/g, "");
    if (descMatch) out.description = descMatch[1].trim().replace(/^["']|["']$/g, "");
    return out;
  } catch {
    return {};
  }
}

function processRuleFile(file: string): RuleDoc | null {
  const filePath = path.join(RULES_PATH, file);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { title: fmTitle, description: fmDesc, body } = parseFrontmatter(raw);
  const name = file.replace(".mdc", "");
  const meta = loadRuleMetadata(name);
  const title =
    meta.title ?? fmTitle ?? getFirstH1(body) ?? humanize(name);
  const description =
    meta.description ?? fmDesc ?? getFirstParagraph(body) ?? getFirstLine(body);

  return { name, title, description, body };
}

/**
 * Remove any existing "## Installation" section from the body so we inject a single canonical one.
 */
function stripExistingInstallation(body: string): string {
  return body.replace(/\n## Installation\n\n```bash\n[^\n]+\n```\s*/s, "\n").trim();
}

/**
 * Insert "## Installation" with shadcn add command after the first # heading.
 */
function injectInstallation(body: string, ruleName: string): string {
  const installationBlock = `

## Installation
\`\`\`bash
pnpm dlx shadcn@latest add @aura/rule-${ruleName}
\`\`\`
`;
  const stripped = stripExistingInstallation(body);
  const firstH1 = stripped.match(/^# .+$/m);
  if (firstH1) {
    const idx = stripped.indexOf(firstH1[0]) + firstH1[0].length;
    return stripped.slice(0, idx) + installationBlock + stripped.slice(idx).trimStart();
  }
  return installationBlock.trim() + "\n\n" + stripped;
}

/** JSON double-quoted strings are valid YAML scalars and escape colons, quotes, newlines, etc. */
function yamlScalar(value: string): string {
  return JSON.stringify(value);
}

function generateRuleMdx(rule: RuleDoc): string {
  const bodyWithInstallation = injectInstallation(rule.body, rule.name);
  return `---
title: ${yamlScalar(rule.title)}
description: ${yamlScalar(rule.description)}
---

${bodyWithInstallation}
`;
}

function generateRulesIndex(rules: RuleDoc[]): string {
  let content = `---
title: Rules
description: Cursor and AI rules for the Aura Design System. Use these in .cursor/rules/ for consistent guidance.
---

## Rules

These rules define foundations and principles for the Aura Design System. You can install them via the registry or copy them into your project's \`.cursor/rules/\` directory.

\`\`\`bash
pnpm dlx shadcn@latest add @aura/rules
\`\`\`
`;

  for (const rule of rules) {
    content += `### [${rule.title}](/docs/rules/${rule.name})\n\n`;
    content += `${rule.description}\n\n`;
  }

  return content;
}

function generateRulesDocs() {
  if (!fs.existsSync(RULES_PATH)) {
    console.error(`[generate-rules-docs] Rules path not found: ${RULES_PATH}`);
    process.exit(1);
  }

  if (!fs.existsSync(DOCS_RULES_PATH)) {
    fs.mkdirSync(DOCS_RULES_PATH, { recursive: true });
    console.log(`[generate-rules-docs] Created ${DOCS_RULES_PATH}`);
  }

  const files = fs.readdirSync(RULES_PATH).filter((f) => f.endsWith(".mdc"));
  const rules: RuleDoc[] = [];

  for (const file of files) {
    const rule = processRuleFile(file);
    if (rule) {
      rules.push(rule);
      const mdxPath = path.join(DOCS_RULES_PATH, `${rule.name}.mdx`);
      fs.writeFileSync(mdxPath, generateRuleMdx(rule));
      console.log(`[generate-rules-docs] ${rule.name}.mdx`);
    }
  }

  rules.sort((a, b) => a.title.localeCompare(b.title));

  const indexPath = path.join(DOCS_RULES_PATH, "index.mdx");
  fs.writeFileSync(indexPath, generateRulesIndex(rules));
  console.log(`[generate-rules-docs] index.mdx`);

  console.log(`\n[generate-rules-docs] Generated ${rules.length} rule docs.\n`);
}

generateRulesDocs();
