---
title: Fumadocs upgrade and page actions
date: 2026-09-12
tags: [dev-log, architecture]
---
## Summary
`apps/www` is on **Fumadocs 16.15.9** (core/ui) + **fumadocs-mdx 15.4.0** — the latest line compatible with MDX (Fumadocs 17 needs a future MDX release). Aura keeps its **forked docs layout**; missing v15 context APIs (`sidebar`, `layout` nav, `I18nLabel`) are vendored under `components/layout/contexts/`. Docs pages expose **Copy Markdown** and **Open** (Cursor / Claude / ChatGPT / GitHub) via `DocsPageActions`.

## Context
- Related: [[Site and docs app]], [[API routes]]
- Implementation Path: `apps/www/components/DocsPageActions.tsx`, `apps/www/utils/source.ts`, `apps/www/app/llms.mdx/docs/`
- Build note: production uses `next build --webpack` because Next 16.1 Turbopack rejects fumadocs-mdx turbopack `query` rules.
