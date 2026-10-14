---
title: Trace and Code Block
date: 2026-10-14
tags: [dev-log, logic, architecture]
---
## Summary
`@aura/trace` is the shared row for an agent step: icon, title, optional description, and status `running`, `error`, `pending`, or `done`. A row expands, links out, or opens a dialog, and rows nest. `@aura/code-block` shows code, terminal output, logs, and diffs, with a header, copy action, line numbers, wrapping, and a small size for output inside a trace.

## Context
- Related: [[Message and MessageScroller]] · [[Marker component]] · [[Internal-Progress]]
- Implementation Path: `packages/registry/registry/default/components/ui/Trace.tsx`, `CodeBlock.tsx`
- Styles: `packages/registry/registry/default/styles/trace.css`, `code-block.css`
- Install: `pnpm dlx shadcn@latest add @aura/trace @aura/code-block`
- Running titles shimmer. `prefers-reduced-motion` drops the shimmer and the chevron transition. Error text uses `--danger-contrast`. Added lines use accent step 3; removed lines use gray step 4 with a `+` or `−` marker that is not part of the copied text.
- The docs site fence lived at `apps/www/components/ui/Codeblock.tsx`. It is now `apps/www/components/ui/MdxCodeBlock.tsx` so the registry copy `CodeBlock.tsx` does not collide on case-insensitive disks.
