# Local development

## Monorepo commands (root)

| Script | Purpose |
|--------|---------|
| `pnpm dev` | Runs `turbo dev` across workspaces (www dev server on port **4000** when filtering to www). |
| `pnpm preflight` | `tsx scripts/preflight.ts` — run before releases/CI as defined in-repo. |

## Docs app only

```bash
pnpm --filter @aura-design/www dev
```

## SonarQube (optional)

Root `package.json` defines **`sonar:up`**, **`sonar:setup`**, **`sonar:scan`**, **`sonar:report`**, **`sonar:full`**. These assume a local Docker SonarQube instance and a generated **`.sonar-token`** file — **do not commit** tokens or passwords.

Inspect `sonar-project.properties` for scanner project metadata.

## Environment variables

Do not document secret values here. If a feature needs env vars, list **names** only in the relevant note and point to the code or `.env.example` (if present).

## Troubleshooting

| Symptom | Check |
|---------|--------|
| Docs search empty or errors | `apps/www/app/api/search/route.ts`, Fumadocs `source` wiring, MDX build (`fumadocs-mdx`). |
| Quick links missing | `apps/www/app/api/quick-links/route.ts` (handler returns `[]` on 500; client also swallows errors). |
| Wrong port | `apps/www/package.json` `dev` script (currently `--port 4000`). Bruno `Local` env `APP_URL` should match. |

## Related

- [[API routes]]
- [[Onboarding]]
