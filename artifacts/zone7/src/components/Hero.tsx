import { motion } from 'framer-motion';
import heroGraphic from '@assets/Untitled_Project_-_T-Shirt_3_1785000831561.png';
import { MagneticButton } from './MagneticButton';

export function Hero() {
  return (
    <section className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden bg-background">
      <div className="grain-overlay" />
      
      {/* Background Graphic */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 md:left-[70%] -translate-x-1/2 -translate-y-1/2 w-[150vw] md:w-[80vw] h-[150vh] md:h-[120vh] pointer-events-none mix-blend-lighten"
      >
        <img 
          src={heroGraphic}
          alt=""
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 flex flex-col items-start justify-center pt-20">
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-display text-[12vw] md:text-[8vw] lg:text-[7rem] leading-[0.85] font-bold tracking-tight text-foreground max-w-6xl uppercase"
        >
          We don't shoot<br />videos.<br />
          <span className="text-muted-foreground">We create culture.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 text-xs md:text-sm tracking-[0.3em] text-foreground uppercase flex flex-col md:flex-row gap-2 md:gap-0 items-start md:items-center"
        >
          <span>Music Videos <span className="text-primary mx-3 hidden md:inline">•</span></span>
          <span>Commercials <span className="text-primary mx-3 hidden md:inline">•</span></span>
          <span>Creative Direction <span className="text-primary mx-3 hidden md:inline">•</span></span>
          <span>Films</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16"
        >
          <MagneticButton
            href="#work"
            className="interactive border border-primary text-foreground bg-transparent px-10 py-5 text-display text-sm tracking-[0.2em] uppercase transition-colors duration-300 hover:bg-primary/10 flex items-center gap-6 group"
          >
            WATCH REEL
            <span className="w-8 h-[1px] bg-primary group-hover:w-16 transition-all duration-500 ease-out"></span>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}