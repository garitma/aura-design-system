---
name: generate-brand-images
description: Generates identity-consistent Gemini images and integrates them into landing pages. Use when creating or redesigning a landing page, hero, marketing page, or visual asset set that may need generated imagery.
---

# Generate brand images

Generate image assets from the product identity in the blueprint Obsidian vault. The project only needs a Gemini API key in `.env`; the bundled script handles prompt assembly, batch generation, and file output.

## 1. Read identity before designing

1. Locate the vault at `wiki/obsidian-*/`.
2. Read `Bootstrap.md`, then relevant notes in `01-Identity/`.
3. Treat image identity as ready only when the notes define at least:
   - visual medium or photographic/illustration style;
   - palette and lighting;
   - composition or recurring motifs;
   - exclusions or brand constraints.

A scaffolded `Image-Identity.md` with `status: needs-definition`, placeholders, or generic product copy is not a defined image identity.

If image identity is not ready, stop before generating and ask focused questions about the missing dimensions. After the user answers, update `01-Identity/Image-Identity.md`, set `status: ready`, and continue.

## 2. Check image generation access

The script reads `.env` automatically and accepts either:

```dotenv
GOOGLE_API_KEY=
# or
GEMINI_API_KEY=
```

Never print, copy into markdown, or commit a real key.

If neither variable has a value, ask the user to choose:

1. add their Google AI Studio key to `.env`, then retry;
2. let the agent generate the images with its native image-generation capability, when available;
3. continue with deliberate placeholders.

Do not fabricate or attempt to provision a Google API key. If the user chooses the agent-native option, preserve the same identity, filenames, dimensions, and integration workflow.

## 3. Plan the landing asset set

Inspect the page structure before generating. Prefer the smallest useful set of images; do not add imagery to sections that are clearer with typography or UI.

Create `tmp/aura-image-plan.json`:

```json
{
  "identity": "wiki/obsidian-project/01-Identity/Image-Identity.md",
  "images": [
    {
      "prompt": "Wide hero scene with the primary subject weighted right and clean negative space left",
      "output": "public/generated/landing/hero",
      "aspectRatio": "16:9"
    },
    {
      "prompt": "Supporting editorial image for the benefits section",
      "output": "public/generated/landing/benefits",
      "aspectRatio": "4:5"
    }
  ]
}
```

Allowed aspect ratios are `1:1`, `2:3`, `3:2`, `3:4`, `4:3`, `4:5`, `5:4`, `9:16`, `16:9`, and `21:9`. Keep output paths inside the project. Describe composition, subject placement, crop safety, and whether negative space is needed; the script adds the identity and no-baked-text constraint.

## 4. Generate

Preview the resolved prompts without an API call:

```bash
pnpm ai:image -- --manifest tmp/aura-image-plan.json --dry-run
```

Generate the complete set:

```bash
pnpm ai:image -- --manifest tmp/aura-image-plan.json
```

For one image:

```bash
pnpm ai:image -- --identity wiki/obsidian-project/01-Identity/Image-Identity.md --prompt "Centered product still life" --output public/generated/product --aspect 1:1
```

The script uses `gemini-2.5-flash-image`, creates parent directories, and selects the extension from the returned MIME type. Read its `saved ...` lines before wiring paths into code.

## 5. Integrate and verify

- Use generated local assets through the framework image component when available.
- Write useful alt text from the image's purpose; use empty alt only for truly decorative images.
- Keep text, logos, and UI labels in HTML rather than baking them into generated pixels.
- Check desktop and mobile crops and preserve focal subjects.
- Run the project's relevant lint, typecheck, and build checks.
- Record the asset plan, accepted outputs, and implementation paths in the blueprint wiki. Never record the API key.

Generated images require human review. Regenerate outputs with accidental text, identity drift, unsafe crops, visual artifacts, or inaccessible contrast.
