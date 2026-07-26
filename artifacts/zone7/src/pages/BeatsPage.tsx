import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ShoppingCart, Heart, Filter } from 'lucide-react';
import logoOutline from '@assets/new_z7_logo2_1785000829580.png';
import multicolor from '@assets/Z7_MULTICOLOR_OTHERS_1785000865556.png';

const GENRES = ['ALL', 'TRAP', 'AFROBEATS', 'DRILL', 'R&B', 'HIP HOP'];

const BEATS = [
  { id: 1, title: 'NIGHT VISION', genre: 'TRAP', bpm: 140, key: 'F# Minor', price: '$29.99', tags: ['dark', 'melodic'], bars: [4,7,5,9,6,8,3,7,5,9,6,4,8,5,7,3,6,9,4,7,5,8,6,3,9,5,7,4,8,6] },
  { id: 2, title: 'GOLDEN ERA', genre: 'HIP HOP', bpm: 93, key: 'G Major', price: '$24.99', tags: ['boom bap', 'soulful'], bars: [6,3,8,5,9,4,7,6,3,8,5,9,4,7,6,3,8,5,9,4,7,6,3,8,5,9,4,7,6,3] },
  { id: 3, title: 'AFRO WAVE', genre: 'AFROBEATS', bpm: 105, key: 'A Major', price: '$34.99', tags: ['vibrant', 'danceable'], bars: [5,9,6,4,8,7,3,9,5,6,4,8,7,3,9,5,6,4,8,7,3,9,5,6,4,8,7,3,9,5] },
  { id: 4, title: 'DARK MATTER', genre: 'DRILL', bpm: 145, key: 'D Minor', price: '$29.99', tags: ['aggressive', 'heavy'], bars: [8,3,6,9,4,7,5,3,8,6,9,4,7,5,3,8,6,9,4,7,5,3,8,6,9,4,7,5,3,8] },
  { id: 5, title: 'VELVET SOUL', genre: 'R&B', bpm: 78, key: 'Bb Minor', price: '$24.99', tags: ['smooth', 'sultry'], bars: [3,7,5,9,6,4,8,7,3,5,9,6,4,8,7,3,5,9,6,4,8,7,3,5,9,6,4,8,7,3] },
  { id: 6, title: 'ZONE SEVEN', genre: 'TRAP', bpm: 138, key: 'C Minor', price: '$39.99', tags: ['cinematic', 'signature'], bars: [9,5,7,3,8,6,4,5,9,7,3,8,6,4,5,9,7,3,8,6,4,5,9,7,3,8,6,4,5,9] },
  { id: 7, title: 'LAGOS NIGHTS', genre: 'AFROBEATS', bpm: 112, key: 'E Major', price: '$34.99', tags: ['euphoric', 'energetic'], bars: [4,8,6,5,9,3,7,8,4,6,5,9,3,7,8,4,6,5,9,3,7,8,4,6,5,9,3,7,8,4] },
  { id: 8, title: 'SMOKE & MIRRORS', genre: 'HIP HOP', bpm: 87, key: 'F Minor', price: '$24.99', tags: ['jazzy', 'introspective'], bars: [5,3,9,6,4,8,7,3,5,9,6,4,8,7,3,5,9,6,4,8,7,3,5,9,6,4,8,7,3,5] },
  { id: 9, title: 'COLD FRONT', genre: 'DRILL', bpm: 142, key: 'A Minor', price: '$29.99', tags: ['icy', 'hard'], bars: [7,4,8,3,9,5,6,4,7,8,3,9,5,6,4,7,8,3,9,5,6,4,7,8,3,9,5,6,4,7] },
];

function Waveform({ bars, isPlaying, isActive }: { bars: number[]; isPlaying: boolean; isActive: boolean }) {
  return (
    <div className="flex items-center gap-[2px] h-8">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          className={`w-[2px] rounded-full transition-colors duration-300 ${
            isActive ? 'bg-primary' : 'bg-foreground/20'
          }`}
          style={{ height: `${(height / 9) * 100}%` }}
          animate={
            isPlaying && isActive
              ? { scaleY: [1, 0.4 + (height / 9) * 0.9, 1], opacity: [0.7, 1, 0.7] }
              : { scaleY: 1, opacity: isActive ? 0.9 : 0.3 }
          }
          transition={{
            duration: 0.6 + (i % 5) * 0.12,
            repeat: isPlaying && isActive ? Infinity : 0,
            ease: 'easeInOut',
            delay: (i % 8) * 0.04,
          }}
        />
      ))}
    </div>
  );
}

function BeatCard({
  beat,
  index,
  isPlaying,
  isActive,
  onPlay,
}: {
  beat: (typeof BEATS)[0];
  index: number;
  isPlaying: boolean;
  isActive: boolean;
  onPlay: (id: number) => void;
}) {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative border transition-all duration-500 p-6 cursor-pointer ${
        isActive
          ? 'border-primary/60 bg-card/80'
          : 'border-foreground/5 bg-card/30 hover:border-foreground/15 hover:bg-card/60'
      }`}
      onClick={() => onPlay(beat.id)}
      data-testid={`card-beat-${beat.id}`}
    >
      {/* Beat number */}
      <span className="absolute top-6 right-6 text-xs text-muted-foreground/40 font-mono tracking-widest">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="flex items-center gap-6">
        {/* Play button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => { e.stopPropagation(); onPlay(beat.id); }}
          className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
            isActive
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-foreground/15 text-muted-foreground group-hover:border-primary/40 group-hover:text-foreground'
          }`}
          data-testid={`button-play-${beat.id}`}
        >
          {isPlaying && isActive ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
        </motion.button>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-3 mb-1">
            <h3 className="text-display text-base font-bold tracking-widest text-foreground uppercase truncate">
              {beat.title}
            </h3>
            <span className="text-[10px] tracking-widest text-primary/70 uppercase flex-shrink-0">
              {beat.genre}
            </span>
          </div>

          <div className="flex items-center gap-6 text-[11px] tracking-widest text-muted-foreground uppercase">
            <span>{beat.bpm} BPM</span>
            <span className="text-foreground/10">|</span>
            <span>{beat.key}</span>
            {beat.tags.map((tag) => (
              <span key={tag} className="hidden md:inline text-foreground/25">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Waveform */}
        <div className="hidden md:block flex-shrink-0">
          <Waveform bars={beat.bars} isPlaying={isPlaying} isActive={isActive} />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
            className={`transition-colors duration-300 ${liked ? 'text-primary' : 'text-muted-foreground/40 hover:text-muted-foreground'}`}
            data-testid={`button-like-${beat.id}`}
          >
            <Heart size={14} fill={liked ? 'currentColor' : 'none'} />
          </motion.button>

          <span className="text-xs font-mono text-muted-foreground">{beat.price}</span>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(212,180,131,0.15)' }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="border border-primary/40 text-primary px-4 py-2 text-[10px] tracking-widest uppercase hover:border-primary transition-all duration-300 flex items-center gap-2"
            data-testid={`button-buy-${beat.id}`}
          >
            <ShoppingCart size={11} />
            BUY
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export function BeatsPage() {
  const [activeGenre, setActiveGenre] = useState('ALL');
  const [activeId, setActiveId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const filtered = activeGenre === 'ALL' ? BEATS : BEATS.filter((b) => b.genre === activeGenre);

  const handlePlay = (id: number) => {
    if (activeId === id) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveId(id);
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative pt-48 pb-24 px-6 md:px-12 overflow-hidden">
        <div className="grain-overlay" />

        {/* Background logo watermark */}
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.04, scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          src={logoOutline}
          alt=""
          className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[70vw] pointer-events-none mix-blend-screen"
        />

        <div className="relative z-10 max-w-screen-xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs tracking-[0.4em] text-primary uppercase mb-6"
          >
            Zone7 Music
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-display text-[15vw] md:text-[10rem] leading-none font-bold tracking-tight uppercase"
          >
            BEATS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-sm text-muted-foreground max-w-lg leading-relaxed"
          >
            Production built for artists who refuse to sound like everyone else.
            Every beat is crafted with intention — from concept to final mix.
          </motion.p>
        </div>
      </section>

      {/* Divider with multicolor graphic */}
      <div className="relative h-32 overflow-hidden flex items-center justify-center border-y border-foreground/5">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 1.5 }}
          src={multicolor}
          alt=""
          className="absolute h-full w-auto object-contain mix-blend-screen pointer-events-none"
        />
        <div className="w-full max-w-screen-xl mx-auto px-6 md:px-12 flex items-center justify-between text-[10px] tracking-[0.4em] text-muted-foreground uppercase">
          <span>Instant delivery</span>
          <span className="text-primary/40">—</span>
          <span>WAV + MP3 included</span>
          <span className="text-primary/40">—</span>
          <span>Exclusive rights available</span>
          <span className="text-primary/40 hidden md:block">—</span>
          <span className="hidden md:block">Royalty-free options</span>
        </div>
      </div>

      {/* Genre Filter */}
      <section className="px-6 md:px-12 py-12 border-b border-foreground/5">
        <div className="max-w-screen-xl mx-auto flex items-center gap-3 flex-wrap">
          <Filter size={12} className="text-muted-foreground mr-2" />
          {GENRES.map((genre) => (
            <motion.button
              key={genre}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveGenre(genre)}
              className={`px-5 py-2 text-[11px] tracking-[0.2em] uppercase transition-all duration-300 ${
                activeGenre === genre
                  ? 'border border-primary text-primary bg-primary/5'
                  : 'border border-foreground/10 text-muted-foreground hover:border-foreground/25 hover:text-foreground'
              }`}
              data-testid={`button-genre-${genre.toLowerCase()}`}
            >
              {genre}
            </motion.button>
          ))}
          <span className="ml-auto text-xs text-muted-foreground/50 tracking-widest">
            {filtered.length} BEATS
          </span>
        </div>
      </section>

      {/* Beat List */}
      <section className="px-6 md:px-12 py-8 pb-32">
        <div className="max-w-screen-xl mx-auto flex flex-col gap-2">
          <AnimatePresence mode="wait">
            {filtered.map((beat, i) => (
              <BeatCard
                key={beat.id}
                beat={beat}
                index={i}
                isPlaying={isPlaying}
                isActive={activeId === beat.id}
                onPlay={handlePlay}
              />
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Now Playing Bar */}
      <AnimatePresence>
        {activeId !== null && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-t border-primary/20 px-6 md:px-12 py-4 flex items-center gap-6"
          >
            {/* Mini waveform */}
            <div className="hidden md:flex items-center gap-[2px] h-6 flex-shrink-0">
              {BEATS.find((b) => b.id === activeId)?.bars.slice(0, 16).map((h, i) => (
                <motion.div
                  key={i}
                  className="w-[2px] rounded-full bg-primary"
                  style={{ height: `${(h / 9) * 100}%` }}
                  animate={
                    isPlaying
                      ? { scaleY: [1, 0.3 + (h / 9), 1], opacity: [0.6, 1, 0.6] }
                      : { scaleY: 1, opacity: 0.5 }
                  }
                  transition={{
                    duration: 0.5 + (i % 4) * 0.1,
                    repeat: isPlaying ? Infinity : 0,
                    ease: 'easeInOut',
                    delay: (i % 6) * 0.05,
                  }}
                />
              ))}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-display text-xs tracking-[0.2em] text-foreground font-bold uppercase truncate">
                {BEATS.find((b) => b.id === activeId)?.title}
              </p>
              <p className="text-[10px] tracking-widest text-muted-foreground uppercase mt-0.5">
                {BEATS.find((b) => b.id === activeId)?.genre} · {BEATS.find((b) => b.id === activeId)?.bpm} BPM
              </p>
            </div>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex-shrink-0 w-10 h-10 rounded-full border border-primary flex items-center justify-center text-primary hover:bg-primary/10 transition-colors duration-300"
              data-testid="button-player-playpause"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
            </button>

            <button
              onClick={() => { setActiveId(null); setIsPlaying(false); }}
              className="flex-shrink-0 text-muted-foreground/40 hover:text-muted-foreground transition-colors duration-300 text-xs tracking-widest uppercase"
              data-testid="button-player-close"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
