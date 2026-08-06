import { Router, type IRouter } from "express";
import { asc, eq } from "drizzle-orm";
import { db, beatsTable } from "@workspace/db";
import { requireAdmin } from "../lib/adminAuth";

const router: IRouter = Router();

function toDto(row: typeof beatsTable.$inferSelect) {
  return {
    id: row.id,
    title: row.title,
    genre: row.genre,
    bpm: row.bpm,
    key: row.key ?? null,
    price: row.price ?? null,
    tags: row.tags ?? [],
    storagePath: row.storagePath ?? null,
    position: row.position,
    createdAt: row.createdAt.toISOString(),
  };
}

/* ── Public ───────────────────────────────────────────────────────── */

router.get("/beats", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(beatsTable)
    .orderBy(asc(beatsTable.position), asc(beatsTable.createdAt));
  res.json(rows.map(toDto));
});

/* ── Admin ────────────────────────────────────────────────────────── */

router.get("/admin/beats", requireAdmin, async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(beatsTable)
    .orderBy(asc(beatsTable.position), asc(beatsTable.createdAt));
  res.json(rows.map(toDto));
});

router.post("/admin/beats", requireAdmin, async (req, res): Promise<void> => {
  const { title, genre, bpm, key, price, tags, storagePath } = req.body ?? {};

  if (
    typeof title !== "string" || !title.trim() ||
    typeof genre !== "string" || !genre.trim() ||
    !bpm || isNaN(Number(bpm))
  ) {
    res.status(400).json({ error: "title, genre, and bpm are required" });
    return;
  }

  const existing = await db.select({ pos: beatsTable.position }).from(beatsTable);
  const maxPos = existing.reduce((m, r) => Math.max(m, r.pos), -1);

  const tagsArr: string[] | null =
    Array.isArray(tags) ? tags.filter(Boolean) :
    typeof tags === "string" && tags.trim() ? tags.split(",").map((t: string) => t.trim()).filter(Boolean) :
    null;

  const [row] = await db.insert(beatsTable).values({
    title: title.trim(),
    genre: genre.trim().toUpperCase(),
    bpm: Number(bpm),
    key: typeof key === "string" && key.trim() ? key.trim() : null,
    price: typeof price === "string" && price.trim() ? price.trim() : null,
    tags: tagsArr,
    storagePath: typeof storagePath === "string" && storagePath ? storagePath : null,
    position: maxPos + 1,
  }).returning();

  res.status(201).json(toDto(row));
});

router.delete("/admin/beats/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(String(req.params.id), 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const [row] = await db.delete(beatsTable).where(eq(beatsTable.id, id)).returning();
  if (!row) {
    res.status(404).json({ error: "Beat not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
