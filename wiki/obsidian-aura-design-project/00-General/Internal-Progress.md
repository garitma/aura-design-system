---
title: Internal progress
date: 2026-09-13
tags: [dev-log]
---
## Summary
Recreated DiceUI **File Upload** as `@aura/file-upload` with Aura tokens (gray/accent scales, 13px spacing, Radix icons). Reused existing `useAsRef` / `useLazyRef` hooks. Stories cover default, validation, direct upload, circular progress, and fill progress.

## Context
- Related: [[File-Upload]], [[Progress]], [[Registry]]
- Implementation Path: `packages/registry/registry/default/components/ui/FileUpload.tsx`
- Next: verify Ladle + docs generate.
