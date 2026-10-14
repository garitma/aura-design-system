---
title: Aura Agent Surface
aliases: [Aura Agent Surface]
date: 2026-10-09
tags: [dev-log, architecture, aura]
---
## Summary
Aura agent tooling splits into three layers. `DESIGN.md` holds the narrative design SoT. `.cursor/rules/*` hold MUST/SHOULD/NEVER guardrails (including Keep invariants for color, type, 13px spacing, icons, and Project Brain). Skills under `.cursor/skills/` and `.agents/skills/` own persistence and technical execution. Upstream `shadcn/ui` skills are installed via `pnpm dlx skills add shadcn/ui` and stay subordinate to Aura Keep when they conflict. Agents do not write code comments: [[No code comments]] ships in `.cursor/rules/no-comments.mdc`, root `AGENTS.md`, the registry rules bundle, and `aura blueprint`.

## Context
- Related: [[Internal Progress]]
- Related: [[Bootstrap]]
- Implementation Path: `.cursor/rules/aura-agent-surface.mdc`

## Inventory

| Kind | Path | Role |
| --- | --- | --- |
| Spec | `DESIGN.md` | Narrative tokens and product voice |
| Rule | `.cursor/rules/aura-agent-surface.mdc` | Ownership map + Keep list + shadcn precedence |
| Rule | `.cursor/rules/no-comments.mdc` | No code comments; names, types, and structure carry intent |
| Rule | `.cursor/rules/fundation*.mdc` / `fundations-*.mdc` | Color, type, spacing, icons, motion guardrails |
| Rule | `.cursor/rules/shadcn-lint.mdc` | Lint obligations (no setup recipe) |
| Rule | `.cursor/rules/self-documenting-system.mdc` | When/where to persist knowledge |
| Skill | `.cursor/skills/verify-aura-ui/SKILL.md` | `pnpm lint` + `@shadcn/lint` fix loop |
| Skill | `.cursor/skills/update-project-brain/SKILL.md` | Obsidian + Bruno + Internal Progress write loop |
| Skill | `.cursor/skills/aura-forms/SKILL.md` | Form composition procedure |
| Skill | `.agents/skills/shadcn/SKILL.md` | Upstream shadcn CLI / registry / presets |
| Skill | `.cursor/skills/port-component-to-aura/SKILL.md` | External UI → Aura port |
