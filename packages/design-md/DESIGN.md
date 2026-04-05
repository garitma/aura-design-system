# Design System: Aura

Aura is a **registry-first** design system distributed in **shadcn mode**: you copy source into your app, own the code, and pull updates via CLI. It is built on **React**, **Radix UI primitives**, **Tailwind CSS v4**, and a **13px spacing grid**. 

**Product principles (non-visual):** prioritize accessibility, consistency, reusable components, shareable tooling, user control, forgiveness, and a perceived sense of stability—even when the underlying product is complex.

---

## 1. Visual Theme & Atmosphere

Aura reads as a **modern, accessible product UI**: clear hierarchy, **fluid typography** that scales with the viewport, and a **12-step accent + gray palette** (not a flat gray + single brand hex). Surfaces lean on **gray steps 1–2** for app backgrounds and **accent step 9** (`--primary` / `--accent-9`) for brand actions. Borders and focus use **steps 6–8** so interactive affordances stay legible without heavy chrome.

**Key characteristics**

- **Ownership**: Components are installed as source; customize freely. Init with `pnpm dlx @aura-design/cli@latest init` (wraps shadcn with Aura fixtures).
- **Namespace**: Registry items are addressed as `@aura/<name>` (configure `registries["@aura"]` in `components.json`).
- **Density**: Tailwind spacing utilities use **`--spacing: 13px`**—a `p-4` is **52px**, not 16px.
- **Typography as fluid system**: Headings and body use `clamp(var(--min), var(--val), var(--max))` via semantic elements/classes—avoid Tailwind `text-*` for primary copy.
- **Icons as type**: Default to **Radix Icons** with the `icon` class; size follows typography, not explicit pixel props.
- **Motion**: Prefer **transform + opacity**; honor **`prefers-reduced-motion`**; use CSS keyframes and theme animation tokens.

---

## 2. Color Palette & Roles

### 12-step scales

Aura defines parallel **`accent`** and **`gray`** scales from **1–12**, plus **alpha variants** (`--accent-a1` … `--accent-a12`, `--gray-a1` … `--gray-a12`) and semantic aliases (`--accent-contrast`, `--accent-surface`, `--accent-indicator`, `--accent-track`, and gray equivalents).

| Step | Role |
|------|------|
| **1–2** | App / canvas backgrounds, cards, sidebars |
| **3** | Default UI fill (normal state) |
| **4** | Hover fill |
| **5** | Active / selected fill |
| **6** | Subtle borders, separators |
| **7** | Interactive control borders |
| **8** | Strong borders and focus rings |
| **9** | Solid brand / primary surfaces |
| **10** | Hover on solid (step 9) |
| **11** | Secondary / muted text |
| **12** | Primary text / headings |

**Implementation rules**

- Use **`--accent-{n}`** and **`--gray-{n}`** (or Tailwind-mapped **`color-accent-*` / `color-gray-*`** where configured).
- Map **`--primary`** to **`--accent-9`**; pair with **`--primary-foreground`** / **`--accent-contrast`** for text on solid fills.
- Prefer **semantic tokens** when available (`--primary`, `--accent-surface`, etc.).
- On **transparent** default backgrounds, **hover** may use **step 3** for the fill.
- Steps **11–12** are chosen so **APCA Lc 60 / Lc 90** targets hold on **step 2** backgrounds (per system rules).

### Semantic status (examples from theme)

Use paired surface + contrast tokens for alerts and badges: **`--info` / `--info-contrast`**, **`--success` / `--success-contrast`**, **`--warning` / `--warning-contrast`**, **`--danger` / `--danger-contrast`**.

### Default light reference (illustrative)

Exact values are theme-generated; typical marketing defaults in docs use a **violet accent** around **`#964ce1`** for `--accent-9` with light gray-violet neutrals. **Always consume tokens in code**—do not hard-code marketing samples in production components.

### Dark mode

**`@media (prefers-color-scheme: dark)`** (and app-level `.dark` where used) overrides **accent** and **gray** scales. Preserve **semantic roles** (same step meanings, different hex values).

---

## 3. Typography Rules

### Fluid formula

Primary type uses:

```css
font-size: clamp(var(--min), var(--val), var(--max));
```

### Scale (semantic elements / classes)

| Element / class | `--min` | `--val` | `--max` |
|-----------------|---------|---------|---------|
| `h1`, `.h1` | 1.9838rem | 4.03vw | 3.052rem |
| `h2`, `.h2` | 1.58665rem | 4.03vw | 2.441rem |
| `h3`, `.h3` | 1.482rem | 4.03vw | 2.28rem |
| `h4`, `.h4`, `blockquote` | 1.26945rem | 4.03vw | 1.953rem |
| `h5`, `.h5` | 1.17225rem | 4.03vw | 1.563rem |
| `h6`, `.h6` | 1.0625rem | 4.03vw | 1.25rem |
| `p`, `.p` | 1rem | 4.03vw | 1rem |

### Rules

- **Never** use Tailwind **`text-xl`**, **`text-2xl`**, etc. for primary marketing or page copy.
- **Do** use **`h1`–`h6`**, **`p`**, or **`.h1`–`.h6`**, **`.p`** on non-semantic nodes.
- **Exception**: **`text-sm`** (0.875rem) and **`text-xs`** (0.75rem) for small fixed UI/meta text.
- **Line-height** on large headings should stay roughly **1.1–1.3**.
- Use **`rem`** for `--min` / `--max` so user font settings are respected.
- **`blockquote`** shares the **`h4`** scale.

### Font stack

Docs and registry reference **`Inter`** as the primary sans stack; quotes may use a serif stack (`--aura-font-quotes`). Root docs set **`html { font-size: 17px; }`** in the base layer—respect that context when mixing `rem` with design specs.

---

## 4. Component Stylings

Patterns below match registry implementations and docs. Install snippets and full source appear in **`llms-full.txt`** per component.

### Button (`@aura/button`)

Variants (see `buttonVariants`): **`default`** / **`fill`** (`button-fill`), **`pill`** (border `gray-6`, text `gray-11`, bg `gray-2`, hover `gray-3`), **`link`** (`button-link`), **`menu`** (`button-menu`).

Sizes use **height utilities** aligned to the **13px grid** (e.g. `h-4`, `h-3`, `xs`–`xl`, `icon`, `icon-md`). Support **`asChild`** (Radix Slot), **`isDisabled`**, **`isLoading`** / **`isLoadingText`**, and legacy **`mode`** as an alias for **`variant`**.

Icon-only buttons should embed **Radix** icons with **`className="icon"`** (no `size` prop).

### Inputs and controls

Aura exposes component-level tokens such as **`--aura-input-radius`**, **`--aura-input-bg`**, **`--aura-input-placeholder-color`**, **`--aura-outline`** (focus), and **`--aura-button-radius`**. Prefer **gray/accent steps** for borders and fills rather than arbitrary hex.

### Surfaces and chrome

- **Cards, dialogs, menus**: use **scale-consistent** backgrounds (often `gray-1`–`gray-3`) and **borders** at **6–8**.
- **Overlays**: follow Radix patterns; animate **opacity** for scrims, **opacity + scale** for content where applicable.

### Sidebar, Sheet, Drawer

Mobile-friendly patterns use **sheet/drawer** overlays; **sidebar** supports collapse, groups, and optional icon rails—compose with **section** and **container** layout classes.

### Data-heavy components (registry)

Beyond the public docs “All Components” list, the registry also ships **data-grid**, **editor**, **editor-00** (block), **calendar**, **textarea**, **combobox-single** / **combobox-multiple**, **alert-status**, **theme-color-switcher**, and **form-field-*** helpers. Add with the same `@aura/<kebab-name>` pattern.

---

## 5. Layout Principles

### Spacing (critical)

- Global Tailwind theme: **`--spacing: 13px`**.
- **Every** utility like `p-2`, `gap-4`, `mt-3` means **value × 13px**.
- Use **half steps**: `1`, `1.5`, `2`, `2.5`, … — **never** `0.2`, `0.4`, `p-1.2`, etc.
- **No arbitrary spacing** such as `p-[16px]` unless explicitly requested—map to the scale (e.g. ~20px → **`1.5`** = 19.5px).

### Containers and sections

- **Every section** must live inside a **container** with padding, margin, and max-width.
- Limit **container variants** (e.g. `.smish`, `.smosh`, `.smash`, `.smush`, `.smesh`, `.aura-container` in registry CSS) to **at most five** per project unless justified.
- **Grid**: registry provides **`.aureole`** with **`.one`–`.twelve`** columns and **`.span-1`–`.span-12`**; use for page grids instead of ad-hoc flex hacks when matching Aura marketing layouts.

### Composition

Use Radix **`asChild`** to compose triggers and slots. Components should **forward refs** and **spread props** so nested primitives (tooltip + dialog, etc.) remain valid.

---

## 6. Depth & Elevation

### Radius (Tailwind theme)

Radius tokens are tied to **`--spacing`**, e.g.:

- **`--radius-sm`**: `calc(var(--spacing) * 0.5)` → 6.5px at default
- **`--radius-md`**: `calc(var(--spacing) * 1)` → 13px
- **`--radius-lg`**: `calc(var(--spacing) * 1.5)`
- **`--radius-xl`**: `calc(var(--spacing) * 2)`

Component tokens may also set **`--aura-input-radius`**, **`--aura-button-radius`**, and **`--aura-radius`**.

### Elevation

Aura favors **subtle borders** (**gray 6–8**) and **light shadows** where components define them—not a single Material-style shadow ladder. **Focus** uses **step-8**-class borders or **`--aura-outline`** semantics.

---

## 7. Do's and Don'ts

### Do

- Use **CSS variables** and **Tailwind token classes** aligned to **accent/gray steps**.
- Use **fluid typography** classes for headings and body.
- Use **`@radix-ui/react-icons`** with **`className="icon"`** (optionally **`icon h4`** / **`icon h1`** for scale).
- Animate **`transform`** and **`opacity`**; use **`cubic-bezier(0.16, 1, 0.3, 1)`** for dialogs, **`ease`** for collapsible, **`cubic-bezier(0.4, 0, 0.6, 1)`** for buttons—prefer **250ms** steps.
- Validate forms with **`validateFormData`** and propagate errors through **`<Form>`** (see Forms appendix).
- Import registry **`globals.css`** / **`main.css`** so **base**, **theme**, and **component layers** stay in sync.

### Don't

- Don't assume **4px** Tailwind spacing—**13px** is the multiplier.
- Don't use **`text-2xl`**-style utilities for primary type hierarchy.
- Don't pass **`size={24}`** or width/height on icons—use **`icon`** + typography classes.
- Don't animate **layout properties** (top/left/width/height) except documented exceptions (e.g. Radix **collapsible height** to **`var(--radix-*-content-height)`**).
- Don't autoplay distracting motion; respect **reduced motion**.

---

## 8. Responsive Behavior

- **Typography** already responds via **`clamp`** and **viewport-relative** middle values.
- **Grids** and **container** utilities include **breakpoint behavior** for small viewports—prefer registry layout classes over one-off media queries when parity with Aura matters.
- **Touch targets**: keep interactive controls comfortably padded using the **13px scale** (avoid cramming with sub-`1` padding unless intentionally dense).
- **Sidebars / navigation**: collapse into **sheet** or **drawer** patterns on narrow screens per **sidebar** implementation.

---

## 9. Agent Prompt Guide

### Quick token cheat sheet

- **Page background**: `gray-1` / `gray-2`
- **Primary action fill**: `accent-9` / `--primary`
- **Text on primary**: `accent-contrast` / `--primary-foreground`
- **Body text**: `gray-11`–`gray-12` depending on emphasis
- **Borders**: start at `gray-6`, stronger at `gray-7`–`gray-8`
- **Spacing**: multiply Tailwind number by **13px** before judging density

### Example prompts

- “Build a landing section: **container** + **fluid `h1`/`h2`/`p`**, background **`gray-1`**, primary CTA **`Button variant='fill'`**, secondary **`variant='pill'`**, spacing only **`gap-4`**, **`py-6`** style multiples of **13px**.”
- “Create a settings form: **`<Form ref={...} errors={...}>`** with **`<FormField>`** children, **`<FormSubmit form={id}>`**, **Radix icons** only with **`className='icon'`**, inputs using **Aura** border/focus tokens.”
- “Add a data table page: install **`@aura/data-grid`**, keep **gray** surfaces and **accent-9** for primary toolbar actions, respect **13px** padding in cells.”

### Iteration checklist

1. Confirm **spacing math** (× **13px**).
2. Confirm **typography** uses **semantic** classes, not **`text-*`** for main copy.
3. Confirm **colors** use **steps** or **semantic** tokens, not random hex.
4. Confirm **icons** use **Radix** + **`icon`** class.
5. Confirm **motion** respects **reduced motion** and **compositor-friendly** properties.
6. For **forms**, confirm **useFormDynamic** + **validateFormData** + **Form** error wiring.

---

## Appendix A — Installing components

Ensure **`components.json`** defines the **`@aura`** registry (see docs **Namespaces**). Then:

```bash
pnpm dlx shadcn@latest add @aura/<registry-name>
```

**Core UI (docs “All Components”):** accordion, alert, alert-dialog, aspect-ratio, autocomplete, avatar, badge, button, button-group, card, carousel, checkbox, collapsible, combobox, command, context-menu, dialog, drawer, dropdown-menu, empty, form, grid, hover-card, input, kbd, label, menubar, navigation-menu, popover, progress, radio-group, scroll-area, section, select, separator, sheet, sidebar, signature-pad, skeleton, slider, sortable, stepper, switch, tabs, toggle, toggle-group, tooltip.

**Additional registry items:** textarea, calendar, data-grid, editor, editor-00, combobox-single, combobox-multiple, alert-status, theme-color-switcher, form-field-combobox, form-field-editor, form-field-select, form-field-signature-pad, form-field-sortable-list.

**Utilities / rules:** class-names, colors, web-validation, use-dynamic-form, css-main, rules (bundle), rule-principles, rule-fundations-colors, rule-fundations-typography, rule-fundations-layout-spacing, rule-fundation-icons, rule-fundation-animations, rule-components-forms, and other hooks listed in **`packages/registry/registry.json`**.

---

## Appendix B — Forms (summary)

- Define state with **`useFormDynamic(initialValues, formRef?)`**; read fields via **`getFields()`** or **`field(name)`**.
- Wrap with **`<Form ref={formRef} onSubmit={...} errors={errors} id="...">`** — errors are **not** passed per field; **Form** matches **`instancePath`** to **`field.name`**.
- Validate with **`validateFormData(schema, formData.getValues())`**; on failure call **`touchForm()`** and pass **`errors`** to **Form**.
- Use **`<FormSubmit form={id} fetchStatus={...}>`** for submit loading state.
- For **Select / Combobox / Editor / SignaturePad / SortableList**, update via **`field.setValue`** per form rules in **`llms-full.txt`** (**Form** section).

---

## Appendix C — Stylesheet layout

- **`packages/registry/styles/globals.css`**: Tailwind import, **`@theme inline`** (spacing, fonts, semantic colors, radius, color mappings), **`:root`** scales, dark overrides, **`@layer base`** imports **`main.css`** and default component styles.
- **`packages/registry/styles/main.css`**: **`:root`** Aura tokens, **layout utilities** (grid, containers), **fluid typography** rules, helpers (`.truncate`, `.skeleton`, status classes).

Point consuming apps at these (or the CLI output paths) so tokens and base layers stay authoritative.
