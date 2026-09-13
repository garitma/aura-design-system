---
title: Mask Input
date: 2026-09-13
tags: [dev-log, component, registry]
---
## Summary
Ported DiceUI’s **Mask Input** into Aura as `@aura/mask-input`. Supports built-in patterns (phone, SSN, date, currency, card, etc.), custom patterns, validation modes, and mask placeholders while keeping form-control text ≥17px.

## Context
- Related: [[Input]], [[Editable]], [[Form]], [[Registry]]
- Implementation Path: `packages/registry/registry/default/components/ui/MaskInput.tsx`
- Docs: `/docs/components/mask-input`
- Source: https://diceui.com/docs/components/radix/mask-input
- Registry deps: `@aura/class-names`, `@aura/compose-refs`
