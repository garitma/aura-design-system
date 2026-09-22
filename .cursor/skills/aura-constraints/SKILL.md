---
name: aura-constraints
description: >-
  Hard constraints when editing Aura design-system components, tokens, stories,
  or registry packages in this monorepo. Use when changing packages/registry,
  packages/system, packages/styled-system, DESIGN.md, .cursor/rules, or apps/www
  docs that document components. Not for product apps (Famity, Labelo).
---

# Aura constraints (Gardener path)

Read root `AGENTS.md` first. This skill is the operational checklist for **this** repo only.

## Scope gate

| In scope | Out of scope |
| --- | --- |
| `packages/registry/**`, `packages/system/**`, `packages/styled-system/**`, `packages/design-md/**`, `packages/cli/**` | Famity Care, Labelo, or any product app |
| `apps/www` docs / demos that document Aura | Vendoring pstack or marketplace skills |
| `.cursor/rules`, `.cursor/skills`, root `DESIGN.md` | Unrelated dependency bumps |

If the task belongs in a product app, stop and say so — do not implement it here.

## Before editing

1. Locate the source of truth: registry components under `packages/registry/registry/default/components/` (and related hooks/utils/styles).
2. Open the matching Ladle story in `packages/registry/src/<name>.stories.tsx` if it exists.
3. Skim public exports / props / variants actually used in stories and docs — prefer additive changes.
4. Follow `.cursor/rules/*` and `DESIGN.md` (13px spacing, accent/gray steps, fluid typography, icons).

## Public API rules

- Prefer **additive** props, variants, and composition slots.
- Do not rename/remove exported components or break prop contracts without an explicit breaking-change note in the PR.
- Keep `className` / `asChild` / variant patterns consistent with sibling Aura components.
- Do not restyle design-system primitives from call sites with padding/color/typography overrides — fix the component (variants/sizes) instead (`shadcn/no-restyle` policy).

## Tokens & styling

- Colors: `--accent-*` / `--gray-*` (or semantic tokens). No raw palette / one-off hex when tokens exist.
- Spacing: Aura `--spacing` is **13px**. Calculate `n × 13px`. No arbitrary `p-[16px]` unless explicitly required.
- Typography: semantic `.h1`–`.p`; never `text-xl` etc. for primary copy. Editable controls stay ≥ 17px (no `text-sm`/`text-xs` on inputs).
- Icons: `@radix-ui/react-icons` with `className="icon"`; gap on the container, not margin on the icon inside `Button`/`Badge`.

## Stories & docs

- Any prop/variant/behavior change → update the Ladle story in the same change.
- New registry components → story + metadata as required by existing registry scripts (`registry:generate` / `docs:generate` when you are publishing).
- Do not leave stories documenting removed APIs.

## Accessibility

For interactive components, before finishing:

- Keyboard operable (Tab / Enter / Space / Escape as appropriate)
- Visible focus
- Accessible name / label association
- Correct roles or native elements
- Honor `prefers-reduced-motion` for motion

## Hygiene

- No drive-by refactors outside the task.
- No “while I’m here” package upgrades.
- Do not add agent-constraint skills to `packages/registry/scripts/sync-skills.ts` unless intentionally shipping them to consumers.

## Humans + pstack

Full pstack / poteto workflow stays in Cursor desktop (`/setup-pstack`, `/poteto-mode`). This repo only carries Aura-specific paved-path constraints.
