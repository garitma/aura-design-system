# Vision

**Aura** is Garitma’s design system: a **registry-first**, **shadcn-style** workflow (copy source into consuming apps, own the code, update via CLI). This repo holds the **documentation site**, **registry**, **CLI**, **styled-system** tokens, and **component/design** packages.

## Why this shape

- **Reusable + shareable**: one source of truth for components and docs; consumers install from the registry instead of re‑inventing patterns.
- **User control**: apps own forked source and can diverge where product needs require it.

## Repo map (high level)

| Area | Path | Role |
|------|------|------|
| Docs / marketing surface | `apps/www` | Next.js 16 + Fumadocs MDX for documentation and search. |
| Design tokens & theme | `packages/design`, `packages/styled-system` | CSS / Tailwind v4 foundations. |
| Registry payloads | `packages/registry` | Published registry entries (e.g. components, `design-md`). |
| CLI | `packages/cli` | Init / add flows wrapping shadcn with Aura defaults. |
| Fixtures | `packages/react-fixture` | Dev / test fixtures. |

## Related

- [[Glossary]] — names and acronyms.
- [[Foundations]] — visual and editorial baseline.
- [[Site and docs app]] — how the www app is structured.
