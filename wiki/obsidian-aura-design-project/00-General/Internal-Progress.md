---
title: Internal progress
date: 2026-09-12
tags: [dev-log]
---
## Summary
Fixed `@aura-design/www` deploy: `Mention.tsx` imports `@diceui/mention`, but that package was only listed under `packages/registry`, so Vercel failed with module-not-found. Added `"@diceui/mention": "^1.0.0"` to `apps/www/package.json`; local `pnpm --filter @aura-design/www run build` succeeds.

## Context
- Related: [[Mention]], [[Registry]]
- Implementation Path: `apps/www/package.json`
- Next: merge so canary/www deploy recovers.
