import { execa } from "execa";
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "fs";
import { dirname, join, relative } from "path";
import { fileURLToPath } from "url";

const GDP_PACKAGE = "@gdp-ts/core";
const GDP_RANGE = "^0.1.0";

const SKILL_MARKERS = [
  ".agents/skills/gdp-ts/SKILL.md",
  ".cursor/skills/gdp-ts/SKILL.md",
];

const ESLINT_CONFIG_NAMES = [
  "eslint.config.mjs",
  "eslint.config.js",
  "eslint.config.ts",
  "eslint.config.mts",
];

const GDP_IMPORT = 'import gdp from "@gdp-ts/core/lint/eslint";\n';

const GDP_ARRAY_SNIPPET = `...gdp({
    proofs: ["**/proofs/**"],
  }),`;

const GDP_ESLINT_CONFIG = `${GDP_IMPORT}import tseslint from "typescript-eslint";

// typescript-eslint supplies the parser; the gdp-ts preset only adds rules, so it comes after.
export default [
  ...tseslint.configs.recommended,
  ${GDP_ARRAY_SNIPPET}
];
`;

const GDP_ESLINT_FRAGMENT = `${GDP_IMPORT}
/** Spread after typescript-eslint, which supplies the parser. */
export function createGdpTsLintConfig() {
  return [
    ${GDP_ARRAY_SNIPPET}
  ];
}
`;

function templatesRoot(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  return join(here, "..", "templates");
}

function walkFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const abs = join(dir, entry);
    if (statSync(abs).isDirectory()) {
      out.push(...walkFiles(abs));
    } else {
      out.push(abs);
    }
  }
  return out;
}

function readPackageJson(projectRoot: string): {
  path: string;
  pkg: Record<string, unknown>;
} {
  const path = join(projectRoot, "package.json");
  const pkg = JSON.parse(readFileSync(path, "utf-8")) as Record<string, unknown>;
  return { path, pkg };
}

function dependencyNames(pkg: Record<string, unknown>): Record<string, string> {
  const deps = (pkg.dependencies ?? {}) as Record<string, string>;
  const dev = (pkg.devDependencies ?? {}) as Record<string, string>;
  return { ...deps, ...dev };
}

function packageManager(projectRoot: string, pkg: Record<string, unknown>): "pnpm" | "npm" | "yarn" {
  if (existsSync(join(projectRoot, "pnpm-lock.yaml")) || existsSync(join(projectRoot, "pnpm-workspace.yaml"))) {
    return "pnpm";
  }
  if (existsSync(join(projectRoot, "yarn.lock"))) return "yarn";
  if (existsSync(join(projectRoot, "package-lock.json"))) return "npm";
  const declared = pkg.packageManager;
  if (typeof declared === "string") {
    if (declared.startsWith("pnpm")) return "pnpm";
    if (declared.startsWith("yarn")) return "yarn";
    if (declared.startsWith("npm")) return "npm";
  }
  return "pnpm";
}

function recordDependency(
  projectRoot: string,
  name: string,
  range: string,
  dev: boolean,
): void {
  const { path, pkg } = readPackageJson(projectRoot);
  const key = dev ? "devDependencies" : "dependencies";
  const bucket = (pkg[key] ?? {}) as Record<string, string>;
  if (bucket[name] === undefined && dependencyNames(pkg)[name] === undefined) {
    bucket[name] = range;
    pkg[key] = bucket;
    writeFileSync(path, JSON.stringify(pkg, null, 2) + "\n", "utf-8");
  }
}

async function ensureDependency(
  projectRoot: string,
  name: string,
  range: string,
  dev: boolean,
): Promise<void> {
  const { pkg } = readPackageJson(projectRoot);
  if (dependencyNames(pkg)[name]) {
    console.log(`  ${name}: already in package.json`);
    return;
  }

  const pm = packageManager(projectRoot, pkg);
  const spec = `${name}@${range}`;
  const args =
    pm === "npm"
      ? ["install", dev ? "--save-dev" : "--save", spec]
      : ["add", ...(dev ? ["-D"] : []), spec];

  console.log(`\nInstalling ${name} (${pm} ${args.join(" ")})...`);
  try {
    await execa(pm, args, { cwd: projectRoot, stdio: "inherit" });
  } catch (error) {
    recordDependency(projectRoot, name, range, dev);
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Failed to install ${name}. Recorded "${range}" in package.json so the next install can fetch it.\n${message}`,
    );
  }
}

export function appSourceRoot(projectRoot: string): string {
  const tsconfigPath = join(projectRoot, "tsconfig.json");
  if (existsSync(tsconfigPath)) {
    const raw = readFileSync(tsconfigPath, "utf-8");
    if (/"@\/\*"\s*:\s*\[\s*"(\.\/)?src\/\*"/.test(raw)) {
      return join(projectRoot, "src");
    }
  }
  if (existsSync(join(projectRoot, "src", "app")) && !existsSync(join(projectRoot, "app"))) {
    return join(projectRoot, "src");
  }
  return projectRoot;
}

function scaffoldProofs(projectRoot: string, force: boolean): void {
  const source = join(templatesRoot(), "gdp");
  const destRoot = appSourceRoot(projectRoot);
  const files = walkFiles(source);
  for (const abs of files) {
    const rel = relative(source, abs);
    const dest = join(destRoot, rel);
    const label = relative(projectRoot, dest);
    if (existsSync(dest) && !force) {
      console.log(`  skip (exists): ${label}`);
      continue;
    }
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, readFileSync(abs), "utf-8");
    console.log(`  write: ${label}`);
  }
}

function matchingCloser(src: string, openIndex: number, open: string, close: string): number {
  let depth = 0;
  let quote: "'" | '"' | "`" | null = null;
  let escape = false;
  for (let i = openIndex; i < src.length; i++) {
    const ch = src[i];
    if (quote) {
      if (escape) {
        escape = false;
        continue;
      }
      if (ch === "\\") {
        escape = true;
        continue;
      }
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === "`") {
      quote = ch;
      continue;
    }
    if (ch === "/" && src[i + 1] === "/") {
      const newline = src.indexOf("\n", i);
      if (newline < 0) return -1;
      i = newline;
      continue;
    }
    if (ch === "/" && src[i + 1] === "*") {
      const end = src.indexOf("*/", i + 2);
      if (end < 0) return -1;
      i = end + 1;
      continue;
    }
    if (ch === open) depth += 1;
    else if (ch === close) {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function insertSnippet(src: string, openIndex: number, snippet: string): string | null {
  const close = matchingCloser(src, openIndex, src[openIndex], src[openIndex] === "[" ? "]" : ")");
  if (close < 0) return null;
  let before = src.slice(0, close).replace(/\s*$/, "");
  const last = before[before.length - 1];
  if (last !== "," && last !== "[" && last !== "(") {
    before += ",";
  }
  const after = src.slice(close);
  return `${before}\n  ${snippet}\n${after}`;
}

export function patchEslintSource(src: string): string | null {
  if (src.includes("@gdp-ts/core/lint/eslint") || src.includes("createGdpTsLintConfig")) {
    return src;
  }
  const withImport = GDP_IMPORT + src;
  const arrayOpeners = [
    /const eslintConfig\s*=\s*\[/g,
    /export default\s*\[/g,
    /module\.exports\s*=\s*\[/g,
  ];
  for (const pattern of arrayOpeners) {
    const match = pattern.exec(withImport);
    if (!match) continue;
    const openIndex = match.index + match[0].length - 1;
    return insertSnippet(withImport, openIndex, GDP_ARRAY_SNIPPET);
  }
  const call = /export default tseslint\.config\s*\(/g.exec(withImport);
  if (call) {
    const openIndex = call.index + call[0].length - 1;
    return insertSnippet(withImport, openIndex, GDP_ARRAY_SNIPPET);
  }
  return null;
}

function writeEslintFragment(projectRoot: string): void {
  const dest = join(projectRoot, "eslint.gdp-ts.mjs");
  if (!existsSync(dest)) {
    writeFileSync(dest, GDP_ESLINT_FRAGMENT, "utf-8");
    console.log("  write: eslint.gdp-ts.mjs");
    console.log(
      "  eslint: spread createGdpTsLintConfig() into your flat config after typescript-eslint",
    );
  }
}

async function wireEslint(projectRoot: string): Promise<void> {
  const existingName = ESLINT_CONFIG_NAMES.find((name) => existsSync(join(projectRoot, name)));
  if (!existingName) {
    const cjs = ["eslint.config.cjs", "eslint.config.cts"].find((name) =>
      existsSync(join(projectRoot, name)),
    );
    if (cjs) {
      writeEslintFragment(projectRoot);
      console.log(`  eslint: left ${cjs} unchanged (gdp-ts preset is ESM)`);
      return;
    }
    await ensureDependency(projectRoot, "typescript-eslint", "^8.46.0", true);
    writeFileSync(join(projectRoot, "eslint.config.mjs"), GDP_ESLINT_CONFIG, "utf-8");
    console.log("  write: eslint.config.mjs (typescript-eslint + gdp-ts preset)");
    return;
  }

  const path = join(projectRoot, existingName);
  const src = readFileSync(path, "utf-8");
  if (src.includes("@gdp-ts/core/lint/eslint") || src.includes("createGdpTsLintConfig")) {
    console.log(`  eslint: gdp-ts preset already present in ${existingName}`);
    return;
  }
  const patched = patchEslintSource(src);
  if (!patched) {
    writeEslintFragment(projectRoot);
    console.log(`  eslint: could not patch ${existingName} safely`);
    return;
  }
  writeFileSync(path, patched, "utf-8");
  console.log(`  patch: ${existingName} (gdp-ts preset)`);
}

function skillInstalled(projectRoot: string): boolean {
  return SKILL_MARKERS.some((rel) => existsSync(join(projectRoot, rel)));
}

async function installSkill(projectRoot: string, force: boolean): Promise<void> {
  if (skillInstalled(projectRoot) && !force) {
    console.log("  gdp-ts skill: already installed");
    return;
  }
  console.log("\nInstalling the gdp-ts agent skill...");
  await execa(
    "npx",
    [
      "--yes",
      "skills",
      "add",
      "rauchg/gdp-ts",
      "--skill",
      "gdp-ts",
      "-a",
      "cursor",
      "-y",
      "--copy",
    ],
    { cwd: projectRoot, stdio: "inherit" },
  );
  if (!skillInstalled(projectRoot)) {
    throw new Error(
      "skills add finished without writing .agents/skills/gdp-ts/SKILL.md or .cursor/skills/gdp-ts/SKILL.md. Re-run: npx skills add rauchg/gdp-ts --skill gdp-ts -a cursor -y --copy",
    );
  }
  console.log("  gdp-ts skill: installed");
}

export async function applyGdpToProject(projectRoot: string, force: boolean): Promise<void> {
  console.log("\ngdp-ts (proof-carrying authz)");
  scaffoldProofs(projectRoot, force);
  await ensureDependency(projectRoot, GDP_PACKAGE, GDP_RANGE, false);

  const { pkg } = readPackageJson(projectRoot);
  const present = dependencyNames(pkg);
  if (!present.eslint) {
    await ensureDependency(projectRoot, "eslint", "^9.30.0", true);
  }
  if (!present.typescript) {
    await ensureDependency(projectRoot, "typescript", "^5.4.0", true);
  }

  await wireEslint(projectRoot);
  await installSkill(projectRoot, force);
}
