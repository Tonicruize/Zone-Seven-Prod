import { motion } from 'framer-motion';

const slots = [
  { col: 'md:col-span-7', size: 'aspect-[4/3]' },
  { col: 'md:col-span-5', size: 'aspect-square' },
  { col: 'md:col-span-6', size: 'aspect-[4/3]' },
  { col: 'md:col-span-6', size: 'aspect-square' },
];

export function BrandGallery() {
  return (
    <section className="py-32 md:py-40 px-6 md:px-12 bg-background border-t border-foreground/5">
      <div className="max-w-screen-2xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-end mb-20 md:mb-28">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-display text-4xl md:text-6xl text-foreground font-light tracking-tight max-w-2xl uppercase"
          >
            We are a culture brand.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2 }}
            className="hidden md:block text-xs tracking-[0.3em] text-primary uppercase"
          >
            Gallery 01
          </motion.p>
        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mb-4 md:mb-6">
          {slots.slice(0, 2).map((slot, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, delay: i * 0.12, ease: 'easeOut' }}
              className={`${slot.col} ${slot.size} bg-foreground/5 border border-foreground/8`}
            />
          ))}
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {slots.slice(2).map((slot, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, delay: i * 0.15, ease: 'easeOut' }}
              className={`${slot.col} ${slot.size} bg-foreground/5 border border-foreground/8`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
