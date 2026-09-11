---
title: Bubble component
date: 2026-09-11
tags: [dev-log, architecture]
---
## Summary
`@aura/bubble` is a conversational surface ported from shadcn Bubble. Aura uses Radix `asChild` + `Slot` instead of Base UI `render`, and maps variants to primary / gray / accent / danger tokens on the 13px grid.

## Context
- Related: [[Internal-Progress]]
- Implementation Path: `packages/registry/registry/default/components/ui/Bubble.tsx`
- Parts: `Bubble`, `BubbleContent`, `BubbleReactions`, `BubbleGroup`
