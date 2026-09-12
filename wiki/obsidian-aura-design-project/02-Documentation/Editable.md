---
title: Editable
date: 2026-09-12
tags: [dev-log, component, registry]
---
## Summary
Ported DiceUI’s **Editable** into Aura as `@aura/editable`. Compound parts cover label, preview/input area, trigger, and submit/cancel toolbar with click, double-click, focus, and autosize modes.

## Context
- Related: [[Visually-Hidden-Input]], [[Input]], [[Registry]]
- Implementation Path: `packages/registry/registry/default/components/ui/Editable.tsx`
- Docs: `/docs/components/editable`
- Source: https://diceui.com/docs/components/radix/editable
- Registry deps: `@aura/visually-hidden-input`, `@aura/compose-refs`, `@aura/use-as-ref`, `@aura/use-isomorphic-layout-effect`, `@aura/use-lazy-ref`
