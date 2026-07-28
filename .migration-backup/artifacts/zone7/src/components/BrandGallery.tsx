import { motion } from 'framer-motion';
import trustYourDope from '@assets/Z7_TRUST_YOUR_DOPE_1785000852594.png';
import twineStandard from '@assets/Z7_TWINE_1785000859633.png';
import multicolor from '@assets/Z7_MULTICOLOR_OTHERS_1785000865556.png';
import starEye from '@assets/Untitled_Project_-_T-Shirt_3_1785000831561.png';

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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="md:col-span-7 flex justify-center"
          >
            <img
              src={trustYourDope}
              alt="Trust Your Dope"
              className="w-[85%] md:w-[78%] object-contain mix-blend-lighten"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, delay: 0.15, ease: 'easeOut' }}
            className="md:col-span-5 flex justify-center md:justify-end"
          >
            <img
              src={starEye}
              alt="Star Eye"
              className="w-[65%] md:w-[85%] object-contain mix-blend-lighten"
            />
          </motion.div>
        </div>

        {/* Thin gold separator */}
        <div className="w-full h-px bg-primary/10 mb-12 md:mb-20" />

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="md:col-span-6 flex justify-start"
          >
            <img
              src={multicolor}
              alt="Multicolor Z7"
              className="w-full md:w-[88%] object-contain mix-blend-lighten"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="md:col-span-6 flex justify-center md:justify-end"
          >
            <img
              src={twineStandard}
              alt="Z7 Twine"
              className="w-[60%] md:w-[72%] object-contain mix-blend-lighten"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
