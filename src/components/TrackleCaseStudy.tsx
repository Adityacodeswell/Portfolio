import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function TrackleCaseStudy() {
  const scrollRef = useRef<HTMLDivElement>(null);
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
      <section className="relative h-[120vh] w-full overflow-hidden bg-[#1A1A1B]">
        {/* Overlay Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[25vw] font-display font-black tracking-tighter uppercase text-white leading-none"
          >
            TRACKLE
          </motion.h1>

          {/* Metadata Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-24 w-full max-w-[1400px] border-y border-white/20 py-8 grid grid-cols-1 md:grid-cols-4 gap-8 px-6 backdrop-blur-sm bg-black/10"
          >
            <div className="space-y-1">
              <span className="font-mono text-[9px] text-red-500 uppercase font-black">ROLE</span>
              <p className="text-white text-xs font-bold uppercase tracking-widest">Design Researcher & Developer</p>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-[9px] text-red-500 uppercase font-black">SCOPE</span>
              <p className="text-white text-xs font-bold uppercase tracking-widest">Computer Vision App</p>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-[9px] text-red-500 uppercase font-black">TIMELINE</span>
              <p className="text-white text-xs font-bold uppercase tracking-widest">Aug ‘25 - May ‘26</p>
            </div>
            <div className="flex items-center justify-end">
              <span className="bg-red-600 text-white font-mono text-[10px] px-3 py-1 font-black">LCTN: MUMBAI_HQ</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ACT 2 // 01 IDENTITY */}
      <section className="relative z-20 bg-[#F9F9F9] py-32 md:py-64 px-6 border-t border-black/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            {/* Left Content */}
            <div className="space-y-12">
              <div className="space-y-6">
                <span className="text-red-600 font-mono text-xs font-black tracking-[0.5em] block uppercase text-left">01 // IDENTITY</span>
                <h2 className="text-[10vw] font-display font-black leading-[0.8] text-[#1A1A1B] uppercase py-2 text-left">
                  DNA.
                </h2>
              </div>
              
              <div className="space-y-8 max-w-xl text-left">
                 <h3 className="text-4xl font-display font-bold tracking-tight">Bridging the Gap: Mud to Mat.</h3>
                 <p className="text-xl text-[#1A1A1B]/70 leading-relaxed font-sans">
                  Combat sports transition from traditional "mud" pits to high-tech "mats." Trackle captures this evolution, translating raw physical intuition into granular biomechanical data.
                 </p>
                 <div className="p-8 border-l-4 border-red-600 bg-black/5 space-y-4">
                    <h4 className="font-mono text-[10px] font-black text-red-600 uppercase">Friction Alert:</h4>
                    <p className="text-sm font-sans italic text-[#1A1A1B]/60 uppercase tracking-tight">
                      High-speed maneuvers (120ms execution) leave zero margin for human observation. The friction of solo training leads to permanent biomechanical leaks.
                    </p>
                 </div>
              </div>
            </div>

            {/* Right Visual: Cropped Logo/Palette */}
            <div className="relative group overflow-hidden border border-black/5 aspect-[4/5] bg-white shadow-2xl">
              <img 
                src="/src/assets/images/regenerated_image_1778344061039.png" 
                alt="Trackle Identity Analysis"
                className="w-full h-full object-cover contrast-125 saturate-150 scale-150 translate-x-20 -translate-y-20 transition-transform duration-700"
              />
              <div className="absolute top-8 right-8 flex flex-col items-end gap-2">
                <span className="bg-red-600 text-white font-mono text-[9px] px-3 py-1 font-black uppercase">CORE_ASSET: T_LOGO</span>
                <span className="bg-black text-white font-mono text-[9px] px-3 py-1 font-black uppercase tracking-widest">PALETTE_V1: #FF3A33</span>
              </div>
              <div className="absolute bottom-8 left-8">
                <p className="text-red-600 font-mono text-[10px] bg-white/90 p-4 font-bold border-l-2 border-red-600 uppercase leading-none text-left">
                   [ANALYSIS: Visual identity emphasizes high-performance ergonomics.]
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACT 3 // 02 PROCESS */}
      <section className="relative z-20 bg-white py-32 md:py-64 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <div className="space-y-6 text-left">
              <span className="text-red-600 font-mono text-xs font-black tracking-[0.5em] block uppercase">02 // PROCESS</span>
              <h2 className="text-[10vw] font-display font-black leading-[0.8] text-[#1A1A1B] uppercase">
                RESEARCH.
              </h2>
            </div>
            <div className="max-w-md pb-4 w-full">
              <p className="text-lg font-sans text-black/60 uppercase tracking-tight font-bold text-right">Discovery Phase & Gap Analysis</p>
              <div className="h-1 w-full bg-red-600 mt-4" />
            </div>
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-32">
            {/* Inquiry 1 */}
            <div className="md:col-span-7 group relative overflow-hidden bg-black aspect-[16/10]">
              <img 
                src="/src/assets/images/regenerated_image_1778344066159.png" 
                className="w-full h-full object-cover grayscale opacity-70 group-hover:opacity-100 transition-all duration-1000" 
                alt="Contextual Inquiry" 
              />
              <div className="absolute top-4 left-4 bg-red-600 text-white font-mono text-[10px] px-3 py-1 font-black">
                [FILE_LOG: CONTEXTUAL_INQUIRY_MUMBAI_2025]
              </div>
              <div className="absolute bottom-4 left-4 p-6 bg-black/80 backdrop-blur-sm border-l-2 border-red-600 max-w-sm text-left">
                <h4 className="text-white text-xs font-mono font-black uppercase mb-2">Inquiry: Shadowing Athletes</h4>
                <p className="text-white/40 text-[10px] uppercase font-bold leading-tight">Observing the feedback loop during high-intensity live drills. Identifying the temporal gap in self-correction.</p>
              </div>
            </div>

            {/* Inquiry 2 */}
            <div className="md:col-span-5 group relative overflow-hidden border border-black/5 aspect-square">
              <img 
                src="/src/assets/images/regenerated_image_1778344070862.png" 
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" 
                alt="Field Evidence" 
              />
              <div className="absolute top-4 right-4 bg-red-600 text-white font-mono text-[10px] px-3 py-1 font-black">
                [FIELD_LOG: OBSERVATION_PIT_07]
              </div>
            </div>

            {/* Evidence Text Box */}
            <div className="md:col-span-12 p-12 border border-black/5 bg-[#F9F9F9] grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
               <div className="space-y-4">
                 <span className="font-mono text-[9px] text-red-600 font-black uppercase tracking-widest text-left block">Discovery Phase:</span>
                 <p className="text-2xl font-display font-medium leading-tight">Primary research at elite wrestling centers revealed that traditional video review occurs too late to influence muscle memory recalibration.</p>
               </div>
               <div className="space-y-4">
                 <span className="font-mono text-[9px] text-red-600 font-black uppercase tracking-widest text-left block">Gap Analysis:</span>
                 <p className="text-sm font-sans text-black/60 leading-relaxed uppercase tracking-tight">Existing sensors are prohibitively expensive or intrusive. The gap exists in making elite biomechanical oversight accessible via standard hardware (Smartphones).</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACT 4 // 03 DEVELOPER_MODE */}
      <section className="relative z-20 bg-[#1A1A1B] py-32 md:py-64 px-6 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-24 space-y-6 text-left">
            <span className="text-red-500 font-mono text-xs font-black tracking-[0.5em] block uppercase">03 // DEVELOPER_MODE</span>
            <h2 className="text-[10vw] font-display font-black leading-[0.8] text-white uppercase">
              ENGINE.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Anchor: Laptop Skeletal Mesh */}
            <div className="lg:col-span-7 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10 p-4 bg-white/5 border border-white/10"
              >
                <img 
                  src="/src/assets/images/regenerated_image_1778344970037.png" 
                  alt="Skeletal Mesh Analysis"
                  className="w-full h-auto grayscale brightness-110 contrast-125"
                />
                <div className="absolute top-8 left-8 bg-red-600 text-white font-mono text-[9px] px-3 py-1 font-black uppercase shadow-2xl">
                  SYS_LOG: BLAZEPOSE_33_POINT_MESH
                </div>
              </motion.div>

              {/* Logic Overlay - Fixed Formulas */}
              <div className="absolute -bottom-12 -right-8 z-20 bg-black/90 p-8 border border-white/10 backdrop-blur-xl max-w-sm hidden md:block text-left">
                 <div className="mb-6 space-y-2">
                    <span className="font-mono text-[9px] text-red-500 font-black uppercase tracking-widest block">Error_Vector_Logic:</span>
                    <div className="text-white text-sm py-4">
                      <BlockMath math={"\\vec{E}_{vector} = \\sqrt{(\\theta_{user} - \\theta_{pro})^2 + \\lambda(\\delta t)^2}"} />
                    </div>
                 </div>
                 <div className="space-y-4">
                    <p className="text-white/40 font-mono text-[9px] uppercase leading-tight font-bold">
                       [LOG: CALCULATING JOINT ANGULAR VELOCITY AT 30FPS. TOLERANCE (ε) SET TO ≤ 8.00° FOR ADVANCED_THRESHOLD.]
                    </p>
                 </div>
              </div>
            </div>

            {/* Engine Description */}
            <div className="lg:col-span-5 space-y-12 lg:pl-12 text-left">
               <div className="space-y-6">
                 <h3 className="text-white text-4xl font-display font-bold uppercase tracking-tighter">Mathematical Framework.</h3>
                 <p className="text-white/50 text-xl leading-relaxed">
                   The system utilizes high-entropy computer vision models to map 33 joint coordinates in 3-dimensional space, calculating angular deviations against professional benchmarks in under 12ms.
                 </p>
               </div>
               
               <div className="space-y-8">
                  <div className="flex items-center gap-6 group">
                     <div className="w-px h-12 bg-red-600 transition-all duration-500 group-hover:h-24" />
                     <div className="space-y-1">
                        <span className="font-mono text-[10px] text-red-600 font-bold uppercase">Clone-The-Pro:</span>
                        <p className="text-white/30 text-[11px] uppercase tracking-widest font-sans">Dynamic reference extraction from elite archival footage.</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-6 group">
                     <div className="w-px h-12 bg-white/20 transition-all duration-500 group-hover:bg-red-600 group-hover:h-24" />
                     <div className="space-y-1">
                        <span className="font-mono text-[10px] text-red-600 font-bold uppercase">Latency Threshold:</span>
                        <p className="text-white/30 text-[11px] uppercase tracking-widest font-sans">Zero-lag haptic triggers for instant neurological feedback.</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACT 5 // 04 INTERFACE */}
      <section ref={act5Ref} className="relative z-20 bg-white py-32 md:py-64 px-6 border-y border-black/5">
        <div className="max-w-[1400px] mx-auto text-center mb-32">
          <span className="text-red-500 font-mono text-xs font-black tracking-[0.5em] block uppercase mb-6">04 // INTERFACE</span>
          <h2 className="text-[12vw] font-display font-black leading-[0.8] text-[#1A1A1B] uppercase py-2">
            PRODUCT.
          </h2>
        </div>

        {/* 3-Phone Lineup */}
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-3 gap-4 md:gap-12 items-center">
             {/* Left Phone */}
             <motion.div 
               style={{ 
                 opacity: useTransform(act5Progress, [0.2, 0.4], [0.4, 0.8]),
                 y: useTransform(act5Progress, [0.2, 0.4], [50, 0])
               }}
               className="aspect-[9/19] bg-gray-100 rounded-[3rem] overflow-hidden border-[8px] border-black shadow-xl"
             >
               <img src="/src/assets/images/regenerated_image_1778344976693.jpg" className="w-full h-full object-cover grayscale brightness-90 translate-x-[-100%] scale-[2.5]" alt="Left Panel" />
             </motion.div>

             {/* Center Phone - SCALING EFFECT */}
             <motion.div 
               style={{ 
                 scale: useTransform(act5Progress, [0.3, 0.6], [1, 1.25]),
               }}
               className="aspect-[9/19] bg-red-600 rounded-[3rem] overflow-hidden border-[10px] border-black shadow-2xl relative z-10"
             >
               <img src="/src/assets/images/regenerated_image_1778344976693.jpg" className="w-full h-full object-cover scale-[1.05]" alt="Center Panel" />
               <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-red-600 text-white font-mono text-[8px] px-3 py-1 font-black whitespace-nowrap shadow-lg">
                 SYSTEM_STATUS: ACTIVE_MODE_V3.1
               </div>
             </motion.div>

             {/* Right Phone */}
             <motion.div 
               style={{ 
                 opacity: useTransform(act5Progress, [0.2, 0.4], [0.4, 0.8]),
                 y: useTransform(act5Progress, [0.2, 0.4], [50, 0])
               }}
               className="aspect-[9/19] bg-gray-100 rounded-[3rem] overflow-hidden border-[8px] border-black shadow-xl"
             >
               <img src="/src/assets/images/regenerated_image_1778344976693.jpg" className="w-full h-full object-cover grayscale brightness-90 translate-x-[100%] scale-[2.5]" alt="Right Panel" />
             </motion.div>
          </div>
          
          <div className="mt-48 text-center max-w-2xl mx-auto">
             <p className="text-red-500 font-mono text-[10px] bg-red-50 inline-block px-4 py-2 font-black uppercase mb-6 border border-red-200">
               Interface Visual Showcase: High-Density Tech Stats & Posture Heatmaps
             </p>
             <p className="text-xl text-black/60 font-sans tracking-tight leading-relaxed">
               Designed for extreme combat conditions. High-contrast typography and oversized triggers ensure usability even when the athlete is at peak exhaustion.
             </p>
          </div>
        </div>
      </section>

      {/* ACT 6 // 05 OUTCOMES */}
      <section className="relative z-20 bg-[#1A1A1B] text-white py-32 md:py-64 px-6">
        <div className="max-w-[1400px] mx-auto">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/10 border border-white/10 mb-32">
              <div className="p-16 bg-[#1A1A1B] space-y-4 text-left">
                 <span className="font-mono text-[9px] text-red-500 font-black tracking-widest uppercase block">Metric: Accuracy</span>
                 <p className="text-7xl font-display font-light">98.2<span className="text-xl">%</span></p>
                 <p className="text-white/40 text-[10px] uppercase tracking-widest leading-relaxed font-bold">Tracking precision within the designated 8-degree biomechanical threshold.</p>
              </div>
              <div className="p-16 bg-[#1A1A1B] space-y-4 border-l border-white/10 text-left">
                 <span className="font-mono text-[9px] text-red-500 font-black tracking-widest uppercase block">Metric: Safety</span>
                 <p className="text-7xl font-display font-light">0.0<span className="text-xl">leaks</span></p>
                 <p className="text-white/40 text-[10px] uppercase tracking-widest leading-relaxed font-bold">Zero unrecorded at-risk maneuvers during field testing trials.</p>
              </div>
              <div className="p-16 bg-[#1A1A1B] space-y-4 border-l border-white/10 text-left">
                 <span className="font-mono text-[9px] text-red-500 font-black tracking-widest uppercase block">Metric: Efficiency</span>
                 <p className="text-7xl font-display font-light">12<span className="text-xl">ms</span></p>
                 <p className="text-white/40 text-[10px] uppercase tracking-widest leading-relaxed font-bold">Total latency from frame capture to haptic feedback execution.</p>
              </div>
           </div>

           {/* System Exit */}
           <div className="flex flex-col items-center">
              <Link 
                to="/" 
                className="group relative overflow-hidden bg-red-600 px-12 py-8 flex items-center gap-6 transition-all duration-500 hover:bg-white"
              >
                 <RefreshCw size={24} className="text-white group-hover:text-red-600 transition-colors animate-spin-slow" />
                 <span className="text-white group-hover:text-red-600 font-display font-black text-2xl tracking-[0.2em] uppercase transition-colors">REBOOT SYSTEM</span>
                 <ArrowLeft size={18} className="text-white group-hover:text-red-600 transition-colors" />
              </Link>
              <div className="mt-8 text-center">
                <p className="text-white/20 font-mono text-[8px] uppercase tracking-[0.5em]">ARCHIVE_PATH: PORTFOLIO_HERO_ROOT</p>
                <p className="text-red-500 font-mono text-[10px] mt-2 font-black uppercase">SYSTEM_STABLE // NO ERRORS_FOUND</p>
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
