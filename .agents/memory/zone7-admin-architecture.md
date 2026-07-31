---
name: Zone7 admin panel architecture
description: Admin panel auth, object storage upload flow, and DB schema for the Zone7 site.
---

# Zone7 Admin Panel Architecture

## Auth
- Single `ADMIN_PASSWORD` secret → JWT signed with `SESSION_SECRET`
- JWT stored in `localStorage` under key `zone7_admin_token`
- `requireAdmin` middleware in `artifacts/api-server/src/lib/adminAuth.ts`
- Login endpoint: `POST /api/auth/login`

## Object Storage
- Provisioned via `setupObjectStorage()` — bucket ID in `DEFAULT_OBJECT_STORAGE_BUCKET_ID`
- Presigned URL upload flow: client POSTs metadata to `/api/storage/uploads/request-url` (admin-only), then PUTs file directly to GCS presigned URL
- Files served at `/api/storage/objects/{objectPath}`
- `artifacts/api-server/src/lib/objectStorage.ts` + `objectAcl.ts` handle GCS
- Client helper: `artifacts/zone7/src/lib/adminApi.ts` — `uploadFile(file)` returns `objectPath`, `storageUrl(path)` converts to serving URL

## DB Schema
- `works_videos` table: `id, title, video_type, storage_path, youtube_id, thumbnail_path, position, created_at, updated_at`
- `gallery_images` table: `id, alt_text, storage_path, position, created_at, updated_at`
- Both in `lib/db/src/schema/` and exported from `lib/db/src/schema/index.ts`

## Key decisions
- WorkPage and BrandGallery fetch from API but fall back to hardcoded data if API returns empty — site never goes blank
- `pnpm.overrides` in root `package.json` pins `react/react-dom` to `19.1.0` (required by Uppy v5 peer dep resolution)
- `jsonwebtoken` and `google-auth-library` added to esbuild `external[]` in `artifacts/api-server/build.mjs`
- Admin route `/admin` rendered outside `AppShell` — no preloader, cursor, or navigation bar

**Why:** Keeping fallback hardcoded data means the public site works even when DB is empty; the admin panel is the only way to populate it.
