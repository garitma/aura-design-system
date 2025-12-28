---
trigger: always_on
---
# Aura Design System - Spacing Rules

## Core Principles
* **Base Module**: 13px
* **Global Variable**: `--spacing: 13px`
* **Scope**: This logic applies to **all** dimensional and layout attributes: Regex Pattern Use the following pattern to identify targets: `/(^|[\s"'])((?:[^"'\s]*:)?)(m|p|mt|mb|mr|ml|mx|my|pt|pb|pr|pl|px|py|gap|space-x|space-y|h|min-h|max-h|w|min-w|max-w|size)-((?:\d+\.)?\d+|auto)(?=$|[\s"'])/g`

## Spacing & Sizing Scale
| Class | Multiplier | Value |
| :--- | :--- | :--- | 
| `*-0.5` | 0.5x | 6.5px | 
| `*-1` | 1x | 13px | 
| `*-1.5` | 1.5x | 19.5px | 
| `*-2` | 2x | 26px | 
| `*-3` | 3x | 39px | 
| `*-4` | 4x | 52px |

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

### Transformation Steps
1. **Identify the Value:** Extract the numeric `value` following the prefix (e.g., in `mt-4`, the value is `4`).
2. **Skip "auto":** If the value is `auto`, do not modify it.
3. **Calculate Pixel Equivalent:** $px = value \times 4$.
4. **Map to Custom Token:** Use the `mapToCustomSpacing(px)` logic to find the closest allowed design token.
5. **Rewrite:** Replace the original class with `{variants}{prefix}-{closestSpacing}`.