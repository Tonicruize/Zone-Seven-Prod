# Zone7

A dark-luxury creative brand site for Zone7 — a music video and commercial production collective. Features the full brand homepage, beats page, about page, and booking page.

## Run & Operate

- `pnpm --filter @workspace/zone7 run dev` — run the frontend (workflow: `artifacts/zone7: web`)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS v4, Framer Motion, wouter
- UI: shadcn/ui (New York style), Radix primitives
- Fonts: Satoshi (display), Inter (body) via Google Fonts / Fontshare

## Where things live

- `artifacts/zone7/` — main frontend (the Zone7 brand site)
- `artifacts/zone7/src/components/` — page sections (Hero, Navigation, VideoWorks, etc.)
- `artifacts/zone7/src/pages/` — routed pages (BeatsPage, AboutPage, BookingPage)
- `artifacts/zone7/src/index.css` — theme tokens (dark luxury: near-black bg, gold primary)
- `attached_assets/` — brand images (logos, product shots, project photos)

## Architecture decisions

- Frontend-only: no API routes or database needed; all content is static/hardcoded.
- wouter used for client-side routing (`/`, `/beats`, `/about`, `/book`).
- Custom cursor (Cursor component) with `cursor: none` on all elements.
- Framer Motion for page transitions and scroll animations.
- `@assets` alias in vite.config.ts resolves to `../../attached_assets` for brand images.

## Product

Zone7 is a music video and commercial production collective. The site showcases their work, services (music videos, commercials, creative direction, beat production), lets visitors browse beats, learn about the collective, and book a project.

## User preferences

_Populate as you build._

## Gotchas

- `attached_assets/` is at the workspace root (not inside `artifacts/zone7/`) — the `@assets` vite alias bridges this.
- The workflow (`artifacts/zone7: web`) injects `PORT` and `BASE_PATH` env vars; do not run `pnpm dev` at the root.
- Custom cursor forces `cursor: none !important` globally — intentional design choice.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
