import { motion } from 'framer-motion';
import heroGraphic from '@assets/Untitled_Project_-_T-Shirt_3_1785000831561.png';
import { MagneticButton } from './MagneticButton';
import { Ticker } from './Ticker';

const LATEST = { title: 'Man 2 Man', artist: 'Dremo', url: 'https://youtu.be/4xpww6rnz_w' };
const SERVICES = ['Music Videos', 'Commercials', 'Creative Direction', 'Films', 'Lifestyle', 'Post Production'];

/* ── Film registration corner marks ──────────────────────────────────── */
function CornerMark({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const h = pos.includes('l') ? 'left-6 md:left-14' : 'right-6 md:right-14';
  const v = pos.includes('t') ? 'top-[88px] md:top-[96px]' : 'bottom-8 md:bottom-10';
  const bv = pos.includes('t') ? 'border-t' : 'border-b';
  const bh = pos.includes('l') ? 'border-l' : 'border-r';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, delay: 1.6 }}
      className={`absolute ${h} ${v} w-5 h-5 ${bv} ${bh} border-primary/35 z-20 pointer-events-none`}
    />
  );
}

export function Hero() {
  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col overflow-hidden bg-background">
      <div className="grain-overlay" />

      {/* ── Film corner marks ── */}
      <CornerMark pos="tl" />
      <CornerMark pos="tr" />
      <CornerMark pos="bl" />
      <CornerMark pos="br" />

      {/* ── Left vertical gold line ── */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{ originY: 0 }}
        className="absolute left-5 md:left-12 top-0 bottom-0 w-px bg-primary/30 z-20 pointer-events-none"
      />

      {/* ── Timecode — top-right ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute top-[90px] md:top-[98px] right-8 md:right-16 z-20 pointer-events-none hidden sm:flex items-center gap-3"
      >
        <span className="font-mono text-[8px] tracking-[0.2em] text-foreground/20 uppercase">
          00:00:01&nbsp;·&nbsp;24FPS&nbsp;·&nbsp;4K
        </span>
      </motion.div>

      {/* ── Background graphic ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          className="absolute top-1/2 -translate-y-1/2
            left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-0
            w-[100vw] md:w-[50vw] aspect-square rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(212,180,131,0.09) 0%, transparent 65%)' }}
        />
        <motion.img
          src={heroGraphic}
          alt=""
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 0.18, scale: 1 }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
          className="absolute top-1/2 -translate-y-1/2
            left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-[-4%]
            w-[110vw] md:w-[54vw] object-contain mix-blend-lighten"
        />
        {/* Right-edge vignette */}
        <div
          className="absolute inset-y-0 right-0 w-1/3 pointer-events-none"
          style={{ background: 'linear-gradient(to left, rgba(7,7,7,0.6) 0%, transparent 100%)' }}
        />
        {/* Bottom vignette */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(7,7,7,0.7) 0%, transparent 100%)' }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col flex-1 pl-10 pr-5 md:pl-24 md:pr-12 lg:pl-32 lg:pr-20">

        {/* EST. label */}
        <motion.div
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-28 md:mt-44 pl-3 border-l-2 border-primary self-start"
        >
          <span className="text-primary text-[8px] md:text-[9px] tracking-[0.5em] uppercase font-medium">
            Est. 2019
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 md:mt-10 text-display font-bold tracking-[-0.025em] uppercase"
          style={{ fontSize: 'clamp(3.6rem, 13.5vw, 7rem)', lineHeight: 0.85 }}
        >
          We don't<br />
          shoot<br />
          videos.<br />
          <span className="text-primary">We create<br />culture.</span>
        </motion.h1>

        {/* Services marquee strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-8 md:mt-10 -ml-10 md:-ml-24 lg:-ml-32 w-[100vw] overflow-hidden"
        >
          <Ticker
            items={SERVICES}
            speed={38}
            separator="·"
            className="py-0"
            itemClassName="text-[8px] md:text-[9px] tracking-[0.38em] text-foreground/40 uppercase"
          />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 md:mt-14"
        >
          <MagneticButton
            href="#work"
            className="interactive border border-primary text-foreground bg-transparent
              px-7 py-4 md:px-10 md:py-5
              text-display text-[9px] md:text-[10px] tracking-[0.28em] uppercase
              transition-colors duration-300 hover:bg-primary/10
              flex items-center gap-5 md:gap-6 group"
          >
            WATCH REEL
            <span className="w-6 md:w-8 h-px bg-primary group-hover:w-14 md:group-hover:w-16 transition-all duration-500 ease-out" />
          </MagneticButton>
        </motion.div>

        {/* Spacer */}
        <div className="flex-1" style={{ minHeight: 'clamp(2rem, 6vh, 5rem)' }} />

        {/* ── Bottom row: scroll indicator + latest release callout ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mb-8 md:mb-12 flex items-end justify-between"
        >
          {/* Scroll indicator */}
          <div className="flex items-center gap-3 md:gap-4">
            <motion.div
              animate={{ y: [0, 9, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-8 md:h-10 bg-primary/50"
            />
            <span className="text-[7px] md:text-[8px] tracking-[0.5em] text-foreground/30 uppercase">
              Scroll
            </span>
          </div>

          {/* NOW STREAMING callout — hidden on very small screens */}
          <a
            href={LATEST.url}
            target="_blank"
            rel="noopener noreferrer"
            className="interactive hidden sm:flex flex-col items-end gap-1.5 group"
          >
            <div className="flex items-center gap-2">
              {/* Pulsing live dot */}
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              <span className="text-[7px] tracking-[0.45em] text-primary/70 uppercase">Now Streaming</span>
            </div>
            <span className="text-[9px] md:text-[10px] tracking-[0.25em] text-foreground/50 uppercase group-hover:text-foreground/80 transition-colors duration-300">
              {LATEST.artist} — {LATEST.title}&nbsp;↗
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
