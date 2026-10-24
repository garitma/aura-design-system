import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "fs";
import { dirname, join, relative } from "path";
import { fileURLToPath } from "url";

export const EMIL_SKILLS_REPO = "https://github.com/emilkowalski/skills";
export const EMIL_SKILLS_SHA = "e8a175de22ae1e49370fc144c1f3bb9aeedf988d";

export const RECONCILED_SKILLS = [
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
] as const;

export const SKIPPED_UPSTREAM_SKILLS = [
  {
    name: "write-swift",
    source: EMIL_SKILLS_REPO,
    reason:
      "No Swift in Aura or the SGD Next.js apps. Pablo decided not to install it.",
  },
  {
    name: "animate-expo",
    source: EMIL_SKILLS_REPO,
    reason:
      "React Native and Expo only. The SGD apps are Next.js. Pablo decided not to install it.",
  },
] as const;

const STAMP = ".aura-upstream.json";


export type SkillInstallStatus = "write" | "update" | "unchanged";

export type InstallReconciledSkillsResult = {
  results: { name: string; status: SkillInstallStatus }[];
  removedDuplicates: string[];
};

function templatesRoot(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  return join(here, "..", "templates");
}

function walkFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    if (entry === STAMP) continue;
    const abs = join(dir, entry);
    if (statSync(abs).isDirectory()) {
      out.push(...walkFiles(abs));
    } else {
      out.push(abs);
    }
  }
  return out;
}

function readStamp(path: string): { files?: string[] } | null {
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, "utf8")) as { files?: string[] };
  } catch {
    return null;
  }
}

function syncSkill(projectRoot: string, name: string): SkillInstallStatus {
  const srcDir = join(templatesRoot(), "cursor", "skills", name);
  if (!existsSync(join(srcDir, "SKILL.md"))) {
    throw new Error(`Missing vendored skill template: ${name}`);
  }
  const destDir = join(projectRoot, ".cursor", "skills", name);
  const existed = existsSync(destDir);
  const rels = walkFiles(srcDir)
    .map((abs) => relative(srcDir, abs))
    .sort();

  let wrote = 0;
  let updated = 0;
  for (const rel of rels) {
    const next = readFileSync(join(srcDir, rel));
    const dest = join(destDir, rel);
    if (!existsSync(dest)) {
      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, next);
      wrote += 1;
      continue;
    }
    const current = readFileSync(dest);
    if (!current.equals(next)) {
      writeFileSync(dest, next);
      updated += 1;
    }
  }

  const stampPath = join(destDir, STAMP);
  const previous = readStamp(stampPath);
  const previousFiles = previous?.files ?? [];
  for (const old of previousFiles) {
    if (old === STAMP || rels.includes(old)) continue;
    const stale = join(destDir, old);
    if (existsSync(stale) && statSync(stale).isFile()) {
      rmSync(stale);
      updated += 1;
    }
  }

  const stamp =
    JSON.stringify(
      {
        name,
        source: EMIL_SKILLS_REPO,
        sha: EMIL_SKILLS_SHA,
        license: "MIT",
        files: rels,
      },
      null,
      2,
    ) + "\n";
  const stampCurrent = existsSync(stampPath)
    ? readFileSync(stampPath, "utf8")
    : null;
  if (stampCurrent !== stamp) {
    writeFileSync(stampPath, stamp);
    if (wrote === 0) updated += 1;
  }

  if (!existed || (wrote > 0 && updated === 0)) return "write";
  if (wrote > 0 || updated > 0) return "update";
  return "unchanged";
}

function removeDuplicateCopies(projectRoot: string): string[] {
  const removed: string[] = [];
  for (const name of RECONCILED_SKILLS) {
    const dup = join(projectRoot, ".agents", "skills", name);
    if (!existsSync(dup)) continue;
    rmSync(dup, { recursive: true, force: true });
    removed.push(`.agents/skills/${name}`);
  }
  return removed;
}

export function installReconciledSkills(
  projectRoot: string,
): InstallReconciledSkillsResult {
  const removedDuplicates = removeDuplicateCopies(projectRoot);
  const results = RECONCILED_SKILLS.map((name) => {
    const status = syncSkill(projectRoot, name);
    return { name, status };
  });

  for (const { name, status } of results) {
    console.log(`  skills: ${name} (${status})`);
  }
  for (const rel of removedDuplicates) {
    console.log(`  skills: removed duplicate ${rel}`);
  }
  const writes = results.filter((r) => r.status === "write").length;
  const updates = results.filter((r) => r.status === "update").length;
  const same = results.filter((r) => r.status === "unchanged").length;
  console.log(
    `  reconciled skills: ${writes} written, ${updates} updated, ${same} unchanged`,
  );

  return { results, removedDuplicates };
}
