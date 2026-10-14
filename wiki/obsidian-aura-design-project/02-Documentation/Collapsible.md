---
title: Collapsible
date: 2026-10-14
tags: [dev-log, logic, architecture]
---
## Summary
`CollapsibleContent` passes the consumer `className` last into `cn`, so a later utility can override `overflow-hidden` and the collapsible animations. The registry file is the only implementation. The docs app re-exports it, and `copyComponentsToWww` leaves that re-export in place.

Docs Preview starts closed. The Open story starts open. Both use a controlled `open` / `onOpenChange` pair, and a Controlled example stays in the stories. The trigger is `Button` `variant="menu"` `size="sm"` with Show All / Hide All. Header type is `.small` semibold `text-gray-12`. Items are `.small` regular `text-gray-11` with a `size-0.5` `bg-accent-9` dot. Content uses `pt-1` and the list uses `space-y-0.5`. The root is `w-full`.

## Context
- Related: [[Registry]] [[Typography]] [[Foundations]]
- Implementation Path: `packages/registry/registry/default/components/ui/Collapsible.tsx`, `apps/www/components/ui/Collapsible.tsx`
