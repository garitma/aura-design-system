---
trigger: always_on
---
# Aura Design System - Spacing Rules

## Core Principles
* **Base Module**: 13px
* **Global Variable**: `--spacing: 13px`
* **Scope**: This logic applies to **all** dimensional and layout attributes:
    * **Layout**: `p-*` (padding), `m-*` (margin), `gap-*`
    * **Sizing**: `h-*` (height), `w-*` (width), `size-*` (height/width combined)
    * **Rounding**: `rounded-*` (border-radius)

## Spacing & Sizing Scale
| Class | Multiplier | Value | Use Case Examples |
| :--- | :--- | :--- | :--- |
| `*-0.5` | 0.5x | 6.5px | Tiny gaps, `rounded-sm`, tight padding |
| `*-1` | 1x | 13px | **Default**: `p-1`, `h-1`, standard buttons |
| `*-1.5` | 1.5x | 19.5px | `rounded-lg`, medium spacing |
| `*-2` | 2x | 26px | Section padding, `size-2` icons |
| `*-3` | 3x | 39px | Hero gaps, large containers |
| `*-4` | 4x | 52px | Section headers, `h-4` banners |

## Border Radius
* **rounded-sm**: 6.5px (0.5x)
* **rounded-md**: 13px (1x)
* **rounded-lg**: 19.5px (1.5x)
* **rounded-xl**: 26px (2x)

> **Rule**: Child radius ≤ Parent radius.

## Strict Usage Guidelines
1. **Geometric Consistency**: You **MUST** use the scale for `h-*`, `w-*`, and `size-*`. For example, a square component must be defined using increments of 13px (e.g., `size-2` for a 26px x 26px element).
2. **No Arbitrary Values**: Never use square bracket notation for dimensions (e.g., **AVOID** `h-[15px]` or `w-[100px]`). Map all dimensions to the nearest 0.5x or 1x increment of 13px.
3. **Default State**: Default to `1` (13px) for standard component heights and internal padding.