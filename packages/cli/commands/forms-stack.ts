import { createHash } from "crypto";
import { execa } from "execa";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

export const FORM_AGENT_FILES = [
  {
    template: "cursor/rules/components-forms.mdc",
    dest: ".cursor/rules/components-forms.mdc",
    previousAuraHashes: [
      "1419838024c4e1b3e80f660c0c677abe2e2654b310abc284cbdc4452c9e57892",
      "a5bbfb0ff0db36e43105d67986de86b796d31138ba462f301382afe144fb9c37",
    ],
  },
  {
    template: "cursor/skills/aura-forms/SKILL.md",
    dest: ".cursor/skills/aura-forms/SKILL.md",
    previousAuraHashes: [
      "5b5c66c36f98dae764ddb51d80621fb76c31355189b1d1ddc21e7ff8295c5ac8",
    ],
  },
] as const;

type AliasKey = "ui" | "hooks" | "lib";

export const FORM_STACK_ITEMS: readonly {
  name: string;
  alias: AliasKey;
  file: string;
}[] = [
  { name: "form", alias: "ui", file: "Form.tsx" },
  { name: "field", alias: "ui", file: "Field.tsx" },
  { name: "use-dynamic-form", alias: "hooks", file: "use-dynamic-form.ts" },
  { name: "web-validation", alias: "lib", file: "web-validation.ts" },
];

const DEFAULT_ALIASES: Record<AliasKey, string> = {
  ui: "@/components/ui",
  hooks: "@/hooks",
  lib: "@/utils",
};

export type AgentFileStatus = "write" | "update" | "unchanged" | "customized";

export type RegistryAdd = (projectRoot: string, items: string[]) => Promise<void>;

function templatesRoot(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  return join(here, "..", "templates");
}

function sha256(content: Buffer | string): string {
  return createHash("sha256").update(content).digest("hex");
}

export function syncFormAgentFiles(
  projectRoot: string,
  force: boolean,
): { dest: string; status: AgentFileStatus }[] {
  return FORM_AGENT_FILES.map(({ template, dest, previousAuraHashes }) => {
    const next = readFileSync(join(templatesRoot(), template));
    const abs = join(projectRoot, dest);
    let status: AgentFileStatus;
    if (!existsSync(abs)) {
      status = "write";
    } else {
      const current = readFileSync(abs);
      const isPreviousAuraCopy = (previousAuraHashes as readonly string[]).includes(
        sha256(current),
      );
      if (current.equals(next)) status = "unchanged";
      else if (force || isPreviousAuraCopy) status = "update";
      else status = "customized";
    }
    if (status === "write" || status === "update") {
      mkdirSync(dirname(abs), { recursive: true });
      writeFileSync(abs, next);
    }
    const label =
      status === "customized" ? "skip (customized, use --force)" : status;
    console.log(`  forms: ${dest} (${label})`);
    return { dest, status };
  });
}

function readAliases(projectRoot: string): Record<AliasKey, string> | null {
  const path = join(projectRoot, "components.json");
  if (!existsSync(path)) return null;
  const config = JSON.parse(readFileSync(path, "utf-8")) as {
    aliases?: Partial<Record<AliasKey, string>>;
    registries?: Record<string, unknown>;
  };
  if (!config.registries?.["@aura"]) return null;
  return { ...DEFAULT_ALIASES, ...config.aliases };
}

function aliasDirs(projectRoot: string, alias: string): string[] {
  const rel = alias.replace(/^@\//, "");
  return [join(projectRoot, rel), join(projectRoot, "src", rel)];
}

export function missingFormStackItems(projectRoot: string): string[] | null {
  const aliases = readAliases(projectRoot);
  if (!aliases) return null;
  return FORM_STACK_ITEMS.filter(
    ({ alias, file }) =>
      !aliasDirs(projectRoot, aliases[alias]).some((dir) =>
        existsSync(join(dir, file)),
      ),
  ).map(({ name }) => name);
}

const shadcnAdd: RegistryAdd = async (projectRoot, items) => {
  await execa(
    "pnpm",
    ["dlx", "shadcn@latest", "add", ...items.map((name) => `@aura/${name}`)],
    { cwd: projectRoot, stdio: "inherit" },
  );
};

export async function installFormStack(
  projectRoot: string,
  add: RegistryAdd = shadcnAdd,
): Promise<string[]> {
  const missing = missingFormStackItems(projectRoot);
  if (missing === null) {
    console.log(
      "  forms: skip components (no components.json with the @aura registry; run aura setup first)",
    );
    return [];
  }
  if (missing.length === 0) {
    console.log("  forms: form, field, use-dynamic-form, web-validation already installed");
    return [];
  }
  console.log(`\nAdding the Aura form stack: ${missing.join(", ")}...`);
  await add(projectRoot, missing);
  return missing;
}
