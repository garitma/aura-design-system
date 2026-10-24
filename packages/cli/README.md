# @aura-design/cli

Aura Design System CLI (`aura`). Bootstraps Next.js apps with Aura registries and tokens, regenerates theme CSS, migrates Tailwind spacing to the 13px scale, and scaffolds the Obsidian feature map, image, and Sonar tooling, the reconciled Emil agent skills, the Aura forms rule, skill, and components, plus gdp-ts proof-carrying authz.

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

## Documentation

- Public docs: [auradesignsystem.com/docs/cli](https://auradesignsystem.com/docs/cli)
- Source: `packages/cli` in [aura-design-system](https://github.com/somosgented/aura-design-system)

## Develop

```bash
pnpm --filter @aura-design/cli build
```

`build` compiles TypeScript and copies `templates/` into `dist/templates/`.
