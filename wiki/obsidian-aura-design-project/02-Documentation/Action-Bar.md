---
title: Action Bar
date: 2026-09-11
tags: [dev-log, architecture]
---
## Summary
`@aura/action-bar` ports [Dice UI Action Bar](https://diceui.com/docs/components/radix/action-bar): floating selection toolbar with roving focus, Escape to dismiss, and portal positioning. Below the `sm` breakpoint (640px), `styles/action-bar.css` insets the horizontal bar by one `--spacing` unit (13px) and keeps it inside the viewport. Selection text does not shrink, action labels are visually hidden, and the close control stays at the end.

## Context
- Related: [[Internal-Progress]], [[Registry]]
- Implementation Path: `packages/registry/registry/default/components/ui/ActionBar.tsx`
- Install: `pnpm dlx shadcn@latest add @aura/action-bar`
- Animation and narrow layout: `styles/action-bar.css` (`animate-action-bar-show`, reduced-motion, `@media (width < 40rem)`).
- Examples use [[Checkbox]] (`checked`, including `"indeterminate"`) instead of a native input.
