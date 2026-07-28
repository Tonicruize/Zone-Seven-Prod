import { motion } from 'framer-motion';

interface TickerProps {
  items: string[];
  /** px/s — default 60 */
  speed?: number;
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
  separator?: string;
}

export function Ticker({
  items,
  speed = 60,
  reverse = false,
  className = '',
  itemClassName = '',
  separator = '✦',
}: TickerProps) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items];
  // Compute duration from item count so speed stays constant regardless of list length
  const duration = (items.length * 180) / speed;

  return (
    <div className={`overflow-hidden whitespace-nowrap select-none ${className}`}>
      <motion.div
        className="inline-flex items-center"
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span className={itemClassName}>{item}</span>
            <span className="mx-6 md:mx-10 text-primary/50 text-[10px]">{separator}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
