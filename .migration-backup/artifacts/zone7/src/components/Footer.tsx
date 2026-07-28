import { motion } from 'framer-motion';
import logo from '@assets/new_z7_logo_1785000827821.png';
import { MagneticButton } from './MagneticButton';

export function Footer() {
  return (
    <footer id="contact" className="bg-background pt-32 pb-12 px-6 md:px-12 border-t border-primary/10">
      <div className="max-w-screen-2xl mx-auto flex flex-col items-center text-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-display text-5xl md:text-7xl lg:text-8xl text-foreground font-bold tracking-tight uppercase max-w-5xl leading-[0.9]"
        >
          Ready to create something unforgettable?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 mb-32"
        >
          <MagneticButton
            href="mailto:contact@zone7.com"
            className="interactive border border-primary text-foreground bg-transparent px-12 py-5 text-display text-sm tracking-[0.2em] uppercase transition-colors duration-300 hover:bg-primary hover:text-primary-foreground flex items-center justify-center"
          >
            BOOK YOUR PROJECT
          </MagneticButton>
        </motion.div>

        {/* Footer Bottom */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-primary/20">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Zone7" className="h-6 object-contain opacity-50" />
            <span className="text-xs text-muted-foreground tracking-widest uppercase mt-1">©2026</span>
          </div>

          <div className="flex items-center gap-8 text-xs tracking-[0.2em] text-muted-foreground uppercase">
            <a href="#" className="hover:text-primary transition-colors duration-300 interactive">Instagram</a>
            <a href="#" className="hover:text-primary transition-colors duration-300 interactive">YouTube</a>
            <a href="#" className="hover:text-primary transition-colors duration-300 interactive">TikTok</a>
          </div>

          <div className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
            <a href="mailto:contact@zone7.com" className="hover:text-primary transition-colors duration-300 interactive">
              contact@zone7.com
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}