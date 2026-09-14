---
title: Internal progress
date: 2026-09-14
tags: [dev-log]
---
## Summary
Ported Dice UI Segmented Input into Aura as `@aura/segmented-input` with Ladle stories, metadata, registry JSON, and docs. Sizes remapped to the 13px spacing scale; no `text-xs` on editable segments (iOS zoom).

## Context
- Related: [[Segmented-Input]]
- Implementation Path: `packages/registry/registry/default/components/ui/SegmentedInput.tsx`
- Next: preview in Ladle (`pnpm --filter @aura-design/registry dev`) and docs page
