---
title: Internal progress
date: 2026-09-12
tags: [dev-log]
---
## Summary
Added `@aura/selection-toolbar`, an Aura-styled port of Dice UI Selection Toolbar: text-range anchored floating toolbar, optional container scope, selection metrics via `onSelectionChange`, and reduced-motion-aware enter animation.

## Context
- Related: [[Registry]], [[Selection-Toolbar]], [[Action-Bar]]
- Implementation Path: `packages/registry/registry/default/components/ui/SelectionToolbar.tsx`
- Examples: `packages/registry/src/selection-toolbar.stories.tsx`
- Verification: registry bootstrap, Ladle stories, and browser checks pass (select to open, copy, Escape to dismiss, scoped container, selection metrics).
