import { motion } from 'framer-motion';

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
