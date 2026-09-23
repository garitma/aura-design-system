---
title: Internal progress
date: 2026-09-23
tags: [dev-log, documentation]
---
## Summary
Added generated Preview sections for Badge, Input, Label, and Visually Hidden Input. Created Table and Textarea docs with Preview, installation, and manual source sections so all six component routes are available for UX review.

## Context
- Related: [[Bootstrap]]
- Implementation Path: `packages/registry/src/*.stories.tsx`, `packages/registry/metadata/`, `apps/www/content/docs/components/`
- Verification: Production build passed; all six local routes returned 200 and rendered usable previews.
- Next: Review and merge PR #82.
