---
title: Audit Chart
date: 2026-10-06
tags: [dev-log, logic, architecture]
---
## Summary
The container, tooltip, and legend use gray surfaces and `text-xs` for chart chrome. Markers are `--chart-marker` (8px) and `--chart-marker-line` (2px), not spacing steps `size-0.5` or `h-1`. `Chart.tsx` stays the shared base. Its docs live in the Charts section, and `/docs/components/chart` redirects to `/docs/charts`.

## Findings
- Tooltip chrome stays `border-gray-6 bg-gray-1 px-1 py-0.5 text-xs`. `px-1` is the tooltip padding (13px), not the marker. Dot, line, and legend swatches read `--chart-marker` / `--chart-marker-line` from `chart.css`.
- `tokenColor` keeps `var(--token)` and plain CSS colors. Other values are dropped, with a development warning, so the injected style sheet cannot take a raw string.
- Plot inset, tick margin, tick type, and grid stroke read `--chart-inset`, `--chart-tick-size`, `--chart-tick`, and `--chart-grid`.

## Context
- Related: [[Recent-Components-Audit]] [[Area-charts]] [[Charts]]
- Implementation Path: `packages/registry/registry/default/components/ui/Chart.tsx`, `packages/registry/registry/default/styles/chart.css`
- Docs page: `apps/www/content/docs/charts/index.mdx`
