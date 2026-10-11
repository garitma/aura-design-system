---
title: Badge scale and xs type
date: 2026-10-11
tags: [dev-log, logic, architecture]
---
## Summary
Badge padding is on the 13px scale so a badge is about 31px tall. `.xs` is the 12/16 semibold micro style. `variant="destructive"` aliases `status="danger"`.

## Context
- Related: [[Typography]] [[Internal progress]]
- Implementation Path: `packages/registry/registry/default/components/ui/Badge.tsx`, `packages/registry/styles/main.css`
- `px-1` (13px) replaces `px-2.5` (32.5px). `py-0.5` (6.5px) plus the 16px `.xs` line and a 1px border is 31px. `gap-0.5` stays the icon gap.
- Overflow widths are keyed by index, and the gap / height / overflow-width fallbacks are 13 / 31 / 52.
