---
name: verify-aura-ui
description: >-
  After UI edits, run pnpm lint, isolate @shadcn/lint restyle/spacing/raw-color
  findings on touched files, and fix them against Aura tokens and DESIGN.md.
  Also covers first-time @shadcn/lint install when the ESLint fragment is missing.
---

# Verify Aura UI

Guardrails live in `.cursor/rules/shadcn-lint.mdc` and foundation rules. This skill is the verify/fix loop.

## After every UI change

1. Run `pnpm lint` (project script is `eslint`).
2. Filter for `@shadcn/lint` on files you touched:
   * `shadcn/no-restyle`
   * `shadcn/no-arbitrary-values`
   * `shadcn/no-raw-colors`
   * `aura/no-icon-margin`
3. Fix findings before finishing the task.
   * Restyle → use component variants/sizes, or layout/width only on the call site.
   * Arbitrary spacing → map to the 13px scale (`1` = 13px, `1.5` ≈ 19.5px, `2` = 26px).
   * Raw colors → `accent-*` / `gray-*` / semantic tokens from the theme.
   * Icon margin → drop horizontal margin; use container `gap-0.5` or rely on Button/Badge gap.
4. Re-run `pnpm lint` on the same scope. Treat new restyle/spacing **errors** as blockers. Pre-existing debt outside your files stays out of scope unless the human asks.

## Form control check

* Editable `input` / `textarea` / `select` must stay ≥ 17px. Do not add `text-sm` / `text-xs` on those controls.
* Prefer the global floor in `styles/main.css` / globals over per-call overrides.

## First-time install (only if missing)

Skip when `eslint.aura-shadcn.mjs` already exists and is merged into `eslint.config.mjs`.

1. Node ≥ 20.19, ESLint ≥ 9.30.
2. `pnpm add -D @shadcn/lint`
3. `pnpm dlx shadcn@latest add @aura/eslint-shadcn-lint`
4. Merge the exported config into `eslint.config.mjs` (see fragment header).
5. `settings.shadcn.ui` → `@/components/ui` (or the app alias).
6. Keep `no-restyle` / `no-arbitrary-values` **off** under `components/ui/**`.
7. Start severities at `warn`; promote to `error` as debt clears.
8. Point `settings.shadcn.note` at `DESIGN.md` and `.cursor/rules` when possible.

Upstream: [shadcn-ui/lint](https://github.com/shadcn-ui/lint).

## Done when

* [ ] `pnpm lint` has been run after the UI edit.
* [ ] No new `@shadcn/lint` restyle/spacing errors on touched files.
* [ ] Icon and 17px form floors still hold on the changed UI.
