import { motion } from 'framer-motion';
import heroGraphic from '@assets/Untitled_Project_-_T-Shirt_3_1785000831561.png';
import { MagneticButton } from './MagneticButton';

const services = ['Music Videos', 'Commercials', 'Creative Direction', 'Films'];

export function Hero() {
  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col overflow-hidden bg-background">
      <div className="grain-overlay" />

      {/* Left vertical gold line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{ originY: 0 }}
        className="absolute left-5 md:left-12 top-0 bottom-0 w-px bg-primary/30 z-20 pointer-events-none"
      />

      {/* Background graphic */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Glow — centered on mobile, right on desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          className="absolute top-1/2 -translate-y-1/2 
            left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-0
            w-[100vw] md:w-[50vw] aspect-square rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(212,180,131,0.09) 0%, transparent 65%)' }}
        />
        {/* Graphic — large and centered on mobile, pushed right on desktop */}
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
      </div>

      {/* Content */}
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
          style={{ fontSize: 'clamp(3.6rem, 13.5vw, 8.5rem)', lineHeight: 0.85 }}
        >
          We don't<br />
          shoot<br />
          videos.<br />
          <span className="text-primary">We create<br />culture.</span>
        </motion.h1>

        {/* Services strip — single row on mobile with smaller text */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 md:mt-12 flex flex-wrap items-center gap-y-1"
        >
          {services.map((s, i) => (
            <span key={s} className="flex items-center">
              <span className="text-[8px] md:text-[10px] tracking-[0.32em] md:tracking-[0.38em] text-foreground/55 uppercase">
                {s}
              </span>
              {i < services.length - 1 && (
                <span className="text-primary mx-2 md:mx-4 text-[7px]">•</span>
              )}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 md:mt-16"
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

        {/* Spacer — controlled on mobile so scroll sits near bottom without huge gap */}
        <div className="flex-1" style={{ minHeight: 'clamp(3rem, 8vh, 6rem)' }} />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mb-8 md:mb-14 flex items-center gap-3 md:gap-4 self-start"
        >
          <motion.div
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 md:h-10 bg-primary/50"
          />
          <span className="text-[7px] md:text-[8px] tracking-[0.5em] text-foreground/30 uppercase">
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  );
}
