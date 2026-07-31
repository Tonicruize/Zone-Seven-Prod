/**
 * Seed script — populates works_videos with Zone7's real catalogue.
 * Idempotent: skips seeding if any rows already exist.
 */
import { db, worksVideosTable } from "@workspace/db";

const MUSIC_VIDEOS = [
  { title: "Man 2 Man",   youtubeId: "4xpww6rnz_w", position: 0 },
  { title: "Wife Material", youtubeId: "OAHZE1gqIhY", position: 1 },
  { title: "Labubu",       youtubeId: "H3JXXYGpqNU", position: 2 },
  { title: "Music Video 04", youtubeId: "BddkwVLHAdA", position: 3 },
  { title: "Music Video 05", youtubeId: "SBKcys4q-YA", position: 4 },
  { title: "Music Video 06", youtubeId: "RM0BfYgD9vo", position: 5 },
  { title: "Music Video 07", youtubeId: "3koLYkFzVgk", position: 6 },
  { title: "Music Video 08", youtubeId: "QtXj_1S6aOI", position: 7 },
];

const BTS_VIDEOS = [
  { title: "BTS 01", youtubeId: "EnbfopuJrHM", position: 0 },
  { title: "BTS 02", youtubeId: "sEKn6OmkFBs", position: 1 },
];

async function seed() {
  // Check if any rows already exist — if yes, skip to preserve real data.
  const existing = await db.select().from(worksVideosTable).limit(1);
  if (existing.length > 0) {
    console.log("Database already has video data — skipping seed.");
    return;
  }

  const rows = [
    ...MUSIC_VIDEOS.map((v) => ({
      title: v.title,
      videoType: "music-video" as const,
      youtubeId: v.youtubeId,
      storagePath: null,
      thumbnailPath: null,
      position: v.position,
    })),
    ...BTS_VIDEOS.map((v) => ({
      title: v.title,
      videoType: "bts" as const,
      youtubeId: v.youtubeId,
      storagePath: null,
      thumbnailPath: null,
      position: v.position,
    })),
  ];

  await db.insert(worksVideosTable).values(rows);
  console.log(`Seeded ${rows.length} videos (${MUSIC_VIDEOS.length} music-video, ${BTS_VIDEOS.length} bts).`);
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });
