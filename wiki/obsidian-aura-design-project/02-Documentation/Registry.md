# Registry

**Source of truth for Aura’s shadcn registry**: component sources, bundled rules, DESIGN.md, Ladle stories, and build output consumed by the public site and `shadcn add @aura/...`.

## Path / npm name

- **Folder:** `packages/registry`
- **Package:** `@aura-design/registry` (`packages/registry/package.json`)

## What it does

Holds the **default registry tree** under `registry/` (UI primitives, blocks, Cursor rules as `.mdc`, Cursor skills as `SKILL.md` folders, theming templates such as `components.json`, and packaged `DESIGN.md`). Maintainers run **sync scripts** to copy foundation files from `.cursor/rules`, `.cursor/skills`, and `packages/design` into that tree, then **generate** the registry JSON and **build** static files into **`apps/www/public/r`**, which [auradesignsystem.com](https://auradesignsystem.com/) serves for end users.

**Ladle** (`src/*.stories.tsx`) provides a fast dev loop for components without the full Next docs app. **Docs generation** scripts align generated MDX or rules docs with the `apps/www` content pipeline.

## Key commands or entrypoints

- **`pnpm dev`** / **`pnpm build`** — Ladle serve / build to `build/`.
- **`pnpm sync:rules`** — Copies rules into the registry (`scripts/sync-rules.ts`).
- **`pnpm sync:skills`** — Copies whitelisted `.cursor/skills/*` into the registry (`scripts/sync-skills.ts`).
- **`pnpm sync:design-md`** — Syncs DESIGN.md into the registry (`scripts/sync-design-md.ts`).
- **`pnpm registry:generate`** — `sync:rules`, `sync:skills`, `sync:design-md`, then `scripts/build-registry.ts`.
- **`pnpm registry:build`** — `shadcn build -o ../../apps/www/public/r` — production registry artifacts for the docs host.
- **`pnpm docs:generate`** — Broader docs pipeline (includes `generate-docs.ts`, `generate-rules-docs.ts`).
- **`pnpm registry:bootstrap`** — `registry:generate` + `registry:build` + `docs:generate`.
- **`pnpm test`** — Vitest.

## Important paths

- `packages/registry/registry/` — Published registry payload (components, rules, skills, metadata).
- `packages/registry/registry.json` — Registry index.
- `packages/registry/scripts/` — Sync, build, docs generators, `new-rule.ts`.
- `packages/registry/src/` — Ladle stories.

## Related

- [[CLI]] — `init` uses theming template and installs `@aura/*` items from this registry.
- [[MCP]] — Skill install (`@aura/skill-*` / `@aura/skills`) and Cursor MCP docs.
- [[Design md]] — DESIGN.md source before sync into registry.
- [[Site and docs app]] — Serves `public/r/` from here.
- [[Packages and docs app]]
- [[Local development]]
