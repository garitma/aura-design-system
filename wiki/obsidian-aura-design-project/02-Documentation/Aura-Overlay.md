---
title: Aura overlay
date: 2026-10-11
tags: [dev-log, logic, architecture]
---
## Summary
Modal scrims share `.aura-overlay` in `packages/registry/registry/default/styles/overlay.css`. The tint is `--aura-overlay: rgb(16 11 33 / 0.08)`, dark gray-1 (`#100B21`) at 8%, the same value in light and dark. It is not `var(--gray-1)`, because gray-1 is near-white in light mode. The scrim also uses a 4px backdrop blur and a 150ms opacity fade, with a reduced-motion fallback.

## Context
- Related: [[Foundations docs]] [[Site and docs app]] [[Internal progress]]
- Implementation Path: `packages/registry/styles/globals.css`, `packages/registry/registry/default/styles/overlay.css`

AlertDialog, Dialog, Sheet (the mobile Sidebar sheet included), Drawer, Command, and ComboboxBackdrop use the class and keep `z-50`. `@theme animatons` still registered animation tokens in Tailwind v4; `sheet.css` and `alert-dialog.css` now say `@theme animations`.
