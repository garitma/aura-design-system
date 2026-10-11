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
### 2026-10-11 · Card type, radius, and action slot
- `CardTitle` is `.small` semibold. `CardDescription` and body copy use `.small`. Radius is `--radius-md` (13px). See [[Card]].
- `CardAction` is the top-right slot of `CardHeader`. Grids step from 1 to 2 to 3 columns. Interactive cards hover to `border-gray-8` with a soft shadow and a focus-visible ring.

### 2026-10-11 · Button group size without context
- [[Button Group]] clones `size` onto direct `Button` and `ButtonGroupText` children. `Button` no longer calls `createContext`, which the React server build does not export, so the docs home page can keep importing `buttonVariants`.

### 2026-10-11 · Button group size, corners, and dividers
- `size` on [[Button Group]] passes `md`/`icon-md` or `sm`/`icon-sm` to buttons. Text height is `h-4` or `h-3`. `icon` and `icon-sm` are the 39px icon button, and icon-only buttons need an `aria-label`.
- Docs and toolbars use `flex-wrap gap-2`. Text and separators use `bg-gray-2`, `bg-gray-6`, and `rounded-sm`.
- Joined corners are squared in unlayered CSS so they beat `.button`'s radius. Fill buttons share an accent-10 edge.

### 2026-10-11 · Bubble borders and reactions
- Muted content uses `border-gray-a4`. Ghost `border-none` now targets `BubbleContent`. Destructive hover mixes 6% `--danger-contrast` into `--danger` instead of `bg-danger/80`. See [[Bubble]].
- Reactions reserve `mb-2` or `mt-2` when present. The pill max width is the bubble minus one spacing unit so it stays inside narrow bubbles.

### 2026-10-11 · Breadcrumb type, focus, and collapse
- Current page is `font-semibold` on gray-12, with `aria-current="page"` and no link role. Links underline on hover. Focus is `rounded-sm` with a 2px offset. See [[Audit-Breadcrumb]].
- The trail uses `.small`. Slotted links inherit that size. `maxItems` and containers under 640px collapse to first › ellipsis › current page. Docs show a slash separator, the collapsed trail, and the mobile trail, with the ellipsis in a labeled dropdown.

### 2026-10-11 · Banner layout, tones, and live region
- Phone layout stacks the action under a message-and-dismiss row. Static banners no longer announce; `role` and `aria-live` are opt-in. Tones match [[Alert]]. Dismiss reuses Button `size="icon"`. See [[Audit Banner]].

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

Older sessions: [[Progress-Archive/2026-10]]

## Context
- Related: [[Card]] [[Button Group]] [[Bubble]] [[Audit-Breadcrumb]] [[Audit Banner]] [[Button]] [[Charts]] [[Area-charts]] [[Recent-Components-Audit]] [[Segmented-Input]] [[Media-Utilities]] [[Collection-Display]] [[Input-Controls]] [[Autocomplete Popup]] [[Status-Dot]] [[Avatar Group]] [[Sgd-palette]] [[Sgd-cobrand]] [[Site and docs app]] [[Aura Agent Surface]] [[Shared-Theme-Store]] [[Aura overlay]]
- Implementation Path: `packages/registry/styles/globals.css`
- Next: confirm the Charts sidebar and a couple chart pages in the docs site. (since 2026-10-09)
