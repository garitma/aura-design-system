---
title: Card
date: 2026-10-11
tags: [dev-log, logic]
---
## Summary
`CardTitle` uses `.small` and semibold so it no longer inherits the global `h3` size. `CardDescription` and `CardContent` use `.small`. Radius is `rounded-(--radius-md)` (`--radius-md`, 13px).

`CardAction` is the right-hand slot of `CardHeader` (top right). `interactive` (or `onClick`) hovers to `border-gray-8` with a soft `gray-a3` shadow and a `gray-8` focus-visible ring. Grids are one column, then two from `sm`, then three from `md`.

## Context
- Related: [[Typography]] [[Foundations]] [[Registry]]
- Implementation Path: `packages/registry/registry/default/components/ui/Card.tsx`
