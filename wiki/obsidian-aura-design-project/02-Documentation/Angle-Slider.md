---
title: Angle Slider
date: 2026-03-22
tags: [dev-log, component, registry]
---
## Summary
Ported DiceUI’s **Angle Slider** into Aura as `@aura/angle-slider`, including dependency `@aura/visually-hidden-input`. Reuses existing hooks (`use-as-ref`, `use-isomorphic-layout-effect`, `use-lazy-ref`) and `compose-refs`.

The box is sized from `--angle-slider-size` and `--angle-slider-padding` (`calc(var(--spacing) * 1.5)`, 19.5px). The rail stroke is only the `stroke-gray-6` class on `data-slot="angle-slider-track-rail"`. The thumb ring uses `ring-accent-a6`. `max` defaults to 360.

## Context
- Related: [[Slider]], [[Visually-Hidden-Input]], [[Registry]]
- Implementation Path: `packages/registry/registry/default/components/ui/AngleSlider.tsx`
- Docs: `/docs/components/angle-slider`
- Source: https://diceui.com/docs/components/radix/angle-slider
- Registry deps: `@aura/visually-hidden-input`, `@aura/compose-refs`, `@aura/use-as-ref`, `@aura/use-isomorphic-layout-effect`, `@aura/use-lazy-ref`
