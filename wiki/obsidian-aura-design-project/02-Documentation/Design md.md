# Design md

**Agent- and human-readable design specification** for Aura: one narrative `DESIGN.md`, static previews, and a small build step for deployable HTML.

## Path / npm name

- **Folder:** `packages/design` (authoritative on disk)
- **Package:** `@aura/design-md` (`packages/design/package.json`) — note `repository.directory` in that file may still say `packages/design-md`; the implemented package lives under **`packages/design`**.

## What it does

`DESIGN.md` encodes tokens, typography, spacing (13px grid), color roles, motion, and product principles so tools and contributors stay aligned. **Previews** (`preview.html`, `preview-dark.html`) show scales and UI patterns in the browser. The registry and CLI distribute this content as the **`@aura/design-md`** registry item; see `packages/design/README.md` in-repo for the file table and usage blurb.

**`packages/design-md`** at repo root currently holds only a stray **`index.html`** (not a full workspace package). Treat **`packages/design`** as the source of truth for npm **`@aura/design-md`**.

## Key commands or entrypoints

- **`pnpm build`** (in `packages/design`) — `node scripts/prepare-public.cjs` prepares static public output (used for deployment / previews).

## Important paths

- `packages/design/DESIGN.md` — Canonical spec body.
- `packages/design/preview.html`, `preview-dark.html` — Light/dark galleries.
- `packages/design/scripts/prepare-public.cjs` — Build script.
- `packages/design/public/` — Prepared static assets where applicable.

## Related

- [[Registry]] — `sync:design-md` copies this into the registry bundle.
- [[CLI]] — `aura init` installs `@aura/design-md` into consumer apps.
- [[Site and docs app]] — Public `llms-full.txt` and handbook complement this file for LLMs.
- [[Packages and docs app]]
- [[Local development]]
