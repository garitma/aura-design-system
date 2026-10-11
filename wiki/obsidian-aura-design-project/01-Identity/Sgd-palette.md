---
title: SGD palette in Aura
date: 2026-10-10
tags: [dev-log, logic, architecture]
---
## Summary
Dark mode in `packages/registry/styles/globals.css` and `apps/www/app/globals.css` is the Somos Gente Digital ramp from Pablo’s `globals.css` (reconfirmed 2026-10-10). `--accent-9` is `#4015ca` in both schemes. Light mode is the Aura generator pass of that accent with gray seed `#7254cb` on white — verified bit-identical to disk. SGD wrote danger as `#3c140550`. Aura keeps the opaque surface `#3c1405` so it matches the other status fills. SGD step 5 `#30a` is stored as `#3300aa`. Presentation fixture hexes and DESIGN.md primary samples now use the same SGD ramp (no leftover `#964CE1` / `#7c2ec6`).

## Context
- Related: [[Sgd-cobrand]] [[Foundations]]
- Implementation Path: `packages/registry/styles/globals.css`
- Chart tokens `--chart-2` through `--chart-5` alias the status contrast colors. Light `--chart-1` is `--accent-9`. Dark `--chart-1` is `--accent-11` so the series clears 3:1 on gray-1. `--ecru` (`#debc7a`) paints text selection. `.dark` and `prefers-color-scheme: dark` share one scale. `:root:not(.light)` keeps an explicit light class from picking up the OS dark query.
