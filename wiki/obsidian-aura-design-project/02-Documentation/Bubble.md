---
title: Bubble component
date: 2026-09-11
tags: [dev-log, architecture]
---
## Summary
`@aura/bubble` is a conversational surface ported from shadcn Bubble. Aura uses Radix `asChild` + `Slot` instead of Base UI `render`, and maps variants to primary / gray / accent / danger tokens on the 13px grid. Muted content uses `border-gray-a4`. Ghost clears the border on `BubbleContent`, where the border actually lives. Destructive hover mixes 6% `--danger-contrast` into `--danger`, one soft step, because `bg-danger/80` washes out the light surface.

## Context
- Related: [[Internal-Progress]]
- Implementation Path: `packages/registry/registry/default/components/ui/Bubble.tsx`
- Parts: `Bubble`, `BubbleContent`, `BubbleReactions`, `BubbleGroup`
- Reactions: bottom reactions add `mb-2` (26px) and top reactions add `mt-2`, matching the `translate-y-3/4` overhang. The pill caps at `calc(100% - var(--spacing))` so it stays inside a narrow bubble.
