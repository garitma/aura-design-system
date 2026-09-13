---
title: Internal progress
date: 2026-09-13
tags: [dev-log]
---
## Summary
Replaced the home marquee/slider aesthetic strip with a Radix-style custom palette section: light/dark accent–gray–background controls, 12-step swatches, and an Aura components showcase. Theme mixer popover now shares `useAuraThemeColors` with that section.

## Context
- Related: [[Custom-Colors-Showcase]], [[Sidebar-status-badges]]
- Implementation Path: `apps/www/components/AuraAesthetic.tsx`, `apps/www/hooks/use-aura-theme-colors.ts`
- Next: verify the home showcase on desktop/mobile in the browser.
