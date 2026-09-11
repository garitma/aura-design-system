---
title: Brand Image Generation
date: 2026-09-11
tags: [dev-log, logic, architecture]
---
## Summary
Aura projects now receive an identity-aware Gemini image skill through `aura init`, `aura setup`, or `aura blueprint`. The workflow can batch every required landing asset while keeping the blueprint wiki as the visual source of truth.

## Context
- Related: [[Bootstrap]], [[Registry]]
- Implementation Path: `.cursor/skills/generate-brand-images/`
- Blueprint Path: `packages/cli/commands/blueprint.ts`

## Decision
The generator uses Gemini's `generateContent` REST endpoint with Node's built-in `fetch`, preserving the validated `gemini-2.5-flash-image` behavior without adding an SDK install step. It reads `GOOGLE_API_KEY` or `GEMINI_API_KEY` from root `.env` and never writes secrets.

## Identity gate
New vaults include `01-Identity/Image-Identity.md` with `status: needs-definition`. The skill must ask for style, palette, composition/motifs, and exclusions before changing that status to `ready` and generating assets.

## Landing workflow
The agent inspects the landing, writes a batch manifest, generates the smallest useful asset set into `public/generated/`, and integrates accepted outputs with accessible alt text. If no Gemini key exists, it asks whether to add one, use agent-native image generation when available, or retain placeholders.
