# Site and docs app

The public docs experience is the **`@aura-design/www`** Next.js app under `apps/www`.

## Notable routes

| Path | Role |
|------|------|
| `app/(home)` | Landing and home group. |
| `app/docs` | Documentation layout and MDX-driven pages. |
| `app/api/search/route.ts` | Fumadocs Orama-backed search (`GET`, query-driven). |
| `app/api/quick-links/route.ts` | Curated suggestions for the command palette (cached). |

## Content pipeline

- **Fumadocs MDX** — `apps/www/source.config.ts`; see Fumadocs docs for MDX and frontmatter.
- **Search UI** — `apps/www/components/SearchDialog.tsx` calls `/api/search?query=…` and `/api/quick-links`.

## API reference in-repo

See [[API routes]] and the Bruno collection under `wiki/bruno-aura-design-project`.

## Related

- [[Local development]]
- [[Onboarding]]
