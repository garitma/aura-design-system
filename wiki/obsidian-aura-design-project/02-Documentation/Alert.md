---
title: Alert
date: 2026-10-11
tags: [dev-log, logic]
---
## Summary
`Alert` is a horizontal callout. The root keeps `border` once; each variant only adds its border color, and the default variant uses `border-gray-6` (Figma border/subtle). Title stays bold on the `p` scale, and the description uses the `p` text style.

`AlertDescription`, `AlertContent`, and `AlertIcon` merge `className` with `cn()`. `AlertStatus` accepts `default` plus info, success, warning, and danger. The docs demo lists them in that order. See [[Registry]] and [[Typography]].

## Context
- Related: [[Registry]] [[Typography]] [[Foundations]]
- Implementation Path: `packages/registry/registry/default/components/ui/Alert.tsx`
