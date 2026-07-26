import { motion } from 'framer-motion';
import dremo from '@assets/generated_images/project_dremo.jpg';
import levis from '@assets/generated_images/project_levis.jpg';
import afrobeats from '@assets/generated_images/project_afrobeats.jpg';
import backstage from '@assets/generated_images/project_backstage.jpg';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  { title: "DREMO", type: "Music Video", image: dremo },
  { title: "LEVI'S", type: "Commercial", image: levis },
  { title: "AFROBEATS RISE", type: "Documentary", image: afrobeats },
  { title: "BACKSTAGE ACCESS", type: "Creative Direction", image: backstage },
];

export function FeaturedWork() {
  return (
    <section id="work" className="py-24 bg-background">
      <div className="px-6 md:px-12 mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-display text-xs tracking-[0.3em] text-primary uppercase"
        >
          Selected Works
        </motion.h2>
      </div>

      <div className="flex flex-col w-full">
        {projects.map((project, idx) => (
          <motion.div 
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative w-full h-[60vh] md:h-[80vh] overflow-hidden cursor-none interactive border-b border-primary/10 last:border-b-0"
          >
            {/* Image */}
            <motion.div 
              className="absolute inset-0 w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-background/40 group-hover:bg-transparent transition-colors duration-700 z-10" />
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>

            {/* Content overlay */}
            <div className={`absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-16 ${idx % 2 === 0 ? 'items-start text-left' : 'items-end text-right'}`}>
              <div className={`flex items-end gap-8 overflow-hidden w-full ${idx % 2 === 0 ? 'justify-start' : 'justify-end md:flex-row-reverse'}`}>
                <motion.div className={`flex flex-col gap-2 ${idx % 2 === 0 ? 'items-start' : 'items-end'}`}>
                  <span className="text-primary text-xs tracking-[0.2em] uppercase font-medium transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    {project.type}
                  </span>
                  <h3 className="text-display text-4xl md:text-7xl lg:text-8xl text-foreground font-bold tracking-tight uppercase transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-75 ease-out">
                    {project.title}
                  </h3>
                </motion.div>
                
                <div className={`hidden md:flex w-20 h-20 rounded-full border border-primary/50 items-center justify-center transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150 ease-out bg-background/50 backdrop-blur-sm text-primary`}>
                  <ArrowUpRight className={`w-8 h-8 ${idx % 2 !== 0 && 'rotate-90'}`} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}