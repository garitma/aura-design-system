# Design System: Aura

Aura is a **registry-first** design system distributed in **shadcn mode**: you copy source into your app, own the code, and pull updates via CLI. It is built on **React**, **Radix UI primitives**, **Tailwind CSS v4**, and a **13px spacing grid**. 

**Product principles (non-visual):** prioritize accessibility, consistency, reusable components, shareable tooling, user control, forgiveness, and a perceived sense of stability—even when the underlying product is complex.

---

## 1. Visual Theme & Atmosphere

Aura reads as a **modern, accessible product UI**: clear hierarchy, **fluid typography** that scales with the viewport, and a **12-step accent + gray palette** (not a flat gray + single brand hex). Surfaces lean on **gray steps 1–2** for app backgrounds and **accent step 9** (`--primary` / `--accent-9`) for brand actions. Borders and focus use **steps 6–8** so interactive affordances stay legible without heavy chrome.

### Creative north star (editorial layer)

Aura can also read as a **high-end editorial registry**: the **digital curator** mental model favors **intentional asymmetry**, **generous space**, and **tonal depth** over a flat “boxes on a grid” SaaS default. Marketing and long-form docs may emphasize **relationships defined by light, spacing, and background shifts** rather than heavy dividers; **app chrome and controls** still follow **accent/gray step roles** and **accessible focus** (see §6). This layer **adds** product voice for layouts where **density is welcome but clutter is not** (registers, archives, inventory-style UIs)—it does **not** replace the technical baseline above.

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

### Editorial ↔ Aura token bridge (illustrative)

External “editorial” specs often name concrete hexes or Material-like surfaces. Map them to Aura steps and semantics; **never** ship those hex literals as the source of truth in components.

| Editorial concept (example) | Aura mapping |
|-----------------------------|--------------|
| Primary ~`#7c2ec6` | Theme-dependent; typically near **`--accent-9`** / **`--primary`** |
| Primary container ~`#964ce1` | **`--accent-10`** or lighter accent steps; pair with **`--accent-9`** in **gradients** |
| Secondary / metadata ~`#565f6f` | **`gray-11`** (muted UI and secondary text) |
| Soft surface ~`#fbf8ff` | **`gray-1`–`gray-2`** (exact tint is theme-generated) |
| Layered “surface container” (low / lowest) | **Tonal lifts**: **`gray-2`–`gray-3`** on a **`gray-1`** canvas; lightest interactive cards often **`gray-2`** or **`gray-3`** on **`gray-1`** |

**Gradients:** A **linear gradient** on primary CTAs (e.g. **`--accent-9`** → **`--accent-10`**, ~**135deg**) is a valid **design pattern** implemented in **app or extended CSS**. Default registry **`.button-fill`** uses a **solid** primary fill unless you override or extend it.

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

### Editorial / registry hierarchy

- **Display / statement headings:** Use **`.h1`–`.h3`** for editorial “statements.” Optional: **`letter-spacing: -0.02em`** on the largest display treatments—keep **line-height** roughly **1.1–1.3**.
- **Section headers (registry voice):** **`.h4`–`.h6`** for structured, scannable titles.
- **Dense data / tables:** Use **`text-sm`** (0.875rem) for **cell body** and registry rows—the allowed fixed-size exception for information density.
- **Label / tag voice:** For micro-labels and **column headers**, **`text-xs`** or **`text-sm`** with **`uppercase`**, **`letter-spacing: 0.05em`**, and weight as needed.
- **Technical identifiers:** Use **`ui-monospace`** (or your app’s monospace stack) for **codes, serials, and IDs** in grids and forms.

---

## 4. Component Stylings

Patterns below match registry implementations and docs. Install snippets and full source appear in **`llms-full.txt`** per component.

### Button (`@aura/button`)

Variants (see `buttonVariants` in **`Button.tsx`**):

- **`default`** / **`fill`**: applies **`button-fill`**—**solid** primary background (`--aura-accents-primary`), **2px** border, **inverse** text per registry CSS. **Not** a built-in CSS gradient in the default stylesheet.
- **`pill`**: **`button-pill`** plus Tailwind **`border-gray-6`**, **`text-gray-11`**, **`bg-gray-2`**, **`hover:bg-gray-3`** (secondary-style chrome in the shipped component).
- **`link`** (`button-link`), **`menu`** (`button-menu`).

Sizes use **height utilities** aligned to the **13px grid** (e.g. `h-4`, `h-3`, `xs`–`xl`, `icon`, `icon-md`). Support **`asChild`** (Radix Slot), **`isDisabled`**, **`isLoading`** / **`isLoadingText`**, and legacy **`mode`** as an alias for **`variant`**.

**Design intent (editorial):** **Pill-shaped** primaries and a **linear gradient** fill (**`--accent-9`** → **`--accent-10`**, ~**135deg**) can be added by **extending** `.button-fill` or passing **`className`** overrides—verify contrast with **`--primary-foreground`** / **`--accent-contrast`**.

Icon-only buttons should embed **Radix** icons with **`className="icon"`** (no `size` prop).

### Empty (`@aura/empty`)

Composable **empty states** for lists, tables, and panels. **`Empty`** is a centered column with **`border-dashed`** at **`gray-6`**, **`gray-2`** fill, and **`p-2`** on the **13px** grid. **`EmptyHeader`** groups **`EmptyMedia`** (default transparent wrap or **`variant="icon"`** on **`gray-3`**), **`EmptyTitle`** (**`.h5`**, **`gray-12`**), and **`EmptyDescription`** (**`text-sm`**, **`gray-11`**, underlined links that **`hover:text-primary`**). **`EmptyContent`** holds actions—typically a primary **`Button variant='fill'`** and an optional secondary **`variant='pill'`**, with **`gap-1`** between controls when they sit in one row.

### Card (`@aura/card`)

Default **`Card`** uses **`bg-gray-2`**, **`border-gray-6`**, **`rounded-md`**, and **`CardFooter`** includes **`border-t border-gray-6`**. For an **editorial “registry unit”** (no chrome lines, tonal lift only), **override** with e.g. **`border-0`**, **`rounded-xl`**, **`bg-gray-3`** on **`gray-1`**, and rely on **padding + spacing**—**design target**; always reconcile with the installed **`Card.tsx`** when upgrading.

### Inputs and controls

Aura exposes component-level tokens such as **`--aura-input-radius`**, **`--aura-input-bg`**, **`--aura-input-placeholder-color`**, **`--aura-outline`** (focus), and **`--aura-button-radius`**. Prefer **gray/accent steps** for borders and fills rather than arbitrary hex. **Editorial** recipes (filled **`gray-3`**, **ghost** border at **~10%** opacity, **focus** ring **2px** **`primary`/`accent`**) map cleanly to these tokens when you implement them in app CSS.

### Editorial surfaces vs control chrome (dual mode)

For **marketing sections and curated layouts**, prefer **background step changes** and **vertical spacing** before **full-width 1px section rules**; use **ghost outlines** (§6) when contrast is low. For **inputs, buttons, dialogs, data-grid chrome, and focus**, keep **legible** borders and rings (**`gray-7`–`gray-8`**, **`--aura-outline`**)—**accessibility** overrides a strict “no lines anywhere” brief.

### Surfaces and chrome

- **Cards, dialogs, menus**: default registry patterns use **scale-consistent** backgrounds (often **`gray-1`–`gray-3`**) and **borders** at **6–8**. **Editorial** pages may **strip** card borders and use **tonal layering** only; **dialogs, menus, and controls** usually keep **visible** structure.
- **Overlays**: follow Radix patterns; animate **opacity** for scrims, **opacity + scale** for content where applicable.

### Sidebar, Sheet, Drawer

Mobile-friendly patterns use **sheet/drawer** overlays; **sidebar** supports collapse, groups, and optional icon rails—compose with **section** and **container** layout classes.

### Data-heavy components (registry)

Beyond the public docs “All Components” list, the registry also ships **data-grid**, **editor**, **editor-00** (block), **calendar**, **textarea**, **combobox-single** / **combobox-multiple**, **alert-status**, **theme-color-switcher**, and **form-field-*** helpers. Add with the same `@aura/<kebab-name>` pattern.

- **Tables / data-grid:** Prefer **`text-sm`** for cell body copy; **uppercase, tracked** headers (§3) for scan lines. Specs often cite **~16px** horizontal row padding; Aura allows **half-step** spacing only (**`1`**, **`1.5`**, **`2`**, … × **13px**). Use **`px-1`** (13px) for a tighter scan line or **`px-1.5`** (19.5px) for a roomier registry row—there is **no** authorized **`1.25`** step on this scale.
- **Serials, IDs, codes:** Use **`ui-monospace`** in cells and dense forms for a technical, registry-appropriate voice.

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

### Editorial composition

- **Major section rhythm:** Use **large** vertical gaps (**48px+** intent) so layouts breathe—on the 13px grid that is typically **`gap-3.5`** (45.5px) or **`gap-4`** (52px) between **major** blocks.
- **Asymmetry / float:** **`rounded-xl`** surfaces can **overlap** neighbors using **negative margins** and **stacking** (`z-index`) for a curated, non-stacked feel. **`--radius-xl`** is **`spacing × 2`** (~**26px** at default—close to **1.5rem** “xl” in many editorial specs).
- **Nested radii:** Prefer **`rounded-xl`** on **outer** registry cards and **`rounded-md`** (or token **`--radius-md`**) on **nested** items when you need hierarchy without extra borders.

---

## 6. Depth & Elevation

### Radius (Tailwind theme)

Radius tokens are tied to **`--spacing`**, e.g.:

- **`--radius-sm`**: `calc(var(--spacing) * 0.5)` → 6.5px at default
- **`--radius-md`**: `calc(var(--spacing) * 1)` → 13px
- **`--radius-lg`**: `calc(var(--spacing) * 1.5)`
- **`--radius-xl`**: `calc(var(--spacing) * 2)`

Component tokens may also set **`--aura-input-radius`**, **`--aura-button-radius`**, and **`--aura-radius`**.

Avoid **0** outer radius on **page-level** chrome—use at least **`rounded-sm`** / **`--radius-sm`** so surfaces stay consistent with Aura’s rounded language (nested primitives may use smaller radii per token).

### Elevation

Aura favors **subtle borders** (**gray 6–8**) and **light shadows** where components define them—not a single Material-style shadow ladder. **Focus** uses **step-8**-class borders or **`--aura-outline`** semantics.

### Editorial depth (optional patterns)

**Tonal layering:** Treat the UI as **stacked sheets**—**base** **`gray-1`**, **secondary bands** **`gray-2`**, **lifted** cards **`gray-2`–`gray-3`**—before adding lines (see **dual mode** in §4).

**Glass / blur:** For **floating** or **registry-first** panels, a **semi-transparent** surface (e.g. **~70%** opacity aligned to **`gray-1`/`gray-2`**) plus **`backdrop-blur`** (~**20px**) is acceptable when **contrast** and **`prefers-reduced-transparency`** (where relevant) are handled.

**Shadow recipe (editorial):** Prefer **soft**, **tinted** shadows over harsh black: **blur ~32px–64px**, **opacity ~4%–6%**, color biased toward **accent** (e.g. a dark accent anchor at low alpha) rather than neutral **#000**. Align custom shadows with this **range** when extending components.

**Ghost outline:** If a surface lacks contrast on a similar background, use a **low-opacity** stroke—e.g. **`gray-7`/`gray-8`** at **~10%–15%** alpha—so the edge reads as a **hint**, not heavy chrome.

---

## 7. Do's and Don'ts

### Do

- Use **CSS variables** and **Tailwind token classes** aligned to **accent/gray steps**.
- Use **fluid typography** classes for headings and body.
- Prefer **spacing** and **tonal background shifts** between **major sections** before defaulting to **full-width dividers** (editorial layouts; see §4 dual mode).
- Use **`text-sm`** plus **structured / uppercase tracked** headers for **dense registry** UIs (§3).
- Use **`ui-monospace`** for **IDs, codes, and serials** where scan accuracy matters.
- Use **`@radix-ui/react-icons`** with **`className="icon"`** (optionally **`icon h4`** / **`icon h1`** for scale).
- Use **`accent-9` / `--primary` sparingly** for **primary actions** and signature moments so brand color stays meaningful.
- Animate **`transform`** and **`opacity`**; use **`cubic-bezier(0.16, 1, 0.3, 1)`** for dialogs, **`ease`** for collapsible, **`cubic-bezier(0.4, 0, 0.6, 1)`** for buttons—prefer **250ms** steps.
- Validate forms with **`validateFormData`** and propagate errors through **`<Form>`** (see Forms appendix).
- Import registry **`globals.css`** / **`main.css`** so **base**, **theme**, and **component layers** stay in sync.

### Don't

- Don't assume **4px** Tailwind spacing—**13px** is the multiplier.
- Don't use **`text-2xl`**-style utilities for primary type hierarchy.
- Don't use **`#000`** / pure black for body copy—use **`gray-12`** (and scale) for a softer, token-driven contrast.
- Don't rely on **harsh, tight, high-opacity** neutral **drop shadows**; prefer **soft, tinted, low-opacity** depth (§6) when adding custom elevation.
- Don't use **0** border-radius on **outer** marketing or page chrome—stay at least **`rounded-sm`** / **`--radius-sm`** (§6).
- Don't pass **`size={24}`** or width/height on icons—use **`icon`** + typography classes.
- Don't animate **layout properties** (top/left/width/height) except documented exceptions (e.g. Radix **collapsible height** to **`var(--radix-*-content-height)`**).
- Don't autoplay distracting motion; respect **reduced motion**.
- For **registry tables and dense lists**, avoid **defaulting to 1px row dividers**—prefer **`py-1`–`py-1.5`** (or similar on the 13px scale) between rows; **`Separator`** remains appropriate between **unrelated** content blocks when product agrees.

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
- **Borders**: start at `gray-6`, stronger at `gray-7`–`gray-8` (controls, dialogs); **editorial** sections may use **tonal steps + spacing** first, **ghost** outlines when contrast is low (§4, §6)
- **Spacing**: multiply Tailwind number by **13px** before judging density
- **Editorial section gaps**: **`gap-3.5`** or **`gap-4`** between large blocks; **registry row inset**: **`px-1`** or **`px-1.5`** (see §4 data-heavy note)

### Example prompts

- “Build a landing section: **container** + **fluid `h1`/`h2`/`p`**, background **`gray-1`**, primary CTA **`Button variant='fill'`**, secondary **`variant='pill'`**, spacing only **`gap-4`**, **`py-6`** style multiples of **13px**.”
- “Create a settings form: **`<Form ref={...} errors={...}>`** with **`<FormField>`** children, **`<FormSubmit form={id}>`**, **Radix icons** only with **`className='icon'`**, inputs using **Aura** border/focus tokens.”
- “Add a data table page: install **`@aura/data-grid`**, keep **gray** surfaces and **accent-9** for primary toolbar actions, respect **13px** padding in cells.”
- “Build a **digital curator** registry page: **`gray-1`** canvas, **`gray-2`/`gray-3`** tonal bands **without** section border rules, **`Card`** overrides **`border-0 rounded-xl`**, primary **`Button variant='fill'`** (optional **gradient** via **`className`** / extended CSS), **`@aura/data-grid`** with **`text-sm`** cells, **uppercase tracked** column headers, **`px-1.5`** row padding (or **`px-1`** if tighter), **`ui-monospace`** ID column, **`gap-4`** between major blocks.”
- “Compose an **editorial hero**: **asymmetric** layout with **`rounded-xl`** panel **overlapping** the next section (**negative margin** + **`z-index`**), **`.h1`** with optional **`-0.02em` tracking**, generous **`py-6`/`gap-4`**, **soft tinted** shadow only if needed (§6).”

### Iteration checklist

1. Confirm **spacing math** (× **13px**).
2. Confirm **typography** uses **semantic** classes, not **`text-*`** for main copy.
3. Confirm **colors** use **steps** or **semantic** tokens, not random hex.
4. Confirm **icons** use **Radix** + **`icon`** class.
5. Confirm **motion** respects **reduced motion** and **compositor-friendly** properties.
6. For **forms**, confirm **useFormDynamic** + **validateFormData** + **Form** error wiring.
7. For **editorial / registry** layouts, confirm **dual-mode** boundaries: **spacing + tonal** separation for sections; **visible** borders/focus for **controls** (§4).
8. For **data-heavy** UIs, confirm **`text-sm`** density, **header** styling, **`px-1`** / **`px-1.5`** row rhythm (half-step grid only), and **`ui-monospace`** for IDs where specified (§3–§4).

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
