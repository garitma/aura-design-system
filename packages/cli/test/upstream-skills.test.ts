import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { installReconciledSkills, RECONCILED_SKILLS, SKIPPED_UPSTREAM_SKILLS, EMIL_SKILLS_SHA } from "../commands/upstream-skills.js";

const templates = fileURLToPath(
  new URL("../templates/cursor/skills/", import.meta.url),
);
const repoSkills = fileURLToPath(
  new URL("../../../.cursor/skills/", import.meta.url),
);

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const abs = join(dir, entry);
    if (statSync(abs).isDirectory()) out.push(...walk(abs));
    else out.push(abs);
  }
  return out;
}

function hashTree(dir: string): string {
  const hash = createHash("sha256");
  for (const abs of walk(dir).sort()) {
    hash.update(relative(dir, abs));
    hash.update(readFileSync(abs));
  }
  return hash.digest("hex");
}

describe("reconciled upstream skills", () => {
  it("keeps the monorepo copy identical to the blueprint templates", () => {
    for (const name of RECONCILED_SKILLS) {
      assert.equal(
        hashTree(join(repoSkills, name)),
        hashTree(join(templates, name)),
        name,
      );
    }
  });

  it("does not ship the skipped upstream skills", () => {
    for (const skill of SKIPPED_UPSTREAM_SKILLS) {
      assert.equal(existsSync(join(templates, skill.name)), false, skill.name);
    }
  });

  it("pins attribution and the license notice", () => {
    for (const name of RECONCILED_SKILLS) {
      const skill = readFileSync(join(templates, name, "SKILL.md"), "utf8");
      const license = readFileSync(join(templates, name, "LICENSE"), "utf8");
      assert.match(skill, new RegExp(EMIL_SKILLS_SHA));
      assert.match(license, /Copyright \(c\) 2026 Emil Kowalski/);
      assert.match(license, /Permission is hereby granted/);
    }
    const mobile = readFileSync(
      join(templates, "mobile-native", "SKILL.md"),
      "utf8",
    );
    assert.doesNotMatch(mobile, /font-size: 16px/);
    assert.match(mobile, /17px/);
    const sonner = readFileSync(join(templates, "ask-sonner", "SKILL.md"), "utf8");
    assert.match(sonner, /Aura Toast is the product toaster/);
    const picker = readFileSync(join(templates, "pick-ui-library", "SKILL.md"), "utf8");
    assert.match(picker, /If the Aura registry \(`@aura`\) already has a component for the need/);
    assert.equal(RECONCILED_SKILLS.length, 12);
    assert.equal(existsSync(join(templates, "react-best-practices")), false);
    assert.equal(existsSync(join(repoSkills, "react-best-practices")), false);
    const breakUi = readFileSync(join(templates, "break-ui", "SKILL.md"), "utf8");
    assert.match(breakUi, /ajv JSON Schema passed to `validateFormData`/);
  });

  it("installs into .cursor/skills and treats a second run as unchanged", () => {
    const root = mkdtempSync(join(tmpdir(), "aura-blueprint-"));
    try {
      writeFileSync(
        join(root, "package.json"),
        JSON.stringify({ name: "next-scratch", dependencies: { next: "15.0.0" } }) + "\n",
      );
      mkdirSync(join(root, ".agents", "skills", "animate"), { recursive: true });
      writeFileSync(
        join(root, ".agents", "skills", "animate", "SKILL.md"),
        "duplicate\n",
      );
      const first = installReconciledSkills(root);
      assert.equal(first.removedDuplicates.length, 1);
      assert.equal(
        first.results.every((result) => result.status === "write"),
        true,
      );
      for (const name of RECONCILED_SKILLS) {
        assert.equal(
          existsSync(join(root, ".cursor", "skills", name, "SKILL.md")),
          true,
          name,
        );
      }
      assert.equal(
        existsSync(join(root, ".agents", "skills", "animate")),
        false,
      );
      assert.equal(
        existsSync(join(root, ".cursor", "skills", "write-swift")),
        false,
      );
      const before = hashTree(join(root, ".cursor", "skills"));
      const second = installReconciledSkills(root);
      assert.deepEqual(
        second.results.map((result) => result.status),
        RECONCILED_SKILLS.map(() => "unchanged"),
      );
      assert.equal(hashTree(join(root, ".cursor", "skills")), before);

      const drifted = join(root, ".cursor", "skills", "animate", "SKILL.md");
      writeFileSync(drifted, readFileSync(drifted, "utf8") + "\n<!-- drifted -->\n");
      const third = installReconciledSkills(root);
      assert.equal(
        third.results.find((result) => result.name === "animate")?.status,
        "update",
      );
      assert.equal(
        third.results.filter((result) => result.name !== "animate").every((result) => result.status === "unchanged"),
        true,
      );
      assert.doesNotMatch(readFileSync(drifted, "utf8"), /drifted/);
      assert.equal(hashTree(join(root, ".cursor", "skills")), before);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});
