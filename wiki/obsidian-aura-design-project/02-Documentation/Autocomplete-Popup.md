---
title: Autocomplete Popup
date: 2026-10-11
tags: [dev-log, logic]
---
## Summary
Autocomplete popup chrome (`bg-gray-1`, `border-gray-a6`, `rounded-sm`, `shadow-md`) lives on the inner span only, so the border and shadow paint once. Separator margin is `m-0.5` (6.5px), the same inset as the Figma list padding. Disabled items use `opacity-50`. Input `sm`, `default`, and `lg` use `h-3`, `h-4`, and `h-5` with `py-0`, so the border box matches Button sm, md, and lg (39px, 52px, 65px). AutocompleteInput passes that size through.

## Context
- Related: [[Internal-Progress]] · [[Input-Controls]]
- Implementation Path: `packages/registry/registry/default/components/ui/Autocomplete.tsx`
- Figma node `184:664` lists items with `py` 6.5px. The frame does not draw a separator. `m-0.5` matches that step.
