---
title: Audit Search
date: 2026-10-06
tags: [dev-log, logic, architecture]
---
## Summary
Pass. The field is a labeled command input with a magnifying glass from the command control. The docs demo opens the panel immediately so the results are visible.

## Findings
- Pass. `Search.tsx` sets `aria-label`, placeholder, Escape to collapse, and a frame of `border-gray-6 bg-gray-1`. Items in the demo are foundation names.
- Note. The magnifying glass and the input chrome live on `CommandInput`. The field uses `pl-5!` (65px) and clears border, outline, and ring, including focus. See [[Command]]. Empty state in Command uses `not-empty:py-6` (78px). Those classes are outside this page's own file. The Search demo sets `defaultExpanded`.

## Context
- Related: [[Recent-Components-Audit]]
- Implementation Path: `packages/registry/registry/default/components/ui/Search.tsx`
- Docs page: `apps/www/content/docs/components/search.mdx`
