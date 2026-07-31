import { Router, type IRouter } from "express";
import { asc, eq } from "drizzle-orm";
import { db, worksVideosTable } from "@workspace/db";
import {
  ListVideosResponse,
  AdminListVideosResponse,
  AdminCreateVideoBody,
  AdminCreateVideoResponse,
  AdminUpdateVideoParams,
  AdminUpdateVideoBody,
  AdminUpdateVideoResponse,
  AdminDeleteVideoParams,
} from "@workspace/api-zod";
import { requireAdmin } from "../lib/adminAuth";

const router: IRouter = Router();

/* ── Public ─────────────────────────────────────────────────────────── */

router.get("/videos", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(worksVideosTable)
    .orderBy(asc(worksVideosTable.position), asc(worksVideosTable.createdAt));
  res.json(ListVideosResponse.parse(rows.map(toDto)));
});

/* ── Admin ──────────────────────────────────────────────────────────── */

router.get("/admin/videos", requireAdmin, async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(worksVideosTable)
    .orderBy(asc(worksVideosTable.position), asc(worksVideosTable.createdAt));
  res.json(AdminListVideosResponse.parse(rows.map(toDto)));
});

router.post("/admin/videos", requireAdmin, async (req, res): Promise<void> => {
  const parsed = AdminCreateVideoBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  // Auto-assign next position
  const existing = await db.select().from(worksVideosTable);
  const maxPos = existing.reduce((m, r) => Math.max(m, r.position), -1);

  const [row] = await db
    .insert(worksVideosTable)
    .values({
      title: parsed.data.title,
      videoType: parsed.data.videoType,
      storagePath: parsed.data.storagePath ?? null,
      youtubeId: parsed.data.youtubeId ?? null,
      thumbnailPath: parsed.data.thumbnailPath ?? null,
      position: parsed.data.position ?? maxPos + 1,
    })
    .returning();

  res.status(201).json(AdminCreateVideoResponse.parse(toDto(row)));
});

router.patch("/admin/videos/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = AdminUpdateVideoParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const parsed = AdminUpdateVideoBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [row] = await db
    .update(worksVideosTable)
    .set({
      ...(parsed.data.title !== undefined && { title: parsed.data.title }),
      ...(parsed.data.videoType !== undefined && { videoType: parsed.data.videoType }),
      ...(parsed.data.storagePath !== undefined && { storagePath: parsed.data.storagePath }),
      ...(parsed.data.youtubeId !== undefined && { youtubeId: parsed.data.youtubeId }),
      ...(parsed.data.thumbnailPath !== undefined && { thumbnailPath: parsed.data.thumbnailPath }),
      ...(parsed.data.position !== undefined && { position: parsed.data.position }),
    })
    .where(eq(worksVideosTable.id, params.data.id))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Video not found" });
    return;
  }

  res.json(AdminUpdateVideoResponse.parse(toDto(row)));
});

router.delete("/admin/videos/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = AdminDeleteVideoParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const [row] = await db
    .delete(worksVideosTable)
    .where(eq(worksVideosTable.id, params.data.id))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Video not found" });
    return;
  }

  res.sendStatus(204);
});

/* ── Helpers ──────────────────────────────────────────────────────────── */

function toDto(row: typeof worksVideosTable.$inferSelect) {
  return {
    id: row.id,
    title: row.title,
    videoType: row.videoType,
    storagePath: row.storagePath ?? null,
    youtubeId: row.youtubeId ?? null,
    thumbnailPath: row.thumbnailPath ?? null,
    position: row.position,
    createdAt: row.createdAt.toISOString(),
  };
}

export default router;
