---
title: Collapsible
date: 2026-10-14
tags: [dev-log, logic, architecture]
---
## Summary
`CollapsibleContent` passes the consumer `className` last into `cn`, so a later utility can override `overflow-hidden` and the collapsible animations. The registry file is the source. `registry:generate` copies it to `apps/www/components/ui`, because the Docker build prunes `packages/registry` source.

One shared `TechnologiesCollapsible` drives the Preview (closed), Open, and Controlled demos through `open` / `onOpenChange`. The trigger is `Button` `variant="menu"` `size="sm"` with Show All / Hide All. Header type is `.small` semibold `text-gray-12`. Items are `.small` regular `text-gray-11` with a `size-0.5` `bg-accent-9` dot. `pt-1` sits on the list, inside the animated area, so `CollapsibleContent` takes no spacing class.

## Context
- Related: [[Registry]] [[Typography]] [[Foundations]]
- Implementation Path: `packages/registry/registry/default/components/ui/Collapsible.tsx`, `packages/registry/src/collapsible.stories.tsx`
