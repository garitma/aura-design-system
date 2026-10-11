---
title: Internal Progress
date: 2026-10-11
retention: 10
tags: [dev-log, logic]
---
## Summary
Agent surface is rules-as-guardrails / skills-as-execution ([[Aura Agent Surface]]). Blueprint now also installs a reconciled Emil Kowalski set plus Vercel React best practices ([[Emil skills]]). The shipped theme uses the Somos Gente Digital dark ramp with light mode generated from accent `#4015ca` and gray `#7254cb` ([[Sgd-palette]]). Modal scrims share `.aura-overlay` ([[Aura overlay]]); status dots use `--aura-status-dot-*` and [[Status-Dot]], including the avatar overlay; docs and home share one theme store ([[Shared-Theme-Store]]).

## Active


## Sessions
### 2026-10-11 · Avatar group cutout and direction
- Overflow counts use the `.small` label class. Stacking is `direction`; native `dir` passes through. `reverse` and `shape="square"` are in the docs. See [[Avatar Group]].

### 2026-10-11 · Status dot tokens
- Added `--aura-status-dot-*` in both globals stylesheets, including both dark blocks. [[Status-Dot]] is a 10px dot with optional label and avatar ring. Avatar fallback uses `h6`, Avatar has `sm` / `default` / `lg`, and the grouped avatar story now points at [[Avatar-Group]].

### 2026-10-11 · Autocomplete popup chrome
- Popup border and shadow paint once. Separator margin is `m-0.5` (6.5px), the Figma list inset. `className` is last on item, separator, label, empty, and status. Trigger and clear share one class string, and addon padding keeps the same size through CSS variables. Disabled items use 50% opacity. Input `sm`, `default`, and `lg` use `h-3`, `h-4`, and `h-5` with `py-0` so the border box matches Button sm, md, and lg, and AutocompleteInput passes that size through. Docs say "An input component". See [[Autocomplete Popup]].

### 2026-10-11 · Angle slider tokens
- Inset and box size now come from `--angle-slider-padding` and `--angle-slider-size`. Rail stroke is one class, the thumb ring uses `ring-accent-a6`, and `max` defaults to 360. See [[Angle-Slider]].

### 2026-10-11 · Remove Attachment and fix AspectRatio
- Removed the Attachment registry component, docs, demos, stories, and `public/r/attachment.json`. Spinner and Button stay. `/docs/components/attachment` redirects to the components index. AspectRatio now imports React, keeps a single demo, and uses `w-full max-w-xs`. See [[Recent-Components-Audit]].

### 2026-10-11 · Remove AppBar
- Removed the AppBar registry component, its docs page, demos, stories, and metadata. Side sheet, carousel, and app navigation do not depend on it. `/docs/components/app-bar` redirects to the components index. See [[Recent-Components-Audit]].

### 2026-10-11 · Shared modal scrim
- `.aura-overlay` is the scrim for AlertDialog, Dialog, Sheet (mobile Sidebar), Drawer, Command, and ComboboxBackdrop. Tint is `--aura-overlay: rgb(16 11 33 / 0.08)` in light and dark, plus a 4px blur and a 150ms fade. See [[Aura overlay]].
- AlertDialog action and cancel expose `data-slot`. Header and description drop empty `cn("")`. Content caps at `max-w-lg` and stays `w-[90vw]` on small screens. The title element is unchanged.

### 2026-10-11 · Alert alignment and default status
- Removed `space-y-0.5` from the horizontal `Alert` root so the icon lines up with the title. Variants keep a single border color; default uses `border-gray-6`. Description and title use the `p` scale, with the title bold. `AlertStatus` now includes `default`, and the docs demo orders default, info, success, warning, danger. See [[Alert]].

### 2026-10-11 · Action bar viewport and checkbox states
- The horizontal action bar insets by 13px below 640px and no longer overflows the viewport. Item labels hide on that breakpoint; the close control stays pinned. See [[Action Bar]].
- Checkbox gained a minus icon for `checked="indeterminate"` and a 50% disabled style. The action bar example uses that Checkbox. See [[Checkbox]].

### 2026-10-10 · Ship pick-ui-library
- Pablo added `pick-ui-library` to the reconciled set with an `@aura`-first rule, kept `ask-sonner`, and left `write-swift` and `animate-expo` out. Blueprint now installs thirteen skills. See [[Emil skills]].

Older sessions: [[Progress-Archive/2026-10]]

## Context
- Related: [[Charts]] [[Area-charts]] [[Recent-Components-Audit]] [[Segmented-Input]] [[Media-Utilities]] [[Collection-Display]] [[Input-Controls]] [[Autocomplete Popup]] [[Status-Dot]] [[Avatar Group]] [[Sgd-palette]] [[Sgd-cobrand]] [[Site and docs app]] [[Aura Agent Surface]] [[Shared-Theme-Store]] [[Aura overlay]]
- Implementation Path: `packages/registry/styles/globals.css`
- Next: confirm the Charts sidebar and a couple chart pages in the docs site. (since 2026-10-09)
