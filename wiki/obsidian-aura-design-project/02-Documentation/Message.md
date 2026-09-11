---
title: Message and MessageScroller
date: 2026-09-11
tags: [dev-log, architecture]
---
## Summary
`@aura/message` is the conversation row layout (avatar, header, footer, align). `@aura/message-scroller` wraps `@shadcn/react/message-scroller` with Aura tokens and `@aura/button` for jump controls.

## Context
- Related: [[Bubble component]] · [[Marker component]] · [[Internal-Progress]]
- Implementation Path: `packages/registry/registry/default/components/ui/Message.tsx`, `MessageScroller.tsx`
- Install: `pnpm dlx shadcn@latest add @aura/message @aura/message-scroller`
- Note: MessageScroller requires npm dep `@shadcn/react`
