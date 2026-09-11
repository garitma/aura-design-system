# Site and docs app

The public docs experience is the **`@aura-design/www`** Next.js app under `apps/www`. Stack: **Next.js 16**, **React 19**, **Fumadocs** (MDX + UI), **Tailwind v4**. For the **index** of all package notes and this app, see [[Packages and docs app]].

## Notable routes

| Path | Role |
|------|------|
| `app/(home)` | Landing and home group. |
| `app/docs/[[...slug]]/page.tsx` | Doc pages; content from Fumadocs loader (`utils/source.ts` → `@/.source`). |
| `app/docs/layout.tsx` | Docs layout shell. |
| `app/llms-full.txt/route.ts` | Full plain-text export for LLMs (canonical URL on production: site root `llms-full.txt`). |
| `app/docs/handbook/llms.txt/route.ts` | Handbook-scoped LLM text route. |
| `app/og/docs/[...slug]/route.tsx` | Open Graph images for docs. |
| `app/api/search/route.ts` | Fumadocs Orama-backed search (`GET`, query-driven). |
| `app/api/quick-links/route.ts` | Curated suggestions for the command palette (cached). |

## Content pipeline

- **Authoring** — MDX and `meta.json` under `apps/www/content/docs/` (sections: handbook, MCP, components, forms, rules, etc.). Header nav in `utils/layout.shared.tsx` lists MCP after Handbook and before Rules (`/docs/mcp`).
- **Fumadocs MDX** — `apps/www/source.config.ts`; `postinstall` runs `fumadocs-mdx` to generate `@/.source`.
- **Runtime** — `utils/source.ts` builds the Fumadocs `loader` with base URL `/docs`.
- **Search UI** — `apps/www/components/SearchDialog.tsx` calls `/api/search?query=…` and `/api/quick-links`.
- **Registry on the same origin** — `apps/www/public/r/` is produced by `packages/registry` (`registry:build`); the live site serves the shadcn registry consumers use.

## API reference in-repo

See [[API routes]] and the Bruno collection under `wiki/bruno-aura-design-project`.

## Related

- [[Packages and docs app]] — hub for every `packages/*` note.
- [[CLI]] · [[Registry]] · [[Design md]] — closest neighbors for registry URL, `init`, and DESIGN.md distribution.
- [[Local development]]
- [[Onboarding]]
