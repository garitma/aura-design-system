---
title: SGD co-brand header
date: 2026-09-25
tags: [dev-log, logic, architecture]
---
## Summary
Docs and marketing headers use an Aura mark, a vertical divider, then “Made by” on the left of the full Somos Gente Digital logo (faces and wordmark). Aura home and somosgentedigital.com stay as separate links.

## Context
- Related: [[Site and docs app]] [[Foundations]] [[Vision]]
- Implementation Path: `apps/www/components/brand/BrandLockup.tsx`
- Logo: inline trace of `apps/www/public/brand/sgd-logo-on-light.svg` with `currentColor`, so the lockup inherits `gray-12` in light and dark. The faces-only mark stays in `public/brand/` for other uses.
- The wordmark lives inside the logo, so the header no longer swaps “SGD” and “Somos Gente Digital” as HTML text. The docs sidebar passes `compact` only to shorten that same logo so “Made by” stays on one line.
