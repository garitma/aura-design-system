---
title: Custom colors showcase
date: 2026-09-13
tags: [dev-log, architecture, taste]
---
## Summary
Replaced the home-page marquee (`AuraAesthetic`) with a Radix Colors–style custom palette: light/dark inputs, 12-step accent/gray swatches, and a live Aura component showcase. Shared theme state lives in `useAuraThemeColors`.

## Context
- Related: [[Taste]], [[Site and docs app]]
- Implementation Path: `apps/www/components/AuraAesthetic.tsx`, `apps/www/hooks/use-aura-theme-colors.ts`, `apps/www/components/ThemeColorSwitcher.tsx`
- Inspired by: https://www.radix-ui.com/colors/custom
