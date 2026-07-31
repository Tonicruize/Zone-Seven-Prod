import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const worksVideosTable = pgTable("works_videos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  videoType: text("video_type").notNull(), // "music-video" | "bts" | "reels"
  storagePath: text("storage_path"),       // object storage path for uploaded files
  youtubeId: text("youtube_id"),           // YouTube video ID
  thumbnailPath: text("thumbnail_path"),   // storage path for thumbnail
  position: integer("position").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertWorksVideoSchema = createInsertSchema(worksVideosTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertWorksVideo = z.infer<typeof insertWorksVideoSchema>;
export type WorksVideo = typeof worksVideosTable.$inferSelect;
