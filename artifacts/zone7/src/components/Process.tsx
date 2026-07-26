import { motion } from 'framer-motion';

const steps = [
  { num: "01", title: "Discovery" },
  { num: "02", title: "Concept" },
  { num: "03", title: "Production" },
  { num: "04", title: "Post" },
  { num: "05", title: "Delivery" },
];

export function Process() {
  return (
    <section className="py-32 px-6 md:px-12 bg-background border-t border-primary/10 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-display text-xs tracking-[0.3em] text-primary uppercase mb-24"
        >
          Our Process
        </motion.h2>

        <div className="flex flex-col md:flex-row items-start justify-between gap-12 md:gap-4 overflow-x-auto pb-12 scrollbar-hide">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6 min-w-[200px]"
            >
              <div className="text-primary text-xl font-light tracking-widest font-mono">
                {step.num}
              </div>
              <div className="h-px w-full bg-primary/20 relative">
                {idx !== steps.length - 1 && (
                  <div className="absolute top-1/2 right-0 w-2 h-2 rounded-full bg-primary/20 -translate-y-1/2 translate-x-1/2 hidden md:block" />
                )}
              </div>
              <div className="text-display text-2xl md:text-3xl text-foreground font-light tracking-tight uppercase">
                {step.title}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}