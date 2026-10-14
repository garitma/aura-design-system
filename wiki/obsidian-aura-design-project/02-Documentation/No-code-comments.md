---
title: No code comments
aliases: [No code comments]
date: 2026-10-14
tags: [dev-log, architecture, aura]
---
## Summary
Agents replicate the patterns already in a file, so a comment explaining a temporary workaround legitimizes the hack and spreads it. Workaround comments about our own code are deleted or solved by refactoring the root cause; larger refactors are listed as a plan in the PR. Comments that record an external constraint we cannot change (browser quirk, library bug, platform or spec limit) stay, with the reason. "Do not remove" constraints are encoded as a type, test, or lint rule.

## Context
- Related: [[Aura Agent Surface]]
- Implementation Path: `.cursor/rules/no-comments.mdc`, `packages/cli/templates/cursor/rules/no-comments.mdc`, `packages/registry/test/server-safe-components.test.ts`
- Allowed: external constraints with the reason, functional directives (`'use client'`, `/// <reference>`, JSDoc types in JS, `@deprecated`, required suppressions), license headers, generated code.
