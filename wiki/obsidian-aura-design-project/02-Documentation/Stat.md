---
title: Stat
date: 2026-09-11
tags: [dev-log, architecture]
---
## Summary
`@aura/stat` ports [Dice UI Stat](https://diceui.com/docs/components/radix/stat): compound card for label, value, indicator, trend, and description with Aura tokens and 13px spacing.

## Context
- Related: [[Internal-Progress]], [[Registry]]
- Implementation Path: `packages/registry/registry/default/components/ui/Stat.tsx`
- Install: `pnpm dlx shadcn@latest add @aura/stat`
- Depends on `@aura/separator`. Indicator `error` maps to danger tokens.
