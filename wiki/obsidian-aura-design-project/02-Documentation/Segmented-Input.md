---
title: Segmented Input
date: 2026-09-14
tags: [dev-log, architecture, component]
---
## Summary
Connected multi-field input group ported from Dice UI (`@diceui/segmented-input`) into Aura. Install via `pnpm dlx shadcn@latest add @aura/segmented-input`.

## Context
- Related: [[Internal-Progress]]
- Implementation Path: `packages/registry/registry/default/components/ui/SegmentedInput.tsx`
- Why: reuse Dice UI compound Root/Item API with Aura tokens (`--gray-*`, 13px sizes `h-2.5`/`h-3`/`h-4`) instead of default Tailwind `h-8`/`h-9`/`h-11`.
