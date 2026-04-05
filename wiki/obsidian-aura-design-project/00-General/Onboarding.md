# Onboarding

## Prerequisites

- **Node** compatible with Next 16 / React 19 (see `apps/www/package.json`).
- **pnpm** — repo pins `packageManager` in root `package.json` (e.g. `pnpm@10.2.1`).

## Install

From the repository root:

```bash
pnpm install
```

`apps/www` runs **`fumadocs-mdx`** on `postinstall` to generate MDX artifacts.

## Run the docs app

From repo root (Turbo):

```bash
pnpm dev
```

Or only the www app:

```bash
pnpm --filter @aura-design/www dev
```

Default dev URL for this workspace is **`http://localhost:4000`** (`apps/www` script: `next dev --turbo --port 4000`). Older README snippets may say 3000; trust `package.json` if they disagree.

## Where to read next

- [[Packages and docs app]] — index linking each package note ([[CLI]], [[Registry]], [[Design md]], …) and [[Site and docs app]].
- [[Local development]] — Sonar, env vars, troubleshooting.
- [[Site and docs app]] — routes and content pipeline (Fumadocs, search, LLM exports).
