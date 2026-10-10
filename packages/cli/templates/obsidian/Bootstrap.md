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

## Proof-carrying authorization

Sensitive functions (delete a project, change a password, charge) take a gdp-ts proof that the check already ran for those exact ids. Do not cast a proof (`as SomeProof` or `as Proof`). Mint proofs only in `proofs/`, with the prover kept private. CI is `pnpm typecheck` and `pnpm lint` (the `@gdp-ts/core/lint/eslint` preset). The agent skill is `.agents/skills/gdp-ts/SKILL.md`. This does not replace a policy engine; it carries that engine's decision to the function.

## Agent surface

- Rules under `.cursor/rules/` hold MUST/SHOULD/NEVER guardrails. `DESIGN.md` is the narrative design SoT.
- Aura Keep invariants (13px spacing, accent/gray scales, fluid type, `className="icon"`, Project Brain) always win over conflicting upstream skill guidance.
- Upstream shadcn skill: `.agents/skills/shadcn` (install: `pnpm dlx skills add shadcn/ui`). Use for CLI, registry search/docs, and composition discovery.
- Reconciled Emil Kowalski skills and Vercel `react-best-practices`: `.cursor/skills/`. `aura blueprint` installs and updates them. Aura Keep wins on conflict. `ask-sonner` is only for files that already import `sonner`.
- Write loops: `.cursor/skills/update-project-brain`, `.cursor/skills/verify-aura-ui`, `.cursor/skills/aura-forms`.
- After each session advance, append one entry to [[Internal-Progress]] then run `pnpm brain:progress`.

## Outputs

- New notes under sensible folders (see [[Welcome]]).
- Updates to existing notes when behavior changes.
- Optional: short changelog section at the bottom of a note when making substantive edits.
