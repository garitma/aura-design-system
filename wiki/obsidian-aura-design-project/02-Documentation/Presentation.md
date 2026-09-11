---
title: Presentation
date: 2026-09-11
tags: [dev-log, architecture]
---
## Summary
`@aura/presentation` ports [Dice UI Presentation](https://diceui.com/docs/components/radix/presentation): Aura-styled wrappers over `@diceui/pptx` for viewing/editing PPTX in the browser.

## Context
- Related: [[Internal-Progress]], [[Registry]]
- Implementation Path: `packages/registry/registry/default/components/ui/Presentation.tsx`
- Install: `pnpm dlx shadcn@latest add @aura/presentation` (pulls `@diceui/pptx`)
- Sample deck: `public/fixtures/sample.pptx` is Aura-branded and generated, not borrowed — run `pnpm fixtures:presentation` (`scripts/generate-presentation-fixture.ts`, pptxgenjs) to rebuild both copies (registry + `apps/www/public/fixtures`). Six slides cover the 12-step palette, fluid type, the 13px grid, and tonal surfaces using the light-theme hex values from `apps/www/app/globals.css`.
- Deck gotcha: pptxgenjs `LAYOUT_16x9` is 10×5.625in; the 13.333×7.5in canvas is `LAYOUT_WIDE`. Using the wrong one pushes content off the right/bottom edges.
- Sizing note: Aura's 13px unit means `w-12` ≈ 156px rail and `h-32` ≈ 416px frame; Tailwind-default numbers (`w-40`, `h-80`) blow up the layout.
- Thumbnail rail still uses the primitive `render` prop (Base UI pattern from `@diceui/pptx`).
