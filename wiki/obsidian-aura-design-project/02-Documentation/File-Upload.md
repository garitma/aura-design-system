---
title: File Upload
date: 2026-09-13
tags: [dev-log, component, registry]
---
## Summary
Ported DiceUI’s **File Upload** into Aura as `@aura/file-upload`. Compound parts cover dropzone, trigger, list, item preview/metadata/progress/delete, and clear, with validation and upload progress hooks.

## Context
- Related: [[Progress]], [[Button]], [[Empty]], [[Registry]]
- Implementation Path: `packages/registry/registry/default/components/ui/FileUpload.tsx`
- Docs: `/docs/components/file-upload`
- Source: https://diceui.com/docs/components/radix/file-upload
- Registry deps: `@aura/class-names`, `@aura/use-as-ref`, `@aura/use-lazy-ref`
