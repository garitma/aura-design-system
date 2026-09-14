---
title: shadcn lint in Aura
date: 2026-09-14
tags: [dev-log, architecture, lint, registry]
---
## Summary
`@shadcn/lint` is distributed as `@aura/eslint-shadcn-lint` / `@aura/rule-shadcn-lint` (Cursor rule + `eslint.aura-shadcn.mjs`). Agent blueprint § D installs and merges it. Rebuild with `pnpm --filter @aura-design/registry registry:generate && registry:build`.

## Context
- Related: [[MCP]] [[Registry]] [[Internal-Progress]] [[Design md]]
- Implementation Path: `packages/registry/registry/default/lint/eslint.aura-shadcn.mjs`, `apps/www/content/docs/mcp-agent-blueprint.mdx`
- Public artifacts: `apps/www/public/r/eslint-shadcn-lint.json`, `apps/www/public/r/rule-shadcn-lint.json`
