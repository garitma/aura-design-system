# CLI

**Aura Design System command-line tool** for bootstrapping apps with Aura tokens and registries, generating theme-related CSS, and scaffolding optional project tooling (wiki, Sonar, preflight).

## Path / npm name

- **Folder:** `packages/cli`
- **Package:** `@aura-design/cli` (`packages/cli/package.json`)
- **Binary:** `aura` (invoke via `pnpm dlx @aura-design/cli@latest …` so you always pick up the published CLI)

## What it does

The CLI is the **on-ramp for consumers**: it can create or point at a Next-style app, drop in Aura’s **`components.json`** (registry URLs for production and local docs), regenerate **`globals.css`** from Radix-style accent/gray/background inputs, pull first-party registry items such as `class-names`, `design-md`, `rules`, and `skills`, and run **blueprint** scaffolding (Bruno + Obsidian wiki, preflight, Sonar).

Separate commands help **migrate or customize** Tailwind spacing (4px scale → Aura’s 13px mental model), **regenerate typography** CSS from prompts, **recolor** the theme non-interactively or via prompts, and **blueprint** internal extras (Bruno + Obsidian wiki folders, `scripts/preflight.ts`, Sonar scripts and config) into *any* repo that has a `package.json`.

## Key commands or entrypoints

- **`aura init`** — Runs **`pnpm dlx create-next-app@latest`** with inherited stdio (interactive). Detects a newly created app subdirectory or uses the current folder, then:
  - Writes **`components.json`** from the monorepo registry template when available (`packages/registry/registry/default/theming/components.json`), otherwise a built-in default with `@aura` → `https://auradesignsystem.com/r/{name}.json` and `@aura-dev` → `http://localhost:4000/r/{name}.json`.
  - Generates **light/dark** Radix-based scales and writes **`globals.css`** (searches `app/globals.css`, `src/app/globals.css`, `styles/globals.css`, `src/styles/globals.css`, or creates `app/globals.css`).
  - Runs **`pnpm dlx shadcn@latest add`** for `@aura/class-names`, `@aura/page-get-starter`, `@aura/css-main`, `@aura/rules`, `@aura/skills`.
  - Runs **`applyBlueprintToProject`** (same as `aura blueprint`): Bruno + Obsidian wiki under `wiki/`, `scripts/preflight.ts`, Sonar scripts/config, and `.gitignore` Sonar entries.
- **`aura setup`** — Same Aura apply step as `init` for an existing Next app (`--dir`), including blueprint scaffolding.
- **`aura blueprint [projectDir]`** — Standalone blueprint scaffold (also invoked from `init` / `setup`).
- **`aura typography generate`** — Interactive prompts; outputs a custom **`typography.css`** aligned with Aura’s fluid scale philosophy (`packages/cli/commands/typography.ts`).
- **`aura colors`** — Optional flags `--accent`, `--gray`, `--background` (hex); otherwise prompts. Regenerates **`globals.css`** via `generateRadixColors` + shared `generateGlobalsCss` (`packages/cli/commands/colors.ts`).
- **`aura spacing [target]`** — Rewrites Tailwind spacing utilities in **`.tsx`** files from the default 4px assumption to the closest **13px-based** token (`--dir` for scan root, default `.`) (`packages/cli/commands/spacing.ts`).
- **`aura blueprint [projectDir]`** — Scaffolds under the target repo: `wiki/bruno-*`, `wiki/obsidian-*`, `scripts/preflight.ts`, `sonar-project.properties`, merges Sonar-related **scripts** and **devDependencies** into `package.json`, patches `.gitignore`. Options: `--force`, `--suffix` (`packages/cli/commands/blueprint.ts`).

**Maintainer scripts** (from `packages/cli/package.json`): `build` runs `tsc --build` and copies `templates/` into `dist/templates/` so the compiled CLI resolves bundled files at runtime.

## Important paths

- `packages/cli/index.ts` — Registers all commands (Commander).
- `packages/cli/commands/` — `init`, `typography`, `colors`, `spacing`, `blueprint`.
- `packages/cli/utils/` — e.g. `color-utils.ts`, `registry-utils.ts`.
- `packages/cli/templates/` — Copied to `dist/templates/` on build (Bruno, Obsidian dotfiles, `preflight.ts`, Sonar properties).

## Related

- [[Registry]] — Registry items the CLI installs and the `components.json` template.
- [[Design md]] — `@aura/design-md` content pulled during `init`.
- [[Packages and docs app]] — Index of all package notes.
- [[Site and docs app]] — `@aura-dev` registry URL points at local docs (`localhost:4000`).
- [[Local development]]
