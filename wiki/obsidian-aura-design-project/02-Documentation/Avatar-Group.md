---
title: Avatar Group
date: 2026-03-22
tags: [dev-log, component, registry]
---
## Summary
`@aura/avatar-group` stacks avatars with a cutout mask, `max` truncation, and `renderOverflow`. Stacking uses `direction` (`ltr` / `rtl`); the native HTML `dir` attribute passes through on the root. Overflow counts use the `.small` label class. `shape="square"` (or a child `rounded-none` / `rounded-md`) uses a straight cutout so square avatars keep a gap.

## Context
- Related: [[Avatar]], [[Typography]], [[Registry]], [[Packages and docs app]]
- Implementation Path: `packages/registry/registry/default/components/ui/AvatarGroup.tsx`
- Docs: `/docs/components/avatar-group`
- Source pattern: https://diceui.com/docs/components/radix/avatar-group
