---
title: Button Group
date: 2026-10-11
tags: [dev-log, logic, architecture]
---
## Summary
`ButtonGroup` `size` is `default` or `sm`. It passes `md` / `icon-md` or `sm` / `icon-sm` to child buttons that omit `size`. `ButtonGroupText` is `h-4` or `h-3`. `icon` and `icon-sm` are the 39px icon button.

Joined corners are squared in unlayered CSS so they beat `.button`'s radius shorthand. Fill buttons share an `--accent-10` edge. Text and the separator use `bg-gray-2`, `bg-gray-6`, and `rounded-sm` (`--aura-button-radius`).

## Context
- Related: [[Button]] [[Foundations]]
- Implementation Path: `packages/registry/registry/default/components/ui/ButtonGroup.tsx`
