# Foundations

## Canonical narrative spec

The long-form design story (theme, color roles, typography, 13px grid, motion) lives at:

- `packages/design/DESIGN.md`

A distributable copy also appears under the registry default tree:

- `packages/registry/registry/default/design-md/DESIGN.md`

When implementing UI or arguing about tokens, read **DESIGN.md** together with `.cursor/rules/*` (colors, typography, spacing, motion, icons).

## Quick facts

- **Spacing**: Tailwind utilities use **`--spacing: 13px`** — always multiply mentally: `n × 13px`.
- **Type**: Fluid `clamp()` on semantic `h1`–`h6` / `.h1`–`.h6` and `p`; avoid Tailwind `text-xl`–style utilities for primary copy.
- **Icons**: Default **Radix Icons** with `className="icon"` (typographic sizing; no `size` prop).
- **Color**: 12-step `accent` and `gray` scales; semantic tokens like `--primary` → `--accent-9`.

## Related

- [[Glossary]]
- [[Product principles]]
