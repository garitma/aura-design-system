---
title: Internal progress
date: 2026-09-13
tags: [dev-log]
---
## Summary
Added docs sidebar visual feedback for recently landed components: frontmatter/metadata `status: new` renders an accent-9 dot via Fumadocs `statusBadgesPlugin`. Marked this week’s registry additions (Mask Input, File Upload, Editable, Angle Slider, Avatar Group, Badge Overflow, Presentation, etc.).

## Context
- Related: [[Sidebar-status-badges]], [[Site and docs app]], [[Mask-Input]]
- Implementation Path: `apps/www/utils/source.tsx`, `apps/www/source.config.ts`
- Next: verify sidebar dots on `/docs/components/*` in the browser.
