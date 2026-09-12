---
title: Selection Toolbar
date: 2026-09-12
tags: [dev-log, architecture]
---
## Summary
`@aura/selection-toolbar` ports [Dice UI Selection Toolbar](https://diceui.com/docs/components/radix/selection-toolbar): a portal toolbar anchored to the current text range with Floating UI, Escape to dismiss, and optional container scoping.

## Context
- Related: [[Action-Bar]], [[Registry]]
- Implementation Path: `packages/registry/registry/default/components/ui/SelectionToolbar.tsx`
- Install: `pnpm dlx shadcn@latest add @aura/selection-toolbar`
- Animation: `styles/selection-toolbar.css` (`animate-selection-toolbar-show`, reduced-motion).
