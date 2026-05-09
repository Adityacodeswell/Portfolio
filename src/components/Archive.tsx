import { motion } from 'motion/react';

const experiments = [
  { year: '01', title: 'Design Research', category: 'Ethnography' },
  { year: '02', title: 'Coding', category: 'Logic' },
  { year: '03', title: 'Prototyping', category: 'System Architecture' },
  { year: '04', title: 'Trend Mapping', category: 'Foresight' },
  { year: '05', title: 'Strategic Design Thinking', category: 'Strategy' },
  { year: '06', title: 'Motion Capture', category: 'Biomechanics' },
  { year: '07', title: 'Service Blueprint', category: 'Infrastructure' },
  { year: '08', title: 'Generative Design', category: 'Algorithm' },
  { year: '09', title: 'Human Behavioral Data', category: 'Cognition' },
  { year: '10', title: 'Systems Integration', category: 'Workflow' }
];

export default function Archive() {
  return (
    <section className="px-6 py-20 md:px-12 md:py-40 bg-white border-t border-ink/5">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink/30 italic">Technical Archive</span>
          <div className="h-[1px] flex-grow bg-ink/5" />
          <span className="font-mono text-[9px] text-accent font-bold">[V.1.0]</span>
        </div>
        <div className="divide-y divide-ink/20">
          {experiments.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group py-8 flex flex-col md:flex-row md:items-center justify-between cursor-none relative overflow-hidden"
            >
              {/* Reticle Overlay */}
              <div className="absolute top-1/2 left-8 -translate-y-1/2 w-12 h-12 border border-accent/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100 flex items-center justify-center pointer-events-none">
                 <div className="w-1 h-1 bg-accent rounded-full" />
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-accent/50" />
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-accent/50" />
                 <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-accent/50" />
                 <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-accent/50" />
              </div>

              <div className="flex items-center gap-12 mb-3 md:mb-0 relative z-10 transition-transform duration-500 group-hover:translate-x-16">
                <span className="font-mono text-[10px] text-accent/40 font-bold group-hover:text-accent transition-colors">/ {item.year}</span>
                <h3 className="text-2xl md:text-3xl font-display font-medium tracking-tight uppercase group-hover:italic transition-all duration-500">
                  {item.title}
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-[1px] bg-ink/10 group-hover:w-20 group-hover:bg-accent transition-all duration-500" />
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40 group-hover:text-ink transition-colors flex items-center gap-3">
                  {item.category}
                  {item.year === '03' && (
                    <span className="text-cyan-500 font-bold bg-cyan-500/5 px-2 py-0.5 border border-cyan-500/20">
                      [ ACTIVE_RESEARCH ]
                    </span>
                  )}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
