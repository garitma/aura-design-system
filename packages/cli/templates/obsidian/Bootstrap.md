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

## Outputs

- New notes under sensible folders (see [[Welcome]]).
- Updates to existing notes when behavior changes.
- Optional: short changelog section at the bottom of a note when making substantive edits.
