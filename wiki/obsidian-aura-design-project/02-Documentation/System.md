# System

**Compiled CSS artifact** produced from the Stylus package; not a standalone workspace member in `pnpm-workspace.yaml`.

## Path / npm name

- **Folder:** `packages/system`
- **Package:** none (no `package.json` here—only generated CSS)

## What it does

Holds **`main.css`**, the output of [[Styled system]]’s Stylus build. Consumers reference this file directly if the monorepo still wires legacy styles through it; editing should happen in `packages/styled-system`, then rebuild.

## Key commands or entrypoints

- Build via **`pnpm dev`** or a one-off Stylus compile from `packages/styled-system` (see that note).

## Important paths

- `packages/system/main.css` — Artifact.

## Related

- [[Styled system]]
- [[Packages and docs app]]
- [[Local development]]
