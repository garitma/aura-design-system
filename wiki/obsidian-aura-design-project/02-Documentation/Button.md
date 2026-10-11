---
title: Button
date: 2026-10-11
tags: [dev-log, logic, architecture]
---
## Summary
Fill hover uses `--accent-10` (`--aura-button-hover`) so inverse text stays readable on the dark ramp. Focus draws `--aura-outline` on `:focus-visible`, and the hover scale is `none` under `prefers-reduced-motion`. Background and transform share one `transition`.

`mode` and `variant="default"` still work and warn in development. Pass `variant="fill"`. `label` and `children` together show `children` only. Disabled opacity and cursor live in `.button:disabled`. Loading stays `disabled` with `data-loading` so the spinner does not fade to 50%.

## Context
- Related: [[Foundations]] [[Typography]] [[Sgd-palette]]
- Implementation Path: `packages/registry/registry/default/components/ui/Button.tsx`
