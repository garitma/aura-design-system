---
title: Internal Progress
date: 2026-10-14
retention: 10
tags: [dev-log, logic]
---
## Summary
Agent surface is rules-as-guardrails / skills-as-execution ([[Aura Agent Surface]]), including a ban on code comments ([[No code comments]]). Trace and Code Block are the agent-step list and the code, log, and diff surface ([[Trace and Code Block]]). The shipped theme uses the Somos Gente Digital dark ramp with light mode generated from accent `#4015ca` and gray `#7254cb` ([[Sgd-palette]]). Typography is Gabarito, loaded on the docs site with `next/font` as `--font-gabarito` ([[Typography]]).

## Active


## Sessions
### 2026-10-14 · Command search input outline
- `CommandInput` no longer paints a border, ring, or outline, including `:focus` and `:focus-visible`. The dialog border and the highlighted item stay the focus context. See [[Command]].
- The field opts out of the legacy input chrome with `default`, keeps size `lg` (`h-5`) and `pl-5!`, and uses gray-12 text with a gray-11 placeholder.
- Registry source, the www copy, the command registry JSON, and the Command and Search docs stay in parity.

### 2026-10-14 · Trace and Code Block canary sync
- Merged the Collapsible API and story additions from canary while retaining every Trace and Code Block demo registration. `TraceCollapsible` remains compatible with the updated Radix-backed primitive. See [[Trace and Code Block]] and [[Collapsible]].

### 2026-10-14 · Trace and Code Block
- `@aura/trace` lists agent steps with icon, title, description, and status. Rows expand, link, open a dialog, and nest. See [[Trace and Code Block]].
- A running title shimmers. Reduced motion keeps the title readable and skips the chevron turn. Error text uses the danger contrast token.
- `@aura/code-block` covers code, terminal output, logs, and diffs: header, copy, line numbers, wrap, highlighted lines, and a small size.

### 2026-10-14 · No code comments
- Workaround comments about our own code are deleted or solved by refactor. Comments about external constraints stay, with the reason stated. See [[No code comments]] and [[Aura Agent Surface]].
- `.cursor/rules/no-comments.mdc` is always applied, listed in `AGENTS.md`, synced into the registry rules bundle, and copied by `aura blueprint` from `packages/cli/templates/cursor/rules/`.
- `apps/www` ESLint `no-warning-comments` errors on `todo`, `fixme`, `hack`, `xxx`, and `workaround`. `packages/registry/test/server-safe-components.test.ts` encodes the "Button has no createContext" constraint.
- Kept: iOS Safari zoom, Firefox image drag, React 19 ref cleanup, Recharts series binding, TanStack Table #4794, Radix Presence and select arrow, vaul overlay timing, WCAG chart contrast, Turbopack/fumadocs setup, licenses, and required suppressions.

### 2026-10-14 · Typography uses Gabarito
- The sans face is Gabarito, the same family as next-sgd. See [[Typography]].
- `apps/www/app/layout.tsx` loads `Gabarito` from `next/font/google` with `variable: "--font-gabarito"` on `<html>`. Body uses `font-sans`, which reads that variable first.
- `--aura-font-stack` in registry `main.css` starts with `"Gabarito"` and keeps the system fallbacks. Next styles use `var(--font-gabarito, "Gabarito")`.

### 2026-10-11 · Select hover, sizes, and item focus
- Trigger sizes match Input (`h-3`, `h-4`, `h-5`). Hover is gray-3. Placeholder text is gray-11 when `data-placeholder` is set. See [[Select]].
- Labels use `.small`. Items use `.p`, 26px end padding, and a keyboard ring. Separator margin is `my-0.5`. Demos are `w-16` (208px).
- `SelectArrow` still depends on Radix `position="popper"`. Item-aligned content does not paint it. `.p` now receives the fluid font-size clamp.

### 2026-10-11 · Dark chart-1 uses accent-11
- Dark `--chart-1` points at `--accent-11` in both dark blocks of `globals.css`. Light mode stays `--accent-9`. See [[Charts]] and [[Sgd-palette]].
- Against dark gray-1 `#100b21`, accent-9 `#4015ca` is 1.99:1 and accent-10 `#3400ab` is 1.59:1. Accent-11 `#a3acff` is 9.07:1, the first step at or above 3:1.

### 2026-10-11 · Chart docs live under Charts
- `/docs/components/chart` is gone from the components catalog and redirects to `/docs/charts`. `Chart.tsx` stays the shared base. The Charts index documents `ChartContainer`, tooltip, and legend. See [[Charts]].
- Markers use `--chart-marker` (8px) and `--chart-marker-line` (2px). `tokenColor` keeps plain CSS colors and warns in development when it drops a value.
- Plot inset, ticks, and gridlines read chart tokens. Category axes use `preserveStartEnd`. The container is square below `sm`, then 16:9.

### 2026-10-11 · Carousel controls, gap, and multi-card demo
- Below `sm`, previous and next sit in a row under the slides. From `sm` they stay outside at `-left-12` / `-right-12`. Slide gap is 13px (`-ml-1` / `pl-1`). See [[Carousel]].
- Vertical keyboards use ArrowUp and ArrowDown. The effect cleanup removes `reInit` as well as `select`.
- The numbered demo no longer wraps the card in `p-1`. `MultipleCards` uses Aura cards with a title and description at `basis-full sm:basis-1/2 md:basis-1/3`.

### 2026-10-11 · Card type, radius, and action slot
- `CardTitle` is `.small` semibold. `CardDescription` and body copy use `.small`. Radius is `--radius-md` (13px). See [[Card]].
- `CardAction` is the top-right slot of `CardHeader`. Grids step from 1 to 2 to 3 columns. Interactive cards hover to `border-gray-8` with a soft shadow and a focus-visible ring.

Older sessions: [[Progress-Archive/2026-10]]

## Context
- Related: [[Command]] [[Collapsible]] [[Select]] [[Carousel]] [[Card]] [[Calendar]] [[Button Group]] [[Bubble]] [[Audit-Breadcrumb]] [[Audit Banner]] [[Button]] [[Charts]] [[Area-charts]] [[Recent-Components-Audit]] [[Segmented-Input]] [[Media-Utilities]] [[Collection-Display]] [[Input-Controls]] [[Autocomplete Popup]] [[Status-Dot]] [[Avatar Group]] [[Sgd-palette]] [[Sgd-cobrand]] [[Site and docs app]] [[Aura Agent Surface]] [[Shared-Theme-Store]] [[Aura overlay]]
- Implementation Path: `packages/registry/registry/default/components/ui/Chart.tsx`, `packages/registry/registry/default/styles/main.css`
