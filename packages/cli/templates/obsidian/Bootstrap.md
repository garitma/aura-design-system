# AI bootstrap: Obsidian documentation ({{PACKAGE_NAME}})

You are helping maintain internal documentation for this repository.

## Scope

- Vault root: `{{OBSIDIAN_VAULT_RELATIVE}}` (relative to repo root).
- API catalog: Bruno collection `{{BRUNO_COLLECTION_RELATIVE}}` — mirror `app/api/**` route handlers.

## Rules

1. Prefer short, linked notes over long monoliths. Use Obsidian `[[wikilinks]]` between related pages.
2. When describing behavior that touches HTTP APIs, verify against `app/api/` source and align Bruno request names, methods, and example payloads.
3. Document **decisions** (why), **procedures** (how to run), and **troubleshooting** (common failures). Link to code paths with fenced file paths, e.g. `` `app/api/...` ``.
4. Do not invent endpoints or env vars; if unknown, state what is missing and which file to inspect.
5. Keep secrets out of markdown; reference env var **names** only.
6. Before generating product imagery, read `01-Identity/Image-Identity.md`. If it is incomplete or has `status: needs-definition`, ask the user to define the missing visual direction and update the note before generating.

## Image generation

- Skill: `.cursor/skills/generate-brand-images/SKILL.md`
- Command: `pnpm ai:image`
- Secret: `GOOGLE_API_KEY` or `GEMINI_API_KEY` in root `.env`
- Batch plan: create a manifest for all necessary landing assets, generate them together, integrate the accepted files, and document the final asset paths.

If no Gemini key is configured, ask whether the user wants to add one, use the agent's native image-generation capability when available, or continue with placeholders. Never create or expose a secret on the user's behalf.

## Outputs

- New notes under sensible folders (see [[Welcome]]).
- Updates to existing notes when behavior changes.
- Optional: short changelog section at the bottom of a note when making substantive edits.
