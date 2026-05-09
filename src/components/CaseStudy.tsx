import { motion } from 'motion/react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function CaseStudy() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center bg-bg font-mono">
        <div className="text-center">
          <p className="text-accent mb-4">404 // DATA_NOT_FOUND</p>
          <Link to="/" className="text-ink hover:text-accent underline">RETURN_TO_SYSTEM</Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-bg min-h-screen text-ink pb-40"
    >
      {/* Back Button */}
      <Link 
        to="/"
        className="fixed top-8 left-8 z-[100] group flex items-center gap-3 px-4 py-2 bg-white/50 backdrop-blur-sm border border-ink/5 rounded-full"
      >
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="w-8 h-8 rounded-full bg-ink flex items-center justify-center text-white group-hover:bg-accent transition-colors"
        >
          <ArrowLeft size={16} />
        </motion.div>
        <span className="font-mono text-[10px] uppercase tracking-widest font-bold opacity-40 group-hover:opacity-100 transition-opacity">
          Back to System
        </span>
      </Link>

      {/* Hero Section */}
      <header className="relative h-[90vh] w-full overflow-hidden bg-ink">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="absolute inset-0"
        >
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover grayscale brightness-50"
          />
        </motion.div>
        
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
          <motion.h1 
             initial={{ y: 50, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.5, duration: 1 }}
             className="text-[15vw] font-display font-medium tracking-tightest uppercase text-transparent border-white/20"
             style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}
          >
            {project.title}
          </motion.h1>
        </div>

        {/* Status Line */}
        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
           <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] text-accent animate-pulse uppercase">[ ACCESSING_ARCHIVE ]</span>
              <div className="w-32 h-[1px] bg-white/20" />
           </div>
           <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest italic">{project.year} // SYSTEM_REVEAL</div>
        </div>
      </header>

      {/* Metadata Sticky Bar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-ink/5 px-6 py-6 overflow-x-auto no-scrollbar">
        <div className="max-w-[1800px] mx-auto flex justify-between items-center gap-12 whitespace-nowrap">
           <div className="flex flex-col gap-1">
             <span className="font-mono text-[8px] text-accent uppercase font-bold">[ ROLE ]</span>
             <span className="font-sans font-medium uppercase tracking-tighter text-xs">{project.metadata.role}</span>
           </div>
           <div className="flex flex-col gap-1">
             <span className="font-mono text-[8px] text-accent uppercase font-bold">[ TIMELINE ]</span>
             <span className="font-sans font-medium uppercase tracking-tighter text-xs">{project.metadata.timeline}</span>
           </div>
           <div className="flex flex-col gap-1">
             <span className="font-mono text-[8px] text-accent uppercase font-bold">[ TOOLS ]</span>
             <span className="font-sans font-medium uppercase tracking-tighter text-xs">{project.metadata.tools}</span>
           </div>
           <div className="flex flex-col gap-1">
             <span className="font-mono text-[8px] text-accent uppercase font-bold">[ LOCATION ]</span>
             <span className="font-sans font-medium uppercase tracking-tighter text-xs">{project.metadata.location}</span>
           </div>
        </div>
      </div>

      {/* Content Section */}
      <main className="max-w-[1800px] mx-auto px-6 py-24 md:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          
          {/* Narrative Column */}
          <div className="lg:col-span-8 flex flex-col gap-32">
            
            {/* THE FRICTION */}
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                 <span className="font-mono text-[10px] text-accent italic">01 // THE FRICTION</span>
                 <div className="flex-1 h-[1px] bg-ink/5" />
              </div>
              <p className="text-3xl md:text-5xl font-serif text-ink leading-tight">
                {project.content.friction}
              </p>
            </section>

            {/* THE LOGIC */}
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                 <span className="font-mono text-[10px] text-accent italic">02 // THE LOGIC</span>
                 <div className="flex-1 h-[1px] bg-ink/5" />
              </div>
              <div className="space-y-6">
                <p className="text-xl md:text-2xl font-mono text-ink/80 leading-relaxed uppercase tracking-tighter">
                  {project.content.logic}
                </p>
                <div className="p-8 bg-ink/[0.02] border border-ink/5 rounded-2xl">
                   <p className="font-mono text-[10px] text-ink/40 uppercase leading-loose">
                     [ SYSTEM_LOG: ANALYZING_VECTORS ]<br/>
                     &gt; initialize_biomechanics_module()...<br/>
                     &gt; data_stream_encrypted: true<br/>
                     &gt; resolution_scale: 1.4x<br/>
                     &gt; tracking_fidelity: High
                   </p>
                </div>
              </div>
            </section>

            {/* THE IMPACT */}
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                 <span className="font-mono text-[10px] text-accent italic">03 // THE IMPACT</span>
                 <div className="flex-1 h-[1px] bg-ink/5" />
              </div>
              <p className="text-2xl text-ink font-medium leading-relaxed">
                {project.content.impact}
              </p>
            </section>

          </div>

          {/* Media Column / Secondary Narrative */}
          <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit space-y-12">
            <div className="aspect-[4/5] bg-ink overflow-hidden rounded-xl shadow-xl">
               <img src={project.gallery[0]} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Detail 01" />
            </div>
            <p className="font-mono text-[10px] text-accent uppercase leading-tight font-bold italic">
               [ FIG 1.2: MOTION VECTOR ANALYSIS ]
            </p>
            <div className="space-y-4">
               <h4 className="font-mono text-[10px] uppercase tracking-widest text-ink/40 font-bold italic">Conclusion</h4>
               <p className="text-sm text-ink/60 leading-relaxed">
                 The results indicate a significant shift in how technical mastery can be mapped and optimized through non-obstructive systems.
               </p>
            </div>
          </div>
        </div>

        {/* Full Gallery */}
        <div className="mt-40 space-y-24">
           <div className="w-full aspect-[21/9] bg-ink overflow-hidden rounded-2xl shadow-2xl">
              <img src={project.gallery[1]} className="w-full h-full object-cover grayscale" alt="Wide View" />
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                 <div className="aspect-square bg-ink overflow-hidden rounded-2xl shadow-2xl">
                    <img src={project.gallery[2] || project.gallery[0]} className="w-full h-full object-cover grayscale" alt="Detail 02" />
                 </div>
                 <p className="font-mono text-[10px] text-accent uppercase italic">[ FIG 2.4: SYSTEM_TOPOLOGY ]</p>
              </div>
              <div className="flex flex-col justify-center gap-8">
                 <h3 className="text-4xl font-display uppercase tracking-tightest leading-none">Scalable <br/> Architecture</h3>
                 <p className="text-ink/60 max-w-sm">The architecture was designed to be modular, allowing for deployment across various physical environments with minimal calibration.</p>
                 <div className="w-24 h-[1px] bg-accent" />
              </div>
           </div>
        </div>
      </main>

      {/* Next Project Footer */}
      <footer className="border-t border-ink/5 mt-40 py-40">
        <div className="max-w-[1800px] mx-auto px-6 text-center">
           <span className="font-mono text-[10px] text-ink/40 uppercase tracking-widest mb-4 block">Next Output</span>
           <h2 className="text-5xl md:text-7xl font-display font-medium uppercase tracking-tightest italic text-ink/20 hover:text-accent cursor-pointer transition-colors">
              Subsense
           </h2>
        </div>
      </footer>
    </motion.div>
  );
}
