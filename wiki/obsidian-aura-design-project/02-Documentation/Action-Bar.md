---
title: Action Bar
date: 2026-09-11
tags: [dev-log, architecture]
---
## Summary
`@aura/action-bar` ports [Dice UI Action Bar](https://diceui.com/docs/components/radix/action-bar): floating selection toolbar with roving focus, Escape to dismiss, and portal positioning.

## Context
- Related: [[Internal-Progress]], [[Registry]]
- Implementation Path: `packages/registry/registry/default/components/ui/ActionBar.tsx`
- Install: `pnpm dlx shadcn@latest add @aura/action-bar`
- Animation: `styles/action-bar.css` (`animate-action-bar-show`, reduced-motion).
