# Aura Design System — DESIGN.md

This package holds a [Google Stitch–style DESIGN.md](https://stitch.withgoogle.com/docs/design-md/overview/) for the **Aura Design System**: a single markdown file coding agents can read to stay aligned with Aura tokens, layout, typography, and component conventions.

Content is derived from the public documentation dump (`llms-full.txt`), the registry (`packages/registry`), and foundation rules (`.cursor/rules`).

## Files

| File | Description |
|------|-------------|
| `DESIGN.md` | Design system for agents (9 sections + registry and forms summary) |
| `preview.html` | Catálogo extenso (nav, hero, 12×2 escalas de color, tipografía fluida, botones, badges, alertas, cards, formularios, spacing 13px, radios, elevación) — paridad de alcance con awesome-design-md Apple |
| `preview-dark.html` | Misma estructura con grises y semántica del modo oscuro del registry |

## Full documentation for LLMs

For exhaustive per-component install steps and source snippets, use the canonical plain-text export:

- Production: [https://auradesignsystem.com/llms-full.txt](https://auradesignsystem.com/llms-full.txt)
- Local docs dev server: `http://localhost:4000/llms-full.txt`

## Usage

Copy or symlink `DESIGN.md` into your app root (or point your agent at this path) and ask the agent to follow it when building UI. Initialize Aura in consuming apps with:

```bash
pnpm dlx @aura-design/cli@latest init
```

Add components with the shadcn CLI and the `@aura` namespace (see `components.json` `registries`).

## Registry index

A newline-delimited list of all registry item names: [https://auradesignsystem.com/all.txt](https://auradesignsystem.com/all.txt)
