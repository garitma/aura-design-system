---
title: Emil skills
date: 2026-10-10
tags: [dev-log, logic, architecture]
---
## Summary
Aura ships a reconciled subset of Emil Kowalski’s skills plus Vercel’s React best practices, pinned and copied by `aura blueprint` into `.cursor/skills/`. Skills that already did the same job were merged or kept. `write-swift`, `animate-expo`, and `pick-ui-library` are not installed; those three, and the scope of `ask-sonner`, are close calls for Pablo. Re-running blueprint updates the set in place.

## Context
- Related: [[CLI]] · [[MCP and skills]] · [[Internal progress]]
- Implementation Path: `packages/cli/commands/upstream-skills.ts`, `packages/cli/templates/cursor/skills/`, `apps/www/content/docs/emil-skills.mdx`
- Pins: `emilkowalski/skills` @ `e8a175de22ae1e49370fc144c1f3bb9aeedf988d` (MIT), `vercel-labs/agent-skills` @ `063bee94c3f4df8453406c830b0a7df0f2860278` (MIT)
