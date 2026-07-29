import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Footer } from '../components/Footer';

/* ─── Data ─────────────────────────────────────────────────────────── */

const MUSIC_VIDEOS = [
  { id: 'BddkwVLHAdA', num: '01', type: 'Music Video' },
  { id: 'SBKcys4q-YA', num: '02', type: 'Music Video' },
  { id: 'RM0BfYgD9vo', num: '03', type: 'Music Video' },
  { id: '3koLYkFzVgk', num: '04', type: 'Music Video' },
  { id: 'QtXj_1S6aOI', num: '05', type: 'Music Video' },
];

const BTS = [
  { id: 'EnbfopuJrHM', num: '01', type: 'Behind the Scenes' },
  { id: 'sEKn6OmkFBs', num: '02', type: 'Behind the Scenes' },
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

/* ─── Helpers ───────────────────────────────────────────────────────── */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
});

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div {...fadeUp()} className="flex items-center gap-6 mb-16 md:mb-20">
      <span className="text-[9px] tracking-[0.45em] text-primary uppercase shrink-0">
        {children}
      </span>
      <div className="flex-1 h-px bg-primary/20" />
    </motion.div>
  );
}

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

function VideoCard({
  video,
  large = false,
  delay = 0,
}: {
  video: (typeof MUSIC_VIDEOS)[number] | (typeof BTS)[number];
  large?: boolean;
  delay?: number;
}) {
  return (
    <motion.div {...fadeUp(delay)}>
      <div className={`flex items-center justify-between border-t-2 ${large ? 'border-primary' : 'border-primary/50'} pt-4 mb-5`}>
        <span className="text-[10px] tracking-[0.45em] text-primary/70 uppercase font-medium">
          {video.num}
        </span>
        <span className="text-[9px] tracking-[0.35em] text-foreground/35 uppercase">
          {video.type}
        </span>
      </div>
      <EmbedFrame id={video.id} title={`${video.type} ${video.num}`} />
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
      {/* Scroll buttons */}
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

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Track */}
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
            {/* Hover overlay */}
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
      <SectionLabel>The Team</SectionLabel>
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
  const [featured, ...rest] = MUSIC_VIDEOS;
  const row2 = rest.slice(0, 2);
  const row3 = rest.slice(2);

  return (
    <main className="bg-background min-h-[100dvh] text-foreground">

      {/* Page header */}
      <section className="px-6 md:px-12 lg:px-20 pt-36 md:pt-44 pb-20 md:pb-28 border-b border-foreground/5">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-display font-bold uppercase tracking-[-0.02em] leading-none"
          style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)' }}
        >
          Selected<br />
          <span className="text-primary">Works</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-6 text-[10px] tracking-[0.4em] text-foreground/35 uppercase"
        >
          Music Videos · Commercials · Creative Direction
        </motion.p>
      </section>

      {/* ── Music Videos ── */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28 border-b border-foreground/5">
        <SectionLabel>Featured Projects</SectionLabel>

        {/* 01 — Hero embed */}
        <div className="mb-16 md:mb-24">
          <VideoCard video={featured} large />
        </div>

        {/* 02 & 03 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mb-16 md:mb-20">
          {row2.map((v, i) => (
            <VideoCard key={v.id} video={v} delay={i * 0.1} />
          ))}
        </div>

        {/* 04 & 05 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {row3.map((v, i) => (
            <VideoCard key={v.id} video={v} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* ── BTS ── */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28 border-b border-foreground/5">
        <SectionLabel>Behind the Scenes</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {BTS.map((v, i) => (
            <VideoCard key={v.id} video={v} delay={i * 0.12} />
          ))}
        </div>
      </section>

      {/* ── Instagram Reels ── */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28 border-b border-foreground/5 overflow-hidden">
        <SectionLabel>Latest on Instagram</SectionLabel>
        <ReelsCarousel />
      </section>

      {/* ── Team ── */}
      <TeamSection />

      <Footer />
    </main>
  );
}
