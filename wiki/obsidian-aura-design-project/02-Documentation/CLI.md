---
title: CLI
date: 2026-10-06
tags: [dev-log, documentation, architecture]
---
## Summary
`@aura-design/cli` (`packages/cli`, binary `aura`) bootstraps Aura apps, regenerates theme CSS, migrates spacing, and scaffolds wiki / image / Sonar tooling. Public docs live at `/docs/cli` (`apps/www/content/docs/cli.mdx`).

## Context
- Related: [[Registry]], [[Design md]], [[Site and docs app]], [[Brand-Image-Generation]]
- Implementation Path: `packages/cli`, `apps/www/content/docs/cli.mdx`

## Path / npm name

- **Folder:** `packages/cli`
- **Package:** `@aura-design/cli`
- **Binary:** `aura` via `pnpm dlx @aura-design/cli@latest …`

## Commands

- **`aura init`** — `create-next-app`, then `components.json`, Radix `globals.css`, `shadcn add` for `@aura/class-names` / `page-get-starter` / `css-main` / `rules` / `skills`, then blueprint scaffolding (including [[gdp-ts proofs]]).
- **`aura setup [--dir]`** — Same Aura apply as `init` on an existing Next app (no `create-next-app`).
- **`aura link [-o]`** — Downloads canonical Aura `components.json` from the docs-site raw URL.
- **`aura blueprint [projectDir]`** — Feature map, `generate-brand-images` skill, forms rule and skill, `preflight.ts`, Sonar scripts/config, `.gitignore` / `.env.example`, and gdp-ts (`@gdp-ts/core`, ESLint preset, skill, starter proofs). It does not install Emil or Vercel skills. Re-running deletes the copies an older CLI wrote (see [[Emil skills]]). Options: `--force`, `--suffix`.
- **`aura colors`** — `--accent` / `--gray` / `--background` (or prompts); overwrites `globals.css`.
- **`aura typography generate`** — Interactive fluid `typography.css`.
- **`aura spacing [target]`** — Remap Tailwind spacing utilities in `.tsx` from 4px to closest 13px token (`--dir`).

## Important paths

- `packages/cli/index.ts` — Commander entry.
- `packages/cli/commands/` — `init`, `setup`, `link`, `typography`, `colors`, `spacing`, `blueprint`.
- `packages/cli/templates/` — Copied to `dist/templates/` on `pnpm build`.
- Public page: `apps/www/content/docs/cli.mdx` (nav: Get Started → CLI).

## Related

- [[Registry]] · [[Design md]] · [[Packages and docs app]] · [[Site and docs app]] · [[Local development]] · [[MCP]]
