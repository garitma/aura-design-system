---
title: Typography
date: 2026-09-12
tags: [dev-log, architecture]
---
## Summary
Aura fluid type uses `clamp(--min, --val, --max)` with a **17px** root and **Gabarito** as the sans face. The docs app loads it with `next/font/google` as `--font-gabarito`. Registry CSS names `"Gabarito"` first, then the system fallbacks. Editable form controls must stay **≥17px** so iOS Safari does not zoom on focus.

## Context
- Related: [[Internal progress]], [[Agent blueprint]]
- Implementation Path: `apps/www/app/layout.tsx`, `packages/registry/styles/main.css`, `packages/styled-system/src/tokens/_typography.styl`
