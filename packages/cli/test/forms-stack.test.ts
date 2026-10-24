import assert from "node:assert/strict";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { retireRemovedSkills } from "../commands/blueprint.js";
import {
  FORM_AGENT_FILES,
  installFormStack,
  missingFormStackItems,
  syncFormAgentFiles,
} from "../commands/forms-stack.js";

const templates = fileURLToPath(new URL("../templates/", import.meta.url));
const repoRoot = fileURLToPath(new URL("../../../", import.meta.url));
const registryRoot = join(repoRoot, "packages/registry/registry/default");

const NO_ZOD_LINE =
  "Validate with ajv via `validateFormData` / JSON Schema; do not add zod, yup or valibot.";

function withProject(run: (root: string) => Promise<void> | void) {
  return async () => {
    const root = mkdtempSync(join(tmpdir(), "aura-forms-"));
    try {
      writeFileSync(join(root, "package.json"), JSON.stringify({ name: "acme-shop" }));
      await run(root);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  };
}

function writeComponentsJson(root: string, aliases: Record<string, string> = {}) {
  writeFileSync(
    join(root, "components.json"),
    JSON.stringify({
      aliases: { ui: "@/components/ui", hooks: "@/hooks", lib: "@/utils", ...aliases },
      registries: { "@aura": "https://auradesignsystem.com/r/{name}.json" },
    }),
  );
}

describe("forms stack blueprint", () => {
  it("keeps the template rule and skill identical to the monorepo and registry copies", () => {
    for (const { template } of FORM_AGENT_FILES) {
      const shipped = readFileSync(join(templates, template), "utf8");
      const monorepoPath = template.replace(/^cursor\//, ".cursor/");
      assert.equal(shipped, readFileSync(join(repoRoot, monorepoPath), "utf8"), template);
      const registryPath = template.replace(/^cursor\//, "");
      assert.equal(shipped, readFileSync(join(registryRoot, registryPath), "utf8"), template);
    }
  });

  it("forbids zod, widens the rule globs, and keeps the server action pattern", () => {
    const rule = readFileSync(join(templates, "cursor/rules/components-forms.mdc"), "utf8");
    assert.match(rule, new RegExp(NO_ZOD_LINE.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&")));
    for (const glob of ["**/actions.ts", "**/*-actions.ts", "app/**/route.ts", "**/validation/**", "**/*schema*"]) {
      assert.ok(rule.includes(glob), glob);
    }
    assert.match(rule, /check auth and authorization/);
    const skill = readFileSync(join(templates, "cursor/skills/aura-forms/SKILL.md"), "utf8");
    assert.match(skill, /do not add zod, yup or valibot/);
    assert.match(skill, /"use server"/);
    assert.match(skill, /lib\/validation\/profile\.schema\.ts/);
    assert.doesNotMatch(skill, /from "zod"/);
  });

  it("writes missing files, upgrades untouched Aura copies, and keeps customized ones", withProject((root) => {
    const [rule, skill] = FORM_AGENT_FILES;
    mkdirSync(join(root, ".cursor/rules"), { recursive: true });
    writeFileSync(join(root, rule.dest), "my team rule\n");

    const first = syncFormAgentFiles(root, false);
    assert.deepEqual(first.map((r) => r.status), ["customized", "write"]);
    assert.equal(readFileSync(join(root, rule.dest), "utf8"), "my team rule\n");
    assert.ok(existsSync(join(root, skill.dest)));

    const second = syncFormAgentFiles(root, false);
    assert.deepEqual(second.map((r) => r.status), ["customized", "unchanged"]);

    const forced = syncFormAgentFiles(root, true);
    assert.deepEqual(forced.map((r) => r.status), ["update", "unchanged"]);
  }));

  it("adds only the missing form stack items and skips without an @aura components.json", withProject(async (root) => {
    const calls: string[][] = [];
    const add = async (_root: string, items: string[]) => {
      calls.push(items);
    };

    assert.equal(missingFormStackItems(root), null);
    assert.deepEqual(await installFormStack(root, add), []);

    writeComponentsJson(root);
    mkdirSync(join(root, "src/components/ui"), { recursive: true });
    writeFileSync(join(root, "src/components/ui/Form.tsx"), "custom");
    assert.deepEqual(await installFormStack(root, add), ["field", "use-dynamic-form", "web-validation"]);

    mkdirSync(join(root, "components/ui"), { recursive: true });
    mkdirSync(join(root, "hooks"), { recursive: true });
    mkdirSync(join(root, "utils"), { recursive: true });
    writeFileSync(join(root, "components/ui/Field.tsx"), "x");
    writeFileSync(join(root, "hooks/use-dynamic-form.ts"), "x");
    writeFileSync(join(root, "utils/web-validation.ts"), "x");
    assert.deepEqual(await installFormStack(root, add), []);
    assert.deepEqual(calls, [["field", "use-dynamic-form", "web-validation"]]);
    assert.equal(readFileSync(join(root, "src/components/ui/Form.tsx"), "utf8"), "custom");
  }));

  it("removes the retired react-best-practices skill", withProject((root) => {
    for (const rel of [
      ".cursor/skills/react-best-practices",
      ".agents/skills/react-best-practices",
      ".agents/skills/vercel-react-best-practices",
    ]) {
      mkdirSync(join(root, rel), { recursive: true });
      writeFileSync(join(root, rel, "SKILL.md"), "x");
    }
    mkdirSync(join(root, ".cursor/skills/aura-forms"), { recursive: true });

    retireRemovedSkills(root);

    assert.equal(existsSync(join(root, ".cursor/skills/react-best-practices")), false);
    assert.equal(existsSync(join(root, ".agents/skills/react-best-practices")), false);
    assert.equal(existsSync(join(root, ".agents/skills/vercel-react-best-practices")), false);
    assert.ok(existsSync(join(root, ".cursor/skills/aura-forms")));
  }));
});
