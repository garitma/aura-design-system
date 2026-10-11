---
title: Carousel
date: 2026-10-11
tags: [dev-log, logic, architecture]
---
## Summary
Horizontal controls stay outside the track from `sm` (`-left-12` / `-right-12`). Below that they sit in a centered row under the slides so the 156px offset is not clipped. Slide gap is one spacing unit (`-ml-1` / `pl-1`, and `-mt-1` / `pt-1` when vertical).

Vertical orientation listens for ArrowUp and ArrowDown. The `reInit` subscription is removed with `select` when the effect cleans up. The numbered demo drops the extra `p-1` wrapper. `MultipleCards` shows Aura cards at `basis-full sm:basis-1/2 md:basis-1/3`.

## Context
- Related: [[Collection-Display]] [[Foundations]]
- Implementation Path: `packages/registry/registry/default/components/ui/Carousel.tsx`
