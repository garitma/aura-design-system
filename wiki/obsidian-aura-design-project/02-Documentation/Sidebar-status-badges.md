---
title: Docs sidebar status badges
date: 2026-09-13
tags: [dev-log, docs, fumadocs]
---
## Summary
Docs sidebar shows an accent-9 dot for components with frontmatter `status: new` via Fumadocs `statusBadgesPlugin`. Set `status` in the component MDX and in `packages/registry/metadata/*.yml` so `generate-docs` keeps it.

## Context
- Related: [[Site and docs app]], [[Fumadocs-upgrade]], [[Registry]]
- Implementation Path: `apps/www/utils/source.tsx`, `apps/www/source.config.ts`, `packages/registry/scripts/generate-docs.ts`
- Values: `new` (dot), `beta` / `deprecated` / `experimental` (text chip)
