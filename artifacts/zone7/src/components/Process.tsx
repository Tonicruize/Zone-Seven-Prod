import { motion } from 'framer-motion';

const steps = [
  { num: '01', title: 'Discovery' },
  { num: '02', title: 'Concept' },
  { num: '03', title: 'Production' },
  { num: '04', title: 'Post' },
  { num: '05', title: 'Delivery' },
];

export function Process() {
  return (
    <section className="py-32 md:py-44 px-6 md:px-12 bg-background border-t border-primary/10">
      <div className="max-w-screen-2xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-display text-xs tracking-[0.3em] text-primary uppercase mb-20 md:mb-28"
        >
          Our Process
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-0 border-t border-foreground/5">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6 pt-10 pb-8 pr-8 border-b sm:border-b-0 sm:border-r border-foreground/5 last:border-0"
            >
              <div className="text-primary text-sm font-light tracking-[0.3em] font-mono">
                {step.num}
              </div>
              <div className="w-6 h-px bg-primary/40" />
              <div className="text-display text-xl md:text-2xl text-foreground font-light tracking-tight uppercase">
                {step.title}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
