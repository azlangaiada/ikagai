# Template Base Project

Reusable website template on the **VRTPN stack**:

- **V**ite SSR — `packages/web` (Express + Vite + React 19 + React Router)
- **R**eact — SSR rendering, client hydration
- **T**ailwind CSS v4 — styling
- **P**ayload CMS — `packages/cms` (headless, Next.js 16 App Router hosts only the admin + API)
- **N**ode + **P**ostgres — runtime + database

The CMS and the frontend are separate processes that talk over HTTP. The CMS never renders public pages; the frontend never talks to Postgres directly.

## Intended workflow for new projects

1. Duplicate this repo.
2. Create a new PostgreSQL database and user.
3. Update `packages/cms/.env` and `packages/web/.env`.
4. Rotate all secrets (`PAYLOAD_SECRET`, `REVALIDATION_SECRET`, `PREVIEW_SECRET`, `WEB_MANAGER_API_SECRET`, `CRON_SECRET`).
5. Update branding, collections, navigation, seed data, etc.
6. Commit the new project to its own repo.

Do not share a database across two projects derived from this template.

## Layout

```
templatebase/
├── packages/
│   ├── cms/                 # Payload CMS + Next.js admin + REST/GraphQL
│   │   ├── src/app/(payload)/   # Admin + /api/** routes
│   │   ├── src/collections/     # Users, Media, Pages, Posts, Services, etc.
│   │   ├── src/Header|Footer|Settings/  # Globals
│   │   ├── src/plugins/         # form-builder, seo, search, redirects, nested-docs
│   │   ├── src/utilities/web-manager.ts  # /api/web-manager/* auth
│   │   ├── tests/int/           # vitest integration tests
│   │   └── tests/e2e/           # playwright admin tests
│   └── web/                 # Vite SSR frontend
│       ├── server.ts            # Express SSR + revalidation + preview
│       ├── src/App.tsx          # React Router routes
│       ├── src/pages/           # Page-level React components
│       ├── src/blocks/          # Payload block renderers (Component.tsx)
│       ├── src/heros/           # Hero renderers
│       ├── src/data-loader.ts   # Per-route fetches from Payload REST
│       ├── src/lib/cache.ts     # In-process SSR cache
│       └── tests/e2e/           # playwright frontend tests
├── config/tooling/
│   └── eslint.config.mjs    # Flat ESLint config (typescript-eslint)
├── ecosystem.config.cjs     # PM2 apps (no secrets — reads packages/*/.env)
├── pnpm-workspace.yaml
└── package.json             # Workspace scripts
```

## Requirements

- Node ≥ 20.9 (or ^18.20.2)
- pnpm ≥ 9
- PostgreSQL 16+

## Setup

```bash
pnpm install
cp packages/cms/.env.example packages/cms/.env   # fill DATABASE_URL, secrets
cp packages/web/.env.example packages/web/.env   # fill PAYLOAD_URL, secrets
pnpm dev
```

## Environment variables

### packages/cms/.env
| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `PAYLOAD_SECRET` | Payload secret (`openssl rand -hex 32`) |
| `PAYLOAD_URL` | Public CMS URL (SEO plugin + live preview) |
| `FRONTEND_URL` | Public frontend URL (revalidation callbacks) |
| `REVALIDATION_SECRET` | Shared with web for `/api/revalidate` |
| `CRON_SECRET` | Guards Payload jobs endpoint |
| `WEB_MANAGER_API_SECRET` | Guards `/api/web-manager/*` |
| `WEB_MANAGER_ALLOWED_IPS` | Comma-separated allowlist (after nginx) |

### packages/web/.env
| Variable | Description |
|---|---|
| `PORT` | Frontend port (default `3004`) |
| `PAYLOAD_URL` | Internal URL to reach CMS (e.g. `http://localhost:4004`) |
| `VITE_PAYLOAD_URL` | Public URL browser uses for Payload media/assets |
| `SITE_URL` / `VITE_SITE_URL` | Public frontend URL |
| `REVALIDATION_SECRET` | Shared with CMS |
| `PREVIEW_SECRET` | Guards `/api/preview` |

## Scripts

| Script | Action |
|---|---|
| `pnpm dev` | Start CMS (4004) + web (3004) concurrently |
| `pnpm dev:cms` / `pnpm dev:web` | Start one side only |
| `pnpm build` | Build CMS then web |
| `pnpm start` | Production mode (both) |
| `pnpm lint` | ESLint across workspace |
| `pnpm test` | vitest in CMS |
| `pnpm generate:types` | Regenerate `payload-types.ts` |

Per-package E2E:
- `pnpm --filter @templatebase/cms test:e2e`
- `pnpm --filter @templatebase/web test:e2e`

## Ports (default)

| Process | Port |
|---|---|
| `@templatebase/cms` (Next.js → Payload admin + REST/GraphQL) | `4004` |
| `@templatebase/web` (Express + Vite SSR) | `3004` |
| PostgreSQL | `5432` |

## How the two packages talk

```
┌────────────┐   REST (HTTP)   ┌────────────┐
│  packages/ │ ──────────────▶ │  packages/ │
│    web     │                 │    cms     │
│  (SSR)     │ ◀────────────── │  (Payload) │
└────────────┘   revalidate    └────────────┘
                 (HTTP POST)
```

- **Frontend → CMS**: `packages/web/src/lib/payload-client.ts` + `data-loader.ts` fetch JSON from `/api/<collection>`. No `getPayload()` in the frontend.
- **CMS → Frontend (cache purge)**: Payload `afterChange` hooks call `utilities/revalidateFrontend.ts` → POST `{path|tag}` + `Bearer REVALIDATION_SECRET` to `http://<web>/api/revalidate`.
- **Admin preview**: CMS builds a preview URL hitting `http://<web>/api/preview?secret=...&slug=...`; the web server sets `payload-draft` cookie and redirects. The page fetches drafts with `?draft=true`.

## Security

- Generate fresh secrets per deployment: `PAYLOAD_SECRET`, `REVALIDATION_SECRET`, `PREVIEW_SECRET`, `WEB_MANAGER_API_SECRET`, `CRON_SECRET` — use `openssl rand -hex 32`.
- `ecosystem.config.cjs` contains **no secrets** — PM2 inherits env from `packages/<app>/.env`.
- `users` collection has `maxLoginAttempts: 5` + `lockTime: 10min`.
- Media uploads are MIME-allowlisted (`image/*`, `application/pdf`) with a 10 MB cap and filename validation.
- Form submissions with an `hCaptcha` block are server-verified via `https://api.hcaptcha.com/siteverify` in `cms/src/hooks/verifyHCaptcha.ts`.
- Web SSR escapes `</` in the initial-data `<script>` to prevent script-tag breakout.
- Preview cookie is `httpOnly` + `secure` in production.
- Put the CMS behind nginx — do not expose port 4004 directly. The `X-Forwarded-For` allowlist in `web-manager.ts` only trusts the first hop.

## Deployment

PM2:
```bash
pnpm build
pm2 start ecosystem.config.cjs
```

nginx (template, one-process-per-port):
- `/` → `127.0.0.1:3004` (web)
- `/admin`, `/api/*` → `127.0.0.1:4004` (cms)

## Web-manager API

A management layer at `/api/web-manager/*` (on the CMS) lets an external web-manager upsert pages/posts, upload media, and trigger revalidation. Authentication is shared-secret (HMAC over header) + IP allowlist. See `docs/web-manager-api.md`.

## Database backup

Compressed dumps go in `database_backup/` (gitignored).

## Build status (2026-04-16)

- CMS + web both build cleanly
- Lint passes (0 errors; `any` warnings remain as technical debt)
- VRTPN conversion complete; no dead code between packages
