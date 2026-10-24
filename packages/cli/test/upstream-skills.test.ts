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
import {
  REMOVED_UPSTREAM_SKILLS,
  retireUpstreamSkills,
} from "../commands/blueprint.js";

const repoRoot = fileURLToPath(new URL("../../../", import.meta.url));
const templates = fileURLToPath(
  new URL("../templates/cursor/skills/", import.meta.url),
);

describe("retired upstream skills", () => {
  it("does not ship Emil skills or react-best-practices", () => {
    for (const name of REMOVED_UPSTREAM_SKILLS) {
      assert.equal(existsSync(join(templates, name)), false, name);
      assert.equal(existsSync(join(repoRoot, ".cursor/skills", name)), false, name);
      assert.equal(existsSync(join(repoRoot, ".agents/skills", name)), false, name);
    }
    assert.equal(
      existsSync(fileURLToPath(new URL("../commands/upstream-skills.ts", import.meta.url))),
      false,
    );
    assert.equal(
      existsSync(fileURLToPath(new URL("../scripts/vendor-upstream-skills.mjs", import.meta.url))),
      false,
    );
  });

  it("removes previously installed copies and leaves Aura skills", () => {
    const root = mkdtempSync(join(tmpdir(), "aura-upstream-"));
    try {
      writeFileSync(join(root, "package.json"), JSON.stringify({ name: "acme-shop" }));
      for (const rel of [
        ".cursor/skills/react-best-practices",
        ".cursor/skills/emil-design-eng",
        ".cursor/skills/break-ui",
        ".agents/skills/animate",
        ".agents/skills/vercel-react-best-practices",
        ".cursor/skills/aura-forms",
      ]) {
        mkdirSync(join(root, rel), { recursive: true });
        writeFileSync(join(root, rel, "SKILL.md"), "x");
        writeFileSync(join(root, rel, "GUIDE.md"), "x");
        writeFileSync(join(root, rel, "AGENTS.md"), "x");
      }

      const removed = retireUpstreamSkills(root);

      assert.equal(existsSync(join(root, ".cursor/skills/react-best-practices")), false);
      assert.equal(existsSync(join(root, ".cursor/skills/emil-design-eng")), false);
      assert.equal(existsSync(join(root, ".cursor/skills/break-ui")), false);
      assert.equal(existsSync(join(root, ".agents/skills/animate")), false);
      assert.equal(existsSync(join(root, ".agents/skills/vercel-react-best-practices")), false);
      assert.ok(existsSync(join(root, ".cursor/skills/aura-forms/SKILL.md")));
      assert.ok(removed.includes(".cursor/skills/react-best-practices"));
      assert.equal(removed.includes(".cursor/skills/aura-forms"), false);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});
