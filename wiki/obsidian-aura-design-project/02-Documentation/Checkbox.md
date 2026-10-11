---
title: Checkbox
date: 2026-10-11
tags: [dev-log, architecture]
---
## Summary
`@aura/checkbox` is the Radix checkbox used by examples that need a checked, unchecked, or partial selection. `checked="indeterminate"` shows a minus icon for a partial select-all. Disabled controls use 50% opacity and `cursor-not-allowed`.

## Context
- Related: [[Action Bar]], [[Internal-Progress]]
- Implementation Path: `packages/registry/registry/default/components/ui/Checkbox.tsx`
- Docs: `apps/www/content/docs/components/checkbox.mdx`
