---
title: SGD co-brand header
date: 2026-09-25
tags: [dev-log, logic, architecture]
---
## Summary
Docs and marketing headers use an Aura mark, a vertical divider, and a “Made by” block with the Somos Gente Digital mark. The lockup follows the Radix + WorkOS pattern and links Aura home separately from somosgentedigital.com.

## Context
- Related: [[Site and docs app]] [[Foundations]] [[Vision]]
- Implementation Path: `apps/www/components/brand/BrandLockup.tsx`
- Marks: `apps/www/public/brand/sgd-mark.svg` (`currentColor`) plus on-light and on-dark fills. The supplied PNG was dark-on-dark, so the header inlines the traced mark and inherits `gray-12`.
- Mobile shows “SGD”; the full name returns when the nav row has room. The docs sidebar stays on the short name so the 268px column does not overflow.
