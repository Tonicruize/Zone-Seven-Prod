---
name: Zone7 Replit migration
description: Notes from porting the Zone7 Vercel project to the Replit pnpm_workspace. Covers what was found, what was fixed, and the final state.
---

# Zone7 Replit Migration

## What was found
- The imported project was already a Vite + React app — no Next.js conversion needed.
- `artifacts/zone7/` existed on disk with real source but was not registered in the artifact system (`listArtifacts` returned `[]`).
- The backup at `.migration-backup/artifacts/zone7/src/` matched the workspace source.
- The new scaffold wrote a placeholder `App.tsx` and `index.css` into `artifacts/zone7/src/` after `createArtifact`.

## What was done
1. Backed up `artifacts/zone7` to `/tmp/zone7-backup`, removed the dir, called `createArtifact` to register it, then restored source files from the backup.
2. Ran `pnpm install`, `pnpm --filter @workspace/api-spec run codegen`, `pnpm --filter @workspace/db run push`.
3. Started `artifacts/zone7: web` and `artifacts/api-server: API Server` workflows.

## Bug fixed
- `WorkPage.tsx` called `setApiReels(rl)` but no such state setter was declared. `ReelsCarousel` reads from the static `REELS` array directly. Removed the dead call.

**Why:** The setter was never wired — the carousel component reads a module-level constant, not React state. Leaving the call would throw a ReferenceError at runtime if the API returns any reels-type videos.

## Final state
- Typecheck: clean (`pnpm --filter @workspace/zone7 run typecheck` exits 0).
- Both workflows running.
- DB tables `works_videos` and `gallery_images` exist.
- Codegen outputs up to date in `lib/api-client-react` and `lib/api-zod`.
