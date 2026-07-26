import { motion } from 'framer-motion';
import trustYourDope from '@assets/Z7_TRUST_YOUR_DOPE_1785000852594.png';
import twineStandard from '@assets/Z7_TWINE_1785000859633.png';
import multicolor from '@assets/Z7_MULTICOLOR_OTHERS_1785000865556.png';
import starEye from '@assets/Untitled_Project_-_T-Shirt_3_1785000831561.png';

export function BrandGallery() {
  return (
    <section className="py-32 px-6 md:px-12 bg-background">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex justify-between items-end mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-display text-4xl md:text-6xl text-foreground font-light tracking-tight max-w-2xl uppercase"
          >
            We are a culture brand.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="hidden md:block text-xs tracking-[0.3em] text-primary uppercase"
          >
            Gallery 01
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Item 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="md:col-span-7 flex justify-center"
          >
            <img src={trustYourDope} alt="Trust Your Dope" className="w-[80%] md:w-[70%] object-contain mix-blend-lighten" />
          </motion.div>

          {/* Item 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="md:col-span-5 flex justify-center md:justify-end mt-12 md:mt-0"
          >
            <img src={starEye} alt="Star Eye" className="w-[70%] md:w-[90%] object-contain mix-blend-lighten" />
          </motion.div>

          {/* Item 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="md:col-span-6 flex justify-start mt-24"
          >
            <img src={multicolor} alt="Multicolor Z7" className="w-full md:w-[85%] object-contain mix-blend-lighten" />
          </motion.div>

          {/* Item 4 */}
          <motion.div 
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="md:col-span-6 flex justify-center md:justify-end mt-12 md:mt-48"
          >
            <img src={twineStandard} alt="Z7 Twine" className="w-[60%] md:w-[75%] object-contain mix-blend-lighten" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}