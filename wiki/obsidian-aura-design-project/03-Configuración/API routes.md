# API routes

HTTP handlers for the docs app live under **`apps/www/app/api/`**. There is **no auth** on these public read endpoints in the current code.

## Inventory (verified)

| Method | Path | Source | Behavior |
|--------|------|--------|----------|
| `GET` | `/api/quick-links` | `apps/www/app/api/quick-links/route.ts` | Returns JSON array (max 10) of `{ value, label, url, description? }` from Fumadocs `source` pages (single-segment slugs or `components/*`). **`revalidate = 3600`**. On error, responds **500** with `[]`. |
| `GET` | `/api/search` | `apps/www/app/api/search/route.ts` | Exported **`GET`** from `fumadocs-core/search/server` `createFromSource(source, { language: 'english' })`. Client uses **`?query=`** (see `apps/www/components/SearchDialog.tsx`). |
| `GET` | `/llms.txt` | `apps/www/app/llms.txt/route.ts` | Docs index for LLMs (`docsLlms.index()`). |
| `GET` | `/llms-full.txt` | `apps/www/app/llms-full.txt/route.ts` | Full docs Markdown joined (`docsLlms.full()`). |
| `GET` | `/docs/:path*.md` | rewrite → `app/llms.mdx/docs/[[...slug]]/route.ts` | Per-page Markdown (`docsLlms.page()`); used by Copy Markdown / Open in AI actions. |

## Bruno parity

Requests live in **`wiki/bruno-aura-design-project/api/`** (`quick-links/List.bru`, `search/Query.bru`). Base URL: Bruno environment variable **`APP_URL`** (`environments/Local.yml` — aligned with www dev port **4000**).

## Changelog

- *2026-09-12* — Added LLM Markdown routes (`llms.txt`, `llms-full.txt`, `/docs/*.md`) for page actions.
- *2026-04-05* — Initial inventory and Bruno requests added to match implementation.

## Related

- [[Site and docs app]]
- [[Local development]]
