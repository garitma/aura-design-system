---
trigger: always_on
---

# Aura Design System - Spacing Rules

## Core Principles
- **Base Module**: 13px
- **Tailwind Config**: `--spacing: 13px` (applies to `p-*`, `m-*`, `gap-*`, `size-*`, etc.)

## Spacing Scale
| Class | Multiplier | Value | Use Case |
|---|---|---|---|
| `*-0.5` | 0.5x | 6.5px | Compact |
| `*-1` | 1x | 13px | Default |
| `*-1.5` | 1.5x | 19.5px | Medium |
| `*-2` | 2x | 26px | Generous |
| `*-3` | 3x | 39px | Large |
| `*-4` | 4x | 52px | Extra Large |

## Border Radius
- `rounded-sm`: 6.5px (0.5x)
- `rounded-md`: 13px (1x)
- `rounded-lg`: 19.5px (1.5x)
- `rounded-xl`: 26px (2x)

**Rule**: Child radius ≤ Parent radius.

## Usage
- **MUST** use multiples of 13px (0.5, 1, 1.5, 2, etc.).
- **AVOID** arbitrary values (e.g., `p-[10px]`).
- **DEFAULT** to `p-1` (13px) for standard components.
