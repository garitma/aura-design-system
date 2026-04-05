# Glossary

| Term | Meaning |
|------|---------|
| **Aura** | The design system product and this monorepo. |
| **Registry (shadcn mode)** | Components and snippets addressed as `@aura/<name>`; installed as source via CLI. |
| **Fumadocs** | Docs framework used in `apps/www` (MDX content, search integration). |
| **13px grid** | Tailwind `--spacing` is **13px** per unit in Aura; e.g. `p-4` → 52px, not 16px. |
| **12-step scales** | Parallel `accent` and `gray` steps 1–12 (+ alpha variants) for surfaces, borders, and text. |
| **Fluid type** | Primary typography uses `clamp(var(--min), var(--val), var(--max))` on semantic headings/body. |
| **Turbo** | Monorepo task runner (`turbo.json`); root `pnpm dev` runs package `dev` tasks. |

## Package names (workspace)

- `@aura-design/www` — `apps/www`
- Registry / CLI / design packages — see `packages/*/package.json` `name` field when wiring imports or docs.

## Related

- [[Vision]]
- [[Foundations]]
