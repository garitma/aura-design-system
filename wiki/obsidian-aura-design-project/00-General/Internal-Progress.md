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
### 2026-10-11 · Select hover, sizes, and item focus
- Trigger sizes match Input (`h-3`, `h-4`, `h-5`). Hover is gray-3. Placeholder text is gray-11 when `data-placeholder` is set. See [[Select]].
- Labels use `.small`. Items use `.p`, 26px end padding, and a keyboard ring. Separator margin is `my-0.5`. Demos are `w-16` (208px).
- `SelectArrow` still depends on Radix `position="popper"`. Item-aligned content does not paint it. `.p` now receives the fluid font-size clamp.

### 2026-10-11 · Carousel controls, gap, and multi-card demo
- Below `sm`, previous and next sit in a row under the slides. From `sm` they stay outside at `-left-12` / `-right-12`. Slide gap is 13px (`-ml-1` / `pl-1`). See [[Carousel]].
- Vertical keyboards use ArrowUp and ArrowDown. The effect cleanup removes `reInit` as well as `select`.
- The numbered demo no longer wraps the card in `p-1`. `MultipleCards` uses Aura cards with a title and description at `basis-full sm:basis-1/2 md:basis-1/3`.

### 2026-10-11 · Card type, radius, and action slot
- `CardTitle` is `.small` semibold. `CardDescription` and body copy use `.small`. Radius is `--radius-md` (13px). See [[Card]].
- `CardAction` is the top-right slot of `CardHeader`. Grids step from 1 to 2 to 3 columns. Interactive cards hover to `border-gray-8` with a soft shadow and a focus-visible ring.

### 2026-10-11 · Calendar range, type, and disabled contrast
- Days stay `.small`. Weekdays use `.xs-regular`. Cell radius is `--aura-button-radius`. See [[Calendar]].
- Range endpoints are a rounded accent block beside the square gray-3 middle band. Today does not add a strip when it is selected.
- Disabled days are gray-11, struck through, and fully opaque. Dropdown captions show the short month and a 19.5px chevron. Focus matches Button's 2px outline. Nav buttons do not underline.

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

Older sessions: [[Progress-Archive/2026-10]]

## Context
- Related: [[Select]] [[Carousel]] [[Card]] [[Calendar]] [[Button Group]] [[Bubble]] [[Audit-Breadcrumb]] [[Audit Banner]] [[Button]] [[Charts]] [[Area-charts]] [[Recent-Components-Audit]] [[Segmented-Input]] [[Media-Utilities]] [[Collection-Display]] [[Input-Controls]] [[Autocomplete Popup]] [[Status-Dot]] [[Avatar Group]] [[Sgd-palette]] [[Sgd-cobrand]] [[Site and docs app]] [[Aura Agent Surface]] [[Shared-Theme-Store]] [[Aura overlay]]
- Implementation Path: `packages/registry/styles/globals.css`
- Next: confirm the Charts sidebar and a couple chart pages in the docs site. (since 2026-10-09)
