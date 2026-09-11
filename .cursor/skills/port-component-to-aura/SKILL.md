---
name: port-component-to-aura
description: >-
  Ports a UI component from a URL (shadcn, another registry, or design-system docs)
  into Aura-styled code. Detects two scenarios: (1) consumer app — write into the
  project's components; (2) aura-design-system monorepo — add to the registry with
  Ladle story + metadata for docs. Use when the user pastes ui.shadcn.com,
  auradesignsystem.com, a registry JSON URL, or asks to recreate/adapt a component in Aura.
---

# Port component to Aura

Recreate an external component with Aura tokens and primitives. Prefer Aura patterns; do not paste upstream class soup.

## Detect scenario first

| Signal | Scenario |
| --- | --- |
| Repo has `packages/registry/registry/default/components/` and `packages/registry/src/*.stories.tsx` (this monorepo / `aura-design-system`) | **A — Aura registry (document for the design system)** |
| Otherwise (app with `components.json`, `@aura` registry, typical Next app) | **B — Consumer project (for this app only)** |

If unclear, ask once: “¿Esto va al registry de Aura (Ladle + docs) o solo a este proyecto?”

Shared mapping rules apply in both scenarios. Deliverables differ.

## When to use

- User pastes a shadcn / registry / design-system docs URL
- User asks to recreate, adapt, or port a component “in Aura”
- User wants Aura-styled UI from an external example

## Shared: read source + map

### Read (do not install blindly)

| Source | How to load |
| --- | --- |
| shadcn / `@namespace/name` | shadcn MCP, or `https://ui.shadcn.com/r/{name}.json` |
| Aura | `@aura` / `@aura-dev`, or (in monorepo) `apps/www/public/r/{name}.json` |
| Other docs URL | Fetch; extract API, variants, a11y, structure |
| Non-registry DS | Fetch + interpret only |

### Map to Aura

- Reuse Aura primitives already in the target (`Button`, `Dialog`, `Input`, `class-names`, etc.)
- Icons: Lucide → `@radix-ui/react-icons` with `className="icon"`
- Spacing: `--spacing: 13px` (`p-4` = 52px)
- Typography: fluid `.h1`–`.p`; no `text-xl` for primary copy; `text-sm` / `text-xs` OK for utility
- Color: `--accent-*` / `--gray-*` steps 1–12; no one-off hex
- Motion: `transform` + `opacity`; honor `prefers-reduced-motion`
- Follow `DESIGN.md` and `.cursor/rules/` when present

---

## Scenario B — Consumer project (for this app)

Goal: a component the **app can use**, not publish to Aura’s public registry.

### Do

1. Prefer installing an existing Aura item if it already covers the need: `pnpm dlx shadcn@latest add @aura/<name>` (or MCP install).
2. If porting/adapting: write source into the app paths from `components.json` aliases (usually `@/components/ui`, `@/components`, `@/utils`).
3. Wire imports to local Aura utilities (`@/utils/class-names`, existing UI primitives).
4. Optionally add a small usage example in a page or demo the app already uses — **do not** invent Ladle/registry paths.

### Do not

- Create `packages/registry/...`, `*.stories.tsx` under a registry package, or `metadata/*.yml`
- Run `registry:generate` / `registry:build` / `docs:generate`
- Treat the result as a new `@aura/<name>` for others to install

### Done when

- [ ] Compiles in the app
- [ ] Uses Aura tokens / rules
- [ ] Fits existing app folder conventions
- [ ] Accessible enough for production use in that project

---

## Scenario A — Aura design system (document for the registry)

Goal: a **registry item** others install as `@aura/<kebab-name>`, with Ladle + docs automation.

### Required deliverables

| Artifact | Path | Why |
| --- | --- | --- |
| Component | `packages/registry/registry/default/components/ui/{PascalName}.tsx` (or `components/` for non-ui peers) | Source of truth |
| Ladle story | `packages/registry/src/{kebab-name}.stories.tsx` | Storybook (Ladle) |
| Metadata | `packages/registry/metadata/{kebab-name}.yml` | `docs:generate` preview/usage |
| Built JSON | `apps/www/public/r/{kebab-name}.json` | `@aura/{kebab-name}` |

Non-UI peers (e.g. DataGrid) may live under `components/` instead of `ui/` — match peers.

### Do not

- `shadcn add` upstream shadcn into `packages/registry` — fetch and rewrite
- Skip story or metadata (docs preview depends on them)

### Write component

1. Source under `registry/default/components/ui/` (PascalCase, Aura patterns).
2. `pnpm registry:generate` in `packages/registry` refreshes `registry.json`.
3. Set npm / `@aura/...` dependencies as peers do.

### Ladle story (required)

`packages/registry/src/{kebab-name}.stories.tsx`:

- Import from `../registry/default/components/...` (not `@/` in stories).
- **Must `export const Default`** — metadata uses `preview: Default`; `generate-docs.ts` extracts it.
- Extra named stories → Usage section (`usage: all`).
- Must run in Ladle: `pnpm --filter @aura-design/registry dev`.

```tsx
import { Button } from "../registry/default/components/ui/Button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../registry/default/components/ui/Sheet";

export const Default = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button>Open sheet</Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Sheet title</SheetTitle>
        <SheetDescription>Description.</SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
);
```

### Metadata YAML (required)

`packages/registry/metadata/{kebab-name}.yml`:

```yaml
header:
  description: One-line description of the component.
extends: _templates/content.yml
```

Template expands to `preview: Default`, `installation: @aura`, `source: all`, `usage: all`. Without YAML or `Default`, docs preview degrades.

### Build and verify

```bash
# from packages/registry
pnpm registry:generate
pnpm registry:build
pnpm docs:generate   # when MDX/demos should update
pnpm dev             # Ladle
```

Or `pnpm registry:bootstrap`.

### Done when

- [ ] `@aura/<kebab-name>` builds under `apps/www/public/r/`
- [ ] Story with **`export const Default`**
- [ ] `metadata/<kebab-name>.yml` present
- [ ] Ladle renders the story
- [ ] A11y + Aura tokens/rules; no class soup fighting the 13px grid

---

## Install this skill

```bash
pnpm dlx shadcn@latest add @aura/skill-port-component-to-aura
# or
pnpm dlx shadcn@latest add @aura/skills
```

→ `.cursor/skills/port-component-to-aura/SKILL.md`

## Example prompts

- Consumer: “Port this shadcn sheet into our app with Aura tokens”
- Registry: “Add this as `@aura/sheet` with Ladle + docs metadata”
- Either: “Recreate https://ui.shadcn.com/docs/components/dialog in Aura”
