---
title: Charts
date: 2026-10-07
tags: [dev-log, logic, architecture]
---
## Summary
Chart families (area, bar, line, pie, radar, radial, tooltips) are registry components with a `variant` prop. They reuse `@aura/chart` in `Chart.tsx`. Docs live under `/docs/charts`. `metadata/chart.yml` sets `page: false`, so generate-docs does not emit `/docs/components/chart`. That URL redirects to `/docs/charts`, where the index documents `ChartContainer`, tooltip, and legend. Light `--chart-1` stays `--accent-9`. Dark `--chart-1` is `--accent-11`, the first step at 3:1 or more on dark gray-1.

## Context
- Related: [[Area-charts]] [[Foundations]] [[Audit-Chart]]
- Implementation Path: `packages/registry/registry/default/components/ui/Chart.tsx`, `packages/registry/registry/default/styles/chart.css`, `apps/www/content/docs/charts/index.mdx`, `apps/www/next.config.ts`
