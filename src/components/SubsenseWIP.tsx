import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft, Cpu, Layers, ExternalLink, Zap, BarChart3, ShieldCheck } from 'lucide-react';

export default function SubsenseProject() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#F8F9FB] min-h-screen text-[#1A1A1A] font-sans selection:bg-[#582C9F] selection:text-white"
    >
      {/* 1. Dashboard Blueprint Hero */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden border-b border-gray-200">
        <div className="absolute inset-0 opacity-[0.4] pointer-events-none">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        {/* Global Nav Elements */}
        {/* RESPONSIVE FIX: Adjust padding bounds from absolute top-12 left-12 to top-6 left-6 md:top-12 md:left-12 to avoid viewport overflow on small screens */}
        <div className="absolute top-6 left-6 md:top-12 md:left-12 flex items-center gap-6">
          <Link to="/" className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-[#582C9F] hover:text-white transition-all shadow-sm">
            <ArrowLeft size={16} />
          </Link>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#582C9F] tracking-widest uppercase">Research_Log_03</span>
            <span className="text-[9px] text-gray-400 font-mono">STABLE_BUILD_2026.04</span>
          </div>
        </div>

        {/* "Incomplete" Dashboard Elements (Floating Wireframes) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* RESPONSIVE FIX: Add 'hidden md:block' to decorative wireframes to prevent sideways layout scrolling on mobile devices */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -left-20 w-80 h-48 bg-white border border-gray-200 rounded-2xl shadow-xl opacity-40 p-6 space-y-4 hidden md:block"
          >
            <div className="h-4 w-1/2 bg-gray-100 rounded" />
            <div className="h-20 w-full bg-gray-50 rounded border border-dashed border-gray-200 flex items-center justify-center">
              <span className="text-[10px] font-mono text-gray-300">WIRE_CHART_EXP</span>
            </div>
          </motion.div>

          {/* RESPONSIVE FIX: Add 'hidden md:block' to decorative wireframes to prevent sideways layout scrolling on mobile devices */}
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-1/4 -right-20 w-96 h-64 bg-[#582C9F] rounded-3xl shadow-2xl opacity-10 p-8 hidden md:block"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center gap-3 bg-white px-4 py-1.5 rounded-full border border-gray-100 shadow-sm"
          >
            <div className="w-2 h-2 bg-[#D9F99D] rounded-full shadow-[0_0_8px_#D9F99D]" />
            <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-gray-500 font-mono">Interface // Logic // Intelligence</span>
          </motion.div>

          <div className="space-y-2">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-[8vw] font-display font-black tracking-tightest leading-none text-[#582C9F] uppercase"
            >
              SUBSENSE
            </motion.h1>
            
            <motion.p 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.3 }}
               className="text-[#1A1A1A]/40 font-mono tracking-[0.3em] text-xs md:text-sm uppercase font-bold"
            >
              Kinetic Logic for SaaS Ecosystems
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex gap-4"
          >
            <div className="px-6 py-3 bg-[#D9F99D] text-[#1A1A1A] font-bold text-[10px] uppercase tracking-widest rounded-full shadow-sm">
              In_Progress
            </div>
            <div className="px-6 py-3 bg-white border border-gray-200 text-gray-400 font-bold text-[10px] uppercase tracking-widest rounded-full">
              Alpha_Testing
            </div>
          </motion.div>
        </div>

        {/* RESPONSIVE FIX: Reposition bottom layout bounds (absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12) to avoid clipping issues */}
        <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12 flex justify-between items-end border-t border-gray-100 pt-8 opacity-40">
          <div className="text-[10px] font-mono leading-relaxed">
            <span className="block">[SYSTEM_STATUS: NOMINAL]</span>
            <span className="block">[UI_RENDERER: ACTIVE]</span>
          </div>
          <div className="text-[10px] font-mono text-right leading-relaxed">
            <span className="block">DEPLOY_REF: KAPPA_01</span>
            <span className="block">TIMESTAMP: 2026.05.13</span>
          </div>
        </div>
      </section>

      {/* 2. Core Logic Section (What it is & What it does) */}
      <section className="py-32 md:py-56 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <span className="text-[#582C9F] font-mono text-[10px] font-bold tracking-[0.4em] uppercase">01 // THE DEFINITION</span>
              <h3 className="text-4xl md:text-6xl font-display font-black uppercase leading-tight text-[#1A1A1A]">
                An Intelligent <br/> Decision <br/> <span className="text-[#582C9F]">System</span>
              </h3>
            </div>
            
            <p className="text-xl text-gray-500 leading-relaxed font-sans font-light border-l-4 border-[#D9F99D] pl-8">
              Subsense is an <span className="text-[#1A1A1A] font-bold">AI-powered spend intelligence platform</span> designed to bridge the gap between operational growth and subscription waste. It transforms fragmented SaaS data into a high-fidelity visual decision system.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#F8F9FB] rounded-xl border border-gray-100">
                <span className="block text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-1">Module_01</span>
                <span className="text-sm font-bold uppercase">Spend_Map</span>
              </div>
              <div className="p-4 bg-[#F8F9FB] rounded-xl border border-gray-100">
                <span className="block text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-1">Module_02</span>
                <span className="text-sm font-bold uppercase">AI_Optimization</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-[#582C9F]/5 blur-3xl rounded-full" />
            <div className="relative bg-white border border-gray-100 rounded-[32px] shadow-2xl p-8 overflow-hidden">
               {/* Dashboard Wireframe Elements */}
               <div className="flex justify-between items-center mb-8">
                 <div className="w-32 h-6 bg-gray-100 rounded-full" />
                 <div className="flex gap-2">
                   <div className="w-8 h-8 rounded-full bg-[#D9F99D]" />
                   <div className="w-8 h-8 rounded-full bg-[#F3F4F6]" />
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-6 mb-8">
                 <div className="space-y-3">
                   <div className="h-3 w-16 bg-gray-100 rounded" />
                   <div className="h-10 w-full bg-[#F8F9FB] rounded-xl border border-dashed border-gray-200" />
                 </div>
                 <div className="space-y-3">
                   <div className="h-3 w-20 bg-gray-100 rounded" />
                   <div className="h-10 w-full bg-[#F8F9FB] rounded-xl border border-dashed border-gray-200" />
                 </div>
               </div>

               <div className="h-48 w-full bg-[#582C9F]/5 rounded-2xl flex items-center justify-center">
                 <div className="w-full px-8 space-y-4">
                   <div className="h-2 w-full bg-[#D9F99D]/20 rounded" />
                   <div className="h-2 w-4/5 bg-[#582C9F]/20 rounded" />
                   <div className="h-2 w-3/4 bg-gray-100 rounded" />
                 </div>
               </div>
               
               <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none" />
               <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[9px] text-[#582C9F] font-bold tracking-widest uppercase">
                 [ SKELETON_RENDER_V1.1 ]
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Live Experience CTA (The Vercel Link) */}
      <section className="py-40 bg-[#582C9F] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center gap-10">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.5em] text-[#D9F99D]">Live Deployment</span>
            <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-tight">
              Experience <br className="hidden md:block" /> the <span className="italic font-light opacity-50">System</span> Live
            </h2>
            <p className="max-w-xl text-indigo-200 font-sans text-lg uppercase tracking-wide font-medium leading-relaxed">
              Explore the deployed architecture. Interact with real-time spend intelligence models.
            </p>
            
            {/* RESPONSIVE FIX: Decrease button padding to px-8 md:px-12 py-5 md:py-6 to maintain better spatial proportions on narrow widths */}
            <motion.a 
              href="https://subsence-kappa.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-4 bg-[#D9F99D] text-[#1A1A1A] px-8 md:px-12 py-5 md:py-6 rounded-full font-black uppercase tracking-widest text-xs overflow-hidden shadow-xl"
            >
              <div className="absolute inset-0 bg-[#FFF] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 flex items-center gap-3">
                Launch System Instance <ExternalLink size={16} />
              </span>
            </motion.a>
          </div>
        </div>

        {/* Decorative Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black opacity-[0.05] select-none pointer-events-none whitespace-nowrap">
          SUB_SENSE
        </div>
      </section>

      {/* 4. Technical Modules (The Details) */}
      <section className="py-32 md:py-56 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-4">
             <span className="text-[#582C9F] font-mono text-[10px] font-bold tracking-[0.4em] uppercase">02 // THE FUNCTION</span>
             <h2 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter">Design <span className="text-[#582C9F]/20">Logic</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* RESPONSIVE FIX: Change padding container elements from p-10 to p-6 md:p-10 inside standard feature columns */}
            {[
              { 
                title: "Spend Intelligence", 
                desc: "Automated analysis of SaaS billing patterns and renewal trajectories using spectral data mapping.",
                icon: <BarChart3 className="text-[#582C9F]" />
              },
              { 
                title: "Adaptive Interface", 
                desc: "Generative UI states that shift based on high-density financial data inputs and user behavioral cycles.",
                icon: <Layers className="text-[#582C9F]" />
              },
              { 
                title: "Predictive Alerts", 
                desc: "AI-driven triggers that flag subscription waste and upcoming renewals with surgical precision.",
                icon: <Zap className="text-[#582C9F]" />
              }
            ].map((feature, i) => (
              <div key={i} className="p-6 md:p-10 bg-[#F8F9FB] border border-gray-100 hover:border-[#D9F99D] hover:bg-white transition-all group rounded-2xl shadow-sm">
                <div className="mb-8 w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center transition-colors group-hover:bg-[#582C9F] group-hover:text-white">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-display font-bold uppercase mb-4 text-[#1A1A1A] tracking-tight">{feature.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed font-sans">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4.5. Component Anatomy Section */}
      <section className="py-32 md:py-56 px-6 bg-[#F8F9FB] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* RESPONSIVE FIX: Optimize grid layouts and decrease gap scale to gap-12 lg:gap-24 on tablet grids */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="space-y-8">
              <span className="text-[#582C9F] font-mono text-[10px] font-bold tracking-[0.4em] uppercase">02.5 // ATOMIC_DESIGN</span>
              <h2 className="text-4xl md:text-7xl font-display font-black uppercase leading-tight">Component <br/> Anatomy</h2>
              <p className="text-xl text-gray-500 font-sans font-light max-w-md">
                Deconstructing the interface into its fundamental logic. Every button and metric card is designed for high-density information retrieval.
              </p>
            </div>

            <div className="relative grid grid-cols-2 gap-4">
               {/* Raw Component 1: Action Button */}
               <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                 <div className="h-2 w-12 bg-[#582C9F]/10 rounded" />
                 <div className="w-full h-12 bg-[#D9F99D] rounded-full flex items-center justify-center text-[10px] font-black uppercase tracking-widest">
                   Review_Savings
                 </div>
                 <div className="flex justify-between items-center opacity-20">
                    <div className="h-1 w-1/3 bg-gray-200" />
                    <div className="h-1 w-1/4 bg-gray-200" />
                 </div>
               </div>

               {/* Raw Component 2: Metric Tracker */}
               <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                 <div className="flex justify-between">
                    <div className="w-8 h-8 rounded-lg bg-[#582C9F]/5" />
                    <div className="w-8 h-2 bg-gray-100 rounded" />
                 </div>
                 <div className="space-y-2">
                   <div className="h-8 w-2/3 bg-gray-100 rounded" />
                   <div className="h-2 w-1/2 bg-[#582C9F]/20 rounded" />
                 </div>
               </div>

               {/* Raw Component 3: The Chart Logic */}
               <div className="col-span-2 bg-[#1A1A1A] p-8 rounded-3xl border border-white/5 space-y-6 overflow-hidden relative">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#582C9F] blur-[80px] opacity-20" />
                 <div className="flex justify-between items-center relative z-10">
                   <div className="space-y-2">
                     <div className="h-2 w-24 bg-white/10 rounded" />
                     <div className="h-6 w-48 bg-white/5 rounded" />
                   </div>
                   <div className="w-12 h-6 border border-white/20 rounded-full" />
                 </div>
                 <div className="h-32 w-full border-b border-dashed border-white/10 flex items-end gap-2 px-4">
                    {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        className="flex-grow bg-[#582C9F]/40 hover:bg-[#D9F99D] transition-colors rounded-t-sm"
                      />
                    ))}
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <footer className="py-24 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <Link to="/" className="group flex items-center gap-4">
             <div className="w-12 h-12 bg-[#1A1A1A] text-white flex items-center justify-center rounded-full group-hover:bg-[#582C9F] transition-colors">
               <ArrowLeft size={18} />
             </div>
             <div className="flex flex-col">
               <span className="font-display font-black uppercase tracking-widest text-[10px]">Return to Terminal</span>
               <span className="text-[9px] font-mono text-gray-400">EXIT_SEQUEN_S.01</span>
             </div>
          </Link>
          
          <div className="flex flex-col items-center md:items-end">
            <span className="font-mono text-[10px] text-gray-400 uppercase mb-4 text-right tracking-[0.2em]">Next Service Case</span>
            {/* RESPONSIVE FIX: Prevent line overflow on small screen widths by adding text-2xl sm:text-3xl md:text-6xl and flex-wrap properties to the layout container */}
            <Link to="/project/sahaay" className="text-2xl sm:text-3xl md:text-6xl flex flex-wrap items-center gap-6 font-display font-black uppercase hover:text-[#582C9F] transition-all group">
              SAHAAY 
              <div className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center group-hover:bg-[#D9F99D] group-hover:border-[#D9F99D] transition-colors">
                <ExternalLink size={16} className="text-gray-300 group-hover:text-[#1A1A1A]" />
              </div>
            </Link>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}