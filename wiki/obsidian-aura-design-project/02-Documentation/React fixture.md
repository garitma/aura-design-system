# React fixture

**Small published CLI** to bump **Next.js** and **React 19** dependency versions in a `package.json` toward **security-pinned** releases (maintainer / fixture hygiene).

## Path / npm name

- **Folder:** `packages/react-fixture`
- **Package:** `@aura-design/react-fixture`
- **Binary:** `react-fixture`

## What it does

The `update-deps` command reads `./package.json`, normalizes semver prefixes, maps current Next/React lines to a **fixed version table** (organized by minor/canary lines), and writes back updated versions when an upgrade path is defined. Intended for quickly aligning example apps or internal fixtures after advisories—always review the diff and release notes.

## Key commands or entrypoints

- **`react-fixture update-deps`** (or via `pnpm exec` / `npx` after publish) — Updates `next`, `react`, and `react-dom` when they match known vulnerable ranges.

**Maintainer:** `pnpm build` in `packages/react-fixture` compiles TypeScript to `dist/`.

## Important paths

- `packages/react-fixture/commands/update-deps.ts` — Version table and logic (source of truth for pinned versions).
- `packages/react-fixture/index.ts` — Commander entry.

## Related

- [[Packages and docs app]]
- [[Local development]]
