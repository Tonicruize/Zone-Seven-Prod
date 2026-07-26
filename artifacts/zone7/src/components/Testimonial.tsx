import { motion } from 'framer-motion';

export function Testimonial() {
  return (
    <section className="py-48 px-6 md:px-12 bg-background relative flex items-center justify-center overflow-hidden">
      {/* Huge Quotation Mark */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.05, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-[20rem] md:text-[30rem] lg:text-[40rem] text-primary font-serif leading-none select-none pointer-events-none"
      >
        "
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h3 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-display text-4xl md:text-6xl lg:text-7xl text-foreground font-medium tracking-tight uppercase leading-[1.1]"
        >
          "Working with Zone7 changed my career."
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 text-xs md:text-sm tracking-[0.3em] text-primary uppercase"
        >
          — Global Artist
        </motion.p>
      </div>
    </section>
  );
}