---
title: Internal progress
date: 2026-09-12
tags: [dev-log]
---
## Summary
Recreated DiceUI **Editable** as `@aura/editable` with Aura tokens (gray/accent scales, 13px spacing, ≥17px inputs). Reused existing hooks, compose-refs, and VisuallyHiddenInput. Stories cover default, trigger, double-click, autosize, todo list, and form.

## Context
- Related: [[Editable]], [[Visually-Hidden-Input]], [[Registry]]
- Implementation Path: `packages/registry/registry/default/components/ui/Editable.tsx`
- Next: verify Ladle + docs generate.
