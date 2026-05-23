import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Target, Zap, Activity, ShieldCheck, Cpu, Database, ChevronRight, Wind, Thermometer, ShieldOff, ExternalLink } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { PORTFOLIO_DATA } from '../config/content';

export default function EcoSmartKilnCaseStudy() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { images, text } = PORTFOLIO_DATA;
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });

  const [temp, setTemp] = useState(76.5);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    const interval = setInterval(() => {
      setTemp(prev => {
        const delta = (Math.random() - 0.5) * 0.2;
        return Number((prev + delta).toFixed(1));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      ref={scrollRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen text-black selection:bg-[#585CE5] selection:text-white"
    >
      {/* 1. Cinematic Hero */}
      <header className="relative h-[80vh] md:h-screen w-full overflow-hidden bg-bg">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center p-6 md:p-12"
        >
          {/* 3D Render Placeholder Removed */}
        </motion.div>

        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 pointer-events-none">
          <motion.h1 
             initial={{ y: 50, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.5, duration: 1 }}
             className="text-[14vw] md:text-[10vw] font-display font-black tracking-tightest uppercase text-ink leading-none"
          >
            ECO-SMART <br/> KILN
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-6 md:mt-8"
          >
            <p className="text-[#585CE5] font-mono text-[10px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.4em] font-bold px-4">
              Breathe Safely // Redesigning Industrial Health
            </p>
          </motion.div>
        </div>

        {/* Sticky Metadata Bar */}
        <div className="absolute bottom-0 left-0 w-full bg-[#585CE5] px-6 py-4 md:px-8 md:py-4 z-40">
          {/* RESPONSIVE FIX: Align items into a 2-column grid on mobile using grid grid-cols-2 md:flex md:flex-wrap, with safe responsive gaps */}
          <div className="max-w-[1800px] mx-auto grid grid-cols-2 md:flex md:flex-wrap justify-between items-center gap-4 md:gap-8 text-white">
             <div className="flex flex-col">
               <span className="font-mono text-[8px] md:text-[9px] uppercase font-bold opacity-70">ROLE</span>
               <span className="font-sans font-bold uppercase tracking-tighter text-[10px] md:text-xs">Design Researcher & Strategist</span>
             </div>
             <div className="flex flex-col">
               <span className="font-mono text-[8px] md:text-[9px] uppercase font-bold opacity-70">CONTEXT</span>
               <span className="font-sans font-bold uppercase tracking-tighter text-[10px] md:text-xs">Social Initiative by Titan Company Ltd.</span>
             </div>
             <div className="flex flex-col hidden sm:flex">
               <span className="font-mono text-[8px] md:text-[9px] uppercase font-bold opacity-70">TIMELINE</span>
               <span className="font-sans font-bold uppercase tracking-tighter text-[10px] md:text-xs">2025 – 2026</span>
             </div>
             <div className="flex items-center gap-2 justify-end lg:justify-start">
               <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-pulse" />
               <span className="font-mono text-[8px] md:text-[9px] uppercase font-bold">Active_Deployment</span>
             </div>
          </div>
        </div>
      </header>

      {/* 2. Silent Crisis Narrative */}
      <section className="relative overflow-hidden">
        <div className="min-h-screen relative flex items-center justify-center py-20 md:py-32 px-6">
          <div className="absolute inset-0 z-0">
             <img 
               src={images.kiln_context} 
               className="w-full h-full object-cover grayscale brightness-[0.2] contrast-125"
               alt="Kiln Environment"
             />
          </div>
          
          <div className="relative z-10 max-w-4xl w-full text-left">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8 md:space-y-12"
            >
              <span className="text-[#585CE5] font-mono text-[10px] md:text-xs font-bold tracking-[0.3em] md:tracking-[0.5em] uppercase">01 // THE FRICTION</span>
              <h2 className="text-4xl md:text-8xl font-display font-medium tracking-tightest text-white uppercase leading-tight md:leading-none">
                The Silent <br/> Health Crisis
              </h2>
              <div className="space-y-6 md:space-y-8 text-white/70 text-lg md:text-2xl font-sans leading-relaxed">
                <p>
                  Conventional kilns generate intense dust, smoke, and heat. These are primary drivers of chronic respiratory diseases such as Tuberculosis, Chronic Bronchitis, and Asthma among kiln workers.
                </p>
                <div className="py-8 md:py-12 border-y border-white/10">
                  <blockquote className="text-2xl md:text-5xl font-serif italic text-white leading-tight">
                    "I know the dust kills, but the hunger kills faster. We wrap a cloth and pray it's enough."
                  </blockquote>
                  <p className="mt-4 md:mt-6 font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-[#585CE5] font-bold">
                    — Anita, Kiln Worker (Research Participant)
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Technical & Behavioral Mapping */}
      <section className="py-20 md:py-56 px-6 bg-[#E8E8E8]">
        <div className="max-w-[1400px] mx-auto">
          {/* RESPONSIVE FIX: Scale gap to gap-12 lg:gap-24 on mobile/tablet viewports to prevent extra height bloat */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <div className="space-y-8 md:space-y-12">
              <span className="text-[#585CE5] font-mono text-[10px] md:text-xs font-bold tracking-[0.3em] md:tracking-[0.5em] uppercase">02 // RESEARCH & STRATEGY</span>
              <h3 className="text-3xl md:text-6xl font-display font-medium tracking-tighter uppercase text-left">Behavioral Mapping</h3>
              
              <div className="overflow-x-auto text-left">
                {/* RESPONSIVE FIX: Apply min-w-[480px] so the table columns can scroll horizontally without layout squeezing */}
                <table className="w-full min-w-[480px] border-collapse">
                  <thead>
                    <tr className="border-b-2 border-black">
                      <th className="text-left py-4 font-mono text-[8px] md:text-[10px] uppercase tracking-widest">Dimension</th>
                      <th className="text-left py-4 font-mono text-[8px] md:text-[10px] uppercase tracking-widest">Finding / Data Point</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10">
                    <tr>
                      <td className="py-4 md:py-6 font-bold uppercase text-[10px] md:text-xs">Secondary Research</td>
                      <td className="py-4 md:py-6 text-[11px] md:text-sm text-black/60 italic">High $PM$ exposure leads to lung-function decline. National Clean Air Programme mandates 20-30% reduction.</td>
                    </tr>
                    <tr>
                      <td className="py-4 md:py-6 font-bold uppercase text-[10px] md:text-xs">Adoption Gap</td>
                      <td className="py-4 md:py-6 text-[11px] md:text-sm text-black/60 italic">Market-ready solutions exist (electric kilns) but cost and comfort barriers prevent adoption.</td>
                    </tr>
                    <tr>
                      <td className="py-4 md:py-6 font-bold uppercase text-[10px] md:text-xs">Individual Agency</td>
                      <td className="py-4 md:py-6 text-[11px] md:text-sm text-black/60 italic">Workers rely on "Irrational Safety Rituals" like thin cloth coverings that offer no real defense.</td>
                    </tr>
                    <tr>
                      <td className="py-4 md:py-6 font-bold uppercase text-[10px] md:text-xs">Psychological barrier</td>
                      <td className="py-4 md:py-6 text-[11px] md:text-sm text-black/60 italic">Fatalism: View toxic dust as an unavoidable "part of life".</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* RESPONSIVE FIX: Change padding to p-6 md:p-12 to retain generous horizontal content margin on small phones */}
            <div className="bg-white p-6 md:p-12 rounded-2xl md:rounded-3xl space-y-6 md:space-y-8 shadow-sm text-left">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#585CE5] flex items-center justify-center text-white">
                <Target size={20} md:size={24} />
              </div>
              <h4 className="text-xl md:text-2xl font-display font-bold uppercase">Redefined HMW</h4>
              {/* RESPONSIVE FIX: Adjust heading density using text-xl md:text-3xl inside text container cards */}
              <p className="text-xl md:text-3xl font-serif italic leading-tight">
                "How might we enable safer kiln operation through remote monitoring and control systems that reduce human exposure to heat and smoke?"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hardware Prototype Section */}
      <section className="bg-ink text-white py-20 md:py-56 px-6 overflow-hidden">
        <div className="max-w-[1400px] mx-auto text-left">
          {/* RESPONSIVE FIX: Reduce hardware grid layout gap to gap-12 lg:gap-20 to clean up layout presentation on stacked columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5 space-y-8 md:space-y-12">
              <span className="text-[#585CE5] font-mono text-[10px] md:text-xs font-bold tracking-[0.3em] md:tracking-[0.5em] uppercase">03 // HARDWARE_ENGINEERING</span>
              {/* RESPONSIVE FIX: Scale heading with sm text-4xl sm:text-5xl md:text-7xl to prevent extra clipping */}
              <h3 className="text-4xl sm:text-5xl md:text-7xl font-display font-medium tracking-tightest uppercase leading-tight md:leading-none">The Hardware <br/> Prototype</h3>
              
              <div className="space-y-4 md:space-y-6">
                 {[
                   { title: "Enclosed Chamber", desc: "Prevents ash and heat from reaching workers directly." },
                   { title: "Clean Combustion", desc: "Replaces hazardous waste with regulated low-emission fuel." },
                   { title: "Modular & Scalable", desc: "Adaptable for various kiln sizes to remain affordable." }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-4 group">
                     <div className="w-1 h-1 bg-[#585CE5] mt-2 group-hover:scale-[3] transition-transform" />
                     <div>
                       <h5 className="font-bold uppercase text-[10px] md:text-xs tracking-widest">{item.title}</h5>
                       <p className="text-white/40 text-[11px] md:text-sm mt-1">{item.desc}</p>
                     </div>
                   </div>
                 ))}
              </div>
            </div>

            <div className="lg:col-span-7 bg-white/5 border border-white/10 p-6 md:p-12 relative overflow-hidden">
               {/* Exploded View Diagram Placeholder */}
               <div className="aspect-video bg-black/40 relative flex items-center justify-center">
                  <div className="w-4/5 h-4/5 border border-white/5 flex items-center justify-center">
                     <Cpu className="text-white/10 w-20 md:w-32 h-20 md:h-32" />
                  </div>
                  
                  {/* Captions */}
                  <div className="absolute top-4 left-4 md:top-10 md:left-10">
                    <span className="font-mono text-[7px] md:text-[9px] text-[#585CE5] font-bold">[SYS: MULTI-LAYER_FILTRATION]</span>
                  </div>
                  <div className="absolute bottom-4 right-4 md:bottom-10 md:right-10">
                    <span className="font-mono text-[7px] md:text-[9px] text-[#585CE5] font-bold">[CORE: ENCLOSED_COMBUSTION]</span>
                  </div>
                  <div className="absolute top-1/2 -right-2 md:-right-4 translate-x-full hidden sm:block">
                     <div className="flex items-center gap-2">
                       <div className="h-[1px] w-8 bg-[#585CE5]" />
                       <span className="font-mono text-[9px] text-[#585CE5] font-bold">EMISSION_OUT_LEVEL: 0.12%</span>
                     </div>
                  </div>
               </div>
               <p className="mt-6 md:mt-8 font-mono text-[8px] md:text-[10px] text-white/30 text-center uppercase tracking-widest">
                  FIG 2.9: Exploded view of the multi-stage air purification system.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. KILNMASTER PRO (The UI) */}
      <section className="py-20 md:py-56 px-6 bg-white overflow-hidden text-left">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 md:mb-24 flex items-center gap-6 md:gap-8">
            <span className="text-[#585CE5] font-mono text-[10px] md:text-xs font-bold tracking-[0.3em] md:tracking-[0.5em] uppercase whitespace-nowrap">04 // KILNMASTER_PRO</span>
            <div className="h-[1px] w-full bg-black/10" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            {/* Phone Mockup */}
            <div className="relative justify-self-center scale-90 md:scale-100">
              <div className="w-[280px] h-[560px] md:w-[320px] md:h-[640px] bg-black rounded-[40px] md:rounded-[60px] border-[6px] md:border-[8px] border-gray-800 shadow-2xl overflow-hidden relative">
                 <div className="absolute top-0 inset-x-0 h-6 md:h-8 flex justify-center items-end pb-1">
                   <div className="w-16 md:w-20 h-3 md:h-4 bg-gray-900 rounded-full" />
                 </div>
                 
                 {/* App UI */}
                 <div className="h-full w-full p-6 md:p-8 pt-10 md:pt-12 flex flex-col bg-[#0A0A0A] text-white">
                    <div className="flex justify-between items-center mb-10 md:mb-12">
                       <span className="font-mono text-[9px] md:text-[10px] font-bold text-[#585CE5]">ID: KM_2026_A1</span>
                       <Wind size={14} md:size={16} className="text-white/20" />
                    </div>
                    
                    <div className="flex-grow flex flex-col justify-center gap-10 md:gap-12">
                       <div className="space-y-1 md:space-y-2">
                         <span className="font-mono text-[9px] md:text-[10px] text-white/40 uppercase tracking-widest">Chamber Temperature</span>
                         <motion.div 
                           animate={{ scale: [1, 1.05, 1] }}
                           transition={{ duration: 1.5, repeat: Infinity }}
                           className="text-6xl md:text-7xl font-display font-medium text-[#585CE5] flex items-baseline"
                         >
                           {temp}<span className="text-2xl md:text-3xl">°C</span>
                         </motion.div>
                         <div className="flex gap-2">
                           <div className="h-1 flex-grow bg-[#585CE5]" />
                           <div className="h-1 w-10 md:w-12 bg-white/10" />
                         </div>
                       </div>

                       <div className="grid grid-cols-2 gap-3 md:gap-4">
                          <div className="p-3 md:p-4 bg-white/5 border border-white/10 rounded-xl">
                            <span className="block font-mono text-[7px] md:text-[8px] opacity-40 uppercase mb-1 md:mb-2">Cooling</span>
                            <span className="text-base md:text-lg font-bold">ACTIVE</span>
                          </div>
                          <div className="p-3 md:p-4 bg-white/5 border border-white/10 rounded-xl">
                            <span className="block font-mono text-[7px] md:text-[8px] opacity-40 uppercase mb-1 md:mb-2">Pressure</span>
                            <span className="text-base md:text-lg font-bold">STABLE</span>
                          </div>
                       </div>
                    </div>

                    <div className="h-16 md:h-20 flex items-center justify-center pt-4">
                       <div className="w-full h-10 md:h-12 bg-[#585CE5] flex items-center justify-center font-bold uppercase text-[10px] md:text-xs tracking-widest shadow-[0_0_20px_rgba(88,92,229,0.5)]">
                         Emergency Shutdown
                       </div>
                    </div>
                 </div>
              </div>
              
              {/* Floating UI Elements */}
              <div className="absolute -right-4 -bottom-4 md:-right-12 md:top-1/4 p-4 md:p-6 bg-white shadow-xl border border-black/5 rounded-xl md:rounded-2xl flex items-center gap-3 md:gap-4 z-20">
                <Thermometer className="text-[#585CE5]" size={20} md:size={24} />
                <div>
                   <span className="block font-mono text-[9px] md:text-[10px] font-bold text-accent">LIVE_LINK</span>
                   <span className="text-xs md:text-sm font-bold uppercase text-black">Authorized Access</span>
                </div>
              </div>
            </div>

            <div className="space-y-8 md:space-y-12">
              <h3 className="text-3xl md:text-5xl font-display font-medium uppercase tracking-tight text-ink leading-tight">Smartphone-Based <br/> Precision Control</h3>
              <div className="space-y-6 md:space-y-8">
                 <div className="flex gap-4 md:gap-6 items-start">
                    <div className="p-2 md:p-3 bg-[#585CE5]/10 text-[#585CE5] mt-1"><ShieldCheck size={18} md:size={20}/></div>
                    <div>
                      <h4 className="font-bold uppercase text-[11px] md:text-sm tracking-widest font-mono">Secure Remote Login</h4>
                      <p className="text-black/50 text-[12px] md:text-sm mt-1 md:mt-2">A code-based system ensuring only authorized personnel connect to the kiln.</p>
                    </div>
                 </div>
                 <div className="flex gap-4 md:gap-6 items-start">
                    <div className="p-2 md:p-3 bg-[#585CE5]/10 text-[#585CE5] mt-1"><Zap size={18} md:size={20}/></div>
                    <div>
                      <h4 className="font-bold uppercase text-[11px] md:text-sm tracking-widest font-mono">Environmental Controls</h4>
                      <p className="text-black/50 text-[12px] md:text-sm mt-1 md:mt-2">Granular +/- interface for managing target temperatures and toggling the cooling mechanism.</p>
                    </div>
                 </div>
                 <div className="flex gap-4 md:gap-6 items-start">
                    <div className="p-2 md:p-3 bg-[#585CE5]/10 text-[#585CE5] mt-1"><ShieldOff size={18} md:size={20}/></div>
                    <div>
                      <h4 className="font-bold uppercase text-[11px] md:text-sm tracking-widest font-mono">Safety Interlocks</h4>
                      <p className="text-black/50 text-[12px] md:text-sm mt-1 md:mt-2">Electronic door locks that prevent opening at unsafe temperatures.</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5 DESIGN LANGUAGE SHEET */}
      <section className="py-20 md:py-56 px-6 bg-[#F8F8F8]">
        <div className="max-w-[1400px] mx-auto text-left">
          <div className="mb-16 md:mb-24 flex flex-col gap-4">
            <span className="text-[#585CE5] font-mono text-[10px] md:text-xs font-bold tracking-[0.3em] md:tracking-[0.5em] uppercase">04.5 // DESIGN_SYSTEM</span>
            <h2 className="text-4xl md:text-8xl font-display font-medium tracking-tightest text-ink uppercase leading-tight md:leading-none">
              Visual <br/> Grammar
            </h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="relative group w-full bg-white shadow-2xl border border-black/5 overflow-hidden"
          >
            <img 
              src={images.kiln_design_system} 
              alt="KilnMaster Pro Design Language Sheet"
              className="w-full h-auto"
            />
            <div className="absolute top-4 md:top-8 right-4 md:right-8 bg-[#585CE5] text-white font-mono text-[8px] md:text-[9px] px-2 py-1 md:px-3 md:py-1 font-black uppercase">
              DOC_REF: K_SYSTEM_01
            </div>
          </motion.div>

          <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-black/50 font-sans">
            <p className="text-lg md:text-xl leading-relaxed">
              The "KilnMaster Pro" interface is built on a foundation of industrial utility and high-visibility feedback. The system prioritizes rapid comprehension through a strict hierarchy of thermal data and state indicators.
            </p>
            <div className="border-l-2 border-[#585CE5] pl-6 md:pl-8 flex flex-col justify-center">
              <span className="font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#585CE5] mb-2">Technical Specification:</span>
              <p className="uppercase font-display font-bold text-ink text-sm md:text-base">Scaleable Thermal Simulation Matrix v1.0</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Social Impact Footer */}
      <section className="bg-[#585CE5] text-white py-20 md:py-56 px-6">
        <div className="max-w-[1400px] mx-auto text-left">
          <div className="text-center mb-16 md:mb-24">
            <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] mb-4 md:mb-8 block opacity-70">05 // IMPACT</span>
            <h2 className="text-5xl md:text-9xl font-display font-black tracking-tightest uppercase leading-tight md:leading-none">SOCIAL_LEVERAGE</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 text-indigo-50">
            {[
               { title: "Reduced Exposure", desc: "Off-site monitoring eliminates the need for workers to remain in close proximity to toxic fumes." },
               { title: "Cleaner Production", desc: "The multi-stage filtration system directly addresses excessive smoke emission issues." },
               { title: "Energy Efficiency", desc: "Optimized fuel usage and improved insulation reduce heat loss and lower operational costs." }
            ].map((res, i) => (
              <div key={i} className="space-y-4 md:space-y-6">
                <div className="h-[2px] w-full bg-white/20 relative">
                   <div className="absolute top-0 left-0 h-full w-1/4 bg-white" />
                </div>
                <h5 className="text-xl md:text-2xl font-display font-bold uppercase">{res.title}</h5>
                <p className="text-white/80 text-base md:text-lg leading-relaxed">{res.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Behance Integration */}
      <section className="py-20 md:py-24 px-6 bg-white flex justify-center">
        <motion.a 
          href={text.project_kiln_behance}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-full max-w-[1400px] py-20 md:py-32 bg-[#585CE5] flex flex-col items-center justify-center overflow-hidden rounded-2xl md:rounded-3xl"
          whileHover="hover"
        >
          {/* Liquid expansion effect */}
          <motion.div 
            variants={{
              hover: { 
                scale: 1.5,
                opacity: 1
              }
            }}
            initial={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-0 bg-indigo-400/30 rounded-full pointer-events-none"
          />
          
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            <span className="font-mono text-[9px] md:text-[10px] text-white/60 uppercase tracking-[0.3em] md:tracking-[0.4em] mb-4 md:mb-6 block">In-Depth Case Study</span>
            <h2 className="text-white font-display text-2xl md:text-6xl font-black uppercase tracking-tightest leading-tight">
              View on <br className="md:hidden" /> <span className="group-hover:italic transition-all duration-500">Behance</span>
            </h2>
            <div className="mt-6 md:mt-8 flex items-center gap-4 text-white p-3 md:p-4 border border-white/20 rounded-full group-hover:bg-white group-hover:text-[#585CE5] transition-all duration-500">
               <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest pl-3 md:pl-4">Launch Site</span>
               <div className="w-8 h-8 md:w-10 md:h-10 bg-white/10 flex items-center justify-center rounded-full group-hover:bg-transparent">
                 <ExternalLink size={16} md:size={20} />
               </div>
            </div>
          </div>

          <div className="absolute bottom-4 right-6 md:bottom-8 md:right-12 text-white/30 font-mono text-[8px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase">
            Archive_Reference_K.01
          </div>
        </motion.a>
      </section>

      {/* Navigation */}
      <footer className="py-16 md:py-24 px-6 border-t border-black/10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center text-ink gap-12 md:gap-0">
          <Link to="/" className="group flex items-center gap-4">
             <div className="w-10 h-10 md:w-12 md:h-12 bg-black text-white flex items-center justify-center rounded-full group-hover:bg-[#585CE5] transition-colors">
               <ArrowLeft size={16} md:size={18} />
             </div>
             <span className="font-display font-bold uppercase tracking-widest text-xs md:text-sm">Main Terminal</span>
          </Link>
          
          <div className="flex flex-col items-center md:items-end">
             <span className="font-mono text-[8px] md:text-[10px] text-black/40 uppercase mb-2">Next Research</span>
             <Link to="/project/sahaay" className="text-xl md:text-4xl font-display font-bold uppercase hover:text-[#585CE5] transition-colors flex items-center gap-4">
               SAHAAY <ChevronRight size={24} className="text-[#585CE5]" />
             </Link>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
