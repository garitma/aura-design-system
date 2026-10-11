---
title: Select
date: 2026-10-11
tags: [dev-log, logic, architecture]
---
## Summary
`SelectTrigger` gains `size` (`sm`, `default`, `lg`) at the same 39, 52, and 65px heights as Input. Placeholder text uses gray-11 while `data-placeholder` is set, and hover fills gray-3. Group labels use `.small` (medium). Items keep 26px of end padding and a keyboard focus ring.

## Context
- Related: [[Input-Controls]] [[Recent-Components-Audit]]
- Implementation Path: `packages/registry/registry/default/components/ui/Select.tsx`
- Demos use `w-16` (208px). `m-0.6` on the separator is `my-0.5`. `SelectArrow` renders only when `SelectContent` `position` is `"popper"`; `"item-aligned"` is a Radix limit and paints no arrow.
