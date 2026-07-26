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
        className="absolute left-6 md:left-12 top-0 bottom-0 w-px bg-primary/30 z-20 pointer-events-none"
      />

      {/* Background graphic — far right with golden glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          className="absolute top-1/2 right-0 -translate-y-1/2 w-[60vw] md:w-[45vw] aspect-square rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(212,180,131,0.07) 0%, transparent 70%)' }}
        />
        {/* Graphic */}
        <motion.img
          src={heroGraphic}
          alt=""
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 0.13, scale: 1 }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
          className="absolute top-1/2 right-[-8%] md:right-[-2%] -translate-y-1/2 w-[80vw] md:w-[52vw] object-contain mix-blend-lighten"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 pl-12 pr-6 md:pl-24 md:pr-12 lg:pl-32 lg:pr-20">

        {/* EST. label */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-32 md:mt-44 pl-4 border-l-2 border-primary self-start"
        >
          <span className="text-primary text-[9px] tracking-[0.5em] uppercase font-medium">
            Est. 2019
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 56 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 md:mt-12 text-display leading-[0.82] font-bold tracking-[-0.025em] uppercase"
          style={{ fontSize: 'clamp(3.2rem, 11vw, 8.5rem)' }}
        >
          We don't<br />
          shoot<br />
          videos.<br />
          <span className="text-primary">We create<br />culture.</span>
        </motion.h1>

        {/* Services strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 md:mt-14 flex flex-wrap items-center gap-y-2"
        >
          {services.map((s, i) => (
            <span key={s} className="flex items-center">
              <span className="text-[9px] md:text-[10px] tracking-[0.38em] text-foreground/60 uppercase">
                {s}
              </span>
              {i < services.length - 1 && (
                <span className="text-primary mx-3 md:mx-4 text-[8px]">•</span>
              )}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 md:mt-20"
        >
          <MagneticButton
            href="#work"
            className="interactive border border-primary text-foreground bg-transparent px-10 py-5 text-display text-[10px] tracking-[0.28em] uppercase transition-colors duration-300 hover:bg-primary/10 flex items-center gap-6 group"
          >
            WATCH REEL
            <span className="w-8 h-px bg-primary group-hover:w-16 transition-all duration-500 ease-out" />
          </MagneticButton>
        </motion.div>

        {/* Spacer */}
        <div className="flex-1 min-h-[80px]" />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mb-10 md:mb-14 flex items-center gap-4 self-start"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10 bg-primary/50"
          />
          <span className="text-[8px] tracking-[0.5em] text-foreground/35 uppercase">
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  );
}
