import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#FFFFFF] text-black flex flex-col justify-between items-center px-6 sm:px-8 md:px-12 lg:px-16 pt-28 sm:pt-32 md:pt-36 pb-6 overflow-hidden select-none">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center flex-1 justify-between">
        {/* Giant Typography Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-full text-center pt-2 md:pt-4"
        >
          <h1 className="text-[clamp(2rem,10vw,5rem)] md:text-[clamp(5rem,11vw,8rem)] lg:text-[clamp(7rem,12vw,11rem)] xl:text-[13rem] tracking-tight leading-none text-zinc-950 font-normal select-none">
            <span className="font-serif italic font-normal text-zinc-950">aditya</span>
            <span className="text-[#FF3B30] font-sans font-black">.</span>
            <span className="font-sans font-bold md:font-black tracking-tighter text-zinc-950">design</span>
          </h1>
        </motion.div>

        {/* Sub-Category / Skill Taxonomy Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 py-6 md:py-8 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm font-medium tracking-tight text-zinc-700 border-b border-zinc-100"
        >
          <span className="hover:text-black transition-colors">+Design Research</span>
          <span className="hover:text-black transition-colors">+Product Design</span>
          <span className="hover:text-black transition-colors">+Technology</span>
          <span className="hover:text-black transition-colors">+Storytelling</span>
        </motion.div>

        {/* Centered 3D Product / Hardware Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-3xl md:max-w-4xl mx-auto flex justify-center items-end relative overflow-visible pt-4 md:pt-6 pb-2"
        >
          <img
            src="/assets/aistudio/image_38c7d5d2.png"
            alt="Cyber-physical handheld gaming console and wearable tracker mockup"
            className="w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl object-contain h-auto drop-shadow-[0_25px_35px_rgba(0,0,0,0.12)] select-none pointer-events-none hover:scale-[1.02] transition-transform duration-700"
          />
        </motion.div>
      </div>
    </section>
  );
}
