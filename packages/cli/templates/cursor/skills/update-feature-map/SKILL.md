---
name: update-feature-map
description: >-
  Add or update the feature's note in the Obsidian feature map
  (wiki/obsidian-*/Feature-Map/) when opening or updating a PR. Use only at PR
  time; never read or write other wiki or progress files.
---

# Update feature map

Run once per PR, after the code is final. Guardrails live in `.cursor/rules/feature-map.mdc`.

## Steps

1. Open `wiki/obsidian-*/Feature-Map/`. Find the note whose `feature` matches what the PR changes. Read that note only.
2. Update it, or create `Feature-Map/<Feature-Name>.md` with the shape below. One note per feature, not per PR.
3. Set `pr` to this PR's URL and `updated` to today. Fix `status`, `routes`, and `components` if they moved.
4. Keep the body to 2–4 sentences: what the feature does for the user and where it lives. No session log, no history.
5. Commit the note in the same PR. Do not edit `Feature-Map.base`.

## Note shape

```markdown
---
feature: Checkout
status: shipped
area: commerce
routes: [/checkout]
components: [app/checkout/page.tsx, components/checkout-form.tsx]
pr: https://github.com/org/repo/pull/123
updated: 2026-01-31
---
What it does for the user, in one or two sentences. Where the entry points live.
```

* `status`: `planned`, `in-progress`, `shipped`, or `deprecated`.
* `routes` and `components`: repo-relative paths or URL routes. Use `[]` when none apply.

## Done when

* [ ] Every feature the PR changes has a note with this PR in `pr`.
* [ ] No other wiki, progress, or assumptions file was read or written.
