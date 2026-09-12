---
title: Angle Slider
date: 2026-03-22
tags: [dev-log, component, registry]
---
## Summary
Ported DiceUI’s **Angle Slider** into Aura as `@aura/angle-slider`, including dependency `@aura/visually-hidden-input`. Reuses existing hooks (`use-as-ref`, `use-isomorphic-layout-effect`, `use-lazy-ref`) and `compose-refs`.

## Context
- Related: [[Slider]], [[Visually-Hidden-Input]], [[Registry]]
- Implementation Path: `packages/registry/registry/default/components/ui/AngleSlider.tsx`
- Docs: `/docs/components/angle-slider`
- Source: https://diceui.com/docs/components/radix/angle-slider
- Registry deps: `@aura/visually-hidden-input`, `@aura/compose-refs`, `@aura/use-as-ref`, `@aura/use-isomorphic-layout-effect`, `@aura/use-lazy-ref`
