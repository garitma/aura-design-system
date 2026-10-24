---
feature: MCP and agent blueprint
status: shipped
area: agents
routes: [/docs/mcp, /docs/mcp-agent-blueprint, /docs/rules]
components: [packages/cli/commands/blueprint.ts, packages/cli/commands/upstream-skills.ts, packages/cli/commands/forms-stack.ts, .cursor/rules/, .cursor/skills/, AGENTS.md]
pr: https://github.com/somosgented/aura-design-system/pull/157
updated: 2026-10-24
---
`aura blueprint`, which `init` and `setup` also run, installs the agent surface: Aura rules and skills, reconciled Emil skills, the forms stack (forms rule, `aura-forms` skill, and the ajv-based form components), shadcn skills, image identity, and this feature map. Forms validate with ajv through `validateFormData`, and server actions re-validate with the same schema. Zod is not used. The feature map is the only project documentation. It has one note per feature and is updated in the PR that changes the feature.
