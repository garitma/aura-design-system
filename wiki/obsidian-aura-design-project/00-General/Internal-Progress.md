---
title: Internal progress
date: 2026-09-12
tags: [dev-log]
---
## Summary
Added `@aura/mention`, an Aura-styled wrapper around `@diceui/mention` with trigger-based suggestions, custom filtering, accessible labels, and reduced-motion-aware popover animation.

## Context
- Related: [[Registry]]
- Implementation Path: `packages/registry/registry/default/components/ui/Mention.tsx`
- Examples: `packages/registry/src/mention.stories.tsx`
- Verification: registry generation, static registry build, docs generation, and Ladle build pass; browser checks confirm keyboard selection, custom triggers, custom filtering, and a clean console.
- Next: add focused automated interaction coverage when the registry test suite gains Mention tests.
