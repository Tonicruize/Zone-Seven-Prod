import { motion } from 'framer-motion';
import { Link } from 'wouter';
import logoOutline from '@assets/new_z7_logo2_1785000829580.png';
import logo from '@assets/new_z7_logo_1785000827821.png';
import gunLettering from '@assets/z7_gun_green2_1785000845703.png';
import trustYourDope from '@assets/Z7_TRUST_YOUR_DOPE_1785000852594.png';
import starEye from '@assets/Untitled_Project_-_T-Shirt_3_1785000831561.png';
import twinePurp from '@assets/Z7_TWINE_PURP_1785000857003.png';

const STATS = [
  { value: '25+', label: 'Projects Delivered' },
  { value: '15', label: 'Artists Worked With' },
  { value: '8', label: 'Countries Reached' },
  { value: '100M+', label: 'Combined Views' },
];

const VALUES = [
  {
    num: '01',
    title: 'INTENTIONALITY',
    body: 'Every frame, every cut, every color grade is a decision. We don\'t shoot on autopilot. We show up with a vision and we execute it.',
  },
  {
    num: '02',
    title: 'CULTURE FIRST',
    body: 'We don\'t follow trends. We help shape them. Our work lives at the intersection of music, fashion, art, and lifestyle — and it was built to last.',
  },
  {
    num: '03',
    title: 'CRAFT OVER HYPE',
    body: 'The best work is rarely the loudest. We let the image speak. Restraint is a skill. Precision is a signature.',
  },
];

const TIMELINE = [
  { year: '2019', event: 'Zone7 founded as an independent creative collective.' },
  { year: '2020', event: 'First major music video — 10M views in 30 days.' },
  { year: '2021', event: 'Expanded into commercial direction and brand campaigns.' },
  { year: '2022', event: 'Reached artists across 5 countries. Launched in-house beat production.' },
  { year: '2023', event: 'Fashion and lifestyle editorial division launched.' },
  { year: '2024', event: '25+ projects completed. 100M+ combined views across all work.' },
  { year: '2025', event: 'Zone7 Studios opens. Full-service production underway.' },
];

const SERVICES = [
  'Music Videos',
  'Commercials',
  'Creative Direction',
  'Photography',
  'Post Production',
  'Beat Production',
  'Lifestyle Editorial',
  'Brand Campaigns',
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  };
}

export function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">

      {/* HERO */}
      <section className="relative pt-48 pb-32 px-6 md:px-12 min-h-[90vh] flex flex-col justify-center overflow-hidden">
        <div className="grain-overlay" />

        <motion.img
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.07, scale: 1 }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
          src={starEye}
          alt=""
          className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[70vw] md:w-[45vw] pointer-events-none mix-blend-lighten"
        />

        <div className="relative z-10 max-w-screen-xl mx-auto w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs tracking-[0.4em] text-primary uppercase mb-8"
          >
            The Collective
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-display text-[12vw] md:text-[9rem] leading-none font-bold tracking-tight uppercase mb-10"
          >
            ABOUT<br />
            <span className="text-muted-foreground">ZONE7</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed font-light"
          >
            We are not a standard production company. We are a creative collective
            built at the intersection of music, fashion, art, and culture.
            Zone7 exists to make visuals that outlive the moment they were made in.
          </motion.p>
        </div>
      </section>

      {/* MISSION STATEMENT */}
      <section className="relative py-32 px-6 md:px-12 border-y border-foreground/5 overflow-hidden">
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.04 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          src={logoOutline}
          alt=""
          className="absolute inset-0 w-full h-full object-contain pointer-events-none mix-blend-screen scale-110"
        />

        <div className="relative z-10 max-w-screen-xl mx-auto">
          <motion.blockquote
            {...fadeUp()}
            className="text-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight uppercase max-w-5xl"
          >
            "Visual storytelling built for artists, brands, and culture."
          </motion.blockquote>

          <motion.img
            {...fadeUp(0.3)}
            src={gunLettering}
            alt="Zone Seven"
            className="mt-16 h-10 md:h-14 object-contain mix-blend-lighten"
          />
        </div>
      </section>

      {/* STATS */}
      <section className="py-24 px-6 md:px-12 border-b border-foreground/5">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-0">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              {...fadeUp(i * 0.1)}
              className="flex flex-col items-center justify-center py-16 border-r border-foreground/5 last:border-r-0 text-center"
            >
              <span className="text-display text-5xl md:text-7xl font-bold text-foreground mb-3">
                {stat.value}
              </span>
              <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto">
          <motion.p {...fadeUp()} className="text-xs tracking-[0.4em] text-primary uppercase mb-16">
            What We Stand For
          </motion.p>

          <div className="grid md:grid-cols-3 gap-0 border-t border-foreground/5">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.num}
                {...fadeUp(i * 0.15)}
                className="py-16 pr-12 border-b md:border-b-0 md:border-r border-foreground/5 last:border-0"
              >
                <span className="text-5xl font-bold text-foreground/5 text-display">{v.num}</span>
                <h3 className="text-display text-sm tracking-[0.25em] text-foreground font-bold uppercase mt-6 mb-4">
                  {v.title}
                </h3>
                <div className="w-8 h-[1px] bg-primary mb-6" />
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND GRAPHIC BREAK */}
      <section className="relative py-0 overflow-hidden h-64 md:h-96 flex items-center justify-center bg-[#111111]">
        <motion.img
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 0.18, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          src={trustYourDope}
          alt=""
          className="absolute inset-0 w-full h-full object-contain pointer-events-none mix-blend-lighten"
        />
        <motion.p
          {...fadeUp()}
          className="relative z-10 text-display text-3xl md:text-5xl font-bold tracking-widest uppercase text-foreground"
        >
          Trust Your Dopeness
        </motion.p>
      </section>

      {/* TIMELINE */}
      <section className="py-32 px-6 md:px-12 border-t border-foreground/5">
        <div className="max-w-screen-xl mx-auto">
          <motion.p {...fadeUp()} className="text-xs tracking-[0.4em] text-primary uppercase mb-16">
            The Journey
          </motion.p>

          <div className="flex flex-col gap-0">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                {...fadeUp(i * 0.08)}
                className="flex items-start gap-8 md:gap-20 py-8 border-b border-foreground/5 group"
              >
                <span className="text-display text-sm tracking-[0.2em] text-primary/70 uppercase flex-shrink-0 w-16 pt-0.5 group-hover:text-primary transition-colors duration-300">
                  {item.year}
                </span>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-500">
                  {item.event}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES WE OFFER */}
      <section className="py-24 px-6 md:px-12 border-t border-foreground/5 bg-[#0a0a0a]">
        <div className="max-w-screen-xl mx-auto">
          <motion.p {...fadeUp()} className="text-xs tracking-[0.4em] text-primary uppercase mb-12">
            What We Do
          </motion.p>

          <div className="flex flex-wrap gap-3">
            {SERVICES.map((s, i) => (
              <motion.span
                key={s}
                {...fadeUp(i * 0.05)}
                className="border border-foreground/10 px-6 py-3 text-xs tracking-[0.2em] text-muted-foreground uppercase hover:border-primary/40 hover:text-foreground transition-all duration-300"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* VISUAL: Purple twine */}
      <section className="relative h-64 overflow-hidden border-y border-foreground/5">
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.12 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          src={twinePurp}
          alt=""
          className="absolute inset-0 w-full h-full object-contain mix-blend-screen pointer-events-none scale-110"
        />
      </section>

      {/* CTA */}
      <section className="py-40 px-6 md:px-12 text-center">
        <div className="max-w-screen-xl mx-auto flex flex-col items-center">
          <motion.img {...fadeUp()} src={logo} alt="Zone7" className="h-10 object-contain opacity-30 mb-12" />

          <motion.h2
            {...fadeUp(0.1)}
            className="text-display text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-tight max-w-4xl"
          >
            Ready to build something that lasts?
          </motion.h2>

          <motion.div {...fadeUp(0.25)} className="mt-12 flex flex-col sm:flex-row gap-4 items-center">
            <a
              href="mailto:contact@zone7.com"
              className="border border-primary text-foreground bg-transparent px-12 py-5 text-display text-xs tracking-[0.25em] uppercase hover:bg-primary/10 transition-colors duration-300"
              data-testid="link-cta-book"
            >
              BOOK YOUR PROJECT
            </a>
            <Link
              href="/beats"
              className="border border-foreground/15 text-muted-foreground bg-transparent px-12 py-5 text-display text-xs tracking-[0.25em] uppercase hover:border-foreground/30 hover:text-foreground transition-colors duration-300"
              data-testid="link-cta-beats"
            >
              BROWSE BEATS
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
