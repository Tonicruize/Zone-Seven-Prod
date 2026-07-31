import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Footer } from '../components/Footer';
import { storageUrl } from '../lib/adminApi';

/* ─── Static fallback data ──────────────────────────────────────────── */

const FALLBACK_MUSIC_VIDEOS = [
  { youtubeId: 'BddkwVLHAdA', num: '01', title: 'Music Video 01' },
  { youtubeId: 'SBKcys4q-YA', num: '02', title: 'Music Video 02' },
  { youtubeId: 'RM0BfYgD9vo', num: '03', title: 'Music Video 03' },
  { youtubeId: '3koLYkFzVgk', num: '04', title: 'Music Video 04' },
  { youtubeId: 'QtXj_1S6aOI', num: '05', title: 'Music Video 05' },
];

const FALLBACK_BTS = [
  { youtubeId: 'EnbfopuJrHM', num: '01', title: 'BTS 01' },
  { youtubeId: 'sEKn6OmkFBs', num: '02', title: 'BTS 02' },
];

const REELS = [
  'DR1LZB9DFUR', 'DRys1ZWDCzQ', 'DV76W5HCMEf', 'DVEmCWgiOJY',
  'DQbb0a8jKcu', 'DRHvF7IjLwi', 'DRC17ekDAYQ', 'DQUf5vMDEs4',
  'DQABE88Ak0O', 'DTtCI61Db2f', 'DVd0N35jDbg', 'DVbMNhqjQLN',
];

const TEAM = [
  {
    name: 'Zone7',
    role: 'Production House',
    socials: [
      { label: 'Instagram', href: 'https://www.instagram.com/zone7rf' },
      { label: 'TikTok',    href: 'https://www.tiktok.com/@zone7_productions' },
    ],
  },
  {
    name: 'Kinger Cinematics',
    role: 'Cinematographer',
    socials: [
      { label: 'Instagram', href: 'https://www.instagram.com/notkinger' },
      { label: 'TikTok',    href: 'https://www.tiktok.com/@kinger_cinematics_' },
    ],
  },
  {
    name: 'Cyrodys',
    role: 'Creative',
    socials: [
      { label: 'Instagram', href: 'https://www.instagram.com/cyrodys' },
    ],
  },
];

/* ─── API video shape ───────────────────────────────────────────────── */

interface ApiVideo {
  id: number;
  title: string;
  videoType: string; // "music-video" | "bts" | "reels"
  storagePath: string | null;
  youtubeId: string | null;
  thumbnailPath: string | null;
  position: number;
}

/** Normalised shape used inside this page */
interface VideoItem {
  key: string;
  num: string;
  title: string;
  youtubeId: string | null;
  storagePath: string | null;
}

function toVideoItem(v: ApiVideo, idx: number): VideoItem {
  return {
    key: String(v.id),
    num: String(idx + 1).padStart(2, '0'),
    title: v.title,
    youtubeId: v.youtubeId,
    storagePath: v.storagePath,
  };
}

type Tab = 'music-videos' | 'bts' | 'reels';

const TABS: { id: Tab; label: string }[] = [
  { id: 'music-videos', label: 'Music Videos' },
  { id: 'bts',          label: 'Behind the Scenes' },
  { id: 'reels',        label: 'Instagram Reels' },
];

/* ─── Helpers ───────────────────────────────────────────────────────── */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
});

function EmbedFrame({ id, title }: { id: string; title: string }) {
  return (
    <div className="relative w-full overflow-hidden bg-black" style={{ paddingTop: '56.25%' }}>
      <iframe
        src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&color=white`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 w-full h-full border-0"
      />
    </div>
  );
}

function StorageVideoFrame({ path, title }: { path: string; title: string }) {
  return (
    <div className="relative w-full overflow-hidden bg-black" style={{ paddingTop: '56.25%' }}>
      <video
        src={storageUrl(path)}
        title={title}
        controls
        preload="metadata"
        className="absolute inset-0 w-full h-full object-contain"
      />
    </div>
  );
}

function VideoCard({ video, large = false, delay = 0 }: { video: VideoItem; large?: boolean; delay?: number }) {
  return (
    <motion.div {...fadeUp(delay)}>
      <div className={`flex items-center justify-between border-t-2 ${large ? 'border-primary' : 'border-primary/50'} pt-4 mb-5`}>
        <span className="text-[10px] tracking-[0.45em] text-primary/70 uppercase font-medium">
          {video.num}
        </span>
        <span className="text-[9px] tracking-[0.35em] text-foreground/35 uppercase">
          {video.title}
        </span>
      </div>
      {video.storagePath
        ? <StorageVideoFrame path={video.storagePath} title={video.title} />
        : video.youtubeId
          ? <EmbedFrame id={video.youtubeId} title={video.title} />
          : null}
    </motion.div>
  );
}

/* ─── Instagram Reel Carousel ───────────────────────────────────────── */

function ReelsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'right' ? 320 : -320, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div className="hidden md:flex absolute -top-14 right-0 gap-3 z-10">
        {(['left', 'right'] as const).map((dir) => (
          <button
            key={dir}
            onClick={() => scroll(dir)}
            className="interactive w-10 h-10 border border-foreground/20 flex items-center justify-center
              text-foreground/50 hover:text-primary hover:border-primary transition-colors duration-200"
          >
            {dir === 'left' ? '←' : '→'}
          </button>
        ))}
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div
        ref={trackRef}
        className="flex gap-3 overflow-x-auto pb-4 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {REELS.map((shortcode, i) => (
          <motion.a
            key={shortcode}
            href={`https://www.instagram.com/reel/${shortcode}/`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.4) }}
            className="interactive flex-shrink-0 relative overflow-hidden group"
            style={{ width: 200, height: 355 }}
          >
            <iframe
              src={`https://www.instagram.com/reel/${shortcode}/embed/`}
              className="w-full h-full border-0 pointer-events-none"
              loading="lazy"
              scrolling="no"
              title={`Reel ${i + 1}`}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300
                text-[8px] tracking-[0.4em] uppercase text-white border border-white/60 px-4 py-2">
                View ↗
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}

/* ─── Team ──────────────────────────────────────────────────────────── */

function TeamSection() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t border-foreground/5">
      <div className="flex items-center gap-6 mb-16 md:mb-20">
        <span className="text-[9px] tracking-[0.45em] text-primary uppercase shrink-0">The Team</span>
        <div className="flex-1 h-px bg-primary/20" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-screen-2xl mx-auto">
        {TEAM.map((member, i) => (
          <motion.div key={member.name} {...fadeUp(i * 0.1)}>
            <p className="text-[8px] tracking-[0.4em] text-foreground/35 uppercase mb-3">
              {member.role}
            </p>
            <h3
              className="text-display font-bold uppercase tracking-tight text-foreground mb-6 leading-none"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)' }}
            >
              {member.name}
            </h3>
            <div className="flex gap-6">
              {member.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive text-[9px] tracking-[0.35em] uppercase text-foreground/40
                    hover:text-primary transition-colors duration-200 border-b border-transparent
                    hover:border-primary pb-0.5"
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */

export function WorkPage() {
  const [activeTab, setActiveTab] = useState<Tab>('music-videos');

  // API state — falls back to hardcoded data if empty / errored
  const [musicVideos, setMusicVideos] = useState<VideoItem[]>(
    FALLBACK_MUSIC_VIDEOS.map((v, i) => ({ key: v.youtubeId, num: v.num, title: v.title, youtubeId: v.youtubeId, storagePath: null }))
  );
  const [btsVideos, setBtsVideos] = useState<VideoItem[]>(
    FALLBACK_BTS.map((v, i) => ({ key: v.youtubeId, num: v.num, title: v.title, youtubeId: v.youtubeId, storagePath: null }))
  );

  useEffect(() => {
    fetch('/api/videos')
      .then((r) => r.ok ? r.json() as Promise<ApiVideo[]> : Promise.resolve([]))
      .then((data) => {
        if (!data.length) return; // keep fallback
        const sorted = [...data].sort((a, b) => a.position - b.position);
        const mv = sorted.filter((v) => v.videoType === 'music-video').map(toVideoItem);
        const bts = sorted.filter((v) => v.videoType === 'bts').map(toVideoItem);
        const rl = sorted.filter((v) => v.videoType === 'reels' && v.youtubeId)
          .map((v) => ({ shortcode: v.youtubeId!, title: v.title }));
        if (mv.length) setMusicVideos(mv);
        if (bts.length) setBtsVideos(bts);
        if (rl.length) setApiReels(rl);
      })
      .catch(() => {/* keep fallback */});
  }, []);

  const [featured, ...rest] = musicVideos;
  const row2 = rest.slice(0, 2);
  const row3 = rest.slice(2);

  return (
    <main className="bg-background min-h-[100dvh] text-foreground">

      {/* Page header */}
      <section className="px-6 md:px-12 lg:px-20 pt-36 md:pt-44 pb-12 md:pb-16 border-b border-foreground/5">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-display font-bold uppercase tracking-[-0.02em] leading-none"
          style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)' }}
        >
          Selected <span className="text-primary">Works</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-3 text-[10px] tracking-[0.4em] text-foreground/35 uppercase"
        >
          Music Videos · Commercials · Creative Direction
        </motion.p>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center gap-2 mt-10"
        >
          {TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`interactive px-5 py-2 text-[9px] tracking-[0.3em] uppercase transition-all duration-300
                  ${active
                    ? 'border border-primary text-primary bg-primary/10'
                    : 'border border-foreground/15 text-foreground/40 hover:border-foreground/40 hover:text-foreground/70'
                  }`}
              >
                {tab.label}
              </button>
            );
          })}
        </motion.div>
      </section>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === 'music-videos' && (
          <motion.section
            key="music-videos"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="px-6 md:px-12 lg:px-20 py-20 md:py-28 border-b border-foreground/5"
          >
            {featured && (
              <div className="mb-16 md:mb-24">
                <VideoCard video={featured} large />
              </div>
            )}
            {row2.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mb-16 md:mb-20">
                {row2.map((v, i) => <VideoCard key={v.key} video={v} delay={i * 0.1} />)}
              </div>
            )}
            {row3.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                {row3.map((v, i) => <VideoCard key={v.key} video={v} delay={i * 0.1} />)}
              </div>
            )}
          </motion.section>
        )}

        {activeTab === 'bts' && (
          <motion.section
            key="bts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="px-6 md:px-12 lg:px-20 py-20 md:py-28 border-b border-foreground/5"
          >
            {btsVideos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                {btsVideos.map((v, i) => <VideoCard key={v.key} video={v} delay={i * 0.12} />)}
              </div>
            ) : (
              <p className="text-[10px] tracking-[0.4em] text-foreground/25 uppercase">No BTS videos yet.</p>
            )}
          </motion.section>
        )}

        {activeTab === 'reels' && (
          <motion.section
            key="reels"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="px-6 md:px-12 lg:px-20 py-20 md:py-28 border-b border-foreground/5 overflow-hidden"
          >
            <ReelsCarousel />
          </motion.section>
        )}
      </AnimatePresence>

      <TeamSection />
      <Footer />
    </main>
  );
}
