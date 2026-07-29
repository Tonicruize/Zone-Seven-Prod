import { motion } from 'framer-motion';
import heroGraphic from '@assets/Untitled_Project_-_T-Shirt_3_1785000831561.png';
import { MagneticButton } from './MagneticButton';
import { Ticker } from './Ticker';

const LATEST = { title: 'Man 2 Man', artist: 'Dremo', url: 'https://youtu.be/4xpww6rnz_w' };
const SERVICES = ['Music Videos', 'Commercials', 'Creative Direction', 'Films', 'Lifestyle', 'Post Production'];

export function Hero() {
  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col overflow-hidden bg-background">

      {/* Background graphic */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.img
          src={heroGraphic}
          alt=""
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 0.28, scale: 1 }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
          className="absolute
            bottom-0 right-[-10%]
            md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:right-[-4%]
            w-[95vw] sm:w-[80vw] md:w-[54vw]
            object-contain mix-blend-lighten"
        />
        {/* Right vignette */}
        <div className="absolute inset-y-0 right-0 w-1/3 pointer-events-none"
          style={{ background: 'linear-gradient(to left, rgba(7,7,7,0.55) 0%, transparent 100%)' }} />
        {/* Bottom vignette */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(7,7,7,0.85) 0%, transparent 100%)' }} />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col flex-1 pl-6 pr-6 md:pl-16 md:pr-12 lg:pl-24 lg:pr-20">

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-32 sm:mt-36 md:mt-44 text-display font-bold tracking-[-0.025em] uppercase"
          style={{ fontSize: 'clamp(2.6rem, 10.5vw, 7rem)', lineHeight: 0.88 }}
        >
          We don't<br />
          shoot<br />
          videos.<br />
          <span className="text-primary">We create<br />culture.</span>
        </motion.h1>

        {/* Services marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-6 md:mt-10 -ml-6 md:-ml-16 lg:-ml-24 w-[100vw] overflow-hidden"
        >
          <Ticker
            items={SERVICES}
            speed={38}
            separator="·"
            className="py-0"
            itemClassName="text-[8px] md:text-[9px] tracking-[0.38em] text-foreground/35 uppercase"
          />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 md:mt-14"
        >
          <MagneticButton
            href="#work"
            className="interactive border border-primary text-foreground bg-transparent
              px-7 py-3.5 md:px-10 md:py-5
              text-display text-[9px] md:text-[10px] tracking-[0.28em] uppercase
              transition-colors duration-300 hover:bg-primary/10
              flex items-center gap-5 md:gap-6 group"
          >
            WATCH REEL
            <span className="w-6 md:w-8 h-px bg-primary group-hover:w-14 md:group-hover:w-16 transition-all duration-500 ease-out" />
          </MagneticButton>
        </motion.div>

        {/* Flexible spacer */}
        <div className="flex-1" />

        {/* NOW STREAMING callout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mb-6 md:mb-12 flex justify-end"
        >
          <a
            href={LATEST.url}
            target="_blank"
            rel="noopener noreferrer"
            className="interactive hidden sm:flex flex-col items-end gap-1.5 group"
          >
            <div className="flex items-center gap-2">
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
