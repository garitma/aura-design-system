---
title: Internal progress
date: 2026-09-13
tags: [dev-log]
---
## Summary
Unblocked `@aura-design/www` Turbopack by upgrading Next to 16.3.5 (`condition.query` support). Added `baseline-browser-mapping` and `sonner`. Stabilized `useAuraThemeColors` snapshots to stop max-update-depth loops.

## Context
- Related: [[Theme-Colors-Crash-Fix]], [[Custom-Colors-Showcase]]
- Implementation Path: `apps/www/package.json`, `apps/www/hooks/use-aura-theme-colors.ts`
- Next: verify color mixer + custom palette section on http://localhost:4000
