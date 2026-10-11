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
### 2026-10-11 · Button contrast, focus, and calendar type
- Fill hover is `--accent-10` so dark gray-contrast text is no longer on accent-11. Focus uses `--aura-outline` on `:focus-visible`. The scale respects reduced motion, and one `transition` keeps the background fade. See [[Button]].
- `mode` and `variant="default"` still work with a dev warning. `label` plus `children` shows children once. Disabled chrome is only `.button:disabled`. Loading stays non-interactive without the 50% fade.
- Calendar days use the `.small` size. Month navigation is Button size `icon` with ChevronLeft and ChevronRight and no underline.

### 2026-10-11 · Badge scale and xs type
- Badge padding is `px-1` / `py-0.5` / `gap-0.5` on the 13px scale, so the pill is about 31px tall. `.xs` is 12/16 semibold. Outline uses `border-gray-12`, focus uses `ring-accent-a8`, and `destructive` aliases `status="danger"`. Overflow widths are keyed by index. See [[Badge]].

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

Older sessions: [[Progress-Archive/2026-10]]

## Context
- Related: [[Button]] [[Charts]] [[Area-charts]] [[Recent-Components-Audit]] [[Segmented-Input]] [[Media-Utilities]] [[Collection-Display]] [[Input-Controls]] [[Autocomplete Popup]] [[Status-Dot]] [[Avatar Group]] [[Sgd-palette]] [[Sgd-cobrand]] [[Site and docs app]] [[Aura Agent Surface]] [[Shared-Theme-Store]] [[Aura overlay]]
- Implementation Path: `packages/registry/styles/globals.css`
- Next: confirm the Charts sidebar and a couple chart pages in the docs site. (since 2026-10-09)
