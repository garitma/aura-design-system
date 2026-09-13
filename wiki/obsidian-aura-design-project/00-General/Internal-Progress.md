---
title: Internal progress
date: 2026-09-13
tags: [dev-log]
---
## Summary
Recreated DiceUI **Mask Input** as `@aura/mask-input` with Aura tokens (gray/accent/danger, 13px spacing, ≥17px inputs). Reused existing `compose-refs`. Stories cover default phone, built-in patterns, custom pattern, blur validation, and card fields.

## Context
- Related: [[Mask-Input]], [[Input]], [[Registry]]
- Implementation Path: `packages/registry/registry/default/components/ui/MaskInput.tsx`
- Next: verify Ladle + docs generate.
