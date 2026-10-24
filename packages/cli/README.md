# @aura-design/cli

Aura Design System CLI (`aura`). Bootstraps Next.js apps with Aura registries and tokens, regenerates theme CSS, migrates Tailwind spacing to the 13px scale, and scaffolds the Obsidian feature map, image, and Sonar tooling, the Emil and Vercel on-demand audit skills, the Aura forms rule, skill, and components, plus gdp-ts proof-carrying authz.

## Usage

```bash
pnpm dlx @aura-design/cli@latest init
pnpm dlx @aura-design/cli@latest setup
pnpm dlx @aura-design/cli@latest link
pnpm dlx @aura-design/cli@latest blueprint
pnpm dlx @aura-design/cli@latest colors --accent "#4015ca" --gray "#7254cb" --background "#FFFFFF"
pnpm dlx @aura-design/cli@latest typography generate
pnpm dlx @aura-design/cli@latest spacing
```

## On-demand audits

Blueprint installs the Emil skills and `react-best-practices` into `.cursor/skills/` with `disable-model-invocation: true`. They run only when asked, for example `/emil-design-eng Audita la pantalla de checkout antes del PR`. Each returns findings (severity, `file:line`, suggested fix) and edits nothing. See [auradesignsystem.com/docs/audits](https://auradesignsystem.com/docs/audits).

## Documentation

- Public docs: [auradesignsystem.com/docs/cli](https://auradesignsystem.com/docs/cli)
- Source: `packages/cli` in [aura-design-system](https://github.com/somosgented/aura-design-system)

## Develop

```bash
pnpm --filter @aura-design/cli build
```

`build` compiles TypeScript and copies `templates/` into `dist/templates/`.
