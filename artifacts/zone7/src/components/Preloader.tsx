import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import revolverLogo from '@assets/image_1785347418143.png';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLeaving(true), 3600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!leaving && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[300] bg-black flex flex-col items-center justify-center gap-8"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Logo */}
          <motion.img
            src={revolverLogo}
            alt="Zone7"
            className="w-44 md:w-60 object-contain select-none"
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />

          {/* Thin gold rule */}
          <motion.div
            className="w-8 h-px bg-[#d4b483]"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 1.4 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
