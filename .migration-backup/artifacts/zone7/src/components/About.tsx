import { motion } from 'framer-motion';
import logoOutline from '@assets/new_z7_logo2_1785000829580.png';
import gunLettering from '@assets/z7_gun_green2_1785000845703.png';

export function About() {
  return (
    <section id="about" className="relative py-48 md:py-64 px-6 md:px-12 bg-background flex flex-col items-center justify-center overflow-hidden">
      
      {/* Watermark Logo */}
      <motion.img 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.05, scale: 1 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        src={logoOutline} 
        alt="" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] md:w-[80vw] pointer-events-none mix-blend-screen"
      />

      {/* Main Statement */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
        <motion.img 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          src={gunLettering}
          alt="Zone Seven"
          className="h-12 md:h-16 object-contain mb-16 mix-blend-lighten"
        />

        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-display text-5xl md:text-7xl lg:text-[6rem] leading-none text-foreground font-bold tracking-tight uppercase"
        >
          Every frame is<br/>
          <span className="text-primary italic font-serif tracking-normal lowercase pr-4">intentional.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 text-sm md:text-base text-muted-foreground font-light max-w-xl leading-relaxed"
        >
          We are not a standard production company. We are a creative collective that lives at the intersection of music, fashion, arts, and lifestyle. We are the people behind the camera making artists look iconic. When we build, we build to last.
        </motion.p>
      </div>
    </section>
  );
}