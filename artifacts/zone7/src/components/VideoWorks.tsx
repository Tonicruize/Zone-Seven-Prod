import { motion } from 'framer-motion';

const videos = [
  {
    id: '4xpww6rnz_w',
    num: '01',
    title: 'Man 2 Man',
    artist: 'Dremo',
    type: 'Official Visualizer',
  },
  {
    id: 'OAHZE1gqIhY',
    num: '02',
    title: 'Wife Material',
    artist: 'Dremo',
    type: 'Official Visualizer',
  },
  {
    id: 'H3JXXYGpqNU',
    num: '03',
    title: 'Labubu',
    artist: 'SMG × Teni × The Entertainers',
    type: 'Official Visualizer',
  },
];

function EmbedFrame({ id, title }: { id: string; title: string }) {
  return (
    <div className="relative w-full overflow-hidden bg-black" style={{ paddingTop: '56.25%' }}>
      <iframe
        src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&color=white`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 w-full h-full border-0"
      />
    </div>
  );
}

export function VideoWorks() {
  const [featured, ...secondary] = videos;

  return (
    <section
      id="work"
      className="relative bg-background border-b border-primary/15"
      style={{ paddingTop: 'clamp(5rem, 10vw, 9rem)', paddingBottom: 'clamp(5rem, 10vw, 9rem)' }}
    >
      <div className="grain-overlay" />
      <div className="relative z-10 px-6 md:px-12 lg:px-20">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-6 mb-16 md:mb-24"
        >
          <span className="text-[9px] tracking-[0.45em] text-primary uppercase shrink-0">
            Selected Works
          </span>
          <div className="flex-1 h-px bg-primary/20" />
        </motion.div>

        {/* Featured video — 01 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
        >
          {/* Top meta bar */}
          <div className="flex items-center justify-between mb-5 pb-5 border-t-2 border-primary pt-4">
            <span className="text-[10px] tracking-[0.45em] text-primary/70 uppercase font-medium">
              {featured.num}
            </span>
            <span className="text-[9px] tracking-[0.35em] text-foreground/35 uppercase">
              {featured.type}
            </span>
          </div>

          {/* Embed */}
          <EmbedFrame id={featured.id} title={featured.title} />

          {/* Bottom meta */}
          <div className="mt-6 md:mt-8 flex items-end justify-between">
            <div>
              <p className="text-[9px] tracking-[0.4em] text-foreground/35 uppercase mb-2">
                {featured.artist}
              </p>
              <h3
                className="text-display font-bold tracking-[-0.02em] uppercase text-foreground leading-none"
                style={{ fontSize: 'clamp(1.6rem, 4vw, 3.5rem)' }}
              >
                {featured.title}
              </h3>
            </div>
            <div className="hidden md:block text-[9px] tracking-[0.4em] text-foreground/20 uppercase self-end pb-1">
              Zone7 Production
            </div>
          </div>
        </motion.div>

        {/* Secondary videos — 02 & 03 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {secondary.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Top meta bar */}
              <div className="flex items-center justify-between border-t border-primary/60 pt-4 mb-4">
                <span className="text-[10px] tracking-[0.45em] text-primary/60 uppercase font-medium">
                  {video.num}
                </span>
                <span className="text-[9px] tracking-[0.35em] text-foreground/35 uppercase">
                  {video.type}
                </span>
              </div>

              {/* Embed */}
              <EmbedFrame id={video.id} title={video.title} />

              {/* Bottom meta */}
              <div className="mt-4 md:mt-5">
                <p className="text-[9px] tracking-[0.4em] text-foreground/35 uppercase mb-1">
                  {video.artist}
                </p>
                <h3
                  className="text-display font-bold tracking-[-0.02em] uppercase text-foreground leading-none"
                  style={{ fontSize: 'clamp(1.1rem, 2.5vw, 2rem)' }}
                >
                  {video.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
