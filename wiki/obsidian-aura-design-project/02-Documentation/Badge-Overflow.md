---
title: Badge Overflow
date: 2026-03-22
tags: [dev-log, component, registry]
---
## Summary
Ported DiceUI’s **Badge Overflow** into Aura as `@aura/badge-overflow`: measures badge widths, wraps to `lineCount` lines, and renders a `+N` (or custom) overflow indicator.

## Context
- Related: [[Badge]], [[Avatar-Group]], [[Registry]]
- Implementation Path: `packages/registry/registry/default/components/ui/BadgeOverflow.tsx`
- Docs: `/docs/components/badge-overflow`
- Source: https://diceui.com/docs/components/radix/badge-overflow
- Depends on [[compose-refs]] via `@/utils/compose-refs`
