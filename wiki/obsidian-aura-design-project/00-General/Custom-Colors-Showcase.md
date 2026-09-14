---
title: Custom colors showcase
date: 2026-09-13
tags: [dev-log, architecture, taste]
---
## Summary
Home-page `AuraAesthetic` uses the same live preview as [[Theme Color Switcher]]: `useAuraThemeColors` injects `--accent-*` / `--gray-*` on `:root`. Swatches read CSS variables only—no separate Radix theme emulation in the section.

## Context
- Related: [[Taste]], [[Theme-Colors-Crash-Fix]], [[Internal-Progress]]
- Implementation Path: `apps/www/components/AuraAesthetic.tsx`, `apps/www/hooks/use-aura-theme-colors.ts`, `apps/www/components/ThemeColorSwitcher.tsx`
- Layout: `smesh` container, stacked controls on mobile, 3-column component preview from `lg`
