---
title: Status Dot
date: 2026-10-11
tags: [dev-log, logic, architecture]
---
## Summary
StatusDot is the Geist 10px deployment dot, tokenized as `--aura-status-dot-*` in both globals stylesheets. Avatar overlays use it instead of raw Tailwind palette classes, and Avatar gained a `size` prop plus an `h6` fallback.

## Context
- Related: [[Avatar-Group]] [[Audit-Status]] [[Sgd-palette]]
- Implementation Path: `packages/registry/registry/default/components/ui/StatusDot.tsx`
- Tokens: `packages/registry/styles/globals.css`, `apps/www/app/globals.css`
- Docs: `apps/www/content/docs/components/status-dot.mdx`
