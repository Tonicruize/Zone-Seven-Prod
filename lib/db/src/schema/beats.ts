import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";

export const beatsTable = pgTable("beats", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  genre: text("genre").notNull(),
  bpm: integer("bpm").notNull(),
  key: text("key"),
  price: text("price"),
  tags: text("tags").array(),
  storagePath: text("storage_path"),
  position: integer("position").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export type Beat = typeof beatsTable.$inferSelect;
export type InsertBeat = typeof beatsTable.$inferInsert;
