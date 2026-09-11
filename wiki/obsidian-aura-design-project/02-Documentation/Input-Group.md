---
title: Input Group component
date: 2026-09-11
tags: [dev-log, architecture]
---
## Summary
`@aura/input-group` wraps inputs/textareas with addons, buttons, and helper text. Addon `align` supports inline/block start/end; focus chrome lives on the group via `data-slot=input-group-control`.

## Context
- Related: [[Internal-Progress]] · [[Pagination component]]
- Implementation Path: `packages/registry/registry/default/components/ui/InputGroup.tsx`
- Install: `pnpm dlx shadcn@latest add @aura/input-group`
