import { Router, type IRouter } from "express";
import { asc, eq } from "drizzle-orm";
import { db, galleryImagesTable } from "@workspace/db";
import {
  ListGalleryResponse,
  AdminListImagesResponse,
  AdminCreateImageBody,
  AdminCreateImageResponse,
  AdminUpdateImageParams,
  AdminUpdateImageBody,
  AdminUpdateImageResponse,
  AdminDeleteImageParams,
} from "@workspace/api-zod";
import { requireAdmin } from "../lib/adminAuth";

const router: IRouter = Router();

/* ── Public ─────────────────────────────────────────────────────────── */

router.get("/gallery", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(galleryImagesTable)
    .orderBy(asc(galleryImagesTable.position), asc(galleryImagesTable.createdAt));
  res.json(ListGalleryResponse.parse(rows.map(toDto)));
});

/* ── Admin ──────────────────────────────────────────────────────────── */

router.get("/admin/images", requireAdmin, async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(galleryImagesTable)
    .orderBy(asc(galleryImagesTable.position), asc(galleryImagesTable.createdAt));
  res.json(AdminListImagesResponse.parse(rows.map(toDto)));
});

router.post("/admin/images", requireAdmin, async (req, res): Promise<void> => {
  const parsed = AdminCreateImageBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const existing = await db.select().from(galleryImagesTable);
  const maxPos = existing.reduce((m, r) => Math.max(m, r.position), -1);

  const [row] = await db
    .insert(galleryImagesTable)
    .values({
      storagePath: parsed.data.storagePath,
      altText: parsed.data.altText ?? null,
      position: parsed.data.position ?? maxPos + 1,
    })
    .returning();

  res.status(201).json(AdminCreateImageResponse.parse(toDto(row)));
});

router.patch("/admin/images/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = AdminUpdateImageParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const parsed = AdminUpdateImageBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [row] = await db
    .update(galleryImagesTable)
    .set({
      ...(parsed.data.altText !== undefined && { altText: parsed.data.altText }),
      ...(parsed.data.position !== undefined && { position: parsed.data.position }),
    })
    .where(eq(galleryImagesTable.id, params.data.id))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Image not found" });
    return;
  }

  res.json(AdminUpdateImageResponse.parse(toDto(row)));
});

router.delete("/admin/images/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = AdminDeleteImageParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const [row] = await db
    .delete(galleryImagesTable)
    .where(eq(galleryImagesTable.id, params.data.id))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Image not found" });
    return;
  }

  res.sendStatus(204);
});

/* ── Helpers ──────────────────────────────────────────────────────────── */

function toDto(row: typeof galleryImagesTable.$inferSelect) {
  return {
    id: row.id,
    altText: row.altText ?? null,
    storagePath: row.storagePath,
    position: row.position,
    createdAt: row.createdAt.toISOString(),
  };
}

export default router;
