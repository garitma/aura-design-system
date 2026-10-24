---
title: Emil skills
date: 2026-10-24
tags: [dev-log, logic, architecture]
---
## Summary
Aura does not ship Emil Kowalski’s skills or Vercel’s React best practices. Install them from upstream when you want an audit. The commands are on the docs page `apps/www/content/docs/audits.mdx`. `aura blueprint` deletes the copies an older CLI wrote into `.cursor/skills/` and `.agents/skills/`.

## Context
- Related: [[CLI]] · [[MCP and skills]]
- Docs: `apps/www/content/docs/audits.mdx`, `apps/www/content/docs/emil-skills.mdx`
- Cleanup: `packages/cli/commands/blueprint.ts` (`retireUpstreamSkills`)
