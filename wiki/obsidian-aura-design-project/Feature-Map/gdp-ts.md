---
feature: gdp-ts proofs
status: shipped
area: authz
routes: [/docs/gdp-ts]
components: [packages/cli/commands/gdp.ts, packages/cli/templates/gdp/]
pr: https://github.com/somosgented/aura-design-system/pull/144
updated: 2026-10-24
---
The blueprint installs `@gdp-ts/core`, its ESLint preset, the `rauchg/gdp-ts` skill, and starter proofs, so sensitive functions take proofs that callers cannot cast. CI checks it through typecheck and lint.
