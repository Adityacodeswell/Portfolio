import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { ArrowLeft, RefreshCw, ExternalLink, ChevronRight } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { PORTFOLIO_DATA } from '../config/content';

export default function TrackleCaseStudy() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { images, text } = PORTFOLIO_DATA;
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });

  const act5Ref = useRef(null);
  const { scrollYProgress: act5Progress } = useScroll({
    target: act5Ref,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      ref={scrollRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#F9F9F9] min-h-screen text-[#1A1A1B] selection:bg-red-600 selection:text-white font-sans"
    >
      {/* ACT 1 // THE HERO */}
      <section className="relative h-[80vh] md:h-[120vh] w-full overflow-hidden bg-[#1A1A1B]">
        {/* Overlay Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-6">
          {/* RESPONSIVE FIX: Clamp title font size with min() on mobile, and apply intermediate sm step to prevent title overflow */}
          <motion.h1 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[min(25vw,6rem)] sm:text-[20vw] md:text-[25vw] font-display font-black tracking-tighter uppercase text-white leading-none"
          >
            TRACKLE
          </motion.h1>

          {/* Metadata Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 md:bottom-24 w-full max-w-[1400px] border-y border-white/20 py-4 md:py-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 px-6 backdrop-blur-sm bg-black/10"
          >
            <div className="space-y-1">
              <span className="font-mono text-[8px] md:text-[9px] text-red-500 uppercase font-black">ROLE</span>
              <p className="text-white text-[10px] md:text-xs font-bold uppercase tracking-widest">Design Researcher & Developer</p>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-[8px] md:text-[9px] text-red-500 uppercase font-black">SCOPE</span>
              <p className="text-white text-[10px] md:text-xs font-bold uppercase tracking-widest">Computer Vision App</p>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-[8px] md:text-[9px] text-red-500 uppercase font-black">TIMELINE</span>
              <p className="text-white text-[10px] md:text-xs font-bold uppercase tracking-widest">Aug ‘25 - May ‘26</p>
            </div>
            <div className="flex items-center justify-end col-span-1 md:col-span-1">
              <span className="bg-red-600 text-white font-mono text-[8px] md:text-[10px] px-2 py-1 md:px-3 md:py-1 font-black">LCTN: MUMBAI_HQ</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ACT 2 // 01 IDENTITY */}
      <section className="relative z-20 bg-[#F9F9F9] py-20 md:py-64 px-6 border-t border-black/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-start">
            {/* Left Content */}
            <div className="space-y-8 md:space-y-12">
              <div className="space-y-4 md:space-y-6">
                <span className="text-red-600 font-mono text-[10px] md:text-xs font-black tracking-[0.3em] md:tracking-[0.5em] block uppercase text-left">01 // IDENTITY</span>
                {/* RESPONSIVE FIX: Add sm:text-[9vw] intermediate step for smooth section heading scaling */}
                <h2 className="text-[14vw] sm:text-[9vw] md:text-[10vw] font-display font-black leading-[0.8] text-[#1A1A1B] uppercase py-2 text-left">
                  DNA.
                </h2>
              </div>
              
              <div className="space-y-6 md:space-y-8 max-w-xl text-left">
                 <h3 className="text-2xl md:text-4xl font-display font-bold tracking-tight">Bridging the Gap: Mud to Mat.</h3>
                 <p className="text-lg md:text-xl text-[#1A1A1B]/70 leading-relaxed font-sans">
                  Combat sports transition from traditional "mud" pits to high-tech "mats." Trackle captures this evolution, translating raw physical intuition into granular biomechanical data.
                 </p>
                 <div className="p-6 md:p-8 border-l-4 border-red-600 bg-black/5 space-y-3 md:space-y-4">
                    <h4 className="font-mono text-[10px] font-black text-red-600 uppercase">Friction Alert:</h4>
                    <p className="text-[12px] md:text-sm font-sans italic text-[#1A1A1B]/60 uppercase tracking-tight">
                      High-speed maneuvers (120ms execution) leave zero margin for human observation. The friction of solo training leads to permanent biomechanical leaks.
                    </p>
                 </div>
              </div>
            </div>

            {/* Right Visual: Cropped Logo/Palette */}
            <div className="relative group overflow-hidden border border-black/5 aspect-[4/5] bg-white shadow-2xl">
              <img 
                src={images.trackle_hero} 
                alt="Trackle Identity Analysis"
                className="w-full h-full object-cover contrast-125 saturate-150 transition-transform duration-700"
              />
              <div className="absolute top-4 md:top-8 right-4 md:right-8 flex flex-col items-end gap-1 md:gap-2">
                <span className="bg-red-600 text-white font-mono text-[8px] md:text-[9px] px-2 py-0.5 md:px-3 md:py-1 font-black uppercase">CORE_ASSET: T_LOGO</span>
                <span className="bg-black text-white font-mono text-[8px] md:text-[9px] px-2 py-0.5 md:px-3 md:py-1 font-black uppercase tracking-widest">PALETTE_V1: #FF3A33</span>
              </div>
              <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8">
                <p className="text-red-600 font-mono text-[8px] md:text-[10px] bg-white/90 p-3 md:p-4 font-bold border-l-2 border-red-600 uppercase leading-none text-left">
                   [ANALYSIS: Visual identity emphasizes high-performance ergonomics.]
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACT 3 // 02 PROCESS */}
      <section className="relative z-20 bg-white py-20 md:py-64 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8 md:gap-12">
            <div className="space-y-4 md:space-y-6 text-left">
              <span className="text-red-600 font-mono text-[10px] md:text-xs font-black tracking-[0.3em] md:tracking-[0.5em] block uppercase">02 // PROCESS</span>
              {/* RESPONSIVE FIX: Add sm:text-[9vw] intermediate step to smooth text scaling across devices */}
              <h2 className="text-[14vw] sm:text-[9vw] md:text-[10vw] font-display font-black leading-[0.8] text-[#1A1A1B] uppercase">
                RESEARCH.
              </h2>
            </div>
            <div className="max-w-md pb-4 w-full">
              <p className="text-base md:text-lg font-sans text-black/60 uppercase tracking-tight font-bold md:text-right">Discovery Phase & Gap Analysis</p>
              <div className="h-1 w-full bg-red-600 mt-2 md:mt-4" />
            </div>
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-32">
            {/* Inquiry 1 */}
            <div className="md:col-span-7 group relative overflow-hidden bg-black aspect-[16/10]">
              <img 
                src={images.trackle_research_01} 
                className="w-full h-full object-cover grayscale opacity-70 group-hover:opacity-100 transition-all duration-1000" 
                alt="Contextual Inquiry" 
              />
              <div className="absolute top-4 left-4 bg-red-600 text-white font-mono text-[8px] md:text-[10px] px-2 py-1 md:px-3 md:py-1 font-black">
                [FILE_LOG: CONTEXTUAL_INQUIRY_MUMBAI_2025]
              </div>
              <div className="absolute bottom-4 left-4 p-4 md:p-6 bg-black/80 backdrop-blur-sm border-l-2 border-red-600 max-w-sm text-left">
                <h4 className="text-white text-[10px] md:text-xs font-mono font-black uppercase mb-1 md:mb-2">Inquiry: Shadowing Athletes</h4>
                <p className="text-white/40 text-[8px] md:text-[10px] uppercase font-bold leading-tight">Observing the feedback loop during high-intensity live drills. Identifying the temporal gap in self-correction.</p>
              </div>
            </div>

            {/* Inquiry 2 */}
            <div className="md:col-span-5 group relative overflow-hidden border border-black/5 aspect-square">
              <img 
                src={images.trackle_research_02} 
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" 
                alt="Field Evidence" 
              />
              <div className="absolute top-4 right-4 bg-red-600 text-white font-mono text-[8px] md:text-[10px] px-2 py-1 md:px-3 md:py-1 font-black">
                [FIELD_LOG: OBSERVATION_PIT_07]
              </div>
            </div>

            {/* Evidence Text Box */}
            {/* RESPONSIVE FIX: Change padding to p-6 md:p-12 on evidence box to preserve layout space on small mobile viewports */}
            <div className="md:col-span-12 p-6 md:p-12 border border-black/5 bg-[#F9F9F9] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-left">
               <div className="space-y-3 md:space-y-4">
                 <span className="font-mono text-[8px] md:text-[9px] text-red-600 font-black uppercase tracking-widest text-left block">Discovery Phase:</span>
                 <p className="text-xl md:text-2xl font-display font-medium leading-tight">Primary research at elite wrestling centers revealed that traditional video review occurs too late to influence muscle memory recalibration.</p>
               </div>
               <div className="space-y-3 md:space-y-4">
                 <span className="font-mono text-[8px] md:text-[9px] text-red-600 font-black uppercase tracking-widest text-left block">Gap Analysis:</span>
                 <p className="text-xs md:text-sm font-sans text-black/60 leading-relaxed uppercase tracking-tight">Existing sensors are prohibitively expensive or intrusive. The gap exists in making elite biomechanical oversight accessible via standard hardware (Smartphones).</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACT 4 // 03 DEVELOPER_MODE */}
      <section className="relative z-20 bg-[#1A1A1B] py-20 md:py-64 px-6 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 md:mb-24 space-y-4 md:space-y-6 text-left">
            <span className="text-red-500 font-mono text-[10px] md:text-xs font-black tracking-[0.3em] md:tracking-[0.5em] block uppercase">03 // DEVELOPER_MODE</span>
            {/* RESPONSIVE FIX: Add sm:text-[9vw] intermediate step to smooth heading scale and prevent clunky linebreaks */}
            <h2 className="text-[14vw] sm:text-[9vw] md:text-[10vw] font-display font-black leading-[0.8] text-white uppercase">
              ENGINE.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Visual Anchor: Laptop Skeletal Mesh */}
            <div className="lg:col-span-7 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10 p-2 md:p-4 bg-white/5 border border-white/10"
              >
                <img 
                  src={images.trackle_skeletal} 
                  alt="Skeletal Mesh Analysis"
                  className="w-full h-auto grayscale brightness-110 contrast-125"
                />
                <div className="absolute top-4 md:top-8 left-4 md:left-8 bg-red-600 text-white font-mono text-[8px] md:text-[9px] px-2 py-0.5 md:px-3 md:py-1 font-black uppercase shadow-2xl">
                  SYS_LOG: BLAZEPOSE_33_POINT_MESH
                </div>
              </motion.div>

              {/* Logic Overlay - Fixed Formulas */}
              <div className="absolute -bottom-6 md:-bottom-12 -right-4 md:-right-8 z-20 bg-black/90 p-4 md:p-8 border border-white/10 backdrop-blur-xl max-w-[280px] md:max-w-sm text-left">
                 <div className="mb-4 md:mb-6 space-y-1 md:space-y-2">
                    <span className="font-mono text-[8px] md:text-[9px] text-red-500 font-black uppercase tracking-widest block">Error_Vector_Logic:</span>
                    <div className="text-white text-xs md:text-sm py-2 md:py-4 overflow-x-auto">
                      <BlockMath math={"\\vec{E}_{vector} = \\sqrt{(\\theta_{user} - \\theta_{pro})^2 + \\lambda(\\delta t)^2}"} />
                    </div>
                 </div>
                 <div className="space-y-2 md:space-y-4">
                    <p className="text-white/40 font-mono text-[8px] md:text-[9px] uppercase leading-tight font-bold">
                       [LOG: CALCULATING JOINT ANGULAR VELOCITY AT 30FPS. TOLERANCE (ε) SET TO ≤ 8.00° FOR ADVANCED_THRESHOLD.]
                    </p>
                 </div>
              </div>
            </div>

            {/* Engine Description */}
            <div className="lg:col-span-5 space-y-8 md:space-y-12 lg:pl-12 text-left mt-12 md:mt-0">
               <div className="space-y-4 md:space-y-6">
                 <h3 className="text-white text-2xl md:text-4xl font-display font-bold uppercase tracking-tighter">Mathematical Framework.</h3>
                 <p className="text-white/50 text-lg md:text-xl leading-relaxed">
                   The system utilizes high-entropy computer vision models to map 33 joint coordinates in 3-dimensional space, calculating angular deviations against professional benchmarks in under 12ms.
                 </p>
               </div>
               
               <div className="space-y-6 md:space-y-8">
                  <div className="flex items-center gap-4 md:gap-6 group">
                     <div className="w-px h-8 md:h-12 bg-red-600 transition-all duration-500 group-hover:h-16 md:group-hover:h-24" />
                     <div className="space-y-1">
                        <span className="font-mono text-[9px] md:text-[10px] text-red-600 font-bold uppercase">Clone-The-Pro:</span>
                        <p className="text-white/30 text-[10px] md:text-[11px] uppercase tracking-widest font-sans">Dynamic reference extraction from elite archival footage.</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 md:gap-6 group">
                     <div className="w-px h-8 md:h-12 bg-white/20 transition-all duration-500 group-hover:bg-red-600 group-hover:h-16 md:group-hover:h-24" />
                     <div className="space-y-1">
                        <span className="font-mono text-[9px] md:text-[10px] text-red-600 font-bold uppercase">Latency Threshold:</span>
                        <p className="text-white/30 text-[10px] md:text-[11px] uppercase tracking-widest font-sans">Zero-lag haptic triggers for instant neurological feedback.</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACT 4.5 // DESIGN_LANGUAGE */}
      <section className="relative z-20 bg-white py-20 md:py-64 px-6 overflow-hidden">
        <div className="max-w-[1400px] mx-auto text-left">
          <div className="mb-16 md:mb-24 space-y-4 md:space-y-6">
            <span className="text-red-600 font-mono text-[10px] md:text-xs font-black tracking-[0.3em] md:tracking-[0.5em] block uppercase">4.5 // DESIGN_LANGUAGE</span>
            {/* RESPONSIVE FIX: Add sm:text-[9vw] intermediate step for unified visual scaling across mobile and tablets */}
            <h2 className="text-[14vw] sm:text-[9vw] md:text-[10vw] font-display font-black leading-[0.8] text-[#1A1A1B] uppercase">
              SYSTEMS.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-12">
            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 1 }}
               className="relative group overflow-hidden border border-black/5 bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)]"
            >
              <img 
                src={images.trackle_design_language} 
                alt="Trackle Design Systems and Brand Identity"
                className="w-full h-auto"
              />
              <div className="absolute top-4 md:top-8 left-4 md:left-8 bg-red-600 text-white font-mono text-[8px] md:text-[9px] px-2 py-0.5 md:px-3 md:py-1 font-black uppercase">
                IDENTITY_DOC: TRACKLE_SYSTEM_V2
              </div>
              <div className="absolute bottom-6 md:bottom-12 right-6 md:right-12 max-w-sm p-4 md:p-8 bg-black/90 backdrop-blur-xl border-r-4 border-red-600 text-left hidden md:block">
                 <p className="font-mono text-[8px] md:text-[9px] text-red-500 font-black uppercase tracking-widest mb-2 md:mb-4 block">Visual Grammar:</p>
                 <p className="text-white/60 text-[12px] md:text-sm font-sans tracking-tight leading-relaxed uppercase">
                   The design system leverages high-contrast utilitarian aesthetics. A palette dominated by 'Trackle Red' and 'Midnight Black' evokes the intensity of competition, while wide-tracking typography ensures legibility during rapid motion feedback.
                 </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ACT 5 // 04 INTERFACE */}
      <section ref={act5Ref} className="relative z-20 bg-white py-20 md:py-64 px-6 border-y border-black/5">
        <div className="max-w-[1400px] mx-auto text-center mb-16 md:mb-32">
          <span className="text-red-500 font-mono text-[10px] md:text-xs font-black tracking-[0.3em] md:tracking-[0.5em] block uppercase mb-4 md:mb-6">04 // INTERFACE</span>
          {/* RESPONSIVE FIX: Add sm:text-[9vw] intermediate layout size for scaling headers consistently */}
          <h2 className="text-[14vw] sm:text-[9vw] md:text-[12vw] font-display font-black leading-[0.8] text-[#1A1A1B] uppercase py-2">
            PRODUCT.
          </h2>
        </div>

        {/* 3-Phone Lineup */}
        <div className="max-w-[1200px] mx-auto">
          {/* RESPONSIVE FIX: Switch column counts to grid-cols-1 on small mobile screen sizes to ensure phone contents remain readable, and scale gap dynamically */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 items-center max-w-xs mx-auto sm:max-w-none">
             {/* Left Phone */}
             <motion.div 
               style={{ 
                 opacity: useTransform(act5Progress, [0.2, 0.4], [0.4, 0.8]),
                 y: useTransform(act5Progress, [0.2, 0.4], [50, 0])
               }}
               className="aspect-[9/19] bg-gray-100 rounded-[1.5rem] md:rounded-[3rem] overflow-hidden border-[4px] md:border-[8px] border-black shadow-xl"
             >
               <img src={images.trackle_screen_01} className="w-full h-full object-cover grayscale brightness-90" alt="Left Panel" />
             </motion.div>

             {/* Center Phone - SCALING EFFECT */}
             <motion.div 
               style={{ 
                 scale: useTransform(act5Progress, [0.3, 0.6], [1, 1.25]),
               }}
               className="aspect-[9/19] bg-red-600 rounded-[1.5rem] md:rounded-[3rem] overflow-hidden border-[5px] md:border-[10px] border-black shadow-2xl relative z-10"
             >
               <img src={images.trackle_screen_02} className="w-full h-full object-cover scale-[1.05]" alt="Center Panel" />
               <div className="absolute top-6 md:top-12 left-1/2 -translate-x-1/2 bg-red-600 text-white font-mono text-[6px] md:text-[8px] px-2 py-0.5 md:px-3 md:py-1 font-black whitespace-nowrap shadow-lg">
                 SYSTEM_STATUS: ACTIVE_MODE_V3.1
               </div>
             </motion.div>

             {/* Right Phone */}
             <motion.div 
               style={{ 
                 opacity: useTransform(act5Progress, [0.2, 0.4], [0.4, 0.8]),
                 y: useTransform(act5Progress, [0.2, 0.4], [50, 0])
               }}
               className="aspect-[9/19] bg-gray-100 rounded-[1.5rem] md:rounded-[3rem] overflow-hidden border-[4px] md:border-[8px] border-black shadow-xl"
             >
               <img src={images.trackle_screen_03} className="w-full h-full object-cover grayscale brightness-90" alt="Right Panel" />
             </motion.div>
          </div>
          
          {/* RESPONSIVE FIX: Prevent huge whitespace jumps by changing margin to mt-16 md:mt-48 after mobile lineups */}
          <div className="mt-16 md:mt-48 text-center max-w-2xl mx-auto flex flex-col items-center gap-6 md:gap-8">
             <p className="text-red-500 font-mono text-[8px] md:text-[10px] bg-red-50 inline-block px-3 py-1.5 md:px-4 md:py-2 font-black uppercase border border-red-200">
               Interface Visual Showcase: High-Density Tech Stats & Posture Heatmaps
             </p>
             <p className="text-lg md:text-xl text-black/60 font-sans tracking-tight leading-relaxed px-4">
               Designed for extreme combat conditions. High-contrast typography and oversized triggers ensure usability even when the athlete is at peak exhaustion.
             </p>
             <motion.a 
               href={text.project_trackle_behance} 
               target="_blank" 
               rel="noopener noreferrer"
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               className="group relative flex items-center gap-4 md:gap-6 px-8 py-4 md:px-12 md:py-6 bg-red-600 text-white rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(220,38,38,0.3)]"
             >
                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                <span className="relative z-10 font-display font-black uppercase tracking-[0.2em] text-xs md:text-sm">Full Case Study</span>
                <div className="relative z-10 w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-red-600 transition-colors">
                  <ExternalLink size={16} md:size={18} />
                </div>
             </motion.a>
          </div>
        </div>
      </section>

      {/* ACT 6 // 05 OUTCOMES */}
      <section className="relative z-20 bg-[#1A1A1B] text-white py-20 md:py-64 px-6">
        <div className="max-w-[1400px] mx-auto">
           {/* RESPONSIVE FIX: Lower card padding to p-8 md:p-16 and number font sizes to text-5xl md:text-7xl to prevent clip-offs under minimal widths */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/10 border border-white/10 mb-16 md:mb-32">
              <div className="p-8 md:p-16 bg-[#1A1A1B] space-y-3 md:space-y-4 text-left">
                 <span className="font-mono text-[8px] md:text-[9px] text-red-500 font-black tracking-widest uppercase block">Metric: Accuracy</span>
                 <p className="text-5xl md:text-7xl font-display font-light">98.2<span className="text-lg md:text-xl">%</span></p>
                 <p className="text-white/40 text-[8px] md:text-[10px] uppercase tracking-widest leading-relaxed font-bold">Tracking precision within the designated 8-degree biomechanical threshold.</p>
              </div>
              <div className="p-8 md:p-16 bg-[#1A1A1B] space-y-3 md:space-y-4 md:border-l border-white/10 text-left border-t md:border-t-0">
                 <span className="font-mono text-[8px] md:text-[9px] text-red-500 font-black tracking-widest uppercase block">Metric: Safety</span>
                 <p className="text-5xl md:text-7xl font-display font-light">0.0<span className="text-lg md:text-xl">leaks</span></p>
                 <p className="text-white/40 text-[8px] md:text-[10px] uppercase tracking-widest leading-relaxed font-bold">Zero unrecorded at-risk maneuvers during field testing trials.</p>
              </div>
              <div className="p-8 md:p-16 bg-[#1A1A1B] space-y-3 md:space-y-4 md:border-l border-white/10 text-left border-t md:border-t-0">
                 <span className="font-mono text-[8px] md:text-[9px] text-red-500 font-black tracking-widest uppercase block">Metric: Efficiency</span>
                 <p className="text-5xl md:text-7xl font-display font-light">12<span className="text-lg md:text-xl">ms</span></p>
                 <p className="text-white/40 text-[8px] md:text-[10px] uppercase tracking-widest leading-relaxed font-bold">Total latency from frame capture to haptic feedback execution.</p>
              </div>
           </div>

           {/* Next Project Navigation */}
           <div className="mt-16 md:mt-32 pt-16 md:pt-32 border-t border-white/10 w-full flex flex-col md:flex-row justify-between items-center gap-12 md:gap-0">
              <Link to="/" className="group flex items-center gap-4">
                 <div className="w-10 h-10 md:w-12 md:h-12 bg-white text-[#1A1A1B] flex items-center justify-center rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                   <ArrowLeft size={16} md:size={18} />
                 </div>
                 <span className="font-display font-bold uppercase tracking-widest text-xs md:text-sm text-white group-hover:text-red-600 transition-colors">Back to Terminal</span>
              </Link>
              
              <div className="flex flex-col items-center md:items-end">
                 <span className="font-mono text-[8px] md:text-[10px] text-white/40 uppercase mb-2">Next Research</span>
                 {/* RESPONSIVE FIX: Prevent overflow of next research navigation elements on small screens by adding text-xl sm:text-2xl md:text-5xl and wrap behavior */}
                 <Link to="/project/eco-smart-kiln" className="text-xl sm:text-2xl md:text-5xl flex flex-wrap items-center gap-4 md:gap-6 font-display font-black uppercase hover:text-red-500 transition-colors text-white group">
                   Eco-Smart Kiln <ChevronRight size={24} md:size={32} className="text-red-600 group-hover:translate-x-2 transition-transform" />
                 </Link>
              </div>
           </div>
        </div>
      </section>

      {/* Persistent Red Typography: Custom Styling */}
      <style>{`
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  );
}
