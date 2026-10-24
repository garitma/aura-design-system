#!/usr/bin/env node
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

const AURA_REGISTRY = `If the Aura registry (\`@aura\`) already has a component for the need, use it before reaching for an external library.`;

const AUDIT_DESCRIPTION = {
  "emil-design-eng": `On-demand audit. Use only when someone asks for a design-engineering or UI polish review of a screen or component. Criteria only; it does not edit a design file.`,
  animate: `On-demand audit and build. Use only when someone asks to design or rework a specific animation: whether it should animate, tool, properties, curve, duration, interruption, and exit.`,
  "review-animations": `On-demand audit. Use only when someone asks to review the motion in a diff or file against exact curves, durations, and springs. Flags by default.`,
  "improve-animations": `On-demand audit. Use only when someone asks for a codebase-wide motion audit with self-contained fix plans. Read-only on source.`,
  "find-animation-opportunities": `On-demand audit. Use only when someone asks where a screen should or should not animate, with exact values. Read-only.`,
  "animation-vocabulary": `On-demand reference. Use only when someone asks for the exact name of a vaguely described motion effect. Criteria only.`,
  "apple-design": `On-demand audit. Use only when someone asks for an Apple-style review of gesture, spring, depth, type, or restraint decisions, translated for the web. Criteria only.`,
  prototype: `On-demand only. Use only when someone explicitly asks for several genuinely different versions of one UI piece behind a picker.`,
  "mobile-native": `On-demand audit. Use only when someone asks why a web app feels like a website on a phone: tap highlight, 100vh, safe areas, overscroll, input zoom.`,
  "break-ui": `On-demand audit. Use only when someone asks to stress-test a screen with worst-case data: long names, empty lists, huge counts, missing fields.`,
  "ask-sonner": `On-demand reference. Use only when someone asks about Sonner in a file that already imports sonner. New toasts use the Aura toast.`,
  "pick-ui-library": `On-demand audit. Use only when someone asks which library fits a frontend task. An @aura component comes before an external library.`,
  "react-best-practices": `On-demand audit. Use only when someone asks for a React or Next.js performance or code audit (waterfalls, bundle size, server work, re-renders). Not default guidance for writing code.`,
};

const AUDIT_NOTICE = `This is an on-demand audit. Run it only when someone asks for it by name or asks for this kind of review; it is not standing guidance. Report findings as a list, each with a severity (high, medium, low), \`file:line\`, the problem, and a suggested fix. Do not apply fixes unless the person asks; they land in the same PR or a follow-up.`;

function auditFrontmatter(frontmatter, name) {
  const description = `description: >-\n${foldLines(AUDIT_DESCRIPTION[name])}`;
  const fm = replaceDescription(frontmatter, description);
  return fm.includes("disable-model-invocation:")
    ? fm
    : `${fm}\ndisable-model-invocation: true`;
}

function foldLines(text) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    if (line && line.length + word.length + 1 > 78) {
      lines.push(`  ${line}`);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(`  ${line}`);
  return lines.join("\n");
}

const CRITERIA_SKILLS = new Set([
  "emil-design-eng",
  "animation-vocabulary",
  "apple-design",
  "find-animation-opportunities",
  "improve-animations",
  "review-animations",
  "prototype",
]);

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
  "pick-ui-library",
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
  const parts = [EMIL_SOURCE, AUDIT_NOTICE];
  if (CRITERIA_SKILLS.has(name)) parts.push(DESIGN_FILE);
  parts.push(AURA_WINS);
  if (name === "pick-ui-library") parts.push(AURA_REGISTRY);
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

function preferAuraValidation(body) {
  const from = "Look up limits in the validation schema (Zod, Yup, Valibot)";
  if (!body.includes(from)) throw new Error("break-ui validation sentence moved upstream");
  return body.replaceAll(
    from,
    "Look up limits in the validation schema (in Aura, the ajv JSON Schema passed to `validateFormData`; Zod, Yup, or Valibot only where the project already uses them)",
  );
}

function buildEmilSkill(name) {
  const raw = readFileSync(join(emilDir, "skills", name, "SKILL.md"), "utf8");
  const { frontmatter, body } = splitFrontmatter(raw);
  const fm = auditFrontmatter(frontmatter, name);
  let nextBody = body.replace(/^\n/, "");
  if (name === "mobile-native") nextBody = raiseInputFloor(nextBody);
  if (name === "break-ui") nextBody = preferAuraValidation(nextBody);
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

const ZOD_VALIDATION_EXAMPLE = /```typescript\n'use server'\n\nimport \{ verifySession \} from '@\/lib\/auth'\nimport \{ z \} from 'zod'\n[\s\S]*?\n```/g;

const AJV_VALIDATION_EXAMPLE = `\`\`\`typescript
'use server'

import { verifySession } from '@/lib/auth'
import { profileSchema } from '@/lib/validation/profile.schema'
import { validateFormData } from '@/utils/web-validation'

export async function updateProfile(data: { userId: string; name: string; email: string }) {
  // Validate input first, with the same ajv JSON Schema the Aura Form uses
  const { isValid, errors } = validateFormData(profileSchema, data)
  if (!isValid) {
    return { ok: false, errors }
  }

  // Then authenticate
  const session = await verifySession()
  if (!session) {
    throw new Error('Unauthorized')
  }

  // Then authorize
  if (session.user.id !== data.userId) {
    throw new Error('Can only update own profile')
  }

  // Finally perform the mutation
  await db.user.update({
    where: { id: data.userId },
    data: { name: data.name, email: data.email }
  })

  return { ok: true }
}
\`\`\`

In Aura projects, validate with ajv through \`validateFormData\` and the shared JSON Schema the form uses (skill \`aura-forms\`). Do not add zod, yup, or valibot.`;

const VERCEL_WHEN_TO_APPLY = `## When to Apply

Run this audit only when someone asks for it:
- A React or Next.js performance review before opening or merging a PR
- Investigating slow pages, waterfalls, large bundles, or re-render storms
- An explicit code audit of components, data fetching, or server actions

`;

function useAjvValidation(text, file) {
  if (!text.includes("from 'zod'")) return text;
  const next = text.replace(ZOD_VALIDATION_EXAMPLE, AJV_VALIDATION_EXAMPLE);
  if (next.includes("from 'zod'")) throw new Error(`zod example changed upstream in ${file}`);
  return next;
}

function renameGuide(text) {
  return text.replaceAll("AGENTS.md", "GUIDE.md");
}

function copyVercel() {
  const src = join(vercelDir, "skills", "react-best-practices");
  const dest = join(templateRoot, "react-best-practices");
  rmSync(dest, { recursive: true, force: true });
  cpSync(src, dest, { recursive: true });

  const skillPath = join(dest, "SKILL.md");
  const { frontmatter, body } = splitFrontmatter(readFileSync(skillPath, "utf8"));
  const whenStart = body.indexOf("## When to Apply");
  const whenEnd = body.indexOf("## ", whenStart + 3);
  if (whenStart < 0 || whenEnd < 0) throw new Error("react-best-practices When to Apply moved upstream");
  const auditBody = renameGuide(
    body.slice(0, whenStart) + VERCEL_WHEN_TO_APPLY + body.slice(whenEnd),
  );
  writeFile(
    skillPath,
    insertAfterFrontmatter(
      `---\n${auditFrontmatter(frontmatter, "react-best-practices").replace(/^name: .*$/m, "name: react-best-practices")}\n---\n${auditBody}`,
      `${AUDIT_NOTICE} Aura visual rules and gdp-ts proofs still win where this guide overlaps them. \`server-auth-actions\` does not replace a proof.`,
    ),
  );
  writeFile(join(dest, "LICENSE"), VERCEL_LICENSE);

  const agents = join(dest, "AGENTS.md");
  const guide = join(dest, "GUIDE.md");
  writeFile(
    guide,
    insertAfterFrontmatter(useAjvValidation(readFileSync(agents, "utf8"), "AGENTS.md"), ""),
  );
  rmSync(agents);
  const readme = join(dest, "README.md");
  writeFile(readme, renameGuide(readFileSync(readme, "utf8")));

  const rulesDir = join(dest, "rules");
  for (const entry of readdirSync(rulesDir)) {
    const abs = join(rulesDir, entry);
    if (!entry.endsWith(".md")) continue;
    writeFile(
      abs,
      insertAfterFrontmatter(useAjvValidation(readFileSync(abs, "utf8"), entry), ""),
    );
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
