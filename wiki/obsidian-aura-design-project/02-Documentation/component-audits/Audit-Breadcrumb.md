---
title: Audit Breadcrumb
date: 2026-10-11
tags: [dev-log, logic, architecture]
---
## Summary
The trail uses `.small` (14px, weight 500) so the size inherits into an `asChild` link. The current page is a span with `aria-current="page"` and `font-semibold`. `maxItems` and a container under 640px collapse the trail to first › ellipsis › current page.

## Findings
- `BreadcrumbList` carries `small`. A base-layer rule forces `font-size` and `line-height` to `inherit` on `[data-slot="breadcrumb-link"]` and `[data-slot="breadcrumb-page"]`, so a slotted child keeps the trail size. `font-semibold` on the page still wins for weight.
- Links use `hover:text-gray-12 hover:underline underline-offset-2` and a `rounded-sm` focus ring with `outline-offset-2` (2px).
- `maxItems` drops the middle crumbs. Without it, a trail longer than two crumbs collapses below a 640px container and a button labeled “Show more breadcrumbs” expands it. The wide-container rule uses the same `:not([data-expanded])` specificity as the hide rule, so middle crumbs come back above 640px. Docs put that ellipsis in a `DropdownMenu` trigger.

## Context
- Related: [[Recent-Components-Audit]] [[Shadcn-gaps]]
- Implementation Path: `packages/registry/registry/default/components/ui/Breadcrumb.tsx`
- Docs page: `apps/www/content/docs/components/breadcrumb.mdx`
