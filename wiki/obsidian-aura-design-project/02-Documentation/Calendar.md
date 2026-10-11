---
title: Calendar
date: 2026-10-11
tags: [dev-log, logic, architecture]
---
## Summary
Calendar days keep the `.small` label from [[Button]]. Weekday labels use `.xs-regular` (12/16, weight 400). Cell radius is `--aura-button-radius` because `@theme inline` does not emit `--radius-sm` as a runtime variable.

Range endpoints are a rounded accent block beside the square `gray-3` middle band. Today no longer paints that band when the day is selected. Disabled days are `gray-11` with a strike and full opacity. Dropdown captions show the short month with a chevron sized to `1.5` spacing units. Focus uses Button's 2px `--aura-outline`.

## Context
- Related: [[Button]] [[Typography]] [[Foundations]]
- Implementation Path: `packages/registry/registry/default/components/ui/Calendar.tsx`
