---
feature: MCP and agent blueprint
status: shipped
area: agents
routes: [/docs/mcp, /docs/mcp-agent-blueprint, /docs/rules]
components: [packages/cli/commands/blueprint.ts, packages/cli/commands/upstream-skills.ts, .cursor/rules/, .cursor/skills/, AGENTS.md]
pr: PR_PENDING
updated: 2026-10-24
---
`aura blueprint`, which `init` and `setup` also run, installs the agent surface: Aura rules and skills, reconciled Emil and Vercel skills, shadcn skills, image identity, and this feature map. The feature map is the only project documentation. It has one note per feature and is updated in the PR that changes the feature.
