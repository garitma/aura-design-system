# Styled system

**Stylus source** for legacy or auxiliary CSS that compiles into the shared **`packages/system`** artifact.

## Path / npm name

- **Folder:** `packages/styled-system`
- **Package:** `@aura-design/styled-system` (`packages/styled-system/package.json`)

## What it does

`main.styl` is compiled to **`packages/system/main.css`**. Downstream apps or tooling that still depend on that file should run the watch/build script when editing Stylus. The package metadata’s **`repository.directory`** points at `packages/system`; that path is the **output** location, not a second package definition.

## Key commands or entrypoints

- **`pnpm dev`** (in `packages/styled-system`) — `pnpm stylus --compress -w ./main.styl -o ../system/main.css` — watch mode writing to `packages/system/main.css`.

## Important paths

- `packages/styled-system/main.styl` — Entry Stylus file compiled by the dev script.
- `packages/styled-system/src/` — Partials (tokens, atoms, layout, vendors, etc.).
- `packages/system/main.css` — Generated output ([[System]]).

## Related

- [[System]]
- [[Packages and docs app]]
- [[Local development]]
