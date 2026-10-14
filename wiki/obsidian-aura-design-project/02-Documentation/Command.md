---
title: Command
date: 2026-10-14
tags: [dev-log, logic, architecture]
---
## Summary
Command search matches the Figma anatomy: the field is input size `lg` inside `px-1.5 py-0.5`, with a magnifying glass, and no border, ring, or outline in rest, focus, or focus-visible. The dialog keeps its `border-gray-a6` frame, and the highlighted item stays `bg-accent-3`, so keyboard focus still has a visible context. `outline-hidden!` leaves a transparent outline that forced-colors mode can show.

## Context
- Related: [[Audit-Search]] · [[Autocomplete Popup]] · [[Internal-Progress]]
- Implementation Path: `packages/registry/registry/default/components/ui/Command.tsx`
- Figma file `Kwdw20NfacNNxqi4wxGMot`, node `686:10471`. The same source is copied to `apps/www/components/ui/Command.tsx`.
