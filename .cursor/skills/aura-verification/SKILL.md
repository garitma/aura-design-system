---
name: aura-verification
description: >-
  How to verify Aura monorepo changes (stories, typecheck, lint, registry
  exports) without inventing Famity or other product-app E2E. Use after editing
  components, tokens, stories, registry scripts, or apps/www UI/docs.
---

# Aura verification

Verify **inside this monorepo**. Do not invent Famity Care / Labelo E2E, mobile app flows, or product auth tests.

## Choose the smallest credible check

| Change type | Minimum verification |
| --- | --- |
| Component API / behavior | Matching Ladle story compiles; run focused registry tests if present |
| Tokens / CSS foundation | Visual check via Ladle or `packages/design-md` previews; no bypass of tokens |
| Registry JSON / docs generation | Run the relevant generate/build script; confirm outputs under `apps/www` / `public/r` |
| `apps/www` UI / docs copy | `pnpm lint` from `apps/www`; page loads locally if you touched routes |
| Agent docs / skills / rules only | Path review + link sanity; no app runtime required |

## Commands (run from the touched package when possible)

```bash
# Registry — stories + unit tests
cd packages/registry
pnpm test          # vitest
pnpm dev           # Ladle serve — open changed story

# Registry publish pipeline (only when changing shipped registry/docs)
pnpm registry:generate
pnpm registry:build
pnpm docs:generate

# Docs site lint (UI / eslint / @shadcn/lint)
cd apps/www
pnpm lint
```

Root `pnpm` / turbo: prefer package-scoped scripts over full monorepo builds unless the change crosses packages.

## Story checklist

For each changed interactive component:

1. Story exists at `packages/registry/src/<component>.stories.tsx`.
2. Story covers the public variants/props you touched (not only Default).
3. Keyboard path works in Ladle (focus, activate, dismiss).
4. No console errors from the story render.

## Exports & registry

- Source of truth for installable UI: `packages/registry/registry/default/`.
- Built registry artifacts consumed by the site: `apps/www/public/r/` (via `registry:build`).
- If you change component files that ship via registry, regenerate before claiming “done” for a publish-oriented task.
- Consumer-facing skills synced by `packages/registry/scripts/sync-skills.ts` are only `port-component-to-aura` and `generate-brand-images`. Local agent skills (`aura-constraints`, `aura-verification`) are **not** part of that sync.

## Typecheck / lint

- Prefer the package’s TypeScript / Vitest setup under `packages/registry`.
- For www UI: run `pnpm lint` in `apps/www` and fix `@shadcn/lint` / Aura rule findings (tokens, spacing, no-restyle, no-icon-margin).
- Do not “fix” lint by disabling rules without a one-line reason.

## Explicit non-goals

- No Famity Care E2E, Playwright product suites, or staging product URLs as proof for Aura PRs.
- No requirement to boot the full docs site for pure registry story fixes (Ladle is enough).
- No inventing CI jobs in the verification skill — use what the package already exposes.

## Done when

- [ ] Touched public API matches stories (and metadata/docs if publishing)
- [ ] Relevant `pnpm test` / `pnpm lint` / generate scripts for the change type passed
- [ ] A11y basics checked for interactive surfaces
- [ ] Diff stays within the task; no product-app files
