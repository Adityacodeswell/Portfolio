import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export default function About() {
  const [isHovered, setIsHovered] = useState(false);

  const images = {
    default: "/src/assets/images/regenerated_image_1778344958042.jpg",
    hover: "/src/assets/images/regenerated_image_1778344958042.jpg"
  };

  return (
    <section id="about" className="px-6 py-20 md:px-12 md:py-40 bg-bg">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-4 self-start sticky top-32">
             <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
               onMouseEnter={() => setIsHovered(true)}
               onMouseLeave={() => setIsHovered(false)}
               className={`aspect-[3/4] overflow-hidden relative group cursor-crosshair transition-all duration-700 ${isHovered ? 'grayscale-0 contrast-100' : 'grayscale contrast-125'}`}
             >
                <motion.img 
                  src={images.default} 
                  alt="Portrait"
                  animate={{ 
                    scale: isHovered ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover"
                />
               
               {/* Technical Frame Overlays */}
               <div className="absolute inset-4 border border-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent" />
               </div>
             </motion.div>
             <div className="mt-8 flex flex-col gap-1">
                <span className="font-display font-medium text-lg uppercase">NIFT Mumbai</span>
                <span className="font-mono text-[10px] uppercase text-ink/40 tracking-widest italic">Current Focus: Design Research</span>
             </div>
          </div>
          
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-8xl font-display font-medium tracking-tighter mb-12 uppercase leading-[0.85]">
                Technical <span className="italic font-light text-accent">Precision</span> <br/>Meets Design.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mb-1" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent font-bold">Research Thesis</span>
                </div>
                <p className="text-xl leading-relaxed font-medium">
                  I am an Engineer turned Designer currently pursuing a Master of Design at NIFT Mumbai. With a background in IT Engineering, I approach design through systems thinking, technical experimentation, and field-driven research.
                </p>
                <p className="text-ink/60 leading-relaxed text-sm">
                  My work focuses on decoding physical movement, human behavior, and cultural systems through technology — especially within sports, motion intelligence, and embodied practices.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-8"
              >
                <div>
                   <h4 className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40 mb-6 italic border-b border-ink/10 pb-2">Core Disciplines</h4>
                   <ul className="space-y-6">
                     {[
                       { name: 'Design Research', id: '01', desc: 'Ethnographic inquiry, systems mapping, behavioral analysis, speculative thinking.' },
                       { name: 'Technical Prototyping', id: '02', desc: 'Computer vision, rapid prototyping, motion tracking, hardware experimentation.' },
                       { name: 'Experience & System Design', id: '03', desc: 'Building meaningful interactions between physical behavior and digital systems.' }
                     ].map(skill => (
                       <li key={skill.name} className="flex flex-col group border-b border-ink/5 pb-4 last:border-0">
                         <div className="flex justify-between items-center mb-1">
                           <span className="font-medium group-hover:text-accent transition-all duration-300">{skill.name}</span>
                           <span className="font-mono text-[9px] text-accent opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter italic">LOCKED // {skill.id}</span>
                         </div>
                         <p className="font-mono text-[8px] text-ink/30 uppercase tracking-widest">{skill.desc}</p>
                       </li>
                     ))}
                   </ul>
                </div>
                
                <div className="pt-8">
                  <p className="font-mono text-[10px] text-ink/50 italic leading-loose">
                    Currently leading technical initiatives as a Microsoft Learn Student Ambassador and exploring how motion data can preserve and evolve traditional athletic forms.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
