---
title: Internal Progress
date: 2026-10-11
retention: 10
tags: [dev-log, logic]
---
## Summary
Agent surface is rules-as-guardrails / skills-as-execution ([[Aura Agent Surface]]). Blueprint now also installs a reconciled Emil Kowalski set plus Vercel React best practices ([[Emil skills]]). The shipped theme uses the Somos Gente Digital dark ramp with light mode generated from accent `#4015ca` and gray `#7254cb` ([[Sgd-palette]]). Docs and home share one theme store ([[Shared-Theme-Store]]); charts live under `/docs/charts`.

## Active


## Sessions
### 2026-10-11 · Autocomplete popup chrome
- Popup border and shadow paint once. Separator margin is `m-0.5` (6.5px), the Figma list inset. `className` is last on item, separator, label, empty, and status. Trigger and clear share one class string, and addon padding keeps the same size through CSS variables. Disabled items use 50% opacity. Input `sm`, `default`, and `lg` use `h-3`, `h-4`, and `h-5` with `py-0` so the border box matches Button sm, md, and lg, and AutocompleteInput passes that size through. Docs say "An input component". See [[Autocomplete Popup]].

### 2026-10-10 · Ship pick-ui-library
- Pablo added `pick-ui-library` to the reconciled set with an `@aura`-first rule, kept `ask-sonner`, and left `write-swift` and `animate-expo` out. Blueprint now installs thirteen skills. See [[Emil skills]].

### 2026-10-10 · Reconciled Emil and Vercel skills
- Compared Emil Kowalski’s skills and Vercel `react-best-practices` with the team library and Aura rules. Blueprint copies the merged set into `.cursor/skills/` and updates it on re-run. See [[Emil skills]].

### 2026-10-10 · Shared theme colors
- One store in the root layout feeds home, docs, and Theme Settings. Colors persist in localStorage, apply before paint, and follow the storage event. Presets and the image upload live on that store. See [[Shared-Theme-Store]].

### 2026-10-10 · SGD palette reconfirm
- Re-checked Pablo’s `globals.css` against registry/www dark tokens; light generator output still matches disk. Cleared leftover `#964CE1` / `#7c2ec6` samples in presentation fixture and DESIGN.md. See [[Sgd-palette]].

## Context
- Related: [[Charts]] [[Area-charts]] [[Recent-Components-Audit]] [[Segmented-Input]] [[Media-Utilities]] [[Collection-Display]] [[Input-Controls]] [[Autocomplete Popup]] [[Sgd-palette]] [[Sgd-cobrand]] [[Site and docs app]] [[Aura Agent Surface]] [[Shared-Theme-Store]]
- Implementation Path: `packages/registry/styles/globals.css`
- Next: confirm the Charts sidebar and a couple chart pages in the docs site. (since 2026-10-09)
