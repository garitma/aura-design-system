---
title: Internal progress
date: 2026-09-11
tags: [dev-log]
---
## Summary
Ported shadcn `Message` and `MessageScroller` as `@aura/message` and `@aura/message-scroller`. Scroller behavior comes from `@shadcn/react`; Aura styles the frame and jump button.

## Context
- Related: [[Message and MessageScroller]] · [[Bubble component]] · [[Marker component]]
- Implementation Path: `packages/registry/registry/default/components/ui/Message.tsx`, `MessageScroller.tsx`
- Next: Ladle check `message--default` and `message-scroller--default`
