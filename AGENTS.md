# Base44 Dev Environment

## What this is
A Next.js 15 (App Router) frontend for "Kvalitetsplan" (Quality WorX) — a digital
quality plan for construction projects. Pure client-side app: auth and data
persist in `localStorage`. There is **no backend, no database, no API**.

## Running
```
docker compose -f docker-compose.base44.yml up -d
```
- Service `web`: `node:22-alpine`, bind-mounts the repo at `/app`, runs
  `npm install` then `next dev` on `0.0.0.0:3000`.
- Live reload is active (Next dev server watches the bind-mounted source).

## Secrets
None required at boot. `.env.example` lists Supabase vars, but they are **not
referenced anywhere in the code** — Supabase integration is a planned future
step. Do not request Supabase credentials to boot.

## Notes / quirks
- `next.config.ts` sets `allowedDevOrigins` from `BASE44_PUBLIC_HOST_SUFFIX` so
  the preview origin can load dev assets/HMR. Do not remove.
- Path alias `@/*` maps to repo root (see `tsconfig.json`).
- First page (`app/page.tsx`) wraps `PlanApp` in `MagicGate`, a localStorage
  magic-link auth gate. To get past it: enter any email, click "Skapa
  inloggningslänk", then open the generated link.
