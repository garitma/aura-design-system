---
title: No code comments
aliases: [No code comments]
date: 2026-10-14
tags: [dev-log, architecture, aura]
---
## Summary
Source under `apps/` and `packages/` does not carry explanatory comments. Agents copy comments that already exist, so workaround notes spread. Intent belongs in names, types, and structure. The guardrail is `.cursor/rules/no-comments.mdc`, also installed by `aura blueprint` and the `@aura/rules` registry item.

## Context
- Related: [[Aura Agent Surface]]
- Implementation Path: `.cursor/rules/no-comments.mdc`
- Allowed exceptions: `'use client'` / `'use server'`, `/// <reference>`, required `@ts-expect-error` / `eslint-disable`, license headers, generated files, and external constraints this repo cannot change.
