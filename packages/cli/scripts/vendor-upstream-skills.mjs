#!/usr/bin/env node
/**
 * Rebuild the reconciled skill trees under templates/cursor/skills
 * and mirror them to the repo's .cursor/skills.
 *
 * Pins (do not float):
 *   emilkowalski/skills @ e8a175de22ae1e49370fc144c1f3bb9aeedf988d
 *   vercel-labs/agent-skills skills/react-best-practices
 *     @ 063bee94c3f4df8453406c830b0a7df0f2860278
 *
 * Usage (from a checkout of those repos):
 *   EMIL_DIR=/tmp/emilkowalski-skills \
 *   VERCEL_DIR=/tmp/vercel-agent-skills \
 *   node packages/cli/scripts/vendor-upstream-skills.mjs
 */
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const EMIL_SHA = "e8a175de22ae1e49370fc144c1f3bb9aeedf988d";
const EMIL_REPO = "https://github.com/emilkowalski/skills";
const VERCEL_SHA = "063bee94c3f4df8453406c830b0a7df0f2860278";
const VERCEL_REPO = "https://github.com/vercel-labs/agent-skills";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..", "..", "..");
const templateRoot = join(here, "..", "templates", "cursor", "skills");
const cursorRoot = join(repoRoot, ".cursor", "skills");

const emilDir = process.env.EMIL_DIR ?? "/tmp/emilkowalski-skills";
const vercelDir = process.env.VERCEL_DIR ?? "/tmp/vercel-agent-skills";

const EMIL_SOURCE = `Source: Emil Kowalski, MIT License, ${EMIL_REPO} @ ${EMIL_SHA} (Copyright (c) 2026 Emil Kowalski). Keep this notice with any substantial copy. The license text is in \`LICENSE\` beside this file.`;

const AURA_WINS = `When this skill disagrees with Aura foundation rules or \`DESIGN.md\`, Aura wins: the 13px spacing scale, accent and gray steps, fluid type, the 17px floor on editable inputs, and the animation tokens (buttons \`cubic-bezier(0.4, 0, 0.6, 1)\`, dialogs \`cubic-bezier(0.16, 1, 0.3, 1)\`, about 250ms, CSS \`@theme\` tokens). Extend easing tokens the project already defines. Do not invent a parallel scale.`;

const DESIGN_FILE = `Do not read or write a design file unless someone explicitly asked for that edit.`;

const SONNER_SCOPE = `Aura Toast is the product toaster. Use this Sonner guide only when the file already imports \`sonner\` (DataGrid still does). New toasts use the Aura toast, not a second \`<Toaster />\`.`;

/** Team descriptions. These are the SGD trigger text; Emil's body is merged under them. */
const TEAM_DESCRIPTION = {
  "emil-design-eng": `description: >-
  Use this when shaping or reviewing a design system or a screen: polish,
  component decisions, and which motion belongs. Criteria only; it does not edit
  a design file.`,
  "animation-vocabulary": `description: >-
  Use this when a motion effect is described vaguely and needs its exact name
  before a design or implementation decision. Criteria only; it does not edit a
  design file.`,
  "apple-design": `description: >-
  Use this when a design system or screen needs gesture, spring, depth, type, or
  restraint decisions in an Apple-like way, translated for the web. Criteria
  only; it does not edit a design file.`,
  "find-animation-opportunities": `description: >-
  Use this when a frame is moving into implementation and you need places that
  should animate, with exact values, and places that should not. Read-only. It
  does not edit a design file.`,
  "improve-animations": `description: >-
  Use this when a frame is in implementation and the motion needs an audit plus
  self-contained fix plans, not a single diff review. Read-only on source. It
  does not edit a design file.`,
  "review-animations": `description: >-
  Use this when a frame is moving into implementation and its motion code needs
  a strict review against exact curves, durations, and springs. It flags by
  default. It does not edit a design file.`,
  prototype: `description: >-
  Use this when a screen or component needs several genuinely different versions
  behind a picker so one can be chosen. Only when explicitly asked. It does not
  edit a design file by itself.`,
};

/** Skills whose job is judgment. They keep the design-file ban in the body. */
const CRITERIA_SKILLS = new Set([
  "emil-design-eng",
  "animation-vocabulary",
  "apple-design",
  "find-animation-opportunities",
  "improve-animations",
  "review-animations",
  "prototype",
]);

/** Installed. Order is the blueprint order. */
const EMIL_SHIPPED = [
  "emil-design-eng",
  "animate",
  "review-animations",
  "improve-animations",
  "find-animation-opportunities",
  "animation-vocabulary",
  "apple-design",
  "prototype",
  "mobile-native",
  "break-ui",
  "ask-sonner",
];

const VERCEL_LICENSE = `MIT License

Copyright (c) Vercel, Inc.

The react-best-practices skill is taken from ${VERCEL_REPO}
commit ${VERCEL_SHA} (skills/react-best-practices). The upstream README
states that the repository is MIT. This notice travels with the copy.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;

function splitFrontmatter(text) {
  if (!text.startsWith("---\n")) {
    throw new Error("missing frontmatter");
  }
  const end = text.indexOf("\n---\n", 4);
  if (end < 0) throw new Error("unclosed frontmatter");
  return {
    frontmatter: text.slice(4, end),
    body: text.slice(end + 5),
  };
}

function replaceDescription(frontmatter, descriptionBlock) {
  const lines = frontmatter.split("\n");
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("description:")) {
      const folded = lines[i].includes(">-") || lines[i].trimEnd().endsWith(">");
      if (folded) {
        i += 1;
        while (i < lines.length && /^[ \t]/.test(lines[i])) i += 1;
        i -= 1;
      }
      out.push(descriptionBlock);
      continue;
    }
    out.push(lines[i]);
  }
  return out.join("\n").replace(/\n+$/, "");
}

function emilNotice(name) {
  const parts = [EMIL_SOURCE];
  if (CRITERIA_SKILLS.has(name)) parts.push(DESIGN_FILE);
  parts.push(AURA_WINS);
  if (name === "ask-sonner") parts.push(SONNER_SCOPE);
  return parts.join("\n\n");
}

function raiseInputFloor(body) {
  return body
    .replaceAll(
      "Input font size 16px at the minimum",
      "Input font size 17px at the minimum (Aura floor; iOS zooms below 16px)",
    )
    .replaceAll(
      "font-size: 16px; /* the minimum; 1rem at the default root size */",
      "font-size: max(1rem, 17px); /* Aura floor; 1rem is 17px when html is 17px */",
    )
    .replaceAll("font-size: 16px;", "font-size: max(1rem, 17px);")
    .replaceAll(
      "16px inputs — fix the cause",
      "17px inputs — Aura floor; fix the cause",
    );
}

function buildEmilSkill(name) {
  const raw = readFileSync(join(emilDir, "skills", name, "SKILL.md"), "utf8");
  const { frontmatter, body } = splitFrontmatter(raw);
  const fm = TEAM_DESCRIPTION[name]
    ? replaceDescription(frontmatter, TEAM_DESCRIPTION[name])
    : frontmatter;
  let nextBody = body.replace(/^\n/, "");
  if (name === "mobile-native") nextBody = raiseInputFloor(nextBody);
  return `---\n${fm}\n---\n\n${emilNotice(name)}\n\n${nextBody.endsWith("\n") ? nextBody : nextBody + "\n"}`;
}

function stampCompanion(text) {
  const line = `<!-- Source: ${EMIL_REPO} @ ${EMIL_SHA} — MIT, Copyright (c) 2026 Emil Kowalski. -->\n`;
  if (text.startsWith("<!-- Source:")) return text;
  return line + text;
}

function writeFile(path, contents) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, contents);
}

function copyEmil(name) {
  const src = join(emilDir, "skills", name);
  const dest = join(templateRoot, name);
  rmSync(dest, { recursive: true, force: true });
  mkdirSync(dest, { recursive: true });
  writeFile(join(dest, "SKILL.md"), buildEmilSkill(name));
  writeFile(join(dest, "LICENSE"), readFileSync(join(emilDir, "LICENSE")));
  for (const entry of readdirSync(src)) {
    if (entry === "SKILL.md") continue;
    const abs = join(src, entry);
    if (statSync(abs).isDirectory()) {
      throw new Error(`${name} has a subdirectory (${entry}); vendor script does not walk it`);
    }
    const text = readFileSync(abs, "utf8");
    if (entry === "PICKER.md") {
      writeFile(join(dest, entry), text);
    } else {
      writeFile(join(dest, entry), stampCompanion(text));
    }
  }
}

function insertAfterFrontmatter(text, paragraph) {
  if (!text.startsWith("---\n")) {
    const line = `<!-- Source: ${VERCEL_REPO} @ ${VERCEL_SHA} — MIT. -->\n`;
    return text.startsWith("<!-- Source:") ? text : line + text;
  }
  const { frontmatter, body } = splitFrontmatter(text);
  let fm = frontmatter;
  if (fm.includes("metadata:")) {
    if (!fm.includes("commit:")) {
      fm = fm.replace(
        /metadata:\n/,
        `metadata:\n  source: ${VERCEL_REPO}\n  commit: ${VERCEL_SHA}\n`,
      );
    }
  }
  const extra = paragraph ? ` ${paragraph}` : "";
  const note = body.includes(VERCEL_SHA)
    ? ""
    : `\nSource: ${VERCEL_REPO} @ ${VERCEL_SHA} (MIT).${extra}\n`;
  return `---\n${fm}\n---\n${note}${body.startsWith("\n") ? body : "\n" + body}`;
}

function copyVercel() {
  const src = join(vercelDir, "skills", "react-best-practices");
  const dest = join(templateRoot, "react-best-practices");
  rmSync(dest, { recursive: true, force: true });
  cpSync(src, dest, { recursive: true });
  const skillPath = join(dest, "SKILL.md");
  const skill = readFileSync(skillPath, "utf8");
  writeFile(
    skillPath,
    insertAfterFrontmatter(
      skill,
      "Aura visual rules and gdp-ts proofs still win where this guide overlaps them. `server-auth-actions` does not replace a proof.",
    ),
  );
  writeFile(join(dest, "LICENSE"), VERCEL_LICENSE);
  const agents = join(dest, "AGENTS.md");
  writeFile(agents, insertAfterFrontmatter(readFileSync(agents, "utf8"), ""));
  const rulesDir = join(dest, "rules");
  for (const entry of readdirSync(rulesDir)) {
    const abs = join(rulesDir, entry);
    if (!entry.endsWith(".md")) continue;
    writeFile(abs, insertAfterFrontmatter(readFileSync(abs, "utf8"), ""));
  }
  const metaPath = join(dest, "metadata.json");
  const meta = JSON.parse(readFileSync(metaPath, "utf8"));
  meta.source = VERCEL_REPO;
  meta.commit = VERCEL_SHA;
  meta.license = "MIT";
  writeFile(metaPath, JSON.stringify(meta, null, 2) + "\n");
}

function mirrorToCursorSkills() {
  const names = [...EMIL_SHIPPED, "react-best-practices"];
  for (const name of names) {
    const dest = join(cursorRoot, name);
    rmSync(dest, { recursive: true, force: true });
    cpSync(join(templateRoot, name), dest, { recursive: true });
  }
}

for (const name of EMIL_SHIPPED) copyEmil(name);
copyVercel();
mirrorToCursorSkills();

const shipped = readdirSync(templateRoot).filter((name) =>
  statSync(join(templateRoot, name)).isDirectory(),
);
console.log(`vendored ${shipped.length} skills into ${relative(repoRoot, templateRoot)}`);
console.log(shipped.sort().join("\n"));
