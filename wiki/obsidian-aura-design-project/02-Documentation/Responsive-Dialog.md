---
title: Responsive Dialog
date: 2026-09-11
tags: [dev-log, architecture]
---
## Summary
`@aura/responsive-dialog` ports [Dice UI Responsive Dialog](https://diceui.com/docs/components/radix/responsive-dialog): Dialog above breakpoint, Drawer (vaul) below, one compound API with `data-variant`.

## Context
- Related: [[Internal-Progress]], [[Registry]]
- Implementation Path: `packages/registry/registry/default/components/ui/ResponsiveDialog.tsx`
- Install: `pnpm dlx shadcn@latest add @aura/responsive-dialog`
- Reuses Aura `Dialog`, `Drawer`, and hooks (`use-mobile` now accepts optional `breakpoint`).
