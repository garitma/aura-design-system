---
title: Internal progress
date: 2026-09-12
tags: [dev-log]
---
## Summary
Typography rule now **MUST** keep `input` / `textarea` / `select` at **≥17px** (iOS focus-zoom). Enforced globally via unlayered CSS in `globals.css` + `styles/main.css`, documented in agent blueprint / `DESIGN.md`, and undersized `text-sm`/`text-xs` removed from Textarea, InputGroup, and Mention controls.

## Context
- Related: [[Typography]], [[Agent blueprint]], [[Forms]]
- Implementation Path: `.cursor/rules/fundations-typography.mdc`, `apps/www/app/globals.css`, `packages/registry/styles/main.css`
- Next: merge and verify docs registry JSON if `registry:build` needs a local `shadcn` binary.
