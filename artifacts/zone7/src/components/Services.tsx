import { motion } from 'framer-motion';
import twine from '@assets/Z7_TWINE_PURP_1785000857003.png';

const services = [
  { name: "Music Videos", desc: "We create visuals people replay." },
  { name: "Commercials", desc: "Stories that sell." },
  { name: "Creative Direction", desc: "From concept to final frame." },
  { name: "Photography", desc: "Capturing the still moments." },
  { name: "Post Production", desc: "The final polish." },
  { name: "Lifestyle", desc: "Building the culture." }
];

export function Services() {
  return (
    <section id="services" className="relative py-32 px-6 md:px-12 bg-background overflow-hidden">
      {/* Decorative Brand Graphic */}
      <img 
        src={twine} 
        alt="" 
        className="absolute -right-20 top-1/4 w-[400px] md:w-[600px] opacity-20 pointer-events-none mix-blend-screen"
      />

      <div className="max-w-screen-2xl mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-display text-xs tracking-[0.3em] text-primary uppercase mb-16"
        >
          Capabilities
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {services.map((service, idx) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col group interactive"
            >
              <div className="h-px w-full bg-primary/20 mb-6 group-hover:bg-primary transition-colors duration-500 relative">
                <motion.div 
                  className="absolute left-0 top-0 h-full bg-primary"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <h3 className="text-display text-3xl md:text-4xl text-foreground font-light tracking-tight mb-4 group-hover:text-primary transition-colors duration-300">
                {service.name}
              </h3>
              <p className="text-sm text-muted-foreground font-light tracking-wide">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}