# Site and docs app

The public docs experience is the **`@aura-design/www`** Next.js app under `apps/www`. Stack: **Next.js 16**, **React 19**, **Fumadocs** (MDX + UI), **Tailwind v4**. For the **index** of all package notes and this app, see [[Packages and docs app]].

## Notable routes

| Path | Role |
|------|------|
| `app/(home)` | Landing and home group. |
| `app/docs/[[...slug]]/page.tsx` | Doc pages; content from Fumadocs loader (`utils/source.ts` → `@/.source`). Includes Aura **Copy Markdown** / **Open** (Cursor, Claude, ChatGPT) page actions. |
| `app/docs/layout.tsx` | Docs layout shell (customized fork under `components/layout/`). |
| `app/llms.txt/route.ts` | LLM index of all docs pages. |
| `app/llms-full.txt/route.ts` | Full plain-text export for LLMs (canonical URL on production: site root `llms-full.txt`). |
| `app/llms.mdx/docs/[[...slug]]/route.ts` | Per-page Markdown for agents; public URLs rewrite `/docs/*.md` → this route. |
| `app/docs/handbook/llms.txt/route.ts` | Handbook-scoped LLM text route (redirects to `llms-full.txt`). |
| `app/og/docs/[...slug]/route.tsx` | Open Graph images for docs. |
| `app/api/search/route.ts` | Fumadocs Orama-backed search (`GET`, query-driven). |
| `app/api/quick-links/route.ts` | Curated suggestions for the command palette (cached). |

## Content pipeline

- **Authoring** — MDX and `meta.json` under `apps/www/content/docs/` (Get Started includes MCP + Agent blueprint; also handbook, components, forms, rules, etc.).
- **Vercel** — Three independent projects: `aura-design-system-www` (`apps/www`), `aura-design-system-design-md` (`packages/design-md`), `aura-design-system-stories` / Ladle (`packages/registry`). Each `vercel.json` uses `git.deploymentEnabled` with `**`: false and `canary`: true — `*` alone does not match branches with `/` (e.g. `feature/mcp`).
- **Fumadocs** — **16.15.9** (`fumadocs-core` / `fumadocs-ui`) + **fumadocs-mdx 15.4.0**. See [[Fumadocs-upgrade]].
- **Fumadocs MDX** — `apps/www/source.config.ts`; `postinstall` runs `postInstall` to generate `@/.source` (`server.ts`).
- **Runtime** — `utils/source.ts` builds the Fumadocs `loader` with base URL `/docs` and `docsLlms` for Markdown exports.
- **Search UI** — `apps/www/components/SearchDialog.tsx` calls `/api/search?query=…` and `/api/quick-links`.
- **Registry on the same origin** — `apps/www/public/r/` is produced by `packages/registry` (`registry:build`); the live site serves the shadcn registry consumers use.
- **Custom layout** — Forked under `components/layout/`; v15 sidebar/nav/`I18nLabel` contexts vendored in `components/layout/contexts/` after Fumadocs UI 16 removed those exports.

## API reference in-repo

See [[API routes]] and the Bruno collection under `wiki/bruno-aura-design-project`.

## Related

- [[Packages and docs app]] — hub for every `packages/*` note.
- [[CLI]] · [[Registry]] · [[Design md]] — closest neighbors for registry URL, `init`, and DESIGN.md distribution.
- [[Local development]]
- [[Onboarding]]
