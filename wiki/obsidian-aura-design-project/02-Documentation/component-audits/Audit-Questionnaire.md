---
title: Audit Questionnaire
date: 2026-10-21
tags: [dev-log, logic, architecture]
---
## Summary
Aligned with shadcn Questionnaire. Aura wraps `@shadcn/react/questionnaire` with flat part names (`QuestionnaireProgress`, `QuestionnaireChoice`, …), Aura accent/gray tokens, 13px spacing, and Radix `CheckIcon` with `className="icon"`. The old Stepper-based shell is removed.

## Findings
- Composition matches shadcn: progress, fieldset items, choice cards with radio/checkbox indicators, freeform input, skip/next/submit actions.
- Docs demo and Ladle `Default` / `Multiple` stories follow the shadcn items map pattern, including letter shortcuts on Default.
- Inputs stay on the Aura ≥17px floor (`h-4`); no `text-sm` on the freeform control.

## Context
- Related: [[Recent-Components-Audit]] [[Shadcn-gaps]]
- Implementation Path: `packages/registry/registry/default/components/ui/Questionnaire.tsx`
- Docs page: `apps/www/content/docs/components/questionnaire.mdx`
- Reference: https://ui.shadcn.com/docs/components/base/questionnaire
