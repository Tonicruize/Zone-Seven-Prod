import { motion } from 'framer-motion';

export function Testimonial() {
  return (
    <section className="py-36 md:py-52 px-6 md:px-12 bg-background border-t border-foreground/5 relative flex items-center justify-center overflow-hidden">
      {/* Huge Quotation Mark — clipped by overflow-hidden */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.04, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[30%] text-[18rem] md:text-[26rem] lg:text-[34rem] text-primary font-serif leading-none select-none pointer-events-none"
        aria-hidden
      >
        "
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-display text-3xl md:text-5xl lg:text-6xl text-foreground font-medium tracking-tight uppercase leading-[1.15]"
        >
          "Working with Zone7<br className="hidden md:block" /> changed my career."
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 text-xs tracking-[0.3em] text-primary uppercase"
        >
          — Global Artist
        </motion.p>
      </div>
    </section>
  );
}
