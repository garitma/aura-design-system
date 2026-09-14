---
title: Theme colors crash fix
date: 2026-09-14
tags: [dev-log, bugfix, architecture]
---
## Summary
Client crashes came from corrupt `aura-theme-colors` storage and from `<input type="color">` receiving non-`#rrggbb` values (3-digit hex). Storage is validated; generation is wrapped in `safeGenerateRadixColors`; pickers use `toColorInputValue`.

## Context
- Related: [[Custom-Colors-Showcase]], [[Internal-Progress]]
- Implementation Path: `apps/www/hooks/use-aura-theme-colors.ts`
- UI: `ThemeColorSwitcher` and `AuraAesthetic` share the same setColor → inject CSS vars flow.
