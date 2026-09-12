---
title: Mention
date: 2026-09-12
tags: [dev-log, logic]
---
## Summary
`@aura/mention` wraps `@diceui/mention` for accessible `@`/`#`/`/` trigger mentions in text inputs, styled with Aura accent tags and gray label text.

## Context
- Related: [[Registry]], [[Site and docs app]]
- Implementation Path: `apps/www/components/ui/Mention.tsx`, `packages/registry/registry/default/components/ui/Mention.tsx`
- Runtime dep for docs/demos: `@diceui/mention` must be in `apps/www/package.json` (not only the registry package).
