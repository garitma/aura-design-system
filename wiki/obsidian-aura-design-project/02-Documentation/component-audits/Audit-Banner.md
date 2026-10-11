---
title: Audit Banner
date: 2026-10-11
tags: [dev-log, logic, architecture]
---
## Summary
Banner stays a full-width accent bar by default and gains phone layout, optional announcement, and Alert tones. Static banners no longer use `role="status"`.

## Findings
- The layout is `flex-col items-stretch gap-0.5 p-1`, and from `sm` it is a row with `sm:px-1.5`. A container narrower than 24rem keeps the phone stack: message and dismiss on one row (`flex items-start gap-1`), action below.
- `role` and `aria-live` are opt-in. Tones `info`, `success`, `warning`, and `danger` use the same background, text, and border tokens as [[Alert]].
- Dismiss is `Button` `size="icon"` (`w-3 h-3 p-0`), with hover `bg-accent-4` and focus `ring-accent-8`. `dismissState` shows those states in docs. `asChild` and `messageClassName` let the message hold block content.

## Context
- Related: [[Recent-Components-Audit]] [[Alert]]
- Implementation Path: `packages/registry/registry/default/components/ui/Banner.tsx`
- Docs page: `apps/www/content/docs/components/banner.mdx`
