import { motion } from 'motion/react';
import { useState } from 'react';
import KineticBackground from './KineticBackground';
import EnvironmentalShift from './EnvironmentalShift';
import { PORTFOLIO_DATA } from '../config/content';

export default function Hero() {
  const [isMotionHovered, setIsMotionHovered] = useState(false);
  const { text } = PORTFOLIO_DATA;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5
      }
    }
  };

  const item = {
    hidden: { y: 100, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.33, 1, 0.68, 1] } }
  };

  return (
    <motion.section 
      animate={{ 
        backgroundColor: isMotionHovered ? '#1A1A1B' : '#F9F9F9' 
      }}
      transition={{ duration: isMotionHovered ? 0.4 : 0 }}
      className="relative min-h-screen flex flex-col justify-center px-6 py-24 md:px-12 md:pb-32 overflow-hidden"
    >
      <EnvironmentalShift active={isMotionHovered} />

      {/* Technical Grid Background (Static version) */}
      <div className="absolute inset-0 -z-20 opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#1A1A1B 1px, transparent 1px), linear-gradient(90deg, #1A1A1B 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-[1800px] mx-auto w-full relative"
      >
        {/* Live Status Indicator */}
        <motion.div 
          variants={item}
          className="absolute -top-32 left-0 flex items-center gap-3"
        >
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent font-semibold">
            [RECORDING SYSTEM ACTIVE]
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <motion.h1 
              variants={item}
              animate={{ color: isMotionHovered ? '#FFFFFF' : '#1A1A1B' }}
              transition={{ duration: isMotionHovered ? 0.4 : 0 }}
              className="text-[12vw] md:text-[8.5vw] leading-[0.85] font-display font-medium -ml-[0.05em] uppercase relative"
            >
              PRECISION <br/> IN <span 
                className="italic font-light text-accent cursor-none relative inline-block group/motion"
                onMouseEnter={() => setIsMotionHovered(true)}
                onMouseLeave={() => setIsMotionHovered(false)}
              >
                MOTION.
              </span>
            </motion.h1>
          </div>
          
          <div className="lg:col-span-4 lg:pl-12 flex flex-col gap-10">
            <motion.div variants={item} className="space-y-4">
              <motion.p 
                animate={{ color: isMotionHovered ? 'rgba(255,255,255,0.4)' : 'rgba(26,26,27,0.4)' }}
                transition={{ duration: isMotionHovered ? 0.4 : 0 }}
                className="font-mono text-[10px] uppercase tracking-[0.2em]"
              >
                01 / STATUS: {text.hero_status}
              </motion.p>
              <motion.p 
                animate={{ color: isMotionHovered ? 'rgba(255,255,255,0.4)' : 'rgba(26,26,27,0.4)' }}
                transition={{ duration: isMotionHovered ? 0.4 : 0 }}
                className="font-mono text-[10px] uppercase tracking-[0.2em]"
              >
                02 / LOCATION: {text.hero_location}
              </motion.p>
              <motion.p 
                animate={{ color: isMotionHovered ? 'rgba(255,255,255,0.4)' : 'rgba(26,26,27,0.4)' }}
                transition={{ duration: isMotionHovered ? 0.4 : 0 }}
                className="font-mono text-[10px] uppercase tracking-[0.2em]"
              >
                03 / FOCUS: {text.hero_focus}
              </motion.p>
            </motion.div>
            <motion.div variants={item} className="h-[2px] w-12 bg-accent" />
            <motion.p 
              variants={item} 
              animate={{ color: isMotionHovered ? '#FFFFFF' : '#1A1A1B' }}
              transition={{ duration: isMotionHovered ? 0.4 : 0 }}
              className="text-xl leading-snug max-w-sm font-medium"
            >
              {text.hero_bio}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
