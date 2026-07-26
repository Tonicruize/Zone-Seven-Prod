import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const StatCounter = ({ value, suffix, label }: { value: number, suffix: string, label: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const startTime = performance.now();
      
      const updateCounter = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < duration) {
          const progress = elapsedTime / duration;
          // easeOutQuart
          const easeOut = 1 - Math.pow(1 - progress, 4);
          setCount(Math.floor(value * easeOut));
          requestAnimationFrame(updateCounter);
        } else {
          setCount(value);
        }
      };
      
      requestAnimationFrame(updateCounter);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col gap-4">
      <div className="text-display text-5xl md:text-7xl lg:text-8xl font-light text-foreground tracking-tighter">
        {count}{suffix}
      </div>
      <div className="text-xs md:text-sm tracking-[0.2em] text-muted-foreground uppercase font-medium">
        {label}
      </div>
    </div>
  );
};

export function Stats() {
  const stats = [
    { value: 25, suffix: '+', label: 'Projects' },
    { value: 15, suffix: '', label: 'Artists' },
    { value: 8, suffix: '', label: 'Countries' },
    { value: 100, suffix: 'M+', label: 'Views' },
  ];

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-background border-t border-primary/20">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat, idx) => (
            <div 
              key={stat.label} 
              className={`relative ${idx !== 0 ? 'md:pl-12' : ''} ${idx % 2 !== 0 ? 'pl-8' : ''}`}
            >
              {/* Divider lines */}
              {idx !== 0 && (
                <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-primary/20" />
              )}
              {idx % 2 !== 0 && (
                <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-primary/20" />
              )}
              
              <StatCounter {...stat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}