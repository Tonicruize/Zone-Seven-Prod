import { useEffect } from 'react';
import { motion } from 'framer-motion';

// ─── Behold.so setup (free, zero-backend Instagram embed) ───────────────────
// 1. Go to https://behold.so and sign in with your Instagram account
// 2. Create a new feed and copy your Feed ID from the dashboard
// 3. Replace YOUR_FEED_ID below with your actual ID
const BEHOLD_FEED_ID = 'YOUR_FEED_ID';
// ────────────────────────────────────────────────────────────────────────────

const isConfigured = BEHOLD_FEED_ID !== 'YOUR_FEED_ID';

export function InstagramFeed() {
  useEffect(() => {
    if (!isConfigured) return;
    // Load Behold widget script once
    if (document.querySelector('script[data-behold]')) return;
    const script = document.createElement('script');
    script.src = 'https://w.behold.so/widget.js';
    script.type = 'module';
    script.setAttribute('data-behold', 'true');
    document.head.appendChild(script);
  }, []);

  return (
    <section className="relative bg-background py-24 md:py-36 border-t border-primary/10">
      <div className="grain-overlay" />
      <div className="relative z-10 px-6 md:px-12 lg:px-20">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-6 mb-12 md:mb-16"
        >
          <span className="text-[9px] tracking-[0.45em] text-primary uppercase shrink-0">Latest Work</span>
          <div className="flex-1 h-px bg-primary/20" />
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] tracking-[0.35em] text-foreground/35 uppercase hover:text-primary transition-colors duration-300 shrink-0"
          >
            @zone7prod ↗
          </a>
        </motion.div>

        {/* Feed */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {isConfigured ? (
            /* @ts-expect-error – custom element registered by Behold script */
            <behold-widget feed-id={BEHOLD_FEED_ID} />
          ) : (
            /* Placeholder shown until Behold is configured */
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-foreground/5 border border-primary/10 flex items-center justify-center"
                >
                  <span className="text-[8px] tracking-[0.3em] text-foreground/20 uppercase">@zone7</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 text-[8px] tracking-[0.4em] text-foreground/20 uppercase text-center"
        >
          Follow us on Instagram for behind-the-scenes
        </motion.p>
      </div>
    </section>
  );
}
