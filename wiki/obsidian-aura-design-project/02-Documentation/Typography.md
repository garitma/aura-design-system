---
title: Typography
date: 2026-09-12
tags: [dev-log, architecture]
---
## Summary
Aura fluid type uses `clamp(--min, --val, --max)` with a **17px** root. Editable form controls must stay **≥17px** so iOS Safari does not zoom on focus.

## Context
- Related: [[Internal progress]], [[Agent blueprint]]
- Implementation Path: `.cursor/rules/fundations-typography.mdc`, `styles/main.css`, `app/globals.css`
