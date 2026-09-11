---
title: Marker component
date: 2026-09-11
tags: [dev-log, architecture]
---
## Summary
`@aura/marker` ports shadcn Marker for conversation status notes, bordered rows, and labeled separators. Uses Radix `asChild` + `Slot` instead of Base UI `render`, with `gray-11` text and `gray-6` borders on the 13px grid.

## Context
- Related: [[Bubble component]] · [[Internal-Progress]]
- Implementation Path: `packages/registry/registry/default/components/ui/Marker.tsx`
- Parts: `Marker`, `MarkerIcon`, `MarkerContent`
- Install: `pnpm dlx shadcn@latest add @aura/marker`
