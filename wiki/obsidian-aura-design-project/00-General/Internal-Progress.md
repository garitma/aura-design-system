---
title: Internal progress
date: 2026-09-12
tags: [dev-log]
---
## Summary
Upgraded `apps/www` Fumadocs to **16.15.9** (latest MDX-compatible line), kept the customized Aura docs layout via vendored contexts, and added **Copy Markdown** + **Open in Cursor/Claude/ChatGPT** page actions with `/docs/*.md`, `llms.txt`, and `llms-full.txt` routes.

## Context
- Related: [[Fumadocs-upgrade]], [[Site and docs app]], [[API routes]]
- Implementation Path: `apps/www/components/DocsPageActions.tsx`, `apps/www/utils/source.ts`
- Next: optional Fumadocs 17 when `fumadocs-mdx` peers catch up; Turbopack production build once mdx rules are compatible with Next 16.1.
