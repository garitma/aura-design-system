# AGENTS.md — Aura Design System

Short constraints for coding agents working in this monorepo. Humans who want the full Lauren Tan / pstack workflow in Cursor desktop still run `/setup-pstack` and `/poteto-mode` from the marketplace plugin — those are **not** vendored here.

## What this repo is

Aura is a **design system monorepo**: tokens, UI components, Ladle stories, docs site, CLI, and agent-facing design specs. Consumers install via shadcn-style registry (`@aura/*`), not by importing this repo as an app.

| Area | Path |
| --- | --- |
| Components + registry source | `packages/registry/registry/default/components/` |
| Ladle stories | `packages/registry/src/*.stories.tsx` |
| Component metadata / docs generation | `packages/registry/metadata/`, `packages/registry/scripts/` |
| Tokens / CSS foundation | `packages/system/`, `packages/styled-system/`, root `DESIGN.md` |
| Design-md package | `packages/design-md/` |
| CLI | `packages/cli/` |
| Docs / marketing site | `apps/www/` |
| Cursor rules & project skills | `.cursor/rules/`, `.cursor/skills/` |
| Obsidian / Bruno wiki | `wiki/obsidian-aura-design-project/`, `wiki/bruno-aura-design-project/` |

`apps/www/AGENTS.md` is Next.js / site lint guidance only. Prefer **this** file for repo-wide agent policy.

## Preferred workflow

1. **Understand first** — Explore existing exports, stories, and call sites before editing (`/how`-style reading). Do not invent APIs that contradict registry components.
2. **Sketch before drive-by edits** — For new or changed public surfaces, decide props/variants/composition (`/architect`-style) before rewriting files.
3. **Small verifiable units** — One component or token concern per change set when possible.
4. **Verify in-repo** — Stories, typecheck, lint, registry/docs scripts. See `.cursor/skills/aura-verification/SKILL.md`. Do **not** invent Famity / Labelo product E2E here.

## Gardener constraints (hard)

- **Public APIs** — Do not change public component APIs casually. Prefer additive props/variants. Document breaking changes explicitly in the PR.
- **Tokens** — Respect design tokens and `.cursor/rules/*` (13px spacing, accent/gray scales, typography). No hard-coded colors/spacing that bypass tokens when tokens exist. Follow root `DESIGN.md`.
- **Stories** — Keep `packages/registry/src/*.stories.tsx` (and metadata/docs as needed) in sync with component API changes.
- **Accessibility** — Do not ship interactive components without keyboard, focus, and basic a11y (roles, labels, focus rings).
- **Scope** — No drive-by refactors outside the task. No unrelated package bumps.
- **No product apps** — Do not add Famity Care, Labelo, or other product-app code here. This repo is the design system only.

## Cursor rules & skills

- Foundation rules live in `.cursor/rules/` (`alwaysApply` where marked). Do not invent a second conflicting design policy.
- Project skills: `.cursor/skills/aura-constraints/`, `.cursor/skills/aura-verification/`, plus existing port / brand-image skills.
- Registry-synced consumer skills are listed in `packages/registry/scripts/sync-skills.ts` — **agent-constraint skills stay local** and are not added to that list unless intentionally published.

## Out of scope

- Vendoring or cloning `backnotprop/pstack` or copying its full skill set.
- Modifying `next-famity-care` or any Famity paths (they are not this repo).
- Product runtime features unrelated to the design system, docs, or agent guidance.
