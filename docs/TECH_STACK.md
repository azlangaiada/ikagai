# Tech Stack — PVRTNP

A brief overview of the stack powering this template.

## Acronym

| Letter | Technology | Role |
|---|---|---|
| **P** | **Payload CMS** 3.80 | Headless CMS — collections, blocks, globals, admin UI |
| **V** | **Vite** 7 + Express SSR | Frontend build tool and dev server |
| **R** | **React** 19.2 | UI library |
| **T** | **Tailwind** CSS v4 | Utility-first styling |
| **N** | **Next.js** 16 | Runtime hosting the Payload admin + Payload API |
| **P** | **PostgreSQL** | Relational database (via `@payloadcms/db-postgres`) |

All glued together in **TypeScript** across the whole monorepo.

## Monorepo Layout

```
templatebase/
├── packages/
│   ├── cms/    ← Payload CMS on Next.js 16 (port 4004)
│   └── web/    ← Vite SSR frontend with Express (port 3004)
├── pnpm-workspace.yaml
├── ecosystem.config.cjs    ← PM2 runtime config
└── docs/
```

## CMS (`packages/cms`) — Payload + Next.js

- **Framework:** Next.js 16.2 hosting Payload 3.80 admin + REST/GraphQL API
- **Database:** PostgreSQL via `@payloadcms/db-postgres`
- **Editor:** Lexical rich text (`@payloadcms/richtext-lexical`)
- **Image processing:** Sharp

**Collections:** Pages, Posts, Media, Categories, Users, Services, Portfolio, About, Departments, Team

**Globals:** Header, Footer, Settings

**Blocks (content composition):**
- Page-level: CallToAction, Content, MediaBlock, Archive, FormBlock, ContentMedia, ServicesBlock, PortfolioBlock, AboutBlock, CareerBlock
- Service-level: CallToAction, Content, MediaBlock, FormBlock, ContentMedia
- Rich-text-embedded: Banner, Code, MediaBlock, RelatedPosts

**Plugins:**
- SEO (auto meta generation)
- Form Builder (with hCaptcha + file upload)
- Nested Docs (category hierarchies)
- Redirects (with auto-revalidation)
- Search (post indexing)
- Live Preview (mobile/tablet/desktop breakpoints)

## Web (`packages/web`) — Vite SSR + React

- **Framework:** React 19.2 + React Router 7
- **SSR:** Vite 7 dev middleware in dev, Express server in production
- **Styling:** Tailwind CSS v4 (with PostCSS), Tailwind Typography plugin, Radix UI primitives, Lucide icons
- **Forms:** react-hook-form + hCaptcha
- **SEO:** react-helmet-async
- **Caching:** node-cache for REST API responses with `/api/revalidate` webhook invalidation
- **Draft preview:** secure cookie-gated preview mode via Payload Live Preview

**Routes:**
- `/` — homepage (dynamic from Pages)
- `/posts`, `/posts/page/:n`, `/posts/:slug` — blog with pagination
- `/services/:slug` — services detail
- `/search` — global search
- `/:slug` — dynamic pages

## Runtime

- **Node.js:** 20.x LTS
- **Package manager:** pnpm 9 (workspaces)
- **Process manager:** PM2 (two processes: `templatebase-cms`, `templatebase-web`)
- **Ports:** CMS on 4004, Web on 3004

## Environment Variables

| Variable | Used by | Purpose |
|---|---|---|
| `DATABASE_URL` | CMS | Postgres connection string |
| `PAYLOAD_SECRET` | CMS | Payload signing secret |
| `PAYLOAD_URL` | CMS, Web | Admin/API origin |
| `FRONTEND_URL` | CMS, Web | Public site origin |
| `CRON_SECRET` | CMS | Scheduled task auth |
| `PREVIEW_SECRET` | CMS, Web | Draft preview cookie key |
| `REVALIDATION_SECRET` | CMS, Web | Cache revalidation webhook |

## Data Flow

```
Editor ──► Payload Admin (CMS :4004) ──► PostgreSQL
                                          │
                                          ▼
                              Payload REST/GraphQL API
                                          │
                                          ▼
Visitor ──► Web SSR (Express :3004) ──► fetch + node-cache
                                          │
                                          ▼
                              React 19 hydration in browser
```

On content change, Payload webhook → `/api/revalidate` on Web → `node-cache` cleared → next request re-fetches fresh data.

## Deployment Topology

- **Laptop (macOS):** canonical dev checkout at `/Users/rogerwoolie/documents/gaiada_tools/templatebase`
- **GCP VM `gda-s01`:** production deploy target at `/var/www/templatebase` — git pulls, pnpm builds, PM2 runs
- **GitHub:** `Gaia-Digital-Agency/web_templatebase`

## Why PVRTNP

- **Payload over raw Next.js + Prisma:** collection/block model + admin UI out of the box
- **Vite SSR over Next.js for the frontend:** faster dev iteration, full control over the server, no framework lock-in for the public site
- **React 19 + Tailwind v4:** latest UI stack with concurrent features and fast compile
- **Next.js only for CMS:** Payload 3 requires it for the admin runtime
- **PostgreSQL:** relational integrity for blocks, versioning, and drafts
