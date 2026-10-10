---
title: Emil skills
date: 2026-10-10
tags: [dev-log, logic, architecture]
---
## Summary
Aura ships thirteen reconciled skills: Emil Kowalski’s set plus Vercel’s React best practices, pinned and copied by `aura blueprint` into `.cursor/skills/`. Skills that already did the same job were merged or kept. Pablo added `pick-ui-library` with an `@aura`-first rule and kept `ask-sonner` scoped to existing `sonner` imports. `write-swift` and `animate-expo` stay out. Re-running blueprint updates the set in place.

## Context
- Related: [[CLI]] · [[MCP and skills]] · [[Internal progress]]
- Implementation Path: `packages/cli/commands/upstream-skills.ts`, `packages/cli/templates/cursor/skills/`, `apps/www/content/docs/emil-skills.mdx`
- Pins: `emilkowalski/skills` @ `e8a175de22ae1e49370fc144c1f3bb9aeedf988d` (MIT), `vercel-labs/agent-skills` @ `063bee94c3f4df8453406c830b0a7df0f2860278` (MIT)
