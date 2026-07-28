import { motion } from 'framer-motion';
import twine from '@assets/Z7_TWINE_PURP_1785000857003.png';

const services = [
  { name: 'Music Videos', desc: 'We create visuals people replay.' },
  { name: 'Commercials', desc: 'Stories that sell.' },
  { name: 'Creative Direction', desc: 'From concept to final frame.' },
  { name: 'Photography', desc: 'Capturing the still moments.' },
  { name: 'Post Production', desc: 'The final polish.' },
  { name: 'Lifestyle', desc: 'Building the culture.' },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative py-32 md:py-44 px-6 md:px-12 bg-background border-t border-foreground/5 overflow-hidden"
    >
      {/* Decorative Brand Graphic — contained within overflow-hidden */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={twine}
          alt=""
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[320px] md:w-[480px] opacity-[0.12] mix-blend-screen"
        />
      </div>

      <div className="max-w-screen-2xl mx-auto relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-display text-xs tracking-[0.3em] text-primary uppercase mb-16 md:mb-20"
        >
          Capabilities
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 md:gap-y-20">
          {services.map((service, idx) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col group interactive"
            >
              <div className="h-px w-full bg-primary/20 mb-8 relative overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-primary"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
              <h3 className="text-display text-3xl md:text-4xl text-foreground font-light tracking-tight mb-5 group-hover:text-primary transition-colors duration-300">
                {service.name}
              </h3>
              <p className="text-sm text-muted-foreground font-light tracking-wide leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
