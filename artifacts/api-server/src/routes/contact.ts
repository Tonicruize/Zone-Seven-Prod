import { Router, type IRouter } from "express";
import { desc } from "drizzle-orm";
import { db, bookingsTable } from "@workspace/db";
import { requireAdmin } from "../lib/adminAuth";

const router: IRouter = Router();

/* ── Admin: list all bookings ───────────────────────────────────────── */

router.get("/admin/bookings", requireAdmin, async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(bookingsTable)
    .orderBy(desc(bookingsTable.createdAt));
  res.json(rows.map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    projectType: r.projectType,
    budget: r.budget ?? null,
    timeline: r.timeline ?? null,
    message: r.message,
    createdAt: r.createdAt.toISOString(),
  })));
});

/* ── Public: submit booking ─────────────────────────────────────────── */

router.post("/contact", async (req, res): Promise<void> => {
  const { name, email, projectType, budget, timeline, message } = req.body ?? {};

  if (
    typeof name !== "string" || !name.trim() ||
    typeof email !== "string" || !email.includes("@") ||
    typeof projectType !== "string" || !projectType.trim() ||
    typeof message !== "string" || !message.trim()
  ) {
    res.status(400).json({ error: "Missing required fields: name, email, projectType, message" });
    return;
  }

  await db.insert(bookingsTable).values({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    projectType: projectType.trim(),
    budget: typeof budget === "string" && budget ? budget : null,
    timeline: typeof timeline === "string" && timeline ? timeline : null,
    message: message.trim(),
  });

  res.status(201).json({ ok: true });
});

export default router;
