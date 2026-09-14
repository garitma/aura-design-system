---
title: Internal progress
date: 2026-09-14
tags: [dev-log]
---
## Summary
Distributed `@shadcn/lint` via registry (`@aura/eslint-shadcn-lint`) and documented install in Agent blueprint § D. Source policy lives in `packages/registry/registry/default/lint/eslint.aura-shadcn.mjs`; `apps/www` imports it.

## Context
- Related: [[shadcn-lint]] [[MCP]] [[Registry]]
- Implementation Path: `apps/www/content/docs/mcp-agent-blueprint.mdx`
- Next: promote lint rules from `warn` → `error` after baseline cleanup
