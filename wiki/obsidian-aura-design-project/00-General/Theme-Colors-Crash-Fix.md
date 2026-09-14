---
title: Theme colors crash fix
date: 2026-09-14
tags: [dev-log, bugfix, architecture]
---
## Summary
Corrupt or partial `aura-theme-colors` in `localStorage` crashed the www app during render via `generateRadixColors` / colorjs.io, showing Next’s client-side Application error.

## Context
- Related: [[Custom-Colors-Showcase]], [[Internal-Progress]]
- Implementation Path: `apps/www/hooks/use-aura-theme-colors.ts`
- Fix: validate every hex field before accepting storage, clear bad entries, and wrap generation in `safeGenerateRadixColors`.
