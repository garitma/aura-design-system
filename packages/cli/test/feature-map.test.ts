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
  retireProjectBrain,
  scaffoldFeatureMap,
  scaffoldFeatureMapAgentFiles,
} from "../commands/blueprint.js";

const templates = fileURLToPath(new URL("../templates/", import.meta.url));
const repoRoot = fileURLToPath(new URL("../../../", import.meta.url));

function withProject(run: (root: string) => void): void {
  const root = mkdtempSync(join(tmpdir(), "aura-feature-map-"));
  try {
    writeFileSync(
      join(root, "package.json"),
      JSON.stringify({ name: "acme-shop", scripts: {} }, null, 2),
    );
    run(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

describe("feature map blueprint", () => {
  it("keeps the template rule and skill identical to the monorepo copies", () => {
    assert.equal(
      readFileSync(join(templates, "cursor/rules/feature-map.mdc"), "utf8"),
      readFileSync(join(repoRoot, ".cursor/rules/feature-map.mdc"), "utf8"),
    );
    assert.equal(
      readFileSync(join(templates, "cursor/skills/update-feature-map/SKILL.md"), "utf8"),
      readFileSync(join(repoRoot, ".cursor/skills/update-feature-map/SKILL.md"), "utf8"),
    );
  });

  it("scaffolds an empty feature map with its base and no progress log", () => {
    withProject((root) => {
      scaffoldFeatureMap(root, "shop", false);
      scaffoldFeatureMapAgentFiles(root, false);
      const vault = join(root, "wiki", "obsidian-shop");
      const base = readFileSync(join(vault, "Feature-Map", "Feature-Map.base"), "utf8");
      assert.match(base, /file\.inFolder\("Feature-Map"\)/);
      assert.match(base, /type: table/);
      assert.ok(existsSync(join(vault, "01-Identity", "Image-Identity.md")));
      assert.ok(existsSync(join(root, ".cursor/rules/feature-map.mdc")));
      assert.ok(existsSync(join(root, ".cursor/skills/update-feature-map/SKILL.md")));
      assert.equal(existsSync(join(vault, "00-General", "Internal-Progress.md")), false);
      assert.equal(existsSync(join(root, "wiki", "bruno-shop")), false);
      assert.equal(existsSync(join(root, "scripts", "brain-progress.ts")), false);
      const plugins = JSON.parse(readFileSync(join(vault, ".obsidian", "core-plugins.json"), "utf8"));
      assert.equal(plugins.bases, true);
    });
  });

  it("removes the retired Project Brain files and keeps wiki notes", () => {
    withProject((root) => {
      mkdirSync(join(root, ".cursor/rules"), { recursive: true });
      mkdirSync(join(root, ".cursor/skills/update-project-brain"), { recursive: true });
      mkdirSync(join(root, "scripts"), { recursive: true });
      mkdirSync(join(root, "wiki/obsidian-shop/00-General"), { recursive: true });
      writeFileSync(join(root, ".cursor/rules/self-documenting-system.mdc"), "x");
      writeFileSync(join(root, ".cursor/skills/update-project-brain/SKILL.md"), "x");
      writeFileSync(join(root, "scripts/brain-progress.ts"), "x");
      writeFileSync(join(root, "wiki/obsidian-shop/00-General/Internal-Progress.md"), "kept");
      writeFileSync(
        join(root, "package.json"),
        JSON.stringify({
          name: "acme-shop",
          scripts: { "brain:progress": "tsx scripts/brain-progress.ts", dev: "next dev" },
        }),
      );

      retireProjectBrain(root);

      assert.equal(existsSync(join(root, ".cursor/rules/self-documenting-system.mdc")), false);
      assert.equal(existsSync(join(root, ".cursor/skills/update-project-brain")), false);
      assert.equal(existsSync(join(root, "scripts/brain-progress.ts")), false);
      assert.ok(existsSync(join(root, "wiki/obsidian-shop/00-General/Internal-Progress.md")));
      const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
      assert.deepEqual(pkg.scripts, { dev: "next dev" });
    });
  });

  it("leaves a customized brain:progress script alone", () => {
    withProject((root) => {
      writeFileSync(
        join(root, "package.json"),
        JSON.stringify({ name: "acme-shop", scripts: { "brain:progress": "node custom.js" } }),
      );
      retireProjectBrain(root);
      const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
      assert.equal(pkg.scripts["brain:progress"], "node custom.js");
    });
  });
});
