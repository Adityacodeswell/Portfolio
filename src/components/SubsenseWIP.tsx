import { motion, useAnimationFrame } from 'motion/react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Clock, ShieldAlert, Cpu, Layers, Fingerprint } from 'lucide-react';

export default function SubsenseWIP() {
  const [percent, setPercent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Simulating system loading counter
  useAnimationFrame((time) => {
    const nextPercent = Math.floor((time / 50) % 100);
    setPercent(nextPercent);
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-black min-h-screen text-white font-mono selection:bg-red-600 selection:text-white"
    >
      {/* 1. System Loading Hero */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Background Glitch Texture */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-screen overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] animate-pulse" />
          <motion.div 
            animate={{ 
              y: ["0%", "100%"],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 0.1, repeat: Infinity, repeatType: "loop" }}
            className="w-full h-1 bg-red-600/30 blur-sm"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-12">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-[12vw] font-display font-black tracking-tightest leading-none text-red-600"
          >
            {percent.toString().padStart(2, '0')}%
          </motion.div>
          
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              <span className="text-[10px] uppercase font-bold tracking-[0.5em]">SYSTEM_CALIBRATION_ACTIVE</span>
            </div>
            <p className="text-white/20 text-[9px] uppercase tracking-widest max-w-xs text-center leading-loose">
              Bootloading core ethnographic parameters and interface shaders. unauthorized socket access restricted.
            </p>
          </div>
        </div>

        {/* Framing elements */}
        <div className="absolute top-12 left-12 flex items-center gap-6">
          <Link to="/" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">
            <ArrowLeft size={16} />
          </Link>
          <span className="text-[10px] font-bold text-white/30 tracking-widest">LOG_SUBSENSE_03</span>
        </div>
        
        <div className="absolute bottom-12 right-12 text-right">
          <span className="block text-[10px] text-red-600 font-bold mb-1">STATUS: WIP_PHASE_02</span>
          <span className="block text-[10px] text-white/20 uppercase tracking-widest">NIFT_MUMBAI // LAB_ETHNOGRAPHY</span>
        </div>
      </section>

      {/* 2. Narrative Section */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight uppercase">
                SUBSENSE // <br/><span className="italic font-light text-white/20">Kinetic Logic</span>
              </h2>
              <div className="h-[2px] w-24 bg-red-600" />
            </div>

            <p className="text-2xl md:text-3xl font-sans font-light leading-relaxed text-white/80">
              This project is currently in the <span className="text-white font-bold">Ethnographic Inquiry & Technical Prototyping</span> phase at NIFT Mumbai. Access restricted until system calibration is complete.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
              <div className="p-8 bg-white/5 border border-white/10 space-y-4">
                <Clock className="text-red-600" size={24} />
                <h3 className="font-bold uppercase text-xs tracking-widest">Current Milestone</h3>
                <p className="text-white/40 text-sm leading-relaxed">Encoding haptic feedback loops into generative shader states. Observing gesture-to-data mapping in high-density analysis environments.</p>
              </div>
              <div className="p-8 bg-white/5 border border-white/10 space-y-4">
                <ShieldAlert className="text-red-600" size={24} />
                <h3 className="font-bold uppercase text-xs tracking-widest">Access Protocol</h3>
                <p className="text-white/40 text-sm leading-relaxed">Full case study release scheduled for late Q3 2026. Documentation includes process sketches and preliminary sensor logs.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Visual Teasers (Blurred/Blueprint) */}
      <section className="pb-56 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                tag: "INTERFACE_BLUEPRINT_O1", 
                img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800",
                icon: <Cpu size={16}/> 
              },
              { 
                tag: "SENSORY_LOG_A", 
                img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800",
                icon: <Fingerprint size={16}/> 
              },
              { 
                tag: "UI_FRAMEWORK_SHADERS", 
                img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800",
                icon: <Layers size={16}/> 
              }
            ].map((teaser, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative aspect-[4/5] overflow-hidden bg-white/5 border border-white/10"
              >
                <img 
                  src={teaser.img} 
                  className="w-full h-full object-cover grayscale blur-xl brightness-50 group-hover:blur-md transition-all duration-1000" 
                  alt="Teaser" 
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                <div className="absolute top-6 left-6 flex items-center gap-2 text-white/40 group-hover:text-red-500 transition-colors">
                  {teaser.icon}
                  <span className="text-[9px] uppercase font-bold tracking-widest">{teaser.tag}</span>
                </div>
                <div className="absolute bottom-6 right-6 font-mono text-[9px] opacity-0 group-hover:opacity-100 transition-opacity">
                  [ DATA_RESTRICTED ]
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <footer className="py-24 px-6 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <Link to="/" className="group flex items-center gap-4">
             <div className="w-12 h-12 bg-white text-black flex items-center justify-center rounded-full group-hover:bg-red-600 group-hover:text-white transition-colors">
               <ArrowLeft size={18} />
             </div>
             <span className="font-display font-bold uppercase tracking-widest text-xs">Return Home</span>
          </Link>
          
          <div className="flex flex-col items-end">
            <span className="font-mono text-[10px] text-white/40 uppercase mb-2">Previous Research</span>
            <Link to="/project/sahaay" className="text-2xl font-display font-bold uppercase hover:text-red-600 transition-colors">
              SAHAAY
            </Link>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
