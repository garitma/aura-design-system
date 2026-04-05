# AI prompt: Bruno API collection ({{PACKAGE_NAME}})

Use this vault path for product docs: `{{OBSIDIAN_VAULT_RELATIVE}}`.

## Goal

Maintain Bruno requests that mirror the Next.js App Router API routes under `app/api/`.

## Workflow

1. Scan `app/api/**` for `route.ts` / `route.js` files.
2. For each exported HTTP method (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`), define a matching Bruno request:
   - **Name**: clear, stable identifier (e.g. `Users List`).
   - **Method + URL**: base URL from the Bruno `APP_URL` variable + route path (respect dynamic segments like `[id]`).
   - **Auth**: document headers, cookies, or WorkOS/session requirements as comments.
   - **Body / query**: match Zod schemas or handler expectations; add example JSON.
3. Prefer one folder per route segment under this collection (e.g. `api/users/folder.yml` + `List.bru`).
4. Keep environment variables in `environments/`; never hardcode secrets in `.bru` files.

## Conventions

- Reference the Obsidian vault for narrative docs and decision records.
- When the implementation changes, update the corresponding Bruno request and add a short note in Obsidian if behavior is user-facing.
